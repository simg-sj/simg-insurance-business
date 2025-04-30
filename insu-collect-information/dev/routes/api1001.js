const _util = require('../server/lib/_util');
const apiUtil = require('../server/lib/_api_lib');
const express = require('express');
const router = express.Router();
const fs = require('fs');
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
const {slackWebHook} = require("../server/lib/_api_lib");
const msgService = require('../service/msgService');
const service = require('../service/insuService');
/* AWS 파일 업로드 */
const { uploadS3Image } = require('../server/lib/fileUpload');

router.get("/prod"+"/api1001", function(req, res){
    res.send('SIMG OPEN API 1001 PROD ROUTER');
});

router.post("/prod"+"/api1001", function(req, res){

    var apiKey =  req.get('X-API-SECRET');
    var request_data = req.body;
    let routerName = "/prod/api1001";
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

    let keyInfo = _util.encInfo(apiKey);
    let encKey = keyInfo.enckey;
    let ivKey = keyInfo.iv;

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
    let requesterEmail = req_data.requesterEmail;
    if(bpk === 2) requesterEmail = _util.promiDecModule(encKey, ivKey, requesterEmail);
    console.log(requesterEmail);
    //key, iv, encrypted
    // let key = "B0E195E013C99D59E09B7817B0E7C2CB";
    // let iv = "72994385f5d9b9c5";
    requesterJumin = _util.promiDecModule(encKey, ivKey, requesterJumin);
    console.log("requesterJumin : ", requesterJumin);
    requesterCell = _util.promiDecModule(encKey, ivKey, requesterCell);
    console.log("requesterCell : ", requesterCell);
    let requesterCi = req_data.requesterCi;
    let collectionYN = req_data.collectionYN;
    let provisionYN = req_data.provisionYN;
    let inquiryYN = req_data.inquiryYN;
    let marketingYN = req_data.marketingYN;
    let sharingYN = req_data.sharingYN;
    let rightsYN = req_data.rightsYN;
    let requestDay = req_data.requestDay;
    let cMain = req_data.requesterEmail;
    let formData = new FormData();



    let requesterCellError = fieldValidCheck(requesterCell, "304", "requesterCell 가 없습니다.");
    if (requesterCellError) {return;}


    let requesterJuminError = fieldValidCheck(requesterJumin, "304", "requesterJumin 가 없습니다.");
    if (requesterJuminError) {return;}


    /*let requesterCiError = fieldValidCheck(requesterCi, "304", "requesterCi 가 없습니다.");
    if (requesterCiError) {return;}*/


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

    /* 벨류맵은 이메일 들어옴 ~ [ 2024-04-17 ] 오정현 */
    if(bpk === '2'){
        let requesterEmainError = fieldValidCheck(cMain, "311", "requesterEmail 가 없습니다.");
        if (requesterEmainError) {return;}
    }
    /* 확인용 */
    console.log('requesterName is : ', requesterName);
    console.log('requesterCell is : ', requesterCell);
    console.log('requesterJumin is : ', requesterJumin);
    console.log('requesterEmail is : ', requesterEmail);
    console.log('requesterCi is : ', requesterCi);
    console.log('collectionYN is : ', collectionYN);
    console.log('provisionYN is : ', provisionYN);
    console.log('inquiryYN is : ', inquiryYN);
    console.log('marketingYN is : ', marketingYN);
    console.log('sharingYN is : ', sharingYN);
    console.log('rightsYN is : ', rightsYN);
    console.log('requestDay is : ', requestDay);
    let job = 'S';
    // 받는 준비는 DB설계되어 확정되면~
    var joinQuery = "CALL bizJoin(" +
        "'" + job + "'," +
        "'" + bpk + "'," +
        "'" + 1 + "'," +        // 아직 보험사가 정해지지 않았으니~
        "'" + '0' + "'," +
        "'" + requesterName + "'," +
        "'" + requesterCell + "'," +
        "'" + requesterJumin + "'," +
        "'" + requesterEmail + "'," +
        "'" + requesterCi + "'," +
        "'" + rightsYN + "'," +
        "'" + collectionYN + "'," +
        "'" + provisionYN + "'," +
        "'" + inquiryYN + "'," +
        "'" + sharingYN + "'," +
        "'" + marketingYN + "'," +
        "'" + requestDay + "'" +
        ");";

    console.log("joinQuery : ", joinQuery);

    _mysqlUtil.mysql_proc_exec(joinQuery, apiKey).then(function(result){
        //     // console.log('mysql result is : ', result);
        console.log('mysql result[0][0] is : ', result[0][0]);
        let d = result[0][0];
        console.log('d is : ', d);
        console.log('code : ', d.code);

        res.json(d);

        /* 밸류맵 가입증명서 발급 및 알림톡 발송*/
        // 가입증명서 확인 페이지 : insurance-info.simg.kr / insurance-info-test.simg.kr
        /* 가입 증명서 저장 */
        // 마이체크업 1번 / 밸류맵 2번
        if ( bpk == '1' && d.code === '200' || bpk == '2' && d.code === '200' ) {

            let cmpk = d.cmpk;
            /* 고객페이지 설정 */
            let infoPageURL = keyInfo.infoPage;
            let cmpkString = String(cmpk);
            let cmpkEncString = _util.promiEncModule(encKey, ivKey, cmpkString); // cmpk 암호화
            cmpkEncString = encodeURIComponent(cmpkEncString);
            let cNameEncString = _util.promiEncModule(encKey, ivKey, requesterName); // 고객이름 암호화
            cNameEncString = encodeURIComponent(cNameEncString);
            let clientSavePageURL = "";

            console.log("d.cmpk : ", cmpk);

            let validDay = '';
            let clientPath = "/" + cmpk; //
            let formData = new FormData();
            // 생성된 고객 정보 가져오기
            let q = "select date_format(createdYMD, '%Y%m') as insertDay ,concat(date_format(date_add(createdYMD, interval 1 day), '%Y-%m-%d'), ' 00:00:00 ~ ', date_format(date_add(createdYMD, interval 1 year), '%Y-%m-%d'), ' 24:00:00') as insurGap, a.* from clientMaster a where useYNull = 'Y' and bpk = '" + bpk + "' and cmpk = " + cmpk + ";"
            _mysqlUtil.mysql_proc_exec(q, apiKey).then(function(result){
                console.log('result is : ',result[0].cName);
                console.log('result is : ',result[0].insurGap);
                let insertDay = result[0].insertDay;
                validDay = result[0].insurGap;
                // pdf 생성, //cmpk, clientName, insurGap, bpk
                _util.pdfSet(cmpk, result[0].cName, result[0].insurGap, bpk);


                /* 알림톡 발송 */
                clientSavePageURL = infoPageURL + "?client='" + cmpkEncString + "'&join='" + insertDay + "'&cName='" + cNameEncString + "'"; // 파라미터로 고객키 / 이름
                clientSavePageURL = encodeURIComponent(clientSavePageURL);
                console.log(clientSavePageURL);

                let kakaoObject = {
                    cName : requesterName,
                    cell : requesterCell,
                    infoUrl : clientSavePageURL
                }
                console.log('kakaoObject', kakaoObject);
                let join_alirm_msg = {};

                if ( bpk === 1){
                    join_alirm_msg = kakaAlim.mycheckup_join_info(kakaoObject);

                    formData.append('requesterName', requesterName);
                    let day = requestDay.substring(0,4) + '-'+requestDay.substring(4,6) + '-'+requestDay.substring(6,8);
                    formData.append('requestDay', day);
                    formData.append('birth', requesterJumin.substring(0,6));
                    let gender = requesterJumin.substring(6,7);
                    gender = (gender === '1' || '3' || '5') ? '남' : '여';
                    console.log("gender is ::: ",gender);
                    formData.append('gender', gender);
                    formData.append('age', _util.calculateInsAge(requesterJumin.substring(0,6)));
                    formData.append('requesterCell', requesterCell);
                    formData.append('validDay', validDay);
                    let marketing = marketingYN === 'Y' ? '동의' : '비동의';
                    formData.append('maketingYn', marketing);
                }

                if ( bpk === 2 ){


                    join_alirm_msg = kakaAlim.valueupmap_join_info(kakaoObject);
                    formData.append('requesterName', requesterName);
                    let day = requestDay.substring(0,4) + '.'+requestDay.substring(4,6) + '.'+requestDay.substring(6,8);
                    formData.append('requestDay', day);
                    formData.append('birth', requesterJumin.substring(0,6));
                    formData.append('age', _util.calculateInsAge(requesterJumin.substring(0,6)));
                    let gender = requesterJumin.substring(6,7);
                    gender = (gender === '1' || '3' || '5') ? '남' : '여';
                    formData.append('gender', gender);
                    formData.append('requesterCell', requesterCell);
                    formData.append('appointDT1st', '');
                    formData.append('appointDT2nd', '');
                    formData.append('requesterEmail', requesterEmail);
                    let marketing = marketingYN === 'Y' ? '동의' : '비동의';
                    formData.append('maketingYn', marketing);

                    let gubun = 'valuemap';
                    let dataObject = {
                        name : requesterName,
                    }
                    let sendEmail = 'newbiz@simg.kr';
                    let receiveEmail = requesterEmail;
                    let subject = '[밸류맵 회원 대상] 화재보험 상담 신청 관련 안내 메일';
                    let cc = '';
                    let attachments = [{filename : '임대차보증금법률비용보장보험안내서.pdf', path : 'https://insurance-info.simg.kr/%EC%9E%84%EB%8C%80%EC%B0%A8%EB%B3%B4%EC%A6%9D%EA%B8%88%EB%B2%95%EB%A5%A0%EB%B9%84%EC%9A%A9%EB%B3%B4%EC%9E%A5%EB%B3%B4%ED%97%98%20%EC%95%88%EB%82%B4%EC%84%9C.pdf'},{filename : '화재보험 상품 및 가입 신청 안내.pdf', path : 'https://insurance-info.simg.kr/%ED%99%94%EC%9E%AC%EB%B3%B4%ED%97%98%20%EC%83%81%ED%92%88%20%EB%B0%8F%20%EA%B0%80%EC%9E%85%20%EC%8B%A0%EC%B2%AD%20%EC%95%88%EB%82%B4.pdf'} ];
                    apiUtil.mailHook(gubun, dataObject,sendEmail , receiveEmail, subject, cc, attachments);
                }
                apiUtil.googleSheetInsert(formData, bpk).then(res => {
                    console.log('google Result is :::: ', res);
                });

                // console.log(join_alirm_msg);
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

                    msg = msg.replace(/'/g, "["); // 작은따음표 치환
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
                        ", '" + "joinInfo" + "'" +
                        ");";
                    console.log("msgSaveQuery : ", msgSaveQuery);

                    _mysqlUtil.mysql_proc_exec(msgSaveQuery, apiKey).then(function(result){
                        console.log('msgSaveResult : ',result)


                    });

                });

                //슬랙 전송
                let name = '';
                if(bpk === 1) name = '마이체크업';
                if(bpk === 2) name = '벨류맵';
                let userInfo = requesterJumin.substring(0,6)+'-'+requesterJumin.substring(6,7);

                let messageSlack = '```\n';
                messageSlack += `${name}가입자안내\n`
                messageSlack += `이름 : ${requesterName}\n`
                messageSlack += `고객정보 : ${userInfo}\n`
                messageSlack += `전화번호 : ${requesterCell}\n`
                messageSlack += `플랫폼 : ${name}\n`
                messageSlack += '```';

                let slackData = {
                    "channel": "#접수실적_밸류_마이",
                    "username": `${name}가입알림봇`,
                    "text": messageSlack,
                    //"icon_emoji": ":ghost:"
                };

                slackWebHook(slackData)
                    .then(() => {
                        console.log('slack Success');
                    }).catch((error) => {
                    console.log(error);
                });

            });




        }

    });

});


