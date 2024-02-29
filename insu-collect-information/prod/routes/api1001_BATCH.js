const _util = require('../server/lib/_util');
const apiUtil = require('../server/lib/_api_lib');
const express = require('express');
const router = express.Router();



router.get("/dev"+"/api1001_b", function(req, res){
    res.send('SIMG OPEN API 1001 BATCH DEV ROUTER');
});


router.post("/dev"+"/api1001_b", function(req, res) {

    var apiKey = req.get('X-API-SECRET');
    var request_data = req.body;
    let routerName = "/dev/api1001_b";
    console.log("============================================================");
    console.log('request_data_json is : ', request_data);
    console.log("============================================================");
    let today = _util.getTimeyymmddhhmmss('dash');
    console.log("__________________API CALL", today, "ROUTER : ", 'api1001_b');
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

    /* REQUEST DATA 유효성 */
    if(request_data==="" || request_data===undefined || Object.keys(request_data).length === 0 ||  request_data.requester === "" ||  request_data.requester === undefined || Object.keys(request_data.requester).length === 0) {
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



    // 로그 쌓는 부분 여기에~



    // insert 준비
    let requesterData = request_data.requester;
    let businessDay = request_data.businessDay;

    let r = {
        requesterName:"",
        requesterCell:"",
        requesterJumin:"",
        requesterCi:"",
        collectionYN:"",
        provisionYN:"",
        inquiryYN:"",
        marketingYN:"",
        sharingYN:"",
        rightsYN:"",
        requestDay:""
    };
    console.log('COLLECT INFORMATION  :: API 1001 REQUEST REQEUSTER LENGTH : ', request_data.requester.length);
    let value = [];

    for(let i = 0; i<requesterData.length; i++){
        let requester = requesterData[i]
        r.requesterName = requester.requesterName;
        r.requesterCell = requester.requesterCell;
        r.requesterJumin = requester.requesterJumin;
        r.requesterCi = requester.requesterCi;
        r.collectionYN = requester.collectionYN;
        r.provisionYN = requester.provisionYN;
        r.inquiryYN = requester.inquiryYN;
        r.marketingYN = requester.marketingYN;
        r.sharingYN = requester.sharingYN;
        r.rightsYN = requester.rightsYN;
        r.requestDay = requester.requestDay;


        value.push(bpk);
        value.push(request_data.pageNumber);
        value.push(request_data.pageSize);
        value.push(request_data.totalPages);
        value.push(request_data.totalElements);
        value.push(businessDay);
        value.push(r.requesterName);
        value.push(r.requesterCell);
        value.push(r.requesterJumin);
        value.push(r.requesterCi);
        value.push(r.collectionYN);
        value.push(r.provisionYN);
        value.push(r.inquiryYN);
        value.push(r.marketingYN);
        value.push(r.sharingYN);
        value.push(r.rightsYN);
        value.push('Y');

    }
    let muultiquery = "insert into testTable(bpk, pageNumber, pAgeSize, totalPages, totalElements, businessDay, requesterName, requesterCell, requesterJumin, requesterCi, collectionYN, provisionYN, inquiryYN, marketingYN, sharingYN, rightsYN) values ?;";
    console.log('muultiquery is : ', muultiquery + value);


    res.json('ok');// test
}); // /dev/api1001 router END //









module.exports = router;