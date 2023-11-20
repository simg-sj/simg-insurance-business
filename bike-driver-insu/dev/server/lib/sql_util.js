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
var Config = require('../config/_config');
var Con = new Config();
var dbConnection = mysql.createPool(Con.baemin_config_prod);
var msgDbConnection  = mysql.createPool(Con.msg_config);

module.exports = {

    mysql_proc_exec: function(query){
        let _this = this;

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
    mysql_proc_exec_multi: function (query, values ){
        return new Promise(function (resolve, reject) {

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
    log_exec: function(query, res, req, router_name, type, businessDay){

        //console.log("router_name : " + router_name);
        //모두저장
        //로그저장.
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth()+1;
        let day = d.getDate();
        let hour = d.getHours();
        let min = d.getMinutes();
        let sec = d.getSeconds();

        var apiKey =  req.get('X-API-SECRET');
        let apiCode = "BDL"+year+month+day+hour+min;

        // console.log("REMOTE IP : ", req.get('x-forwarded-for'));
        var remote_ip = req.connection.remoteAddress;
        remote_ip = remote_ip.substr(7,remote_ip.length);
        remote_ip = req.get('x-forwarded-for');
        var myIp = networkInterfaces.eth0[0].address;


        // if(upk==undefined) {
        //     upk = 10000002;
        // }

        var bDay = businessDay;
        if(!bDay){
            bDay = _util.prototype.toDate();
        }
        if(type !="rawData"){
            // query = query.split("call ").join("");
            // query = query.split("(").join("/");
            // query = query.split(")").join("/");

            //query = query.replace(/\{/gi, "");
            //query = query.replace(/\}/gi, "");
            query = query.replace(/\"/gi, "'");
            //query = query.replace(/\'/g, ""); //&apos;
            query = query.replace(/\'/g,"''"); //&apos;
        }else{
            //rawData 이제 저장하지 않음 2020.04.08
            query = 'EMPTY'
        }

        // console.log('LOG TYPE : ', type);
        // console.log('LOG REQUEST DATA  : ', query);

        var save_query = "CALL __logS(" +
            " '" + apiKey + "'" +
            ",'" + apiCode + "'" +
            ",'" + type + "'" +
            ",'" + router_name + "'" +
            ",'" + query + "'" +
            ",'" + remote_ip + "'" +
            ",'" + bDay + "'" +
            ")";

        // console.log('LOG QUERY : ', save_query);

        //fileUpload는 저장 안함.
        if(router_name=='fileUpload') {
            return;
        }

        // console.log("LOG QUERY : " + save_query);
        dbConnection.getConnection(function (err, connection) {

            if (err) console.log("err" + err);

            connection.query(save_query, function(err, result) {

                connection.release();
                console.log("Message : Mysql DB log save Success !", 'LOG TYPE : ', type);

            });


        });
    }

};
