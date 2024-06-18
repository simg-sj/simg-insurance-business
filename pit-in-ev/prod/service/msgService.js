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

    }

}
