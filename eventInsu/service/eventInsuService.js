require('dotenv').config({ path: '../.env' });
const mysql_util = require('../server/lib/sql_util');
const _util = require('../server/lib/_util');
const crypto = require('crypto');
const apiLib = require('../server/lib/_api_lib');

module.exports = {
    saveInsu : async function (req, param) {
    try {
            let insuResult = await this.insuService(param);

            let attachments = [];
            let slackFile = [];

                if(insuResult.statusCode === '200'){
                    let files = req.files;
                    if(files){
                        let savedFileResult = await this.insuFile(req, insuResult.irPk);
                        if(savedFileResult.statusCode === '200'){

                            if(savedFileResult.insuFiles){
                                attachments = savedFileResult.insuFiles
                                for(let i = 0; i < attachments.length; i++) {
                                    slackFile.push({
                                        "image_url" : attachments[i].path,
                                        "text" : attachments[i].filename
                                    })
                                }
                            }
                        }else {
                            return {statusCode : savedFileResult.statusCode};
                        }
                    }

                    param.type = 'insuMail';
                    let gubun = 'mailtest';
                    let dataObject = param;
                    let subject = '[행사주최자 견적 의뢰] 접수 메일';
                    let cc = '';
                    apiLib.mailHook(gubun, dataObject, 'jt@simg.kr' , 'rlarlejr3178@simg.kr , im1p@simg.kr, sj@simg.kr', subject, cc, attachments);



                    let slackMessage = `[행사주최자 견적 의뢰]\n`;
                    slackMessage += `구분 : ${param.cTravel}\n`;
                    slackMessage += `담당자성명 : ${param.cName}\n`;
                    slackMessage += `담당자휴대전화 : ${param.cCell}\n`;
                    slackMessage += `담당자이메일 : ${param.cMail}\n`;
                    slackMessage += `사업자 번호 : ${param.bNo}\n`;
                    slackMessage += `업체명 : ${param.bName}\n`;
                    slackMessage += `행사일자 : ${param.eventFrom} ~ ${param.eventTo}\n`;
                    slackMessage += `행사인원 : ${param.personnel}명\n`;
                    slackMessage += `행사횟수 : ${param.eventCount}번\n`;
                    if(param.cTravel === '해외'){
                        slackMessage += `행사국가명 : ${param.countryName}\n`;
                        slackMessage += `행사횟수 : ${param.eventHost}번\n`;
                    }
                    slackMessage += `특이사항 : ${param.etc}\n`;

                    let slackData = {
                        "channel": "#simg_운영업무전달",
                        "username": `[행사주최자 견적 의뢰] 접수 알림`,
                        "text": slackMessage,
                        "attachments" : slackFile
                    };

                    let slackResult = await apiLib.slackWebHook(slackData);
                    return {statusCode : insuResult.statusCode};
            }else {
                return {statusCode : insuResult.statusCode};
            }
    } catch (error) {

        throw error;

    }
    },
    insuService : async function (param) {
        let bpk = _util.platformBpkCheck(param.apiKey);

        if(param.cTravel === '국내'){
            param.country = '';
            param.eventHost = '';
        }
        var query = `INSERT INTO eventInsuMaster (bpk,cTravel, cName, cCell, cMail, bNo, bName, eventFrom,
                                                                   eventTo,country,eventHost, personnel, eventCount, etc,
                                                                   fileYn, statusCode, createYmd)
                     VALUES (${bpk},'${param.cTravel}', '${param.cName}', '${param.cCell}', '${param.cMail}',  '${param.bNo}',
                             '${param.bName}', '${param.eventFrom}','${param.country}','${param.eventHost}', '${param.eventTo}', '${param.personnel}', '${param.eventCount}',
                             '${param.etc}', '${param.fileYn}', '11', now())`;
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

    },

    insuFile: async function (req, irpk) {
        let apiKey =  req.get('X-API-SECRET');
        let bpk = _util.platformBpkCheck(apiKey);
        let files = req.files;

        console.log('files upload start ::::')
        if(!files) return;
        let today = _util.getTimeyymmddhhmmss('day');
        let saveCount = 0;
        let insuFiles = [];
        try {
            if (files.length !== 0) {
                for (let i = 0; i < files.length; i++) {
                    let query = `INSERT INTO file (cmpk, originalname, mimetype, fieldname, contentType,location, s3Key, bucket, createdYMD)
                                 VALUES ('${irpk}', '${files[i].originalname}', '${files[i].mimetype}', '${files[i].fieldname}', '${files[i].contentType}', '${files[i].location}', '${files[i].key}', '${files[i].bucket}', '${today}');`
                    console.log('joinFIles Query ::: ', query);

                    let fileType = files[i].originalname.split('.');
                    let fileName = today+'_'+irpk+'_접수 자료_'+(i+1)+'.'+fileType[1];
                    insuFiles.push({'filename' : fileName, 'path' : files[i].location});

                    console.log(insuFiles);
                    let result = await mysql_util.mysql_proc_exec(query, apiKey)
                    if(result.affectedRows > 0) saveCount ++;
                }
                console.log('saveCount is :::: ', saveCount);
                if(saveCount === files.length){
                    let updateQuery = `UPDATE eventInsuMaster SET fileYn = 'Y' WHERE pk = '${irpk}'`;
                    let upResult = await mysql_util.mysql_proc_exec(updateQuery, apiKey);

                    if(upResult.affectedRows > 0) {
                        return {statusCode : '200', insuFiles : insuFiles};
                    }else {
                        return {statusCode : '400'}
                    }
                }else {
                    return {statusCode : '400'}
                }
            }else {
                return {statusCode : '200'};
            }
        }catch(error){
            console.log('EventInsu ERROR : ', error)

            throw error;
        }
    },
}






