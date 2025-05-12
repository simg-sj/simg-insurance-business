require('dotenv').config({ path: '../../hiparking/.env' });

const axios = require("axios");
var mysql = require("mysql");
const cron = require('node-cron');
var unirest = require('unirest');
const dayjs = require("dayjs");
const cheerio = require("cheerio"); // ✅ 반드시 필요
const _dateUtil = require("../../hiparking/server/lib/_dateUtils");
const _apiUtil = require("../../hiparking/server/lib/_api_lib")

// console.log("OPENAI_API_KEY : ", OPENAI_API_KEY);
const { OpenAI } = require("openai");
const { OPENAI_API_KEY } = process.env;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// const startTime = dayjs("2025-05-06T00:00:00+09:00");
// const endTime = dayjs("2025-05-06T23:00:00+09:00");

// 키워드 배열 설정 (CSV → Array)
const keywords = process.env.KEYWORDS?.split(",") || [];

// 뉴스 요약 프롬프트
let prompt = `아래는 한국어 뉴스 기사 본문입니다. 핵심 내용을 정확하고 간결하게 요약해주세요.  
- 뉴스의 주요 사건/정보를 5~7문장 이내로 요약  
- 객관적이고 중립적인 어조 사용  
- 인용, 주관적 표현, 감정적 단어는 제외  
- 날짜, 장소, 주요 인물 또는 기관을 포함할 것  
- 가독성을 위해 줄바꿈을 반드시 고려할 것`;

prompt = "너는 '보고서 요약 & 콘텐츠 편집 하이브리드 전문가'야.\n" +
    "핵심 내용을 정확하고 간결하게 요약해줘 요약기준은 다음과 같아.\n" +
    "1. 뉴스의 핵심 사건/정보를 **5~7문장 이내**로 요약  \n" +
    "2. **날짜, 장소, 주요 인물 또는 기관** 반드시 포함  \n" +
    "3. **인용, 주관적 표현, 감정적 단어는 제외**  \n" +
    "4. **객관적이고 중립적인 어조**로 서술  \n" +
    "5. **가독성을 높이기 위해 적절한 줄바꿈**을 사용  \n" +
    "6 결과는 **보고서에 인용 가능한 문장 스타일**로 작성할 것" +
    "위 요약기준을 따라 아래의 한국어 뉴스 기사 본문을 정리해줘.\n";

// 슬랙봇 설정
let slackbotObject = {
    "channel" : "#simg-ict-systemalert",
    "username" : "simg-news-gpt-crawler",
    "text" : "",
    "icon_emoji": ":ghost:"
}
const timer = ms => new Promise(res=>setTimeout(res,ms));
// main();
// let startTime = _dateUtil.GET_DATE("YYYYMMDD", "DAY", 0) + "T" + "00:00:01+09:00";
// startTime = dayjs(startTime);
// let endTime = _dateUtil.GET_DATE("YYYYMMDD", "DAY", 0) + "T" + "16:55:00+09:00";
// endTime = dayjs(endTime);
// console.log("startTime : ", startTime);
// console.log("endTime : ", endTime);
// main(startTime, endTime);


// slackSendBot();
let toDay = _dateUtil.GET_DATE("YYYYMMDD", "DAY", 0);
// job 정의를 배열로 관리
const CrawlerJobList = [
    { jobTime: '10 30 05 * * *', range: ['00:00:01', '05:30:00'] },
    { jobTime: '10 30 08 * * *', range: ['05:30:01', '08:30:00'] },
    { jobTime: '10 30 12 * * *', range: ['08:30:01', '12:30:00'] },
    { jobTime: '10 30 17 * * *', range: ['12:30:01', '17:30:00'] },
    { jobTime: '10 30 21 * * *', range: ['17:30:01', '21:30:00'] },
    { jobTime: '10 50 23 * * *', range: ['21:30:01', '23:50:00'] },
];

const SlackJobList = [
    { jobTime : '10 50 08 * * *' },
    { jobTime : '10 50 12 * * *' },
    { jobTime : '10 00 18 * * *' },
    { jobTime : '10 50 21 * * *' },
];

// 공통 유틸로 추출
const slackBatchJob = async () => {

    await slackSendBot();
};

// 반복 구조로 cron 등록
CrawlerJobList.forEach(({ jobTime, range }) => {
    cron.schedule(jobTime, async () => {
        const today = _dateUtil.GET_DATE("YYYYMMDD", "DAY", 0);
        const startTime = dayjs(`${today}T${range[0]}+09:00`);
        const endTime = dayjs(`${today}T${range[1]}+09:00`);
        await CrawlerBatchJob({ jobTime, startTime, endTime });
    });
});