router.post("/prod"+"/reservation", function(req, res){
    let apiKey =  req.get('X-API-SECRET');
    let routerName = "/prod/api1001";
    console.log(req.body);

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
    let toDay = req.body.toDay;
    let fromDay = req.body.fromDay;
    let access = req.body.access;
    let cmpk = req.body.cmpk;

    let query = `UPDATE salesInsur SET appointDT1st = '${toDay}', appointDT2nd='${fromDay}', saleStatus =${11}, creatID='${access}', updateDt=CURRENT_DATE WHERE cmpk = ${cmpk}`;


    _mysqlUtil.mysql_proc_exec(query, apiKey).then(function(result){
        if(result.affectedRows > 0){
            res.json({code : 'Ok'});
        }else {
            res.json({code : 'No'});
        }
    });
});


router.post("/prod"+"/claimRequest", async function(req, res){
    let apiKey =  req.get('X-API-SECRET');
    let routerName = "/prod/claimRequest";


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
        let bpk = _util.platformBpkCheck(apiKey);
        let cName = req.body.name;
        let cCell = (req.body.phone).replaceAll('-', '');
        let addr1 = req.body.address;


        let query = `CALL claim('${bpk}','${cName}','${cCell}','${addr1}')`;

        console.log("query is :::::: ", query);
        _mysqlUtil.mysql_proc_exec(query, apiKey).then(function (result) {
            console.log("result ::::: ", result);
            let d = result[0][0];
            if (d.code === '200') {
                let msgText = `안녕하세요. \nSIMG 보험대리점입니다.\n사고접수가 정상적으로 되었습니다. \n영업일 기준 2~3일 안에 고객님께 연락드리도록 하겠습니다.\n감사합니다.`;

                let messageSlack = '```\n';
                messageSlack += `${cName} 임대차 소송보험 사고접수 안내\n`
                messageSlack += `이름 : ${cName}\n`
                messageSlack += `전화번호 : ${cCell}\n`
                messageSlack += `건물 소재지 : ${addr1}\n`
                messageSlack += '```';

                let slackData = {
                    "channel": "#simg_운영",
                    "username": `밸류맵 임대차 소송 보험 사고 접수 알림봇`,
                    "text": messageSlack,
                };

                slackWebHook(slackData)
                    .then(() => {
                        console.log('slack Success');
                    }).catch((error) => {
                    console.log(error);
                });

                let gubun = 'C'; // 서비스 구분
                let sendCell = "16700470"
                console.log("문자 발송 : ", gubun, bpk, msgText, cCell);
                msgService.send("msgsend", req.body, sendCell, cCell, msgText).then(function(result){

                    msgService.dataSave(apiKey, sendCell, cCell, msgText);
                })
            }
            return res.json(d);
        });
    }catch(e){
        console.error('ERROR : ',error)
        console.log('__________________ERROR__________________')
        let response = {code: '500', message: '서버에러'}
        console.log('response : ', response)

        return res.json(response);
    }
});


