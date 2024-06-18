require('dotenv').config({ path: '../.env' });
const mysql_util = require('../server/lib/sql_util');
const _util = require('../server/lib/_util');
const crypto = require('crypto');
const apiLib = require('../server/lib/_api_lib');

module.exports = {
    logSave : async function (req){
        try{
                let apiKey =  req.get('X-API-SECRET');
                let bpk = _util.platformBpkCheck(apiKey);
                let job = 'S';
                let AGENT =req.get('User-Agent');
                let host = req.headers.host;
                let remote_ip =req.get('x-forwarded-for');
                let origin = req.get('origin');

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
    reqeustInsu : async function (param) {
        try {
            let insuResult = await this.saveInsu(param);
            if(insuResult.code === '200'){
                let savedFileResult = await this.saveFiles(param, insuResult);
                return savedFileResult;
            }else {
                return {code : '400'};
            }

        } catch (error) {

            throw error;

        }


    },

    saveInsu: async function (param) {
        var apiKey =  param.get('X-API-SECRET');
        let keyInfo = _util.encInfo(apiKey);
        let bpk = _util.platformBpkCheck(apiKey);
        let plfName = _util.promiBizCheck(apiKey).plfName;
        let req_data = param.body;
        let requesterType = req_data.type;
        let cName = req_data.name;
        let cCell = req_data.cell;
        let cEmail = req_data.email;
        let executivesName = req_data.executivesName; // 임직원 성명
        let executivesCell = req_data.executivesCell; // 임직원 전화번호
        let requesterName = req_data.reqName;
        let requesterEmail = req_data.reqEmail;
        let requesterCell = req_data.reqCell;
        let job = 'S';
        let dambo = req_data.dambo;

        // 접수 구분 : 임직원(01) 배우자(02) 자녀(03)
        if(requesterType === '01'){
            cName = _util.emptySpace(cName); // 공백제거
            cName = _util.specialCharEx(cName); // 특수문자제거
            cCell = cCell.replaceAll('-','');
        }

        if(requesterType === '02' || requesterType ===  '03'){
            executivesName = _util.emptySpace(executivesName); // 공백제거
            executivesName = _util.specialCharEx(executivesName); // 특수문자제거
            requesterName = _util.emptySpace(requesterName); // 공백제거
            requesterName = _util.specialCharEx(requesterName); // 특수문자제거
            executivesCell = executivesCell.replaceAll('-','');
            requesterCell = requesterCell.replaceAll('-','');
        }




        let query = `CALL spuGroupInsu('${job}', '${bpk}', '${requesterType}', '${cName}', '${cCell}', '${cEmail}', '${executivesName}', '${executivesCell}', '${requesterName}', '${requesterCell}', '${requesterEmail}', '', '', '', '','','','01', '', '', '', '', '', '', '', '')`;

        console.log("query is  ::::: ", query);

        try {
            let res = await mysql_util.mysql_proc_exec(query, apiKey);
            console.log('res ::: ', res);
            let d = res[0][0];


            // 메일 전송
            let subObject = `단체상해 보험 [ ${plfName} ]`
            apiLib.mailHook('socar-accident', req_data, 'jt@simg.kr', 'im1p@simg.kr, rlarlejr3178@simg.kr', subObject);
            return d;
        } catch (error) {
            console.log('socarRequest ERROR : ', error)

            throw error;
        }

    },
    saveFiles: async function (req, insuResult) {
        let apiKey =  req.get('X-API-SECRET');
        let bpk = _util.platformBpkCheck(apiKey);
        let rpk = insuResult.rpk;
        let files = req.files;
        console.log('files upload start ::::')
        if(!files) return;
        let today = _util.getTimeyymmddhhmmss('day');
        let saveCount = 0;
        try {
            if (files.length !== 0) {
                for (let i = 0; i < files.length; i++) {
                    let query = `INSERT INTO fileMaster (rpk,bpk, originalname, mimetype, fieldname, contentType,location, s3Key, bucket, createdYMD)
                                 VALUES ('${rpk}','${bpk}', '${files[i].originalname}', '${files[i].mimetype}', '${files[i].fieldname}', '${files[i].contentType}', '${files[i].location}', '${files[i].key}', '${files[i].bucket}', '${today}');`
                    console.log('joinFIles Query ::: ', query)
                    let result = await mysql_util.mysql_proc_exec(query, apiKey)
                    if(result.affectedRows > 0) saveCount ++;
                }
                console.log('saveCount is :::: ', saveCount);
                if(saveCount === files.length){
                    let query = `SELECT reqNumber FROM groupInsuRequest WHERE rpk = ${rpk}`;
                    let reqResult = await mysql_util.mysql_proc_exec(query, apiKey);

                    return reqResult;
                }
            }else {
                    return;
                }
        }catch(error){
            console.log('soccar ERROR : ', error)

            throw error;
        }
    }


}

function cryptoSha512(password){
    return crypto.createHash('sha512').update(password).digest('base64');
    // return crypto.createHash('sha512').update(password).digest('hex').toUpperCase();

}
