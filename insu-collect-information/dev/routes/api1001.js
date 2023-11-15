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

    let log_request_data ="";
    if(typeof request_data==='object')
    {
        log_request_data = JSON.stringify(request_data)
    }

    let bpk = _util.platformBpkCheck(apiKey);
    console.log('platformBpkCheck is : ', bpk);

    let requesterName = request_data.result.requesterName;
    requesterName = _util.emptySpace(requesterName); // 공백제거
    requesterName = _util.specialCharEx(requesterName); // 특수문자제거
    console.log('requesterName is : ', requesterName);
    let requesterCell = request_data.result.requesterCell;
    console.log('requesterName is : ', requesterCell);
    let requesterJumin = request_data.result.requesterJumin;
    console.log('requesterName is : ', requesterJumin);
    let requesterCi = request_data.result.requesterCi;
    console.log('requesterName is : ', requesterCi);
    let collectionYN = request_data.result.collectionYN;
    console.log('requesterName is : ', collectionYN);
    let provisionYN = request_data.result.provisionYN;
    console.log('requesterName is : ', provisionYN);
    let inquiryYN = request_data.result.inquiryYN;
    console.log('requesterName is : ', inquiryYN);
    let marketingYN = request_data.result.inquiryYN;
    console.log('requesterName is : ', marketingYN);
    let sharingYN = request_data.result.inquiryYN;
    console.log('requesterName is : ', sharingYN);
    let rightsYN = request_data.result.inquiryYN;
    console.log('requesterName is : ', rightsYN);
    let requestDay = request_data.result.inquiryYN;
    console.log('requesterName is : ', requestDay);




});




module.exports = router;