router.get("/prod"+"/getData", function(req, res){
    let bpk = req.query.bpk;
    let apiKey =  req.get('X-API-SECRET');
    let today = _util.getTimeyymmddhhmmss('day').substring(0,8);

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


    let query = `select 
                         cmpk
                         ,cName
                         ,CAST(aes_decrypt(unhex(cJumin),'jumin23456@#$%^') as char) as cJumin
                         ,CAST(aes_decrypt(unhex(cCell),'cell23456@#$%^') as char) as cCell
                         ,age
                         ,bpk
    from clientMaster where bpk = ${bpk} AND useYNull = 'Y' AND DATE_FORMAT(createdYMD, '%Y%m%d') = CURRENT_DATE`;

    console.log("query is ::::::: " + query);

    _mysqlUtil.mysql_proc_exec(query, apiKey).then(function(result){
        let d = result;
        console.log(result);
        res.json(d);
    });
});

router.get("/prod"+"/getToday", function(req, res){
    let today = req.query.today;
    let apiKey =  req.get('X-API-SECRET');
    let job = 'day';
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


    let query = `CALL getData('${job}', ${today})`;

    console.log("query is ::::::: " + query);

    _mysqlUtil.mysql_proc_exec(query, apiKey).then(function(result){
        console.log('mysql result is : ', result);
        let d = result;
        console.log('d is : ', d);
        res.json(d);

    });
});

