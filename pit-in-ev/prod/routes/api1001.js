const _util = require('../server/lib/_util');
const apiUtil = require('../server/lib/_api_lib');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const crypto = require("crypto");
/* AWS 파일 업로드 */
const { uploadS3Image } = require('../server/lib/_fileUpload');

/* DB CONFIG */
const Config = require('../server/config/_config');
const Con = new Config();
/* mysql util*/
const _mysqlUtil = require('../server/lib/sql_util');
/*const crypto = require('crypto');*/
const { addTextAndImageToPDF } = require('../server/lib/pdf');
const multer = require('multer');
const path = require('path');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['../xml/userInfo.xml']);
const kakaAlim = require('../server/lib/_kakaoAlim');
const service = require('../service/joinService');
const msgService = require('../service/msgService');
const token = require('../server/lib/makeToken');

router.get("/prod"+"/api1001", function(req, res){
    res.send('SIMG OPEN API 1001 PROD ROUTER');
});


// 상담 예약 라우터
router.post("/prod"+"/reservation", async (req, res) => {
    var apiKey =  req.get('X-API-SECRET');
    var request_data = req.body;
    let routerName = "/prod/api1001";
    console.log("============================================================");
    console.log('request_data_json is : ',request_data);
    console.log("============================================================");
    let today = _util.getTimeyymmddhhmmss('dash');
    console.log("__________________API CALL", today, "ROUTER : ", 'api1001');
    console.log("APIKEY__ : ", apiKey);



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
    try {
        let reservResult = await service.reservPitin(req);
        if(reservResult.code !== '108'){
            if(request_data.inType !== 'in'){
                let msg = '안녕하세요, 피트인입니다. \n' +
                    '\n' +
                    `${request_data.cName}님! ‘EV 배터리 케어서비스’ 가입상담 신청 접수가 완료되었습니다. \n`+
                    '\n' +
                    ' \n' +
                    '\n' +
                    '-상담 요청일: \n' +
                    '\n' +
                    `${request_data.date}`+' '+`${request_data.time}`+'\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '상담사가 요청하신 일자에 맞춰 연락드릴 수 있도록 하겠습니다.  \n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '상품에 대한 자세한 내용은 아래 링크에서 확인 가능합니다.  \n' +
                    '\n' +
                    '감사합니다.  \n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '※피트인 상담문의 \n' +
                    '\n' +
                    '-전화 1670-0470 \n' +
                    '\n' +
                    '-상담시간: 오전9시~오후6시 \n' +
                    '\n' +
                    '(점심시간: 오전11시 30분~오후1시 / 공휴일 및 주말 제외) \n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '※피트인 홈페이지: \n' +
                    '\n' +
                    'Https://pitin-ev.simg.kr ';
                let mode = "N";
                let gubun = 'S'; // 서비스 구분
                let upk = '6';
                let sendCell = "16700470"
                console.log("문자 발송 : ", gubun, upk, msg, request_data.cCell);
                 msgService.send("msgsend", request_data, sendCell, request_data.cCell, msg).then(function(result){
                    msgService.dataSave(apiKey, sendCell, request_data.cCell, msg); //
                })
            }
        }

        res.json(reservResult);
    } catch (error) {
        console.error('ERROR : ',error)
        console.log('__________________ERROR__________________')

        let response = {code: '500', message: '서버에러'}
        console.log('response : ', response)


        return res.json(response);
    }
});

router.post("/prod" +"/memoService", async (req, res) => {
    var apiKey =  req.get('X-API-SECRET');
    let keyInfo = _util.encInfo(apiKey);
    var request_data = req.body;
    let routerName = "/prod/api1001";
    console.log("============================================================");
    console.log('request_data_json is : ',request_data);
    console.log("============================================================");
    let today = _util.getTimeyymmddhhmmss('dash');
    console.log("__________________API CALL", today, "ROUTER : ", 'api1001');
    console.log("APIKEY__ : ", apiKey);

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

    try {
        let memoResult = await service.memoService(apiKey, request_data);
        res.json(memoResult);
    } catch (error) {
        console.error('ERROR : ',error)
        console.log('__________________ERROR__________________')

        let response = {code: '500', message: '서버에러'}
        console.log('response : ', response)


        return res.json(response);
    }

})

