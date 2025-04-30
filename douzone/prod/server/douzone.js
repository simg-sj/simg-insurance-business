var express = require('express');
var path = require('path');
var bodyParser  = require("body-parser");
var logger = require('morgan');
const cookieParser = require('cookie-parser');
var fs = require('fs');
const _mysqlUtil = require('./lib/sql_util');
const api1001 = require('../routes/api1001');
const mysqlUtil = require('./lib/sql_util_V2');
const dayjs = require('dayjs');

let app = express();
let router = express.Router();
app.use(logger('dev'));

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: false}));
app.use(bodyParser.json());

const VISIT_SAVE_INTERVAL = 60 * 1000; // 1분

let visitorCount = 0;
let currentDate = dayjs().format('YYYY-MM-DD');
let saveTimer;
const API_KEY = 'FA4A2F94-B9F4-41A0-B064-BFA28CE23BF6'; // ✅ 사용중인 API 키 (프로덕션 환경)
const skipPaths = ['/api', '/assets', '/favicon.ico', '.js', '.css', '.png', '.jpg', '.svg', '.woff', '.ttf'];

var allowCORS = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //*,
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, XMLHttpRequest, api_key, X-API-SECRET');
    (req.method === 'OPTIONS') ?
        // res.send(200) :
        res.sendStatus(200) :
        next();
};
app.use(allowCORS); // localhost 에서 개발할 때 이걸 열어주지 않으면 들어올 수 없다
app.use(cookieParser()); // ✅ 쿠키 파서 추가



// 방문자 통계 초기화
async function initVisitorCount() {
    try {
        const result = await _mysqlUtil.mysql_proc_exec(`
            SELECT count FROM visitor_statistics WHERE visit_date = '${currentDate}'
        `, API_KEY);

        if (result.length > 0) {
            visitorCount = result[0].count;
        } else {
            visitorCount = 0;
            await _mysqlUtil.mysql_proc_exec(`
                INSERT INTO visitor_statistics (visit_date, count)
                VALUES ('${currentDate}', 0)
            `, API_KEY);
        }
        console.log(`[INIT] ${currentDate} 방문자 수: ${visitorCount}`);
    } catch (err) {
        console.error('방문자 초기화 실패:', err);
    }
}

// 방문자 수 저장
async function saveVisitorCount() {
    try {
        await _mysqlUtil.mysql_proc_exec(`
            UPDATE visitor_statistics
            SET count = ${visitorCount}
            WHERE visit_date = '${currentDate}'
        `, API_KEY);
        console.log(`[SAVE] ${currentDate} 방문자 수 저장: ${visitorCount}`);
    } catch (err) {
        console.error('방문자 수 저장 실패:', err);
    }
}

// 날짜 체크
async function checkDateChange() {
    const today = dayjs().format('YYYY-MM-DD');
    if (today !== currentDate) {
        console.log(`[DATE CHANGE] ${currentDate} -> ${today}`);
        currentDate = today;
        visitorCount = 0;
        try {
            await _mysqlUtil.mysql_proc_exec(`
                INSERT IGNORE INTO visitor_statistics (visit_date, count)
                VALUES ('${currentDate}', 0)
            `, API_KEY);
        } catch (err) {
            console.error('날짜 변경 INSERT 실패:', err);
        }
    }
}

// 1분 주기 저장 타이머
function startVisitorSaveTimer() {
    saveTimer = setInterval(async () => {
        await saveVisitorCount();
        await checkDateChange();
    }, VISIT_SAVE_INTERVAL);
}

app.use((req, res, next) => {
    const url = req.originalUrl;
    const shouldSkip = skipPaths.some(path => url.includes(path));

    if (!shouldSkip && req.method === 'GET') {
        if (!req.cookies.visited) {
            visitorCount++;
            res.cookie('visited', 'true', { maxAge: 24 * 60 * 60 * 1000 }); // 24시간 쿠키 유지
        }
    }

    next();
});


app.get("/", (req, res) => {
    res.set({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Date: Date.now()
    });
    res.sendFile(path.join(__dirname, "../client/dist", "/index.html"));
});


// 클라이언트로부터 PDF를 요청하는 엔드포인트
app.get('/get-pdf', (req, res) => {
    let cmpk = req.query.key;
    let today = req.query.today;
    today = today.replaceAll("'","");
    let fileName = today+'_'+cmpk+'.pdf';

    // PDF 파일의 경로
    const pdfPath = path.join(__dirname, '../uploads/',today,cmpk,fileName);
    console.log("pdfPath :::: " + pdfPath);
    // 파일을 읽어서 스트림으로 전송
    const stream = fs.createReadStream(pdfPath);
    stream.pipe(res);
});


app.use(express.static(path.join(__dirname, '../client/dist/'))); // service


app.use('/api/prod', api1001);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/", "/index.html"));
});





const port = 20224;
app.listen(port, async () => {
    console.log('Server 연결됨 포트:', port);
    await initVisitorCount();
    startVisitorSaveTimer();
});
