const express = require('express');
const router = express.Router();
const mysqlUtil = require('../server/lib/_sql_util');
const apiUtil = require('../server/lib/_api_lib');
const _util = require('../server/lib/_util');
const crypto = require("crypto");



router.get('/join', function(req,res){
    res.send('SIMG INSU API JOIN DEV ROUTER');
});

router.post('/join', function(req,res){

    var request_data = req.body;
    var apiKey =  req.get('X-API-SECRET');
    // console.log("request_data :: ", request_data);
    // console.log('test log, find new data', req.body.data);
    var gubun = req.body.gubun;
    let today = _util.getTimeyymmddhhmmss('dash');
    console.log("__________________API CALL", today, "ROUTER : ", 'sns_manager');
    console.log("APIKEY__ : ", apiKey);
    // console.log("GUBUN__ : ", gubun);
    console.log("BODY__ : ", request_data);
    // console.log("HEADERS__ : ", req.headers);
    console.log("PROTOCOL: ", req.get('x-forwarded-proto'));
    console.log("REMOTE IP : ", req.get('x-forwarded-for'));
    console.log("ORIGIN : ", req.get('origin'));
    console.log("HOST : ", req.headers.host);
    console.log("AGENT : ", req.get('User-Agent'));
    // console.log("CONTENT-TYPE : ", req.get('content-typ e'));

    /* REQUEST DATA 유효성 */
    if(request_data==="" || request_data===undefined || Object.keys(request_data).length === 0) {
        return_data = {
            "code":"300",
            "message" : "전달 받은 데이터가 없습니다."
        };
        res.status(300).json(return_data);
        return;
    }

    /* apiKey 유효성 */
    let check_key = _util.checkKey(apiKey);
    console.log('apiKey check return value is : ', check_key);

    let apiKeyError = apiKeyCheck(apiKey, "400", "APIKEY가 거절되었습니다.", check_key);
    if(apiKeyError){return;}



    /**
     * 전문 예시
     * {
     *        bpk: 'onna',
     *        cName: '김기덕',
     *        cCell: '01092673178',
     *        cJumin: '9502201222222',
     *        cMail: 'asf@naver.com',
     *        cPost: '13829',
     *        cAddr1: '경기 과천시 광명로 58',
     *        cAddr2: '1222호',
     *        cJob: '백수',
     *        carNm: '112버9414',
     *        carUse: '개인'
     * }
     */
    let bpk = _util.platformBpkCheck(apiKey);
    console.log('platformBpkCheck is : ', bpk);
    /* 변수 담아 */
    let cName = request_data.cName;
    let cCell = request_data.cCell;
    let cJumin = request_data.cJumin;
    let cJob = request_data.cJob;
    let cMail = request_data.cMail;
    let cPost = request_data.cPost;
    let cAddr1 = request_data.cAddr1;
    let cAddr2 = request_data.cAddr2;
    let carNum = request_data.carNm;
    let carUse = request_data.carUse;
    /* 데이터 확인 */
    console.log(
        'cName is : ', cName, '\n',
        'cCell is : ', cCell, '\n',
        'cJumin is : ', cJumin, '\n',
        'cMail is : ', cMail, '\n',
        'cPost is : ', cPost, '\n',
        'cAddr1 is : ', cAddr1, '\n',
        'cAddr2 is : ', cAddr2, '\n',
        'carNum is : ', carNum, '\n',
        'carUse is : ', carUse, '\n'
    )

    // 필수값 아닌것들 : 메일 , 차량번호, 차량용도
    if(cMail === undefined){
        cMail = '';
    }
    if(carNum === undefined){
        carNum = '';
    }
    if(carUse === undefined){
        carUse = '';
    }


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
    // call clientJoin('S', '1', '1', '0', '오정현', '01082077529', '9502251194721', '직장', 'ohh592@naver.com', '12가3456', 'BIKE', '출퇴근용', '123-45', '서울시', '관악구', '20231122', 'x');
    // CI값 생성
    var created = _util.getTimeyymmddhhmmss('no'); // yyyymmddhhmmss
    var requestTime = created;
    var ci = cryptoSha512(cJumin+created);
    console.log('ci is : ', ci);

    let job = "S";
    var joinQuery = "CALL clientJoin(" +
        "'" + job + "'," +
        "'" + bpk + "'," +
        "'" + 1 + "'," +        // 아직 보험사가 정해지지 않았으니~
        "'" + '0' + "'," +
        "'" + cName + "'," +
        "'" + cCell + "'," +
        "'" + cJumin + "'," +
        "'" + cJob + "'," +
        "'" + cMail + "'," +
        "'" + carNum + "'," +
        "'" + '' + "'," +
        "'" + carUse + "'," +
        "'" + cPost + "'," +
        "'" + cAddr1 + "'," +
        "'" + cAddr2 + "'," +
        "'" + ci + "'" +
        ");";

    console.log(joinQuery);
    mysqlUtil.mysql_proc_exec(joinQuery, apiKey).then(function(result){

        // console.log('mysql result is : ', result);
        console.log('mysql result[0][0] is : ', result[0][0]);

        let d = result[0][0];
        console.log('d.code is : ', d.code);
        if(d.code === '200'){
            res.json('ok');
        }else{
            res.status(100);
        }

    });

    //에러일때
    // res.status(100);
    // res.status(200);
    //정상일때



});

function cryptoSha512(password){
    return crypto.createHash('sha512').update(password).digest('base64');
    // return crypto.createHash('sha512').update(password).digest('hex').toUpperCase();

}

module.exports = router;