router.post("/prod"+"/api1001",uploadS3Image, async (req, res) => {
    var apiKey =  req.get('X-API-SECRET');
    let keyInfo = _util.encInfo(apiKey);
    let encKey = keyInfo.enckey;
    let ivKey = keyInfo.iv;
    var request_data = req.body;
    let routerName = "/prod/api1001";
    console.log("============================================================");
    console.log('request_data_json is : ',request_data);
    console.log("============================================================");
    let today = _util.getTimeyymmddhhmmss('dash');
    console.log("__________________API CALL", today, "ROUTER : ", 'api1001');
    console.log("APIKEY__ : ", apiKey);



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
    let cmpk = request_data.cmpk;




    // 로그쌓는 부분~
    let log_request_data ="";
    if(typeof request_data==='object')
    {
        log_request_data = JSON.stringify(request_data)
    }
    try {
       let saveResult = await service.saveJoin(req, cmpk);
       
        res.json(saveResult);
    } catch (error) {
        console.error('ERROR : ',error)
        console.log('__________________ERROR__________________')

        let response = {code: '500', message: '서버에러'}
        console.log('response : ', response)


        return res.json(response);
    }
});

router.post("/prod"+"/sign",uploadS3Image, async (req, res) => {
    var apiKey =  req.get('X-API-SECRET');
    var request_data = req.body;
    let routerName = "/prod/sign";
    console.log("============================================================");
    console.log('request_data_json is : ',request_data);
    console.log("============================================================");
    let today = _util.getTimeyymmddhhmmss('dash');
    console.log("__________________API CALL", today, "ROUTER : ", 'api1001');
    console.log("APIKEY__ : ", apiKey);


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
    try {
        let saveSign = await service.saveFiles(req);

        res.json(saveSign);
    } catch (error) {
        console.error('ERROR : ',error)
        console.log('__________________ERROR__________________')

        let response = {code: '500', message: '서버에러'}
        console.log('response : ', response)
        return res.json(response);
    }
});


router.post("/prod"+"/count", function(req, res){
    let apiKey =  req.get('X-API-SECRET');
    let job = req.body.job;
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
    let clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("clentIp :::: ", clientIP);

    let query = `CALL userStatistics('${job}','${clientIP}', '6' , '')`;
    _mysqlUtil.mysql_proc_exec(query,apiKey).then(function(result){
        let d = result[0][0];
        console.log('d is : ', d);

        res.json(d);
    });
});


router.post("/prod"+"/sendMsg", function(req, res){
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

    let request_data = req.body;
    console.log('SMS SEND!!');
    let receiver = request_data.cell;
    let msg = encodeURIComponent(request_data.msg);

    console.log('msg :::', msg);
    let mode = "N";
    let gubun = request_data.gubun; // 서비스 구분
    let upk = request_data.upk;
    let sendCell = "16700470"
    console.log("문자 발송 : ", gubun, upk, msg,receiver);
    msgService.send("msgsend", request_data, sendCell,receiver, request_data.msg).then(function(result){
        res.json(result);
        msgService.dataSave(apiKey, sendCell, receiver, msg); //
    })

});

