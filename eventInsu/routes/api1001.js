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
const service = require('../service/eventInsuService');
const mailForm = require('../server/lib/mailForm');
const { uploadS3Image } = require('../server/lib/fileUpload');


router.get("/api1001", function(req, res){
    res.send('SIMG OPEN API 1001 PROD ROUTER');
});

router.post("/api1001",uploadS3Image, async function(req, res){
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
    let param = req.body;

    param.apiKey = apiKey;

    console.log('param is :::: ' , req.body);
    try {
            let resultCode = await service.saveInsu(req ,param);


            res.json(resultCode);
        } catch (error) {
            console.error('ERROR : ',error)
            console.log('__________________ERROR__________________')


            res.json({statusCode : '500'});
        }

        return res;
});









module.exports = router;
