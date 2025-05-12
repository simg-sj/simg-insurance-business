const express = require('express');
const router = express.Router();
const mysqlUtil = require('../server/lib/_sql_util');
const apiUtil = require('../server/lib/_api_lib');
const _util = require('../server/lib/_util');
const crypto = require("crypto");
const _kakaoAlim = require('../server/lib/_kakaoAlim');
const {api} = require("../server/lib/_api_lib");



router.get('/join', function(req,res){
    res.send('SIMG INSU API JOIN PROD ROUTER');
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
     * bpk: 'onna',
     * cName: '오정현',
     * cCell: '01082077529',
     * cJumin: '9502251149721',
     * cMail: 'ohh592@naver.com',
     * cPost: '08759',
     * cAddr1: '서울 관악구 남부순환로 1593-7',
     * cAddr2: 'ORT21, 701호',
     * cJobN: 'SIMG',
     * cCarCc: '124',
     * cUseN: '2년',
     * cJobLocal: '서울 선능',
     * cMoney: '3000000',
     * cDrink: 'Y',
     * cWeekD: '3회',
     * cOneD: '2잔',
     * cSmoke: 'Y',
     * cWeekS: '10개피',
     * cOneS: '10년',
     * cHeight: '170',
     * cWeight: '58',
     * cBank: '산업은행',
     * cAccount: '01023407529860',
     * cPayDt: '25'
     * }
     */
    let bpk = _util.platformBpkCheck(apiKey);
    console.log('platformBpkCheck is : ', bpk);
    let platformName = _util.platformNameCheck(apiKey);
    /* 변수 담아 */
    let cName = request_data.cName; // 이름
    let cCell = request_data.cCell; // 전화번호
    let cJumin = request_data.cJumin; // 주민등록번호
    let cJobN = request_data.cJobN; // 직장명
    let cJob = request_data.cJob; // 직업
    let cJobLocal = request_data.cJobLocal; // 근무지역
    let cMoney = request_data.cMoney; // 월소득
    let cMail = request_data.cMail; // 이메일
    let cPost = request_data.cPost; // 우편번호
    let cAddr1 = request_data.cAddr1; // 주소
    let cAddr2 = request_data.cAddr2; // 상세주소
    let carNum = request_data.carNm; // 차량번호
    let carUse = request_data.carUse; // 차량유형
    let cDrink = request_data.cDrink; // 음주여부
    let cWeekD = request_data.cWeekD; // 주당 음주 횟수
    let cOneD = request_data.cOneD; // 1회 음주시 주량
    let cSmoke = request_data.cSmoke; // 흡연여부
    let cWeekS = request_data. cWeekS; // 1일당 흡연량
    let cOneS = request_data.cOneS; // 흡연기간
    let cBank = request_data.cBank; // 은행명
    let cAccount = request_data.cAccount; // 계좌번호
    let cPayDt = request_data.cPayDt; // 매 달 납부일
    let cHeight = request_data.cHeight;
    let cWeight = request_data.cWeight;

    /* 데이터 확인 */
    console.log(
        'cName is : ', cName, '\n',
        'cCell is : ', cCell, '\n',
        'cJumin is : ', cJumin, '\n',
        // 'cMail is : ', cMail, '\n',
        // 'cPost is : ', cPost, '\n',
        // 'cAddr1 is : ', cAddr1, '\n',
        // 'cAddr2 is : ', cAddr2, '\n',
        // 'carNum is : ', carNum, '\n',
        // 'carUse is : ', carUse, '\n'
    )

    // 필수값 아닌것들 : 메일 , 차량번호, 차량용도 //언젠가 받을지도 모름
    if(cJobN === undefined){
        cJobN = '';
    }
    if(cJob === undefined){
        cJob = '';
    }
    if(cJobLocal === undefined){
        cJobLocal = '';
    }
    if(cMoney === undefined){
        cMoney = '';
    }
    if(cPost === undefined){
        cPost = '';
    }
    if(cAddr1 === undefined){
        cAddr1 = '';
    }
    if(cAddr2 === undefined){
        cAddr2 = '';
    }
    if(cDrink === undefined){
        cDrink = '';
    }
    if(cWeekD === undefined){
        cWeekD = '';
    }
    if(cOneD === undefined){
        cOneD = '';
    }
    if(cSmoke === undefined){
        cSmoke = '';
    }
    if(cWeekS === undefined){
        cWeekS = '';
    }
    if(cOneS === undefined){
        cOneS = '';
    }
    if(cBank === undefined){
        cBank = '';
    }
    if(cAccount === undefined){
        cAccount = '';
    }
    if(cPayDt === undefined){
        cPayDt = '';
    }
    if(cHeight === undefined){
        cHeight = '';
    }
    if(cWeight === undefined){
        cWeight = '';
    }
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
        "'" + cJobN + "'," +
        "'" + cJob + "'," +
        "'" + cJobLocal + "'," +
        "'" + cMoney + "'," +
        "'" + cMail + "'," +
        "'" + carNum + "'," +
        "'" + '' + "'," +
        "'" + carUse + "'," +
        "'" + cDrink + "'," +
        "'" + cWeekD + "'," +
        "'" + cOneD + "'," +
        "'" + cSmoke + "'," +
        "'" + cWeekS + "'," +
        "'" + cOneS + "'," +
        "'" + cBank + "'," +
        "'" + cAccount + "'," +
        "'" + cPayDt + "'," +
        "'" + cPost + "'," +
        "'" + cAddr1 + "'," +
        "'" + cAddr2 + "'," +
        "'" + cHeight + "'," +
        "'" + cWeight + "'," +
        "'" + ci + "'" +
        ");";

    console.log(joinQuery);
    mysqlUtil.mysql_proc_exec(joinQuery, apiKey).then(function(result){

        // console.log('mysql result is : ', result);
        console.log('mysql result[0][0] is : ', result[0]);

        let d = result[0];
        console.log('d is : ', d);
        // 알림톡 or 문자전송
        if(d[0].rCnt > 0){

            let join_alirm_msg = {};
            let alirm_data = {
                platform : platformName,
                cName : cName,
                cell : cCell,
                product : "이륜자동차 운전자 보험",
                note1:"※신청정보 수정을 원하시는 경우\n1877-3006번으로 문의 바랍니다."
            }
            console.log('sns check is : ', alirm_data);
            join_alirm_msg = _kakaoAlim.joinAlim(alirm_data);


            apiUtil.sendAligoKakao(join_alirm_msg).then(function(result){
                let d = result.receive;
                let d2 = result.sendD;

                let re = d2.receiver.split('=');
                let recev = re[1];

                let me = d2.message.split('=');
                let messa = me[1];

                let job = 'S';
                let spk = '0';
                let result_code = d.code;
                let message = d.message;
                let msgId = d.info.mid;
                let successCnt = d.info.scnt;
                let errorCnt = '';
                let msgType = 'kakaoAlim';
                let receiver = recev;
                let msg = messa;
                let testmode_yn =  'Y';
                let page = '1';
                let npp = '9999';
                let fromDay = '';
                let toDay = '';
                let searchGbn = '';
                let searchVal = '';

                let msgSaveQuery = "CALL sendCtrl(" +
                    "'" + job + "'" +
                    ", '" + spk + "'" +
                    ", '" + result_code + "'" +
                    ", '" + message + "'" +
                    ", '" + msgId + "'" +
                    ", '" + successCnt + "'" +
                    ", '" + errorCnt + "'" +
                    ", '" + msgType + "'" +
                    ", '" + receiver + "'" +
                    ", '" + msg + "'" +
                    ", '" + testmode_yn + "'" +
                    ", '" + page + "'" +
                    ", '" + npp + "'" +
                    ", '" + fromDay + "'" +
                    ", '" + toDay + "'" +
                    ", '" + searchGbn + "'" +
                    ", '" + searchVal + "'" +
                    ", '" + "BIKE_INSU_JOIN" + "'" +
                    ");";

                console.log(msgSaveQuery);

                mysqlUtil.mysql_proc_exec(msgSaveQuery, apiKey).then(function(result){
                    console.log('msgSaveQuery result is : ', result);

                });

            });

            let sendJuminData = cJumin.replace(/(\d{6})(\d).*/, '$1-$2');
            let slackBotData = {};
            let msg = ":bell:바이크보험가입자 안내:bell:\n";
            msg += "- 담당자 : " + "<@U06TDFSKG58>" + "\n";
            msg += "- 이름 : " + cName + "\n";
            msg += "- 고객정보 : " + sendJuminData + "\n";
            msg += "- 전화번호 : " + cCell + "\n";
            msg += "- 소속플랫폼 : " + platformName + "\n";

            slackBotData = {
                "channel" : "#simg-업무체크",
                "username" : "바이크보험가입알림봇",
                "text" : msg,
                // "icon_emoji": ":ghost:"
            };

            apiUtil.simgSlackBot(slackBotData).then(function(result){
                console.log('slack server response is : ', result);
            });

        }



        res.json(d);
        // console.log('d.code is : ', d.code);
        // if(d.code === '200'){
        //     res.json('ok');
        // }else{
        //     res.status(100);
        // }

    });

    //에러일때
    // res.json('error');
    // res.status(200);
    //정상일때



});