router.post("/prod"+"/getUser", async function(req, res){
    let apiKey =  req.get('X-API-SECRET');
    let keyInfo = _util.encInfo(apiKey);
    let encKey = keyInfo.enckey;
    let ivKey = keyInfo.iv;

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
    let request_data = req.body;
    console.log(request_data);
    let keyCode = request_data.keyCode.replaceAll(' ', '+');

    let cmpk = _util.promiDecModule(encKey, ivKey, keyCode);


    try {
        let userInfo = await service.regiInfo(apiKey,cmpk);
        if(userInfo !== '400'){
            res.json({data : userInfo});
        }else {
            res.json({code : '400', msg : '유효하지 않은 코드입니다.'});
        }
    }catch (error) {
        console.error('ERROR : ',error)
        console.log('__________________ERROR__________________')

        let response = {code: '500', message: '서버에러'}
        console.log('response : ', response)


        return res.json(response);
    }

});


router.post("/prod"+"/deleteUser", async function(req, res){
    let apiKey =  req.get('X-API-SECRET');
    let keyInfo = _util.encInfo(apiKey);

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
    let request_data = req.body;

    try {
        let deleteResult = await service.deletePitin(apiKey, request_data);

        res.json(deleteResult);
    }catch (error) {
        console.error('ERROR : ',error)
        console.log('__________________ERROR__________________')

        let response = {code: '500', message: '서버에러'}
        console.log('response : ', response)


        return res.json(response);
    }

});

router.post("/prod"+"/updateUser", async function(req, res){
    let apiKey =  req.get('X-API-SECRET');
    let keyInfo = _util.encInfo(apiKey);

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
    let request_data = req.body;



    try {
        let updateResult = await service.updatePitin(apiKey, request_data);

        res.json(updateResult);
    }catch (error) {
        console.error('ERROR : ',error)
        console.log('__________________ERROR__________________')

        let response = {code: '500', message: '서버에러'}
        console.log('response : ', response)


        return res.json(response);
    }

});


router.post("/prod"+"/login",async (req, res) => {
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

    let param = req;

    try {
        let loginResult = await service.loginUser(param);

        if(loginResult !== '400'){
            res.cookie('refreshToken', loginResult.refreshToken, {
                secure : true,
                httpOnly : true,
            });

            let result = {
                accessToken : loginResult.accessToken
            }
            res.json(result);
        }else {
            res.json({code : '400', msg : '등록된 차량번호가 없습니다'});
        }


    } catch (error) {
        console.error('ERROR : ',error)
        console.log('__________________ERROR__________________')

        let response = {code: '500', message: '서버에러'}
        console.log('response : ', response)


        return res.json(response);
    }

});


router.post("/prod"+"/existCarNum",async (req, res) => {
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


    let keyInfo = _util.encInfo(apiKey);
    let encKey = keyInfo.enckey;
    let iv = keyInfo.iv;
    let carNum = req.body.carNum;
    try {
        let userInfo = await service.existCar(apiKey,carNum);
        if(userInfo !== '400'){
            res.json(userInfo);
        }else {
            res.json({code : '400', msg : '등록된 차량번호가 없습니다'});
        }
    }catch (error) {
        console.error('ERROR : ',error)
        console.log('__________________ERROR__________________')

        let response = {code: '500', message: '서버에러'}
        console.log('response : ', response)


        return res.json(response);
    }
});



router.post("/prod"+"/userInfo", async (req, res) => {
    let accessToken =  req.get('X-Access-Token');

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

    try {
        let tokenResult = token.verify(accessToken);
            if(tokenResult.ok){
                console.log("tokenResult is :::", tokenResult)
                let cmpk = tokenResult.id;
                let userInfo = await service.getUserInfo(apiKey,cmpk);
                if(userInfo !== '400'){
                    res.json({code : 200, data : userInfo});
                }else {
                    res.json({code : '400', msg : '등록된 정보가 없습니다.'});
                }
            }else {
                return res.status(401).json('시간 만료');
            }
    }catch (error) {
        console.error('ERROR : ',error)
        console.log('__________________ERROR__________________')

        let response = {code: '500', message: '서버에러'}
        console.log('response : ', response)
        return res.json(response);
    }
});

function cryptoSha512(password){
    return crypto.createHash('sha512').update(password).digest('base64');

}



module.exports = router;