router.post("/prod"+"/userInfo", function(req, res){
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
    let ivKey = keyInfo.iv;

    let client = req.body.client;
    let cName =  req.body.cName;

    client = _util.promiDecModule(encKey, ivKey, client);
    cName = _util.promiDecModule(encKey, ivKey, cName);

    data = {
        cmpk : client,
        name : cName
    };

    res.json(data);
});

router.post("/prod"+"/searchData", function(req, res){
    let bpk = req.body.bpk;
    let cmpk = req.body.cmpk;
    let cCell = req.body.cCell;
    let cName = req.body.cName;
    let params = req.body;
    let apiKey =  req.get('X-API-SECRET');
    let today = _util.getTimeyymmddhhmmss('day').substring(0,8);


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
    let ivKey = keyInfo.iv;

    let query = mybatisMapper.getStatement('search', 'searchUser', params, {language: 'sql', indent: '  '});

    console.log("query is ::::::: " + query);

    _mysqlUtil.mysql_proc_exec(query, apiKey).then(function(result){
        console.log('mysql result is : ', result);
        let d = result;
        console.log('d is : ', d);
        if(d.length > 0){
            for(let i = 0; i<d.length; i++){
                d[i].url = _util.promiEncModule(encKey, ivKey, d[i].cmpk.toString());
            }
        }
        res.json(d);

    });
});

