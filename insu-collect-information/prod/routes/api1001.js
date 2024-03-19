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
    /* 확인용 */
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


            let clientPath = "/" + cmpk; //
            // 생성된 고객 정보 가져오기
            let q = "select date_format(createdYMD, '%Y%m') as insertDay ,concat(date_format(date_add(createdYMD, interval 1 day), '%Y-%m-%d'), ' 00:00:00 ~ ', date_format(date_add(date_add(createdYMD, interval 1 year), interval -1 day), '%Y-%m-%d'), ' 24:00:00') as insurGap, a.* from clientMaster a where useYNull = 'Y' and bpk = '" + bpk + "' and cmpk = " + cmpk + ";"
            _mysqlUtil.mysql_proc_exec(q, apiKey).then(function(result){
                console.log('result is : ',result[0].cName);
                console.log('result is : ',result[0].insurGap);
                let insertDay = result[0].insertDay;

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
                if ( bpk == '1'){
                    join_alirm_msg = kakaAlim.mycheckup_join_info(kakaoObject);
                }

                if ( bpk == '2' ){
                    join_alirm_msg = kakaAlim.valueupmap_join_info(kakaoObject);
                }



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

    let query = `UPDATE salesInsur SET appointDT1st = '${toDay}', appointDT2nd='${fromDay}', saleStatus =${11}, creatID='${access}', updateDt=CURRENT_DATE WHERE cmpk = 1000000093`;


    _mysqlUtil.mysql_proc_exec(query, apiKey).then(function(result){
         if(result.affectedRows > 0){
             res.json({code : 'Ok'});
         }else {
             res.json({code : 'No'});
         }
     });
});


router.get("/prod"+"/getData", function(req, res){
    let bpk = req.query.bpk;
    let apiKey =  req.get('X-API-SECRET');
    let today = _util.getTimeyymmddhhmmss('day').substring(0,8);

    console.log(today);
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


    let query = `select * from clientMaster where bpk = ${bpk} AND useYNull = 'Y' AND DATE_FORMAT(createdYMD, '%Y%m%d') = '${today}'`;

    console.log("query is ::::::: " + query);

    _mysqlUtil.mysql_proc_exec(query, apiKey).then(function(result){
        let d = result;
        console.log(result);
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

    console.log(today);
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

    let query = mybatisMapper.getStatement('search', 'searchUser', params, {language: 'sql', indent: '  '});

    console.log("query is ::::::: " + query);

    _mysqlUtil.mysql_proc_exec(query, apiKey).then(function(result){
        console.log('mysql result is : ', result);
        let d = result;
        console.log('d is : ', d);
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

module.exports = router;
