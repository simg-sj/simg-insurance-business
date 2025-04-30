const _mysqlUtil = require("../server/lib/_sql_util");
const apiLib = require("../server/lib/_api_lib");




module.exports = {
    /** sendCell 1877-3006 고정 **/
    send : async function(gubun, dataObject, sendCell, receiveCell, msg){
        console.log("문자 전송 시작 : ", gubun);
        sendCell = "18773006";
        let mode = "N"; // 테스트일경우, N


        let sendData = {
            "receiver": receiveCell,
            "msg": msg,
            "testmode_yn": mode
        };

        return new Promise(function (resolve, reject) {

            apiLib.sendAligoSms(sendData).then(function(data){
                console.log('RESPONSE :', data.receive);
                if(data.receive.message=='success'){
                    console.log("문자전송성공")
                    resolve(data);
                }else{
                    console.log("문자전송실패")
                    reject(new Error())
                }
            });
        });



    },
    dataSave: function(apiKey, sendCell, receiveCell, msg){
        return new Promise(function (resolve, reject) {
            let query = `CALL msg_manager('S','','','${receiveCell}','${sendCell}','${msg}','','','','','','','','','','')`;

            _mysqlUtil.mysql_proc_exec(query, apiKey).then(function(response){
                resolve(response);
            });

        });

    },

    msgSet : function(bpk, step){
        let msg = '';
        console.log('bpk is ', bpk);
        console.log('step is ', step);
        if(bpk === 6){
            if(step === 'res'){
                msg = '안녕하세요, 피트인입니다. \n' +
                    '\n' +
                    `${request_data.dName}님! ‘EV 배터리 케어서비스’ 가입상담 신청 접수가 완료되었습니다. \n`+
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

            }
        }
        console.log("msgis :::",msg);
        return msg;

    }

}
