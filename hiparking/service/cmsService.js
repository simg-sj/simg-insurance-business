require('dotenv').config({ path: '../.env' });
const mysql_util = require('../server/lib/sql_util');
const _util = require('../server/lib/_util');
const crypto = require('crypto');

module.exports = {
    requestBiz : async function (req){
        try{
            let apiKey =  req.get('X-API-SECRET');
            let bpk = _util.platformBpkCheck(apiKey);


            let req_data = param.body;

            let query = "CALL spuInsuRequestRecord(" +
                "'" + job + "'" +
                ", '" + AGENT + "'" +
                ", '" + host + "'" +
                ", '" + remote_ip + "'" +
                ", '" + origin + "'" +
                ", '" + bpk + "'" +
                ");";

            console.log(query);

            mysql_util.mysql_proc_exec(query, apiKey).then(function(result){

                return {code : '200', msg: '로그 저장 성공'};
            });
        }catch(error){

            throw error;
        }
    },

    getInsu : async function (req){
        try{
            let apiKey =  req.get('X-API-SECRET');
            let bpk = _util.platformBpkCheck(apiKey);
            let request_data = req.body;
            let job = request_data.job;
            let rpk = request_data.rpk;
            const type = request_data.type;
            const cName = request_data.cName;
            let cCell = request_data.cCell;
            const cEmail = request_data.cEmail;
            const executivesName = request_data.executiveName;
            let executivesCell = request_data.executiveCell;
            const requesterName = request_data.reqName;
            let requesterCell = request_data.reqCell;
            const requesterEmail = request_data.reqEmail;
            const clsAmount = request_data.clsAmount;
            const estmAmount = request_data.estmAmount;
            const damageFee = request_data.damageFee;
            const total = request_data.total;
            const statusCode = request_data.statusCode;
            const remark = request_data.remark;
            const searchGbn = '';
            const searchVal = request_data.searchVal;
            let page = request_data.page;
            let npp = request_data.npp;
            let fromDay = request_data.fromDay;
            let toDay = request_data.toDay;
            let reason = request_data.reason;
            let submitNo = request_data.submitNo;
            if(cCell !== '' && cCell !== undefined){
                cCell = cCell.replace(/[\s-]/g, '');
            }

            if(executivesCell !== '' && executivesCell !== undefined){
                executivesCell = executivesCell.replace(/[\s-]/g, '');
            }

            if(requesterCell !== '' && requesterCell !== undefined){
                requesterCell = requesterCell.replace(/[\s-]/g, '');
            }

            let query = `CALL spuGroupInsu('${job}', '${bpk}', '', '${cName}', '${cCell}', '${cEmail}', '${executivesName}', '${executivesCell}', '${requesterName}', '${requesterCell}', '${requesterEmail}', '${clsAmount}', '${estmAmount}', '${damageFee}', '${total}','${reason}','${submitNo}', '', '${remark}', '${page}', '${npp}', '${fromDay}', '${toDay}', '${rpk}', '${searchGbn}', '${searchVal}')`;



            console.log(query);
            let res = await mysql_util.mysql_proc_exec(query, apiKey);

            let d = res[0];
            return d;
        }catch(error){

            throw error;
        }
    },


}


