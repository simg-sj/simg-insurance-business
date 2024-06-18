const cron = require('node-cron');
const _util = require('../server/lib/_util');
const _mysqlUtil = require('../server/lib/sql_util');
const {slackWebHook} = require("../server/lib/_api_lib");
const dayjs = require('dayjs');



cron.schedule('00 00 09 * * *', () => {
        let today = dayjs().format('YYYY-MM-DD');
        let compDay = dayjs(today).subtract(7,'day').format('YYYY-MM-DD');


        let schema = 'client_prod_db_config';

        let query = `CALL userStatistics('statistics','', '6')`;

        _mysqlUtil.mysql_proc_exec2(query, schema).then(function(result){
                //     // console.log('mysql result is : ', result);
                //console.log('mysql result[0][0] is : ', result);
                let d = result.length;
                let lastStat = result[0];
                let thisStat = result[1];


                //홈, 팝업, 가입 통계
                // 지난주
                let lastHome = lastStat[0].home;
                let lastPopup = lastStat[0].popup;
                let lastSubmit = lastStat[0].submit;

                //오늘
                let todayHome = thisStat[0].home;
                let todayPopup = thisStat[0].popup;
                let todaySubmit = thisStat[0].submit;


                //홈, 팝업, 가입 잔존율
                let survRateHome = parseFloat((lastHome/todayHome) * 0.01).toFixed(2);
                let survRatePopup = parseFloat((lastPopup/todayPopup) * 0.01).toFixed(2);
                let survRateSubmit = '';
                if(lastSubmit === 0 || todaySubmit === 0) {
                        survRateSubmit = '수집 불가';
                }else {
                        survRateSubmit = parseFloat((todaySubmit/lastSubmit) * 100).toFixed(2).toString() + '%';
                }

                //슬랙 전송

                let messageSlack = '```\n';
                messageSlack += `${compDay} 일자 접속자 통계(지난주) \n`;
                messageSlack += `홈 : ${lastHome} 명      팝업 : ${lastPopup} 명    가입 : ${lastSubmit} 명\n\n`;
                messageSlack += `${today} 일자 접속자 통계(오늘) \n`;
                messageSlack += `홈 : ${todayHome} 명      팝업 : ${todayPopup} 명    가입 : ${todaySubmit} 명    잔존율 : ${survRateSubmit}\n\n`;
                messageSlack += '```';

                let slackData = {
                        "channel": "#pit_in-simg협업",
                        "username": `피트인 접속자 통계 (홈 / 팝업 / 가입)`,
                        "text": messageSlack,
                        "icon_emoji": ":ghost:"
                };

                slackWebHook(slackData)
                    .then(() => {
                            console.log('slack Success');
                    }).catch((error) => {
                        console.log(error);
                });
        });
});

function test(){
        let today = dayjs().format('YYYY-MM-DD');
        let compDay = dayjs(today).subtract(7,'day').format('YYYY-MM-DD');


        let schema = 'client_prod_db_config';

        let query = `CALL userStatistics('statistics','', '6')`;

        _mysqlUtil.mysql_proc_exec2(query, schema).then(function(result){
                //     // console.log('mysql result is : ', result);
                //console.log('mysql result[0][0] is : ', result);
                let d = result.length;
                let lastStat = result[0];
                let thisStat = result[1];


                //홈, 팝업, 가입 통계
                // 지난주
                let lastHome = lastStat[0].home;
                let lastPopup = lastStat[0].popup;
                let lastSubmit = lastStat[0].submit;

                //오늘
                let todayHome = thisStat[0].home;
                let todayPopup = thisStat[0].popup;
                let todaySubmit = thisStat[0].submit;


                //홈, 팝업, 가입 잔존율
                let survRateHome = parseFloat((lastHome/todayHome) * 0.01).toFixed(2);
                let survRatePopup = parseFloat((lastPopup/todayPopup) * 0.01).toFixed(2);
                let survRateSubmit = '';

                if(lastSubmit === 0 || todaySubmit === 0) {
                        survRateSubmit = '수집 불가';
                }else {
                         survRateSubmit = parseFloat((todaySubmit/lastSubmit) * 100).toFixed(2);
                }

                //슬랙 전송

                let messageSlack = '```\n';
                messageSlack += `${compDay} 일자 접속자 통계(지난주) \n`;
                messageSlack += `홈 : ${lastHome} 명      팝업 : ${lastPopup} 명    가입 : ${lastSubmit} 명\n\n`;
                messageSlack += `${today} 일자 접속자 통계(오늘) \n`;
                messageSlack += `홈 : ${todayHome} 명      팝업 : ${todayPopup} 명    가입 : ${todaySubmit} 명    잔존율 : ${survRateSubmit}\n\n`;
                messageSlack += '```';

                let slackData = {
                        "channel": "#slackbottest",
                        "username": `피트인 접속자 통계 (홈 / 팝업 / 가입)`,
                        "text": messageSlack,
                        "icon_emoji": ":ghost:"
                };

                slackWebHook(slackData)
                    .then(() => {
                            console.log('slack Success');
                    }).catch((error) => {
                            console.log(error);
                });
        });
}

test();