router.post('/join/premiumsCheck', function(req,res){
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

    /* apiKey 유효성 */
    let check_key = _util.checkKey(apiKey);
    console.log('apiKey check return value is : ', check_key);

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
    let apiKeyError = apiKeyCheck(apiKey, "400", "APIKEY가 거절되었습니다.", check_key);
    if(apiKeyError){return;}


    let bpk = _util.platformBpkCheck(apiKey);
    console.log('platformBpkCheck is : ', bpk);
    let age = request_data.age;
    //   기본 보험료
    let query1 = "select defaultPremiumsCheck(" +
        "'" + age + "'," +
        "'" + bpk + "'," +
        "'" + '1' + "'" + // 보험상품 pk 인데..이거 고민
        ") as defaultPremiumsCheck;"
    console.log('query1 : ', query1);
    //   고급 보험료
    let query2 = "select highPremiumsCheck(" +
        "'" + age + "'," +
        "'" + bpk + "'," +
        "'" + '1' + "'" + // 보험상품 pk 인데..이거 고민
        ") as highPremiumsCheck;"
    console.log('query2 : ', query2);
    let defaultPremiums, highpremiums;

    mysqlUtil.mysql_proc_exec(query1, apiKey).then(function(result){
        // console.log('result 1 : ',result);
        // console.log('mysql result is : ', result);
        // console.log('mysql result[0][0] is : ', result[0]);

        let d = result[0].defaultPremiumsCheck;
        console.log('defaultpremiums is : ', d);
        defaultPremiums = d;

        mysqlUtil.mysql_proc_exec(query2, apiKey).then(function(result){
            // console.log('result 2 : ',result);
            // console.log('mysql result is : ', result);
            console.log('mysql result[0][0] is : ', result[0]);

            let d = result[0].highPremiumsCheck;
            console.log('highPremiums is : ', d);
            highpremiums = d

            console.log('defaultpremiums : ', defaultPremiums);
            console.log('highpremiums : ', highpremiums);
            let rCnt = 0; // 에러처리를 위해~
            if (defaultPremiums === undefined || defaultPremiums === "" || highpremiums === undefined || highpremiums === ""){
                rCnt = 0;
            }else{
                rCnt = 1;
            }



            let data = {
                "rCnt" : rCnt,
                "defaultpremiums" : defaultPremiums,
                "highpremiums" : highpremiums
            }



            console.log(data);
            res.json(data);
        });

    });









});

function cryptoSha512(password){
    return crypto.createHash('sha512').update(password).digest('base64');
    // return crypto.createHash('sha512').update(password).digest('hex').toUpperCase();

}

module.exports = router;