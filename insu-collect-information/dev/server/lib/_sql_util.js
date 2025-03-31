/**
 * 작성자 : 유종태
 * 작성일 : 2020.05.18
 * 내용 :
 * mysql_proc_exec DB 접속용
 * msg_mysql_proc_exec MSG 데이터
 * log_exec Log 용
 *
 *
 */
var mysql = require("mysql");
var Config = require('../config/_config.js');
var Con = new Config();

var _util = require("../lib/_util");

module.exports = {

    mysql_proc_exec: function(query, apiKey){

        console.log("check apikey : ", apiKey);
        var schema = _util.getDbAccessInfo(apiKey);
        console.log("DB-ACCESS-INFO : ", schema);
        var dbConnection = mysql.createPool(Con[schema]);


        return new Promise(function (resolve, reject) {


            dbConnection.getConnection(function (err, connection) {  //.getConnection 메소드 err와 connection 한경우 두가지 내부콜백함수

                if (err) {
                    console.log(err);
                }

                connection.query(query, function (err, result) {  //query를 던짐

                    var error = false;  // 에러가 없다면 false
                    if (err) {
                        error = true;  // 에러가 있다면 true
                        console.log(err);  //console창에 error값 출력
                        //console.log(result);

                    }
                    resolve(result);
                    // res.status(200).json(result);


                    connection.release();

                });
            });
        });
    },
    makeQueryParameter : function(array){
        let returnValue = "(";

        // ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?

        array.forEach(function(i, idx, array){
            if (idx === array.length - 1){
                returnValue +="?";
            }else{
                returnValue +="?,";
            }

        });

        returnValue += ");";

        return returnValue;

    },
    new_mysql_proc_exec: function(type, query, value){ // 신규방법 / 나중에 이걸로 대체해야하고 mysql_proc_exec 로 진행되게 해야함


        // console.log(type, query, value);
        this.escapeQueryString(type, query, value)

        return new Promise(function (resolve, reject) {

            let con = Con[type];
            var dbConnection = mysql.createPool(con);
            // console.log(con);
            // console.log(schema);
            dbConnection.getConnection(function (err, connection) {  //.getConnection 메소드 err와 connection 한경우 두가지 내부콜백함수
                if (err) {
                    console.log(err);  //console창에 error값 출력
                    resolve(err);
                    return
                }
                // console.log(`All Connections ${dbConnection._allConnections.length}`);
                // console.log(`Acquiring Connections ${dbConnection._acquiringConnections.length}`);
                // console.log(`Free Connections ${dbConnection._freeConnections.length}`);
                // console.log(`Queue Connections ${dbConnection._connectionQueue.length}`);
                // console.log(`connecting to db with id: ${connection.threadId}`);


                connection.query(query, value, function (err, result) {  //query를 던짐

                    var error = false;  // 에러가 없다면 false
                    if (err) {
                        error = true;  // 에러가 있다면 true
                        console.log(err);  //console창에 error값 출력
                        //console.log(result);


                    }
                    resolve(result);
                    // res.status(200).json(result);
                    connection.destroy();
                    connection.release();

                });
            });

            // dbConnection.end();
            // dbConnection.release();




        });
    },
    escapeQueryString : function(type, query, value){
        //   console.log(type);
        // console.log(query);
        // console.log(value);
        let queryHeader = query.split("(");
        // console.log(queryHeader[0]);
        let valuesString = ""
        value.forEach(   function(i, idx, array){
            if (idx === array.length - 1){
                valuesString += "'"+i+"'";
            }else{
                valuesString += "'"+i+"',";
            }
        });

        let consoleSwitch = "ON";
        let finalQuery =   queryHeader[0] + "(" + valuesString +")";

        let searchString = "mail_manager";
        let found = queryHeader[0].includes(searchString);
        if(found){
            consoleSwitch = "off";
        }
        console.log(found);
        if(consoleSwitch=="ON"){
            console.log("QUERY : ", finalQuery);
        }else{
            console.log("QUERY OFF : ", searchString);
        }





    },
    mysql_proc_exec_multi: function (query, values, apiKey ){
        return new Promise(function (resolve, reject) {

            var schema = _util.getDbAccessInfo(apiKey);
            // console.log(schema);
            var dbConnection = mysql.createPool(Con[schema]);



            dbConnection.getConnection(function (err, connection) {  //.getConnection 메소드 err와 connection 한경우 두가지 내부콜백함수

                if (err) {
                    console.log(err);
                }

                connection.query(query, [values],function (err, result) {  //query를 던짐

                    var error = false;  // 에러가 없다면 false
                    if (err) {
                        error = true;  // 에러가 있다면 true
                        console.log(err);  //console창에 error값 출력
                        //console.log(result);

                    }
                    resolve(result);
                    // res.status(200).json(result);


                    connection.release();

                });
            });
        });

    },
    msg_mysql_proc_exec: function(query){
        let _this = this;

        return new Promise(function (resolve, reject) {
            var msgDbConnection  = mysql.createPool(Con.msg_config);
            msgDbConnection.getConnection(function (err, connection) {  //.getConnection 메소드 err와 connection 한경우 두가지 내부콜백함수

                if (err) {
                    console.log(err);
                }

                connection.query(query, function (err, result) {  //query를 던짐

                    var error = false;  // 에러가 없다면 false
                    if (err) {
                        error = true;  // 에러가 있다면 true
                        console.log(err);  //console창에 error값 출력
                        //console.log(result);

                    }
                    resolve(result);
                    // res.status(200).json(result);


                    connection.release();

                });
            });
        });
    },


};
