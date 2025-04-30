require('dotenv').config({ path: '../.env' });
const mysql_util = require('../server/lib/sql_util');
const _util = require('../server/lib/_util');
const crypto = require('crypto');
const apiLib = require('../server/lib/_api_lib');

module.exports = {
    searchParking : async function (param) {
        let bpk = _util.platformBpkCheck(param.apiKey);


        var query = `SELECT pklName, pklAddress, pNo FROM parkinglot WHERE bpk = ${bpk} and  (pklName like '%${param.pklName}%' or pklAddress like '%${param.pklName}%')`;
        console.log("searchQuery : ", query);
        console.log(param);
        try {
            let res = await mysql_util.mysql_proc_exec(query, param.apiKey);

            return res;
        } catch (error) {
            console.log('parking Service Search ERROR : ', error)

            throw error;
        }

    },
    saveInsu : async function (req, param) {
        try {
            
            
            let insuResult = await this.insuService(param);

            let attachments = [];
            let slackFile = [];
            let statusCode;
            let videoUrl = [];

            let gubun = 'mailtest';
            let dataObject = param;
            let subject = '[하이파킹] 사고 접수 메일';
            let cc = '';


            let slackMessage = `[하이파킹 사고 접수]\n`;
            slackMessage += `하이파킹 결재 여부 : ${param.approvalYN}\n`;
            slackMessage += `피해자이름 : ${param.name}\n`;
            slackMessage += `피해자연락처 : ${param.phone}\n`;
            slackMessage += `담당자이름 : ${param.inCargeName}\n`;
            slackMessage += `담당자연락처 : ${param.inCargePhone}\n`;
            slackMessage += `주차장명 : ${param.parking}\n`;
            slackMessage += `차종 : ${param.car}\n`;
            slackMessage += `차량번호 : ${param.carNum}\n`;
            slackMessage += `차량색상 : ${param.color}\n`;
            slackMessage += `사고내용 : ${param.contents}\n`;
            slackMessage += `사고일시 : ${param.datetime}\n`;
            slackMessage += `기타내용 : ${param.etc}\n`;

            //파일 결과값
            statusCode = insuResult.statusCode;


            if(statusCode === '200'){
                    let files = req.files;
                    if(files){
                        let savedFileResult = await this.insuFile(req, insuResult.irPk);
                        if(savedFileResult.statusCode === '200'){
                            if(savedFileResult.insuFiles){
                                videoUrl = savedFileResult.insuVideo;
                                attachments = savedFileResult.insuFiles;
                            }
                        }else {
                            return {statusCode : savedFileResult.statusCode}
                        }
                    }

                    param.videoUrl = videoUrl;
                    param.type = 'insuMail';
                }else {
                slackMessage += `업로드 오류 : 사고 파일을 다시 요청해주세요.`;
            }

            //"channel": "#simg_운영팀_단체방",
            let slackData = {
                "channel": "#simg_운영팀_단체방",
                "username": `[하이파킹] 사고 접수 알림`,
                "text": slackMessage,
            };

            let mailResult = await apiLib.mailHook(gubun, dataObject, 'jt@simg.kr' , 'rlarlejr3178@simg.kr, im1p@simg.kr', subject, cc, attachments);
            //let mailResult = await apiLib.mailHook(gubun, dataObject, 'jt@simg.kr' , 'rlarlejr3178@simg.kr', subject, cc, attachments);
            console.log("mail Result is ::: ",mailResult);

            let slackResult = await apiLib.slackWebHook(slackData);
            return {statusCode : '200'};


        } catch (error) {

            throw error;

        }
    },
    insuService : async function (param) {
        let bpk = _util.platformBpkCheck(param.apiKey);

        let accidentDetail = param.contents.replace(/'/g, "''");
        var query = `INSERT INTO claimRequest (bpk, cpk, pNo, wName, wCell, inCargeName, inCargePhone, PJTcode, pklName, pklAddress,
                                                                   vCarType, vCarColor, vCarNum, accidentDetail,
                                                                   accidentDate, accidentDateTime, wOpinion,approvalYN,
                                                                   infoUseAgree, infoOfferAgree, useYNull, createdYMD)
                     VALUES (${bpk}, '13','${param.pNo}', '${param.name}', '${param.phone}', '${param.inCargeName}', '${param.inCargePhone}', '', '${param.parking}','${param.address}',
                             '${param.car}', '${param.color}', '${param.carNum}', '${accidentDetail}', '${param.date}',
                             '${param.datetime}', '${param.etc}','${param.approvalYN}', 'Y', 'Y', 'Y', now())`;
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
            console.log('parking Service Insu ERROR : ', error)

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
        let insuVideo = [];
        try {
            if (files.length !== 0) {
                for (let i = 0; i < files.length; i++) {
                    let query = `INSERT INTO file (irpk, originalname, mimetype, fieldname, contentType,location, s3Key, bucket, createdYMD)
                                 VALUES ('${irpk}', '${files[i].originalname}', '${files[i].mimetype}', '${files[i].fieldname}', '${files[i].contentType}', '${files[i].location}', '${files[i].key}', '${files[i].bucket}', '${today}');`
                    console.log('joinFIles Query ::: ', query);

                    let fileType = files[i].contentType.split('/');
                    let fileName = today+'_'+irpk+'_사고접수 사진_'+(i+1)+'.'+fileType[1];
                    if(fileType[0] === 'video'){
                        insuVideo.push({'location' : files[i].location});
                    }else {
                        insuFiles.push({'filename' : fileName, 'path' : files[i].location});
                    }

                    let result = await mysql_util.mysql_proc_exec(query, apiKey)
                    if(result.affectedRows > 0) saveCount ++;
                }
                console.log('saveCount is :::: ', saveCount);
                if(saveCount === files.length){

                    return {statusCode : '200', insuFiles : insuFiles, insuVideo : insuVideo};
                }else {
                    return {statusCode : '400'}
                }
            }else {
                return {statusCode : '200'};
            }
        }catch(error){
            console.log('hiparking ERROR : ', error)

            throw error;
        }
    },
}