// 반복 구조로 cron 등록
SlackJobList.forEach(({ jobTime}) => {
    cron.schedule(jobTime, async () => {
        await slackBatchJob();
    });
});


// 공통 유틸로 추출
const CrawlerBatchJob = async ({ jobTime, startTime, endTime}) => {
    console.log(`${jobTime} 크롤링 시작`);
    await main(startTime, endTime);
};




async function main(startTime, endTime) {
    // console.log("start : ", startTime);
    // console.log("endTime : ", startTime);
    for (const keyword of keywords) {
        await runKeywordSearch(keyword.trim(), startTime, endTime);
    }
}

async function slackSendBot(){

    let selectQuery = "SELECT * FROM simgCrawler where crawDay between date_format(date_add(now(), interval -1 day), '%Y%m%d') and date_format(now(), '%Y%m%d') and slackSendYN = 'N'";

    // DB저장
    await mysql_proc_exec(selectQuery).then(async function (result) {
        // console.log('result : ', result);
        let d = result;
        console.log('d.length : ', d.length);

        for (let i = 0; i < d.length; i++) {

            console.log('d[i].newsTitle : ', d[i].newsTitle);
            let newsTitle = d[i].newsTitle
            let newsSummary = d[i].newsSummary;
            let newsUrl = d[i].newsUrl;
            let keyword = d[i].keyword;
            let scpk = d[i].scpk;

            let slackbotObject = {
                "channel": "#simg-keyword-news",
                "username": keyword,
                "text": "",
                "icon_emoji": ":satellite_antenna:"
            }
            slackbotObject.text =
                `*${newsTitle}*\n` +
                // `출처: <${newsUrl}>\n`;
                `\n\`\`\`\n${newsSummary}\n\n-출처: ${newsUrl}\`\`\`\n`;


            await slackPush(slackbotObject).then(async function (result) {
                console.log('slackbot_send : ', result);
                console.log("result.receive : ", result.receive);
                console.log("result.receive.receive : ", result.receive.receive);
                if (result.receive.receive === 'ok') {

                    let updateQuery = "update simgCrawler set slackSendYN = 'Y', slackSendDate = now() where scpk = " + scpk;
                    console.log("updateQuery : ", updateQuery);

                    await mysql_proc_exec(updateQuery).then(function (result) {
                        console.log('result : ', result);
                    })

                }else{
                    console.error('슬랙 전송 실패, 로그만 기록')
                }

            });

            await timer(3000); // 3초 기다리기

        }
    });


}



async function fetchNaverNews(keyword) {
    const url = `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(keyword)}&display=50&sort=date`;
    console.log("수집경로 : ", url);
    // console.log("process.env.NAVER_CLIENT_ID : ", process.env.NAVER_CLIENT_ID);
    // console.log("process.env.NAVER_CLIENT_SECRET : ", process.env.NAVER_CLIENT_SECRET);
    // return;
    const headers = {
        "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
    };

    try {
        const { data } = await axios.get(url, { headers });
        // console.log("data : ", data);
        return data.items;
    } catch (e) {
        console.error(`[${keyword}] 뉴스 API 오류:`, e.message);
        // 슬랙 설정 ~
        return [];
    }
}

function isWithinTimeRange(pubDateStr, startTime, endTime) {
    const pubDate = dayjs(pubDateStr);
    // console.log('??');
    return pubDate.isAfter(startTime) && pubDate.isBefore(endTime);
}

async function summarizeText(text) {
    try {
        const chat = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: prompt },
                { role: "user", content: text },
            ],
        });

        return chat.choices[0].message.content.trim();
    } catch (err) {
        console.error("GPT 요약 실패:", err.message);
        return null;
    }
}

