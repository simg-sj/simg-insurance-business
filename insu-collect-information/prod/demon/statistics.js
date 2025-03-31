const cron = require('node-cron');
const _util = require('../server/lib/_util');
const _mysqlUtil = require('../server/lib/sql_util');
const {slackWebHook} = require("../server/lib/_api_lib");
const dayjs = require('dayjs');



cron.schedule('0 9 * * 1', () => {
    let schema = 'client_prod_db_config';

    for(let i = 1; i <= 2; i++){
        let query = `CALL userStatistics('statistics','', ${i})`;
        let schema = 'client_prod_db_config';


        _mysqlUtil.mysql_proc_exec2(query, schema ).then(function(result){
            //     // console.log('mysql result is : ', result);
            //console.log('mysql result[0][0] is : ', result);


            let d = result.length;
            let lastStat = result[0];
            let accumStat = result[1];

            let companyName = '';
            if(i === 1) companyName = '마이체크업';
            if(i === 2) companyName = '벨류맵';

            console.log('lastStat :::: ', lastStat);
            console.log('accumStat :::: ', accumStat);

            //홈, 가입 통계
            // 지난주
            let lastSum = lastStat[0].sum;
            let fromDay = dayjs(lastStat[0].fromDay).format('YYYY-MM-DD');
            let toDay = dayjs(lastStat[0].toDay).format('YYYY-MM-DD');

            //누적 통계
            let accumSum = accumStat[0].sum;

            //슬랙 전송
            let messageSlack = '```\n';
            messageSlack += `${companyName} 가입자 통계 \n`;
            messageSlack += `${fromDay} ~ ${toDay} 가입자 통계 \n`;
            messageSlack += `가입자 수 : ${lastSum} 명\n\n`;
            messageSlack += `누적 가입자 통계 \n`;
            messageSlack += `가입자 수 : ${accumSum} 명\n\n`;
            messageSlack += '```';

            let slackData = {
                "channel": "#접수실적_밸류_마이",
                "username": `${companyName} 가입자 통계 알림봇`,
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
},{
    timezone: "Asia/Seoul"
});

