const _util = require('../server/lib/_util');
const apiUtil = require('../server/lib/_api_lib');
const express = require('express');
const router = express.Router();
const fs = require('fs');
/* DB CONFIG */
const Config = require('../server/config/_config');
const Con = new Config();
/* mysql util*/
const path = require('path');
const kakaAlim = require('../server/lib/_kakaoAlim');
const {slackWebHook} = require("../server/lib/_api_lib");
const msgService = require('../service/msgService');
const service = require('../service/joinService');
const mailForm = require('../server/lib/mailForm');

router.get("/api1001", function(req, res){
    res.send('SIMG OPEN API 1001 PROD ROUTER');
});

router.post("/api1001", async function(req, res){
    let apiKey =  req.get('X-API-SECRET');

    /* apiKey 적합성 확인 함수 */
    function apiKeyCheck(apiKey, errorCode, errorMessage, checkKey){
        if (apiKey === "" || apiKey === undefined || apiKey === false || checkKey === false) {
            let return_data = {
                "code": errorCode,
                "message": errorMessage
            };
            res.status(400).json(return_data);
            return true;
        }
        return false;
    }


    /* apiKey 유효성 */
    let check_key = _util.checkKey(apiKey);
    let apiKeyError = apiKeyCheck(apiKey, "400", "APIKEY가 거절되었습니다.", check_key);
    if(apiKeyError){return;}

    // 로그쌓는 부분~
    let log_request_data ="";
    if(typeof request_data==='object')
    {
        log_request_data = JSON.stringify(request_data)
    }

    let bpk = _util.platformBpkCheck(apiKey);
    let reqData = req.body;
    let param ;

    if(reqData.pdtType ==='saf'){
        param = {
                    apiKey : apiKey,
                    pdtType : reqData.pdtType,
                    bNo : reqData.bNo,
                    bName : reqData.bName,
                    address : reqData.address,
                    buildName : reqData.buildName,
                    useType : reqData.useType,
                    businessType : reqData.businessType,
                    area : reqData.area+'(m2)',
                    post : reqData.postNum,
                    buildType : reqData.buildType,
                    undergroundYn : reqData.undergroundYn,
                    cName: reqData.cName,
                    cCell: reqData.cCell,
                    cBank : reqData.cBank,
                    cMail : reqData.cMail,
                    collect: reqData.collect ? 'Y' : 'N',
                    marketing: reqData.marketing ? 'Y' : 'N',
                    provision: reqData.provision ? 'Y' : 'N',
                    type : 'accession'
                }
    }
    if(reqData.pdtType === 'car'){
         param = {
                apiKey : apiKey,
                pdtType : reqData.pdtType,
                cName : reqData.cName,
                businessType : reqData.businessType,
                cCell: reqData.cCell,
                memo : reqData.memo,
                collect: reqData.collect,
                marketing: reqData.marketing,
                provision: reqData.provision
            }
    }

    console.log('param is :::: ' , param);
    try {
            let resultCode;
            if(reqData.pdtType ==='saf') resultCode = await service.cnstSafSave(param);
            if(reqData.pdtType ==='car') resultCode = await service.cnstCarSave(param);

            if(reqData.pdtType ==='saf' && resultCode === '200'){
                let gubun = 'mailtest';
                let dataObject = param;
                let subject = '[더존비즈온] 풍수해 가입 안내 메일';
                let cc = '';
                apiUtil.mailHook(gubun, dataObject, 'jt@simg.kr' , `${reqData.cMail}, rlarlejr3178@simg.kr, yr.hong@simg.kr`, subject, cc);
            }

            res.json({statusCode : resultCode});
        } catch (error) {
            console.error('ERROR : ',error)
            console.log('__________________ERROR__________________')


            res.json({statusCode : '500'});
        }

        return res;
});










module.exports = router;
