require('dotenv').config({ path: '../.env' });
const mysql_util = require('../server/lib/sql_util');
const _util = require('../server/lib/_util');
const crypto = require('crypto');
const apiLib = require('../server/lib/_api_lib');

module.exports = {
    saveInsu : async function (req, param) {
    try {
            if(param.drvScope === '02' || param.drvScope === '03'){
                param.drvAge = null;
            }

            if(param.drvScope === '01' || param.drvScope === '02'){
                param.fName = null;
                param.fJuminAll = null;
            }
            let insuResult = await this.insuService(param);

                    let slackMessage = `[이륜차 책임보험 가입 신청]\n`;
                    slackMessage += `성명 : ${param.cName}\n`;
                    slackMessage += `주민등록번호 : ${param.juminAll}\n`;
                    slackMessage += `휴대폰번호 : ${param.cCell}\n`;
                    slackMessage += `차량번호 : ${param.carNo}\n`;
                    slackMessage += `보험기간 : ${param.fromDay} ~ ${param.toDay}\n`;
                    slackMessage += `운전가능범위 : ${param.drvScope}\n`;
                    if(param.drvScope === '01') slackMessage += `연령 범위 : 만 ${param.drvAge}세 이상\n`;
                    if(param.drvScope === '03') slackMessage += `가족성명 : ${param.fName}\n 가족 생년월일 : ${param.fJuminAll}`;
                    slackMessage += `용도 : ${param.drvUse}\n`;
                    slackMessage += `물적할증금액 : ${param.propSurchargeAmt}원\n`;
                    slackMessage += `은행명 : ${param.bank}\n`;
                    slackMessage += `계좌번호 : ${param.account}\n`;


                    let slackData = {
                        "channel": "#simg-바로고-이륜차",
                        "username": `[이륜차 책임보험 가입 신청] 접수 알림`,
                        "text": slackMessage,
                    };

                    let slackResult = await apiLib.slackWebHook(slackData);
                    let googleResult = await apiLib.googleSheetInsert(param);


                    return {statusCode : insuResult.statusCode};

    } catch (error) {

        throw error;

        }
    },
    insuService : async function (param) {
        let bpk = _util.platformBpkCheck(param.apiKey);
        if(param.marketing){
            param.marketing = 'Y';
        }else {
            param.marketing = 'N';
        }

        var query = `INSERT INTO liabilityInsMaster (bpk,cName, cJumin, cCell, carNo, fromDay, toDay, drvScope,
                                                                   drvAge,fName,fJumin, drvUse, propSurchargeAmt, bank,
                                                                   account,collectionYN, provisionYN,marketingYN)
                     VALUES (${bpk},'${param.cName}', '${param.juminAll}', '${param.cCell}', '${param.carNo}',  '${param.fromDay}',
                             '${param.toDay}', '${param.drvScope}','${param.drvAge}','${param.fName}', '${param.fJuminAll}', '${param.drvUse}', '${param.propSurchargeAmt}',
                             '${param.bank}', '${param.account}','Y','Y','${param.marketing}')`;
        console.log("insuQuery : ", query);
        try {
            let res = await mysql_util.mysql_proc_exec(query, param.apiKey);
            console.log(res);

            if(res.affectedRows > 0) {
                return {statusCode : '200', irPk : res.insertId};
            }else {
                return {statusCode : '401'}
            }
        } catch (error) {
            console.log('Event Service Insu ERROR : ', error)

            throw error;
        }

    }

}






