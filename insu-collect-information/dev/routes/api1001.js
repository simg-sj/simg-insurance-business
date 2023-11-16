const _util = require('../server/lib/_util');
const apiUtil = require('../server/lib/_api_lib');
const express = require('express');
const router = express.Router();
/* DB CONFIG */
const Config = require('../server/config/_config');
const Con = new Config();
/* mysql util*/
const _mysqlUtil = require('../server/lib/sql_util');
const crypto = require('crypto');



router.get("/dev"+"/api1001", function(req, res){
    res.send('SIMG OPEN API 1001 DEV ROUTER');
});

router.post("/dev"+"/api1001", function(req, res){

    var apiKey =  req.get('X-API-SECRET');
    var request_data = req.body;
    let routerName = "/dev/api1001";
    console.log("============================================================");
    console.log('request_data_json is : ',request_data);
    console.log("============================================================");
    let today = _util.getTimeyymmddhhmmss('dash');
    console.log("__________________API CALL", today, "ROUTER : ", 'api1001');
    console.log("APIKEY__ : ", apiKey);
    // console.log("BODY__ : ", request_data);
    // console.log("PROTOCOL: ", req.get('x-forwarded-proto'));
    console.log("REMOTE IP : ", req.get('x-forwarded-for'));
    console.log("ORIGIN : ", req.get('origin'));
    // console.log("HOST : ", req.headers.host);
    console.log("AGENT : ", req.get('User-Agent'));
    // console.log("CONTENT-TYPE : ", req.get('content-type'));
    // console.log('/api/v1/flex/planagree');


    /* 데이터 적합성 확인 함수 */
    function fieldValidCheck(field, errorCode, errorMessage) {
        if (field === "" || field === undefined || field === false) {
            let return_data = {
                "code": errorCode,
                "message": errorMessage
            };
            res.status(300).json(return_data);
            return true;
        }
        return false;
    }

    /* apiKey 적합성 확인 함수 */
    function apiKeyCheck(apiKey, errorCode, errorMessage, checkKey){
        if (apiKey === "" || apiKey === undefined || apiKey === false) {
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

    /* REQUEST DATA 유효성 */
    if(request_data==="" || request_data===undefined || Object.keys(request_data).length === 0) {
        return_data = {
            "code":"300",
            "message" : "전달 받은 데이터가 없습니다."
        };
        res.status(300).json(return_data);
        return;
    }

    // 로그쌓는 부분~
    let log_request_data ="";
    if(typeof request_data==='object')
    {
        log_request_data = JSON.stringify(request_data)
    }

    let bpk = _util.platformBpkCheck(apiKey);
    console.log('platformBpkCheck is : ', bpk);

    let req_data = request_data.result[0];

    let requesterName = req_data.requesterName;
    /*
    if(requesterName==="" || requesterName===undefined || requesterName ==false) {
        return_data = {
            "code":"301",
            "message" : "requesterName 가 없습니다."
        };
        res.status(300).json(return_data);
        return;
    }

     */
    // console.log('requesterName : ',requesterName);
    requesterName = _util.emptySpace(requesterName); // 공백제거
    requesterName = _util.specialCharEx(requesterName); // 특수문자제거

    let requesterCell = req_data.requesterCell;
    let requesterJumin = req_data.requesterJumin;
    let requesterCi = req_data.requesterCi;
    let collectionYN = req_data.collectionYN;
    let provisionYN = req_data.provisionYN;
    let inquiryYN = req_data.inquiryYN;
    let marketingYN = req_data.marketingYN;
    let sharingYN = req_data.sharingYN;
    let rightsYN = req_data.rightsYN;
    let requestDay = req_data.requestDay;



    let requesterCellError = fieldValidCheck(requesterCell, "304", "requesterCell 가 없습니다.");
    if (requesterCellError) {return;}


    let requesterJuminError = fieldValidCheck(requesterJumin, "304", "requesterJumin 가 없습니다.");
    if (requesterJuminError) {return;}


    let requesterCiError = fieldValidCheck(requesterCi, "304", "requesterCi 가 없습니다.");
    if (requesterCiError) {return;}


    let collectionYNError = fieldValidCheck(collectionYN, "305", "collectionYN 가 없습니다.");
    if (collectionYNError) {return;}


    let provisionYNError = fieldValidCheck(provisionYN, "306", "provisionYN 가 없습니다.");
    if (provisionYNError) {return;}

    let inquiryYNError = fieldValidCheck(inquiryYN, "307", "inquiryYN 가 없습니다.");
    if (inquiryYNError) {return;}

    // 마케팅 동의는 필수 값은 아님. 들어오지 않았거나 Y 가 아니라면 N으로 처리하게 해야함
    if(marketingYN==="" || marketingYN===undefined || marketingYN ==false) {
        // return_data = {
        //     "code":"307",
        //     "message" : "marketingYN 가 없습니다."
        // };
        // res.status(300).json(return_data);
        marketingYN = 'N';
        // return;
    }

    let sharingYNError = fieldValidCheck(sharingYN, "308", "sharingYN 가 없습니다.");
    if (sharingYNError) {return;}

    let rightsYNError = fieldValidCheck(rightsYN, "309", "rightsYN 가 없습니다.");
    if (rightsYNError) {return;}

    let requestDayError = fieldValidCheck(requestDay, "310", "requestDay 가 없습니다.");
    if (requestDayError) {return;}
    console.log('requesterName is : ', requesterName);
    console.log('requesterCell is : ', requesterCell);
    console.log('requesterJumin is : ', requesterJumin);
    console.log('requesterCi is : ', requesterCi);
    console.log('collectionYN is : ', collectionYN);
    console.log('provisionYN is : ', provisionYN);
    console.log('inquiryYN is : ', inquiryYN);
    console.log('marketingYN is : ', marketingYN);
    console.log('sharingYN is : ', sharingYN);
    console.log('rightsYN is : ', rightsYN);
    console.log('requestDay is : ', requestDay);

    // 받는 준비는 DB설계되어 확정되면~

res.json('ok');// test

});


module.exports = router;