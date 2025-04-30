require('dotenv').config({ path: '../.env' });
const mysql_util = require('../server/lib/sql_util');
const _util = require('../server/lib/_util');
const crypto = require('crypto');
const apiLib = require('../server/lib/_api_lib');

module.exports = {
    cnstSafSave : async function (param) {
        let bpk = _util.platformBpkCheck(param.apiKey);


        var query = `CALL douzoneJoin('${param.pdtType}', ${bpk}, '${param.pdtType}','${param.businessType}', '${param.bNo}', '${param.bName}', '${param.address}', '${param.buildName}','${param.post}', '${param.buildType}', '${param.area}','${param.cName}','${param.cCell}','${param.cMail}','${param.cBank}','${param.memo}','${param.collect}','${param.provision}','${param.marketing}')`;
        console.log("joinQuery : ", query);

        try {
            let res = await mysql_util.mysql_proc_exec(query, param.apiKey);
            console.log('res ::: ', res);
            let resultCode = res[0][0].statusCode;
            if(resultCode === '200'){

                let messageSlack = `test`;
                let slackData = {
                    "channel": "#slackbottest",
                    "username": `더존 비즈온 접수 알림`,
                    "text": messageSlack,
                    //"icon_emoji": ":ghost:"
                };
                let slackResult = await apiLib.slackWebHook(slackData);


            }else {
                resultCode = '400';
            }
            return resultCode;
        } catch (error) {
            console.log('douzone cnstCarSave ERROR : ', error)

            throw error;
        }

    },
    cnstCarSave : async function (param) {
        let bpk = _util.platformBpkCheck(param.apiKey);


        var query = `CALL douzoneJoin('${param.pdtType}', ${bpk}, '${param.pdtType}','${param.businessType}', '${param.bNo}', '${param.bName}', '${param.address}', '${param.buildName}','${param.post}', '${param.bdType}', '${param.area}','${param.cName}','${param.cCell}','${param.cMail}','${param.cBank}','${param.memo}','${param.collect}','${param.provision}','${param.marketing}')`;
        console.log("joinQuery : ", query);
        console.log(param);
        try {
            let res = await mysql_util.mysql_proc_exec(query, param.apiKey);

            let resultCode = res[0][0].statusCode;
            if(resultCode === '200'){

                let messageSlack = `test`;
                let slackData = {
                    "channel": "#slackbottest",
                    "username": `더존 비즈온 접수 알림`,
                    "text": messageSlack,
                    //"icon_emoji": ":ghost:"
                };
                let slackResult = await apiLib.slackWebHook(slackData);


            }else {
                resultCode = '400';
            }
            return resultCode;
        } catch (error) {
            console.log('douzone cnstCarSave ERROR : ', error)

            throw error;
        }

    },
}