let today = _util.getTimeyymmddhhmmss('day').substring(0,6);
let dirName = 'mycheckup'+_util.getTimeyymmddhhmmss('day').substring(0,6);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 요청이 올 때마다 고유한 디렉토리 경로 생성
        const uploadDirectory = path.join(__dirname, '../uploads/', dirName); // 파일 이름을 사용하여 디렉토리 경로 생성

        // 디렉토리 존재 유무 확인
        fs.access(uploadDirectory, fs.constants.F_OK, (err) => {
            if (err) {
                fs.mkdirSync(uploadDirectory, { recursive: true });
            }
            console.log('디렉토리가 존재합니다.');
        });

        // 생성된 디렉토리로 파일 저장
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post("/prod"+"/createPdf", upload.array('images', 99), (req, res)=> {
    try {
        // 이미지 파일은 req.file에서, 텍스트 값은 req.body에서 얻을 수 있습니다.
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No images uploaded.' });
        }
        const imagePaths = req.files.map((file) => file.path);
        const param = req.body;

        addTextAndImageToPDF(param);

        // 추가적인 로직 구현 가능

        res.json({ success: true });
    } catch (error) {
        console.log(error)
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post("/prod"+"/sign", upload.single('sign', 1), (req, res)=> {
    try {
        // 이미지 파일은 req.file에서, 텍스트 값은 req.body에서 얻을 수 있습니다.
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded.' });
        }

        const imagePath = req.file.path;
        res.json({ status : 200 , signName :  imagePath});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 쏘카 단체 상해 접수
router.post("/dev"+"/insuRequest",uploadS3Image, async (req, res) => {
    let request_data = req.body;
    let routerName = "/prod/insuRequest";
    console.log("============================================================");
    console.log('request_data_json is : ',request_data);
    console.log("============================================================")
    let today = _util.getTimeyymmddhhmmss('dash');
    console.log("__________________API CALL", today, "ROUTER : ", 'api1001');


    // 로그쌓는 부분~
    let logResult = await service.logSave(req);

    console.log("LogResult is ::::: ", logResult);

    try {
        let saveResult = await service.reqeustInsu(req);
        let name = req.body.name;
        let today = _util.getTimeyymmddhhmmss('day').substring(0,8);
        let cCell = req.body.cell
        console.log("saveResult ::::::::",saveResult);

        // pdf 생성, //cmpk, clientName, insurGap, bpk
        let pdfResult = await _util.insuPdfSet(request_data ,saveResult.rpk);
        /*if(saveResult !== ''){
            let msgText = '[SIMG] 쏘카 단체상해보험 접수 안내 \n';
            msgText += `안녕하세요, ${name}님!\n현대해상화재보험 대리점 SIMG입니다.\n\n`;
            msgText += `아래 정보로 보험금 청구 신청이 완료되었습니다.\n제출해 주신 서류를 검토한 후 보험사 청구 접수를 진행하겠습니다. 만일 보완이 필요한 경우 담당자가 확인차 연락드릴 수도 있습니다.\n\n`;
            msgText += `▣ 보험금 청구 신청 정보\n- 접수일자: ${today}\n\n`;
            msgText += `▣ 안내사항\n※ 보험금 청구 관련 기타 궁금한 사항이 있으시면 고객센터로 문의 바랍니다.\n   ▷ SIMG 고객센터\n - 전화 상담 : 1877-3006 (평일 09시~18시, 점심시간 11시30분~13시)\n\n감사합니다.\nSIMG 드림`;


            let gubun = 'C'; // 서비스 구분
            let sendCell = "16700470"
            let apiKey =  req.get('X-API-SECRET');
            let bpk = _util.platformBpkCheck(apiKey);

            console.log("문자 발송 : ", gubun, bpk, msgText, cCell);
            msgService.send("msgsend", req.body, sendCell, cCell, msgText).then(function(result){

                msgService.dataSave(apiKey, sendCell, cCell, msgText);
            })
        }*/
        res.json(saveResult);
    } catch (error) {
        console.error('ERROR : ',error)
        console.log('__________________ERROR__________________')

        let response = {code: '500', message: '서버에러'}
        console.log('response : ', response)


        return res.json(response);
    }
});

module.exports = router;
