const express = require('express');
const router = express.Router();
// const mysqlUtil = require('../server/lib/_sql_util');
const apiUtil = require('../server/lib/_api_lib');
const _util = require('../server/lib/_util');


/**
 *  인증번호 문자 ROUTER
 *  *가입페이지 인증번호 문자
 *  ROUTER URL :
 */


router.post("/check" + "/sms", function(req, res){

    var request_data = req.body;
    // console.log("request_data :: ", request_data);
    // console.log('test log, find new data', req.body.data);
    var gubun = req.body.gubun;
    let today = _util.getTimeyymmddhhmmss('dash');
    console.log("__________________API CALL", today, "ROUTER : ", 'sns_manager');
    // console.log("APIKEY__ : ", apiKey);
    // console.log("GUBUN__ : ", gubun);
    console.log("BODY__ : ", request_data);
    // console.log("HEADERS__ : ", req.headers);
    console.log("PROTOCOL: ", req.get('x-forwarded-proto'));
    console.log("REMOTE IP : ", req.get('x-forwarded-for'));
    console.log("ORIGIN : ", req.get('origin'));
    console.log("HOST : ", req.headers.host);
    console.log("AGENT : ", req.get('User-Agent'));
    console.log("CONTENT-TYPE : ", req.get('content-typ e'));


    console.log('SMS SEND!!');
    let ranNum = request_data.code;
    let msg = "본인 인증 번호는 [ " + ranNum + " ] 입니다. ";
    let mode = "N";

    let sendData = {
        "receiver": request_data.cell,
        "msg": msg,
        "testmode_yn": mode
    };


    apiUtil.sendAligoSms(sendData).then(function(data){

        console.log('SEND MSG RESPONSE :', data);
        // console.log('RESPONSE_SEND :', data[0].sendD);
        // let bizInfo = _util.promiBizCheck(apiKey);
        // let job = 'RS';
        // let bpk = bizInfo.bpk;
        let dpk = "0";
        let dCell = request_data.cell;
        // console.log("bpk :: ", bpk);
        let dName = "";
        let dDambo = "";
        let dCarNum = "";
        let pState = "";

        let d = data.receive;
        let d2 = data.sendD;

        // let re = d2.receiver.split('=');
        let recev = d2.receiver;

        /*
        // 아직 DB 안들어가있어서 ~
        // let me = d2.message.split('=');
        let messa = d2.msg;
        let job = 'S';
        let spk = '0';
        let result_code = d.result_code;
        let message = d.message;
        let msgId = d.msg_id;
        let successCnt = d.success_cnt;
        let errorCnt = '';
        let msgType = 'join_auth_msg';
        let receiver = recev;
        let msg = messa;
        let testmode_yn =  'N';
        let page = '1';
        let npp = '9999';
        let fromDay = '';
        let toDay = '';
        let searchGbn = '';
        let searchVal = '';

        let log_request_data = '';
        if(typeof message==='object')
        {
            log_request_data = JSON.stringify(message);
        }
        // let msg = log_request_data;
        let fileDay = _util.getTimeyymmddhhmmss('dash');

        let q = "CALL sendCtrl(" +
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
            ", '" + "baemin_rent_planagree" + "'" +
            ");";



        console.log(q);
        // return;
        var result = mysqlUtil.mysql_proc_exec(q, apiKey).then(function(result){
            // res.json(result)
            // console.log('MYSQL RESULT : ', result[0]);
            let d = result[0][0];
            console.log("d :::: " , d);
            let resData  ={
                rCnt : d.rCnt,
                spk : d.spk,
                receiver : d.receiver,
                testmode : d.testmode
            };

            res.json(resData);

        });
        */
        res.json('ok'); // 일단 ok 로 반환

    });

});


module.exports = router;