async function runKeywordSearch(keyword, startTime, endTime) {
    console.log(`키워드: ${keyword}`);

    const articles = await fetchNaverNews(keyword);
    // console.log("articles : ", articles);
    console.log("articles.length : ", articles.length);
    let countInRange = 0;
    for (const article of articles) {
        const pubDate = article.pubDate;
        const originallink = article.originallink;

        // 1. 언론사 필터 로그
        const isAllowedPress = [
            "yna.co.kr", "edaily.co.kr", "sedaily.com",
            "mt.co.kr", "asiae.co.kr", "hankyung.com",
            "mk.co.kr", "etnews.com", "dt.co.kr", "biz.chosun.com", "kookje.co.kr"
        ].some(domain => article.originallink.includes(domain));

        if (!isAllowedPress) {
            // console.log(`❌ [언론사 필터 제외] ${article.originallink}`);
            continue;
        }

        // 2. 시간 필터 로그
        if (!isWithinTimeRange(pubDate, startTime, endTime)) {
            // console.log(`⏰ [시간 외 기사 제외] ${originallink} - ${pubDate}`);
            continue;
        }

        // ✅ 최종 수집 대상
        console.log(`✅ [수집 대상 포함] ${originallink} - ${pubDate}`);
        countInRange++;
    }
    console.log("키워드 : " + keyword + "\n시간 필터 후 실제 처리된 뉴스 수:", countInRange);

    slackbotObject.text = ":bell:[뉴스수집]:bell:" +
        "\n수집키워드 : " + keyword +
        "\n수집갯수 : " + countInRange;

    // await slackPush(slackbotObject).then(function(result){
    //     console.log('slackbot_send : ', result);
    // });

    for (const article of articles) {
        const title = article.title.replace(/<[^>]+>/g, "");
        const description = article.description.replace(/<[^>]+>/g, "");
        let pubDate = article.pubDate;
        const link = article.link;



        // 언론사 필터 추가(언론사 : 연합뉴스, 이데일리, 서울경제만)
        // 1. 언론사 필터 로그
        const isAllowedPress = [
            "yna.co.kr", "edaily.co.kr", "sedaily.com",
            "mt.co.kr", "asiae.co.kr", "hankyung.com",
            "mk.co.kr", "etnews.com", "dt.co.kr", "biz.chosun.com", "kookje.co.kr"
        ].some(domain => article.originallink.includes(domain));

        if (!isAllowedPress) {
            // console.log(`❌ [언론사 필터 제외] ${article.originallink}`);
            continue;
        }

        // 2. 시간 필터 로그
        if (!isWithinTimeRange(pubDate, startTime, endTime)) {
            // console.log(`⏰ [시간 외 기사 제외] ${originallink} - ${pubDate}`);
            continue;
        }

        console.log("제목:", title);

        console.log("날짜:", pubDate);
        console.log("링크:", link);

        let urlCheckQuery = `CALL simgCrawler_manager('URL_CHECK', '', '_newsTitle', '_newsSummary', '${link}', '_keyword', '_searchGbn', '_searchVal', '_Page', '_npp', '_tSort', '_tOrder');`

        let urlCheckCode = "";
        let urlCheckMsg = "";

        await mysql_proc_exec(urlCheckQuery).then(function (result) {
            console.log("urlCheckQuery : ", urlCheckQuery);
            console.log("Raw Result : ", result);

            // ✅ 안전 검증
            if (result && result[0] && result[0][0]) {
                let d = result[0][0];
                urlCheckCode = d.code;
                urlCheckMsg = d.msg;
                console.log("urlCheckCode : ", urlCheckCode);
                console.log("urlCheckMsg : ", urlCheckMsg);
            } else {
                // 예외 응답 처리
                console.warn("DB 프로시저 결과가 비정상입니다. result 구조 확인 필요");
                urlCheckCode = "ERR_NO_RESULT";
                urlCheckMsg = "DB 프로시저 결과 없음";
            }

        });


        if(urlCheckCode === 200){

            // 이건 네이버에서 요약한 내용..네이버에서 요약한게 아니라 GPT요약을 할거기때문에 cheerio 모듈을 사용하여 직접 링크에 가서 본문 내용 빼와야한다.
            console.log("naver 요약 내용 : ", description);

            let all_description = "";
            await fetchFullArticle(link).then(function(result){
                all_description = result;
                console.log(keyword + " all_description : ", all_description);
            });

            if(!all_description || all_description.trim().length === 0){
                console.log('기사 본문 발취 실패');
            }else{

                const summary = await summarizeText(description); // GPT 요약
                console.log("요약:\n", summary);
                console.log("\n----------------------\n");
                let day = _dateUtil.GET_DATE("YYMMDD", "NONE",0);

                const safeTitle = escapeSQL(title);
                const formattedSummary = formatSummary(summary); // 마침표뒤에 줄바꿈
                const safeSummary = escapeSQL(formattedSummary); // 작은 따옴표 처리 ~
                const safeUrl = escapeSQL(link);
                const safeKeyword = escapeSQL(keyword);

                // let saveQuery = "INSERT INTO simgCrawler(newsTitle, newsSummary, newsUrl, keyword, crawDay, createdYMD) values(" +
                //     `'${safeTitle}', '${safeSummary}', '${safeUrl}', '${safeKeyword}', '${day}', now())`;

                let saveQuery = `CALL simgCrawler_manager('INSERT', '', '${safeTitle}', '${safeSummary}', '${safeUrl}', '${safeKeyword}', '_searchGbn', '_searchVal', '_Page', '_npp', '_tSort', '_tOrder');`
                console.log("saveQuery : ", saveQuery);

                // DB저장
                await mysql_proc_exec(saveQuery).then(function(result){
                    console.log('result : ', result);
                })

            }

        }else{

            console.log('이미 수집한 뉴스입니다.');

        }


        // return;
    }
}
/*
* '(작은따옴표) 치환
* DB 저장시 에러 발생 방지
* */
function escapeSQL(str) {
    return str.replace(/'/g, "''");
}

function formatSummary(summary) {
    return summary
        .replace(/([.?!])\s+/g, "$1\n") // 마침표 뒤 줄바꿈
        .trim();
}

/**
 * Fetches the full article content from a given URL, specifically targeting Naver News articles.
 *
 * @param {string} url The URL of the article to fetch content from.
 * @return {Promise<string|null>} The full article content as a trimmed string if found, or null if an error occurs or the content cannot be fetched.
 */
async function fetchFullArticle(url) {
    const headers = {
        "User-Agent": "Mozilla/5.0",
    };

    try {
        const { data } = await axios.get(url, { headers });
        // console.log("data : ", data);

        let $;
        try {
            $ = cheerio.load(data);
            console.log("cheerio loaded");
            console.log("HTML Length:", data.length);
            console.log("cheerio loaded successfully");
            // console.log("$ type:", typeof $);

            const sel = detectArticleSelector($);

            if(sel){
                const text = $(sel).text().trim();
                // console.log("text : ", text);
                return text;

            }else{
                console.warn("❌ 본문 selector를 감지하지 못했습니다.");
                slackbotObject.text = ":rotating_light:[본문 ㅌ 감지 실패]:rotating_light:" +
                    "\n- url : " + url;
                return null
            }

        } catch (cheerioError) {
            console.error("❌ cheerio.load 실패:", cheerioError.message);
            return;
        }

    } catch (e) {
        slackbotObject.text = ":rotating_light:[뉴스수집실패]:rotating_light:" +
            "\n- url : " + url;
        await slackPush(slackbotObject).then(function(result){

            console.log('slackbot_send : ', result);

        })
        console.error("❌ 본문 크롤링 실패:", url);
        return null;
    }
}

function detectArticleSelector($) {
    const candidates = [
        '.newsct_article', '.article_body', '#dic_area',
        '.contentView', '.article-content', 'article', '[itemprop="articleBody"]'
    ];

    for (const sel of candidates) {
        const text = $(sel).text().trim();
        console.log(`검사중: ${sel}, 길이: ${text.length}`);
        if ($(sel).length && text.length > 50) {
            return sel;
        }
    }


    return null;
}


/**
 * 데이터 적재 ~
 * */
function mysql_proc_exec(q){

    let schema = {
        connectionLimit : 4000,
        host     : process.env.CENTER_DB_HOST,
        port     : process.env.CENTER_DB_PORT,
        user     : process.env.CENTER_DB_USER,
        password : process.env.CENTER_DB_PASS,
        database : process.env.CENTER_DB_SCHEMA,
        options: {
            connectTimeout  : 1000 * 480000,
            requestTimeout  : 1000 * 480000
        },
        multipleStatements: true
    }

    return new Promise(function (resolve, reject) {

        var dbConnection = mysql.createPool(schema);

        // console.log(dbConnection);
        // console.log(schema);


        dbConnection.getConnection(function (err, connection) {  //.getConnection 메소드 err와 connection 한경우 두가지 내부콜백함수

            if (err) {
                // console.log(err);  //console창에 error값 출력
                resolve(err);

                return
            }
            console.log(`MySQL Query : ${q}`);
            console.log(`All Connections ${dbConnection._allConnections.length}`);
            console.log(`Acquiring Connections ${dbConnection._acquiringConnections.length}`);
            console.log(`Free Connections ${dbConnection._freeConnections.length}`);
            console.log(`Queue Connections ${dbConnection._connectionQueue.length}`);
            console.log(`connecting to db with id: ${connection.threadId}`);


            connection.query(q, function (err, result) {  //query를 던짐

                var error = false;  // 에러가 없다면 false
                if (err) {
                    error = true;  // 에러가 있다면 true
                    console.log(err);
                    connection.destroy();
                }
                resolve(result);
                // res.status(200).json(result);


                connection.release();

            });
        });

        // dbConnection.end();
        // dbConnection.release();




    });
}

/*
* 슬랙 메시지
* */
function slackPush(data){
    var BASEURL = "https://center-api.simg.kr/v1/api/simg/slackbot";


    console.log(BASEURL);
    console.log("SLACK : ", data);

    return new Promise(function (resolve, reject) {

        unirest.post(BASEURL)

            .headers(
                {
                    'Content-Type': 'application/json',
                })
            .type('json')
            .json(data)
            .end(function (response) {
                console.log('from SLACK RESPONSE : ', response.body);
                // console.log('send ', data);
                let d = {
                    'receive':response.body,
                    // 'sendD':data

                }
                resolve(d);
            });
    });
}