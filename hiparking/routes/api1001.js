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
const service = require('../service/parkingService');
const mailForm = require('../server/lib/mailForm');
const { uploadS3Image } = require('../server/lib/fileUpload');
const mysql_util = require('../server/lib/sql_util');

router.get("/api1001", function(req, res){
    res.send('SIMG OPEN API 1001 PROD ROUTER');
});

router.post("/api1001", uploadS3Image, async function (req, res, next) {
    try {
        let apiKey = req.get('X-API-SECRET');
        let routerName = "/api1001";
        let today = _util.getTimeyymmddhhmmss('dash');

        /* apiKey 적합성 확인 함수 */
        function apiKeyCheck(apiKey, errorCode, errorMessage, checkKey) {
            if (!apiKey || checkKey === false) {
                return next({
                                status: 400,
                                message: "API KEY가 유효하지 않습니다.",
                                errorCode: "INVALID_API_KEY"
                            });
            }
            return false;
        }


        // 로그 저장
        let log_request_data = JSON.stringify(req.body);
        let bpk = _util.platformBpkCheck(apiKey);
        let param = req.body;

        let logQuery = `CALL __logS(
            '${apiKey}',
            '${routerName}',
            '${bpk}',
            'insuRequest',
            '${log_request_data}',
            '${req.get('x-forwarded-for')}',
            '${today}'
        );`;

        console.log('LOG SAVE :: ', logQuery);

        // MySQL 로그 저장 (에러 핸들링 추가)
        try {
            await mysql_util.mysql_proc_exec(logQuery, apiKey);
        } catch (dbError) {
            console.error('Database Error:', dbError);
            return next({
                            status: 500,
                            message: "DB 로그 저장 실패.",
                            errorCode: "INVALID_API_KEY"
                        });
        }

        param.apiKey = apiKey;
        console.log('param is :::: ', req.body);

        // 보험 요청 저장 (서비스 함수 실행)
        try {
            let resultCode = await service.saveInsu(req, param);
            return res.json(resultCode);
        } catch (error) {
            console.error('Service Error:', error);
            return next({
                            status: 500,
                            message: "보험 정보를 저장하는 중 오류가 발생했습니다.",
                            errorCode: "SAVE_ERROR"
                        });
        }

    } catch (error) {
        console.error('Unexpected Error:', error);
        return next({
                    status: 500,
                    message: "서버 내부 오류가 발생했습니다.",
                    errorCode: "INTERNAL_SERVER_ERROR"
                });
    }
});




router.post("/searchParkingList", async function(req, res){

    console.log('Parking List Search Start Param is  ::::: ', req.body);


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

        let reqData = req.body;
        let param  = {
            apiKey : apiKey,
            pklName : req.body.pklName
        };

        try{
            let result = await service.searchParking(param);
            console.log(result);
            res.json(result);
        }catch(error){
            console.error('ERROR : ',error)
            console.log('__________________ERROR__________________')


            res.json({statusCode : '500'});
        }


        return res;


});






module.exports = router;
