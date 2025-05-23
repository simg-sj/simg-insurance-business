/**
 * 작성자 : 유종태
 * 작성일 :2020.06.04
 * 내용 :
 *
 * 01. toLocaleString  : 세자리 숫자마다 , 부여
 * 02. getTime : 날짜 YYYYMMDD 로 생성 인자값으로 숫자 -1, 0, 1  들어갈 수 있고 그에따라 오늘날짜 기준으로 계산함
 * 02. zero_plus : 날짜에서 그냥 1 -> 01 로 변환
 * 03. lpad : 왼쪽 문자열 채우기  ( str : 원 문자열, padLen : 최대 채우고자 하는 길이, padStr : 채우고자하는 문자(char))
 * 04. rpad : 우측 문자열 채우기
 * 05. rpadKr : 우측 문자열 채우기 ( 한글 3바이트임을 고려하여 )
 * 06. getByteLength : 바이트 길이 구하기 ( 한글 3바이트임을 고려하여 )
 *
 charByteSize(ch) : 한글자에 대한 byte를 계산합니다.
 getByteLength(s) : 입력된 글자 전체의 byte를 계산해서 알려줍니다.
 cutByteLength(s) : 원하는 byte 만큼 글자를 잘라서 반환합니다.


 * **/

var unirest = require('unirest');
const crypto = require('crypto');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
var pkcs7 = require('pkcs7-padding');
var beautify = require("json-beautify");
let fs = require('fs');
/*var MCrypt = require('mcrypt').MCrypt;*/
var Accesskey = require('./_accesskey');
const path = require("path");
var Access = new Accesskey();
// var accArray = Access.acc_test;
var accArray = Access.acc_test;
var dayjs = require('dayjs');

module.exports = {

    toLocaleString: function(num){
        if (num == null) {
            return 0;
        }
        let parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    },
    getTimeyymmddhhmmss: function(format){
        var v = new Date().toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
        v = new Date(v);
        v = new Date(); // error 20210507

        var year = v.getFullYear();
        var month = v.getMonth()+1;
        month = this.zero_plus(month);

        var day = v.getDate();
        day = this.zero_plus(day);

        var hh = v.getHours();
        hh = this.zero_plus(hh);

        var mm = v.getMinutes();
        var mm = this.zero_plus(mm);

        var ss = v.getSeconds();
        ss = this.zero_plus(ss);

        var currentTime =  String(year)+"-"+String(month)+"-"+String(day)+" "+String(hh)+":"+String(mm)+":"+String(ss);
        if(format=='dash'){
            currentTime =  String(year)+"-"+String(month)+"-"+String(day)+" "+String(hh)+":"+String(mm)+":"+String(ss);
        }
        if(format=='no'){
            currentTime =  String(year)+String(month)+String(day)+String(hh)+String(mm)+String(ss);
        }
        if(format=='file'){
            currentTime =  String(year)+String(month)+String(day)+String(hh)+String(mm); // 오류가 생길지 몰라서 시간까지로만 자르자~ 같은시간데에 업로드하면 업데이트 됨..
        }
        if(format=='day'){
            currentTime = String(year)+String(month)+String(day);
        }
        if(format=='YYYYmm'){
            currentTime = String(year)+String(month);
        }

        // console.log('DATE TIME CALL : ', currentTime);


        return currentTime;
    },
    getTime: function(gapTime){
    console.log(gapTime);

        var today = new Date(); // 2014-03-01
        // console.log("TODAY IS : ", today);

        var diffDay = new Date();
        diffDay.setDate(today.getDate() + gapTime);
        // console.log("SET DATE IS : ", diffDay);

        var v = diffDay;

        var year = v.getFullYear();
        var month = v.getMonth()+1;
        var day = v.getDate();
        var hh = v.getHours();
        var mm = v.getMinutes();
        var ss = v.getSeconds();
        month = this.zero_plus(month);
        day = this.zero_plus(day);
        hh = this.zero_plus(hh);
        mm = this.zero_plus(mm);
        ss = this.zero_plus(ss);



        // var result = year+"-"+month+"-"+day+" "+hh+":"+mm+":"+ss;
        var result = String(year)+String(month)+String(day);
        // console.log('y', year);
        // console.log('m', month);
        // console.log('d', day);
        // console.log('h', hh);
        // console.log('m', mm);
        // console.log('s', ss);
        var currentTime =  String(year)+"-"+String(month)+"-"+String(day)+" "+String(hh)+":"+String(mm)+":"+String(ss);
        // console.log('DATE TIME CALL : ', currentTime);
        console.log('CHECK TIME : ', result);
        return result;
    },
    promiBizCheck: function (key){

        let returnValue = null;
        accArray.forEach(function (element) {
            // console.log("APIKEY", element.apikey);
            // console.log("PLATFORM", key);

            if(element.apikey == key) {
                // console.log(element)
                returnValue = element;
            }

        })

        return returnValue

    },
    platformBpkCheck: function (key){

        let returnValue = 0;
        accArray.forEach(function (element) {
            console.log("APIKEY : ", element.apikey);
            console.log("PLATFORM : ", key);

            if(element.apikey == key) {
                console.log(element)
                returnValue = element.bpk;
            }

        })

        return returnValue

    },
    getDbAccessInfo : function(key){
        let returnValue = null;
        accArray.forEach(function (element) {

            if(element.apikey == key) {

                returnValue = element.dbKey;
            }

        })

        return returnValue
    },
    getTimeContract: function(gapTime){
        var v = new Date().toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
        v = new Date(v);

        var gapCal = gapTime*18*60*60*1000;
        var gap = new Date(v.getTime()+gapCal).toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
        gap = new Date(gap);
        v.setTime(gap);

        var year = v.getFullYear();
        var month = v.getMonth()+1;
        month = this.zero_plus(month);

        var day = v.getDate();
        day = this.zero_plus(day);

        var hh = v.getHours();
        hh = this.zero_plus(hh);

        var mm = v.getMinutes();
        var mm = this.zero_plus(mm);

        var ss = v.getSeconds();
        ss = this.zero_plus(ss);

        // var result = year+"-"+month+"-"+day+" "+hh+":"+mm+":"+ss;
        var result = year+month+day;
        var currentTime =  String(year)+String(month)+String(day)+String(hh)+String(mm)+String(ss);
        console.log('DATE TIME CALL : ', currentTime);
        // console.log('CHECK TIME : ', result);
        return currentTime;
    },
    timeAddMin: function(yyyymmddhhssii, num){

        var year = yyyymmddhhssii.substring(0,4);
        var month = yyyymmddhhssii.substring(4,6);
        var day = yyyymmddhhssii.substring(6,8);

        var time = yyyymmddhhssii.substring(8,10);
        var min = yyyymmddhhssii.substring(10,12);
        var sec = yyyymmddhhssii.substring(12,14);

        var format = String(year)+'-'+String(month)+'-'+String(day)+'T'+String(time)+":"+String(min)+":"+String(sec);

        // console.log(format);
        var d = new Date(format).toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});

        d = new Date(d);

        // console.log('BEFORE', d.getFullYear());
        // console.log('BEFORE', d.getMonth()+1);
        // console.log('BEFORE', d.getDate());
        // console.log('BEFORE', d.getHours());
        // console.log('BEFORE', d.getMinutes());
        // console.log('BEFORE', d.getSeconds());

        d.setMinutes(d.getMinutes()+num);
        // console.log('AFTER', d);

        // console.log('AFTER', d.getFullYear());
        // console.log('AFTER', d.getMonth()+1);
        // console.log('AFTER', d.getDate());
        // console.log('AFTER', d.getHours());
        // console.log('AFTER', d.getMinutes());
        // console.log('AFTER', d.getSeconds());

        var ay = this.zero_plus(d.getFullYear().toString());
        var aM = this.zero_plus((d.getMonth()+1).toString());
        var ad = this.zero_plus(d.getDate().toString());
        var at = this.zero_plus(d.getHours().toString());
        var am = this.zero_plus(d.getMinutes().toString());
        var as = this.zero_plus(d.getSeconds().toString());

        var returnVlaue =ay+aM+ad+at+am+as;

        // console.log(returnVlaue);

        return returnVlaue


    },
    timeAddSec: function(yyyymmddhhssii, num){

        var year = yyyymmddhhssii.substring(0,4);
        var month = yyyymmddhhssii.substring(4,6);
        var day = yyyymmddhhssii.substring(6,8);

        var time = yyyymmddhhssii.substring(8,10);
        var min = yyyymmddhhssii.substring(10,12);
        var sec = yyyymmddhhssii.substring(12,14);

        var format = String(year)+'-'+String(month)+'-'+String(day)+'T'+String(time)+":"+String(min)+":"+String(sec);

        // console.log(format);
        var d = new Date(format).toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});

        d = new Date(d);

        // console.log('BEFORE', d.getFullYear());
        // console.log('BEFORE', d.getMonth()+1);
        // console.log('BEFORE', d.getDate());
        // console.log('BEFORE', d.getHours());
        // console.log('BEFORE', d.getMinutes());
        // console.log('BEFORE', d.getSeconds());

        d.setSeconds(d.getSeconds()+num);
        // d.setMinutes(d.getMinutes()+num);
        // console.log('AFTER', d);

        // console.log('AFTER', d.getFullYear());
        // console.log('AFTER', d.getMonth()+1);
        // console.log('AFTER', d.getDate());
        // console.log('AFTER', d.getHours());
        // console.log('AFTER', d.getMinutes());
        // console.log('AFTER', d.getSeconds());

        var ay = this.zero_plus(d.getFullYear().toString());
        var aM = this.zero_plus((d.getMonth()+1).toString());
        var ad = this.zero_plus(d.getDate().toString());
        var at = this.zero_plus(d.getHours().toString());
        var am = this.zero_plus(d.getMinutes().toString());
        var as = this.zero_plus(d.getSeconds().toString());

        var returnVlaue =ay+aM+ad+at+am+as;

        // console.log(returnVlaue);

        return returnVlaue


    },
    toDate : function(){
        var v = new Date();

        var year = v.getFullYear();
        var month = v.getMonth()+1;
        month = this.zero_plus(month);

        var day = v.getDate();
        day = this.zero_plus(day);

        var hh = v.getHours();
        hh = this.zero_plus(hh);

        var mm = v.getMinutes();
        var mm = this.zero_plus(mm);

        var ss = v.getSeconds();
        ss = this.zero_plus(ss);

        var result = String(year)+"-"+String(month)+"-"+String(day)+" "+String(hh)+":"+String(mm)+":"+String(ss);
        return result;
    },
    zero_plus: function(str){
        var result;
        if(str.toString().length==1)
        {
            result = "0"+str;
        }
        else {
            result = str;
        }
        return result;

    },
    lpad: function(str, padLen, padStr){

        if (padStr.length > padLen) {
            console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
            return str;
        }
        str += ""; // 문자로
        padStr += ""; // 문자로
        while (str.length < padLen)
            str = padStr + str;
        str = str.length >= padLen ? str.substring(0, padLen) : str;
        return str;
    },
    rpad: function(str, padLen, padStr) {
        // console.log(str.length);
        if (padStr.length > padLen) {
            console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
            return str + "";
        }
        str += ""; // 문자로
        padStr += ""; // 문자로
        while (str.length < padLen)
            str += padStr;
        str = str.length >= padLen ? str.substring(0, padLen) : str;
        return str;
    },
    rpadKr: function(str, padLen, padStr) {
        // console.log('변환할 한글 ', this.getByteLength(str));


        if(str==''){
            // console.log('예외;')
            while (this.getByteLength(str)< padLen)
                str += padStr;

            // console.log(str);
            return str
        }

        if (padStr.length > padLen) {
            console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
            return str + "";
        }
        str += ""; // 문자로
        padStr += ""; // 문자로
        while (this.getByteLength(str)< padLen)
            str += padStr;

        // console.log('글자수', this.getByteLength(str));
        str = this.getByteLength(str) >= padLen ? str.substring(0, padLen) : str;
        // console.log(str.length);
        // if(str > padLen){
        //     str = str.slice(0,padLen);
        // }

        return str;
    },
    filieMake: function(filePath, fileName, DATA){

        // var sampleData = 'Hello FileSystem';
        var makePath = filePath + fileName;

        fs.writeFile(makePath, DATA, 'utf8', function(err) {
            console.log('비동기적 파일 쓰기 완료');

        });

    },
    getRemainAligoSms: function(data){
        let _this = this;

        return new Promise(function (resolve, reject) {
            console.log('Aligo Lambda AWS SERVICE ~!');
            unirest.get('https://0j8iqqmk2l.execute-api.ap-northeast-2.amazonaws.com/aligo-remain-check-get')
                .headers(
                    {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                .end(function (response) {
                    // console.log('from AWS LAMBDA_CHECK : ', response.body);
                    resolve(response.body);
                });
        });
    },
    callEncModule : function(_key, _data) {
        var desEcb = new MCrypt('rijndael-128', 'ecb');
        desEcb.open(_key);
        var ciphertext = desEcb.encrypt(_data);
        return ciphertext.toString('base64');
    },
    callDecModule : function(_key, _data) {
        var desEcb = new MCrypt('rijndael-128', 'ecb');
        desEcb.open(_key);
        var plaintext = desEcb.decrypt(new Buffer(_data, 'base64'));
        return plaintext.toString();
    },
    promiEncModule: function(key, iv, secret_message){
        secret_message = pkcs7.pad(Buffer.from(secret_message), 16); //Use 32 = 256 bits block sizes

        let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        cipher.setAutoPadding(false);  // pkcs7 default
        let encrypted = cipher.update(secret_message, 'utf-8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted

    },
    promiDecModule: function(key, iv, encrypted){
        console.log(key, iv, encrypted);
        let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        // cipher.setAutoPadding(false);
        let decrypted = decipher.update(encrypted, 'base64', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted
    },

    promiShaDec: function(secret_message){
        return crypto.createHash('sha256').update(secret_message).digest('hex');

    },
    promiShaDec128: function(secret_message){
        return crypto.createHash('sha256').update(secret_message).digest('hex');

    },
    calculateInsAge : function(birth) {
        if(Number(birth.substring(0,1)) >= 1){
            birth = "19"+birth;
        }else {
            birth = '20'+birth;
        }
        const year = birth.substring(0, 4);
        const mth = birth.substring(4, 6);
        const dt = birth.substring(6, 8);
        let today = new Date();

        // 보험나이는 생일에 +1일 -6개월을 하고 계산한 만나이와 동일함
        let birthday = new Date(`${year}-${mth}-${dt}`);
        let insBirthday = birthday;
        insBirthday.setDate(birthday.getDate()+1)
        insBirthday.setMonth(birthday.getMonth()-6);
        const insYr = insBirthday.getFullYear();
        const insMth = insBirthday.getMonth()+1;
        const insDt = insBirthday.getDate();

        let insAge = today.getFullYear() - insYr;

        // 월 비교
        if(insMth > (today.getMonth() + 2)){
            insAge--;
        }
        // 일 비교
        else if(insMth === (today.getMonth() + 1) && insDt > today.getDate()){
            insAge--;
        }

        return insAge.toString();
    },
    timeFilter: function(timetxt){
        // 2020-06-25 10:37:51
        let returnValue = timetxt.trim();

        returnValue = returnValue.replace(/:/g,"");
        returnValue = returnValue.replace(/-/g,"");
        returnValue = returnValue.replace(" ","");

        return returnValue



    },
    dayAdd: function(d, addDay, addHour, addMinute, addSecond){
        let currentDay =  new Date(d);

        var year = currentDay.getFullYear();
        var month = currentDay.getMonth()+1;
        month = this.zero_plus(month);

        var day = currentDay.getDate() + addDay;
        day = this.zero_plus(day);

        var hh = currentDay.getHours() + addHour;
        hh = this.zero_plus(hh);

        var mm = currentDay.getMinutes() + addMinute;
        var mm = this.zero_plus(mm);

        var ss = currentDay.getSeconds() + addSecond;
        ss = this.zero_plus(ss);

        var currentTime =  String(year)+"-"+String(month)+"-"+String(day)+" "+String(hh)+":"+String(mm)+":"+String(ss);
        console.log('DATE TIME CALL : ', currentTime);

        return currentTime;


    },
    byteCalc: function(string){
        var stringByteLength = string.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g,"$&$1$2").length;
        return stringByteLength;
    },
    getByteLength:function ( data ) {
        var len = 0;
        var str = data.substring(0);

        if (str == null) return 0;

        for (var i = 0; i < str.length; i++) {
            var ch = escape(str.charAt(i));

            if (ch.length == 1) len++;
            else if (ch.indexOf("%u") != -1) len += 2;//Db가 한글을 3byte로 인식하여 2->3
            else if (ch.indexOf("%") != -1) len += ch.length / 3;
        }
        return len;

    },
    cutByteLength : function(s, len) {

        if (s == null || s.length == 0) {
            return 0;
        }
        var size = 0;
        var rIndex = s.length;

        for ( var i = 0; i < s.length; i++) {
            size += this.charByteSize(s.charAt(i));
            if( size == len ) {
                rIndex = i + 1;
                break;
            } else if( size > len ) {
                rIndex = i;
                break;
            }
        }

        return s.substring(0, rIndex);
    },
    charByteSize : function(ch) {

        if (ch == null || ch.length == 0) {
            return 0;
        }

        var charCode = ch.charCodeAt(0);

        if (charCode <= 0x00007F) {
            return 1;
        } else if (charCode <= 0x0007FF) {
            return 2;
        } else if (charCode <= 0x00FFFF) {
            return 3;
        } else {
            return 4;
        }
    },
    isoTimeConvert: function(time){

        if(time==null){
            return ""
        }
        let DAT = new Date(time).toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
        DAT = new Date(DAT);
        let dt;



        //safari & IE 예외처리
        if(!DAT.getFullYear()){

            // let d = Date.parse(date);
            var date = time.replace(/([+\-]\d\d)(\d\d)$/, "$1:$2");
            // date = date.replace(/-/g, "/");
            // console.log('safari & IE8', date)
            DAT = new Date(date);


        }

        let year = DAT.getFullYear();
        let month = this.zero_plus(DAT.getMonth() + 1);
        let day = this.zero_plus(DAT.getDate());

        let hours = this.zero_plus(DAT.getHours());
        let minutes = this.zero_plus(DAT.getMinutes());
        let seconds = this.zero_plus(DAT.getSeconds());

        //2020-07-28 23:45:00
        // var formattedTime = String(year) +"-" + String(month) + "-" + String(day) + " " +  String(hours) + ":" + String(minutes) + ":" + String(seconds);

        //20200728234500
        var formattedTime = String(year) + String(month)  + String(day) +  String(hours)+ String(minutes) + String(seconds);


        // console.log(formattedTime);
        // console.log(this.localCurrentTime());
        return formattedTime;
    },
    TimeIsoConvert: function(time){

        let year = time.substring(0,4);
        let month = time.substring(4,6);
        let day = time.substring(6,8);
        let hours = time.substring(8,10);
        let minutes = time.substring(10,12);
        let seconds = time.substring(12,14);


        var formattedTime = String(year) + "-"+String(month) +"-" + String(day) +"T"+  String(hours)+":"+ String(minutes) +":"+ String(seconds)+"+0900";


        // console.log(formattedTime);
        // console.log(this.localCurrentTime());
        return formattedTime;
    },
    TimeMsgValidTime: function(time){

        let year = time.substring(0,4);
        let month = time.substring(4,6);
        let day = time.substring(6,8);
        let hours = time.substring(8,10);
        let minutes = time.substring(10,12);
        let seconds = time.substring(12,14);


        var formattedTime = String(year) + "년 "+String(month) +"월 " + String(day) +"일 "+  String(hours)+"시 "+ String(minutes) +"분 "+ String(seconds)+"초 ";


        // console.log(formattedTime);
        // console.log(this.localCurrentTime());
        return formattedTime;
    },
    apiKeyCheck: function (key){

        let returnValue = false;
        accArray.forEach(function (element) {
            // console.log('APIKEY : ', element.apikey);
            // console.log('CLIENT KEY : ', key);

            if(element.apikey == key) {
                // console.log('CHECK OK');
                returnValue= true;

            }

        });




        return returnValue;



    },
    onlyNumber: function(number){
        var returnValue = number;

        var regex = /[^0-9]/g;				// 숫자가 아닌 문자열을 매칭하는 정규식
        var returnValue = number.replace(regex, "");

        return returnValue
    },
    keyBpk: function (key){

        let returnValue = 0;
        accArray.forEach(function (element) {


            if(element.apikey == key) {
                // console.log('BKE CHECK : ', element.bpk);
                returnValue =  element.bpk
            }

        })

        return returnValue

    },
    keyRbpk: function (key){

        let returnValue = 0;
        accArray.forEach(function (element) {


            if(element.apikey == key) {
                // console.log('BKE CHECK : ', element.bpk);
                returnValue =  element.rbpk
            }

        })

        return returnValue

    },
    encInfo: function (key){

        let returnValue = null;
        accArray.forEach(function (element) {
            // console.log("APIKEY", element.apikey);
            // console.log("PLATFORM", key);

            if(element.apikey == key) {
                // console.log(element);
                returnValue = element
            }

        })

        return returnValue

    },
    minDiff: function(start, end){
        /**
         *
         * 운행시간계산: 30분40초 + 40분30초 => 71분10초 => 분단위 올림하여 72분
         */

        var old = new Date(start);
        var end = new Date(end);
        var gap = end.getTime() - old.getTime();

        var min_gap = gap/1000/60;
        // console.log('min_gap : ', min_gap);
        // min_gap =Math.floor(min_gap);
        // min_gap =Math.min_gap); //올림
        if(gap == NaN){
            return 0
        }else{
            return min_gap
        }

    },
    secDiff: function(start, end){
        /**
         *
         * 운행시간계산: 30분40초 + 40분30초 => 71분10초 => 분단위 올림하여 72분
         */

        var old = new Date(start);
        var end = new Date(end);

        var gap = end.getTime() - old.getTime();

        var sec_gap = gap/1000;

        if(gap == NaN){
            return 0
        }else{
            return sec_gap
        }
        // console.log('sec_gap : ', min_gap);
        // min_gap =Math.floor(min_gap);
        // min_gap =Math.ceil(min_gap); //올림

    },
    rawDatalogfile: function (info, type, pageNumber, bpk ) {

        var d = new Date();
        let yyyy = d.getFullYear();
        let mm = this.zero_plus(d.getMonth() + 1);
        let dd = this.zero_plus(d.getDate());
        let hh = this.zero_plus(d.getHours());
        let MM = this.zero_plus(d.getMinutes());
        let ss = this.zero_plus(d.getSeconds());
        // console.log('request raw data save : test');
        let logDir = '../logs/'+bpk + '/';
        let logDirType = logDir + type;
        let logFile = logDirType + "/" + String(yyyy) +String(mm) + String(dd) + "_" + String(hh) + String(MM) + String(ss) + "_" + pageNumber;
        console.log('logDir');
        console.log('LOG FILE NAME : ', logFile);


        fs.mkdirSync(logDirType, {recursive: true}, (error) => {
            if (error) {
                console.error('an error occurred : ', error);
            } else {
                console.log('LOG Directory is made : ', log);
            }
        });


        let infoLog = beautify(info, null, 2, 100);
        if (!fs.existsSync(logFile + "_request.json")) {
            fs.writeFile(logFile + "_request.json", infoLog, 'utf8', function (err) {
                    if (err) throw err;
                    console.log('complete');
                }
            );
        }
    },
    specialCharEx: function regExp(str){
        var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        //특수문자 검증
        if(reg.test(str)){
            //특수문자 제거후 리턴
            return str.replace(reg, "");
        } else {
            //특수문자가 없으므로 본래 문자 리턴
            return str;
        }
    },
    emptySpace: function(string){
        var returnData ="";
        returnData = string.replace(/ /gi, "");

        return returnData;

    },
    expiredTIme: function(){
        let currentDay =  new Date();

        var year = currentDay.getFullYear();
        var month = currentDay.getMonth()+1;
        month = this.zero_plus(month);

        var day = currentDay.getDate();
        day = this.zero_plus(day);

        var hh = currentDay.getHours();
        hh = this.zero_plus(hh);

        var mm = currentDay.getMinutes();
        var mm = this.zero_plus(mm);

        var ss = currentDay.getSeconds();
        ss = this.zero_plus(ss);

        var currentTime =  String(year)+"년 "+String(month)+"월 "+String(day)+"일 "+"21시";
        // console.log('DATE TIME CALL : ', currentTime);

        return currentTime;


    },
    fixDamboTxt: function(dambo){
        // console.log(dambo);
        let returnValue = '';
        if(dambo =="nojacha"){
            returnValue = "자기차량 담보 미포함";
        }
        else{
            returnValue = "자기차량 담보 포함"
        }

        return returnValue;


    },
    // 주민/외국인 등록번호 검사
    validRegistrationNumber: function( socialNo, type ) {
        // 하이픈제외
        socialNo = socialNo.split("-").join('');
        // 13자리 숫자인지 확인해보자, 아니면 꺼져버려
        if( socialNo.length !== 13 ) return false;

        // 검증값 합계
        var checkSum = 0;
        for(var i=0; i<12; i++) checkSum += ((socialNo.substr(i,1)>>0)*((i%8)+2));

        // 검증
        var modCheckSum = checkSum%11;    // 검증값 합계의 11의 나머지수
        var rrnMatch = (11-(modCheckSum))%10 == socialNo.substr(12,1);    // 주민번호 검증
        var frnMatch = (13-(modCheckSum))%10 == socialNo.substr(12,1);    // 외국인번호 검증

        if( type === 'rrn' ) {
            return rrnMatch;
        }
        else if( type === 'frn' ) {
            return frnMatch;
        }

        // 주민/외국인 여부 상관 없이 등록번호 검사
        return rrnMatch || frnMatch;
    },
    isoTimeConvert: function(time){

        if(time==null || time=="" || time==undefined){
            return ""
        }
        // let DAT = new Date(time).toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
        // DAT = new Date(DAT);
        // let dt;
        let DAT = new Date(time);


        //safari & IE 예외처리
        if(!DAT.getFullYear()){

            // let d = Date.parse(date);
            var date = date.replace(/([+\-]\d\d)(\d\d)$/, "$1:$2");
            // date = date.replace(/-/g, "/");
            // console.log('safari & IE8', date)
            DAT = new Date(date);


        }

        let year = DAT.getFullYear();
        let month = this.zero_plus(DAT.getMonth() + 1);
        let day = this.zero_plus(DAT.getDate());

        let hours = this.zero_plus(DAT.getHours());
        let minutes = this.zero_plus(DAT.getMinutes());
        let seconds = this.zero_plus(DAT.getSeconds());

        //2020-07-28 23:45:00
        // var formattedTime = String(year) +"-" + String(month) + "-" + String(day) + " " +  String(hours) + ":" + String(minutes) + ":" + String(seconds);

        //20200728234500
        var formattedTime = String(year) + String(month)  + String(day) +  String(hours)+ String(minutes) + String(seconds);


        // console.log(formattedTime);
        // console.log(this.localCurrentTime());
        return formattedTime;
    },
    shareBikeBpkCheck: function (key){
        let returnValue = 0;
        accArray.forEach(function (element) {
            // console.log("APIKEY", element.apikey);
            // console.log("PLATFORM", key);

            if(element.apikey == key) {
                // console.log(element)
                returnValue = element.bpk;
            }

        })

        return returnValue
    },
    checkKey: function (key){

        let returnValue = false;
        accArray.forEach(function (element) {
            // console.log("APIKEY", element.apikey);
            // console.log("PLATFORM", key);

            if(element.apikey == key) {
                // console.log(element)
                returnValue = true
            }

        })

        return returnValue

    },
    pdfSet: async function(cmpk, clientName, insurGap, bpk){
        console.log('pdfSetCheck : ', cmpk, clientName, insurGap, bpk);
        /* 저장 경로 : ../uploads/YYYYmm/cmpk/YYYYmm_cmpk.pdf*/

        let basicPath = '../uploads/';
        let infoPath = '';
        let inputFilePath = '';
        let saveDay = this.getTimeyymmddhhmmss('day');
        let pathDay = this.getTimeyymmddhhmmss('YYYYmm');

        /* 이름 위치 설정*/
        let nameX = 0;
        let nameY = 0;

        /* 보험기간 위치 설정 */
        let insurGapX = 0;
        let insurGapY = 0;

        if (bpk == '1'){
            // infoPath = 'mycheckupInfo';
            inputFilePath = "../uploads/mycheckupInfo/mycheckupPolicyInfo.pdf"; // 마이체크업 가입증명서 저장 경로
            nameX = 220;
            nameY = 472;

            insurGapX = 220;
            insurGapY = 528;

        }

        if (bpk == '2'){
            // infoPath = 'valuemapInfo';
            inputFilePath = "../uploads/valuemapInfo/valuemapPolicyInfo.pdf"; // 밸류맵 가입증명서 저장 경로
            nameX = 200;
            nameY = 407;

            insurGapX = 200;
            insurGapY = 462;
        }

        console.log('XY_check', nameX, nameY, insurGapX, insurGapY);





        // let ourputFileFullPath = basicPath+infoPath+'/'+cmpk+'/'+cmpk+'_joinInfo_'+saveDay+'.pdf';
        let ourputFileFullPath = basicPath+pathDay+"/"+cmpk+"/"+pathDay+"_"+cmpk+".pdf";
        console.log('파일 생성 경로 : ', ourputFileFullPath);
        /* 디렉토리 생성 */
        //  /uploads/[Info]  디렉토리가 없다면~ 생성
        if(!fs.existsSync(basicPath+pathDay)){
            fs.mkdirSync(basicPath+pathDay, {recursive:true}, (error)=>{
                if(error){
                    console.error('an error occurred : ', error);
                }else{
                    console.log('Directory is made : ', log);
                }
            })

        }


        // /uploads/valuemapInfo/[cmpk] 디렉토리가 없다면 ~ 생성
        if(!fs.existsSync(basicPath+pathDay + '/' + cmpk)){
            fs.mkdirSync(basicPath+pathDay + '/' + cmpk, {recursive:true}, (error)=>{
                if(error){
                    console.error('an error occurred : ', error);
                }else{
                    console.log('Directory is made : ', log);
                }
            })
        }



        const inputBytes = fs.readFileSync(inputFilePath);
        const pdfDoc = await PDFDocument.load(inputBytes);
        pdfDoc.registerFontkit(fontkit);

        // 폰트 설정
        // const fontBytes = fs.readFileSync(__dirname, './pdfFonts/KakaoBold.ttf');
        // const customFont = await pdfDoc.embedFont(fontBytes);

        const fontPath = path.join(__dirname, 'pdfFonts', 'KakaoBold.ttf');
        const fontBytes = fs.readFileSync(fontPath);
        const customFont = await pdfDoc.embedFont(fontBytes);



        const page1 = pdfDoc.getPages()[0]; // 첫 페이지

        // 피보험자 이름
        page1.drawText( clientName, {
            x: nameX,
            y: nameY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        });

        // 피보험자 보험기간
        page1.drawText( insurGap, {
            x: insurGapX,
            y: insurGapY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        });

        const modifiedBytes = await pdfDoc.save();
        fs.writeFileSync(ourputFileFullPath, modifiedBytes);

        // 파일 생성 후에 파일이 존재하는지 확인하여 성공 메시지 출력
        if (fs.existsSync(ourputFileFullPath)) {
            console.log('PDF 파일이 성공적으로 생성되었습니다.');
        } else {
            console.error('PDF 파일 생성에 실패했습니다.');
        }
    },

    insuPdfSet: async function(data, rpk){
        console.log('pdfSetCheck : ', data.name);
        /* 저장 경로 : ../uploads/YYYYmm/cmpk/YYYYmm_cmpk.pdf*/

        let basicPath = '../uploads/';
        let inputFilePath = "../uploads/socarInfo/보험금청구서_쏘카.pdf";
        let saveDay = this.getTimeyymmddhhmmss('day');
        let pathDay = this.getTimeyymmddhhmmss('YYYYmm');
        let relation = '';

        if(data.type === '01') relation = '본인';
        if(data.type === '02') relation = '배우자';
        if(data.type === '03') relation = '자녀';

        /* 이름 위치 설정*/
        let nameX = 170;
        let nameY = 730;


        /* 주민등록번호 위치 설정 */
        let juminX = 425;
        let juminY = 730;

        /* 전화번호 위치 설정*/
        let cellX = 450;
        let cellY = 580;

        /* 사고일시 설정 */
        let accidentDateX = 105;
        let accidentDateY = 469;

        /* 사고내용 위치 설정*/
        let detailX = 115;
        let detailY = 380;

        /* 은행명 위치 설정*/
        let bankX = 100;
        let bankY = 266;

        /* 계좌번호 위치 설정*/
        let accountX = 250;
        let accountY = 266;

        /* 예금주 위치 설정*/
        let bankOwnerX = 480;
        let bankOwnerY = 266;

        /* 작성일시 위치 설정*/
        let createX = 108;
        let createY = 155;

        /* 청구인 위치 설정*/
        let signNameX = 462;
        let signNameY = 155;

        /* 동의일자 위치 설정*/
        let agreeDateX = 120;
        let agreeDateY = 208;

        /* 동의자 위치 설정*/
        let signName2X = 280;
        let signName2Y = 170


        /* 확인일 위치 설정*/
        let confirmDateX = 400;
        let confirmDateY = 266;


        /* 수익자 위치 설정*/
        let beneficiaryX = 400;
        let beneficiaryY = 240;

        /* 주민등록번호 위치 설정*/
        let jumin2X = 428;
        let jumin2Y = 220;

        /* 관계 위치 설정*/
        let relationX = 428;
        let relationY = 200;

        /* 연락처 위치 설정*/
        let cell2X = 428;
        let cell2Y = 178;














        // let ourputFileFullPath = basicPath+infoPath+'/'+cmpk+'/'+cmpk+'_joinInfo_'+saveDay+'.pdf';
        let ourputFileFullPath = basicPath+pathDay+"/"+rpk+"/"+pathDay+"_"+rpk+".pdf";
        console.log('파일 생성 경로 : ', ourputFileFullPath);
        /* 디렉토리 생성 */
        //  /uploads/[Info]  디렉토리가 없다면~ 생성
        if(!fs.existsSync(basicPath+pathDay)){
            fs.mkdirSync(basicPath+pathDay, {recursive:true}, (error)=>{
                if(error){
                    console.error('an error occurred : ', error);
                }else{
                    console.log('Directory is made : ', log);
                }
            })

        }


        // /uploads/valuemapInfo/[cmpk] 디렉토리가 없다면 ~ 생성
        if(!fs.existsSync(basicPath+pathDay + '/' + rpk)){
            fs.mkdirSync(basicPath+pathDay + '/' + rpk, {recursive:true}, (error)=>{
                if(error){
                    console.error('an error occurred : ', error);
                }else{
                    console.log('Directory is made : ', log);
                }
            })
        }



        const inputBytes = fs.readFileSync(inputFilePath);
        const pdfDoc = await PDFDocument.load(inputBytes);
        pdfDoc.registerFontkit(fontkit);

        // 폰트 설정
        // const fontBytes = fs.readFileSync(__dirname, './pdfFonts/KakaoBold.ttf');
        // const customFont = await pdfDoc.embedFont(fontBytes);

        const fontPath = path.join(__dirname, 'pdfFonts', 'KakaoBold.ttf');
        const fontBytes = fs.readFileSync(fontPath);
        const customFont = await pdfDoc.embedFont(fontBytes);



        const page1 = pdfDoc.getPages()[0]; // 첫 페이지

        // 피보험자 이름
        page1.drawText( data.name, {
            x: nameX,
            y: nameY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        });

        // 피보험자 주민번호
        page1.drawText( data.jumin, {
            x: juminX,
            y: juminY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        });

        // 피보험자 전화번호
        page1.drawText( data.cell, {
            x: cellX,
            y: cellY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        });

        // 사고일시
        page1.drawText( data.accidentDate.substring(0,4)+'       '+data.accidentDate.substring(4,6)+'            '+data.accidentDate.substring(6,8), {
            x: accidentDateX,
            y: accidentDateY,
            font: customFont,
            size: 10,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        });

        // 사고내용
        page1.drawText( data.detail, {
            x: detailX,
            y: detailY,
            font: customFont,
            size: 10,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        });

        // 은행명
        page1.drawText( data.bank, {
            x: bankX,
            y: bankY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        })

        // 계좌번호
        page1.drawText( data.account, {
            x: accountX,
            y: accountY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        });

        // 예금주
        page1.drawText( data.bankOwner, {
            x: bankOwnerX,
            y: bankOwnerY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        });

        // 작성일자
        page1.drawText( saveDay.substring(2,4)+'            '+saveDay.substring(4,6)+'                  '+saveDay.substring(6,8), {
            x: createX,
            y: createY,
            font: customFont,
            size: 10,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        });

        // 청구인
        page1.drawText( data.name + '                ' + data.name, {
            x: signNameX,
            y: signNameY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        })

        /**
         * 다섯번째 페이지 가져오기
         */
        const page5 = pdfDoc.getPages()[4];
        // 동의일자
        page5.drawText( saveDay.substring(0,1)+'      '+saveDay.substring(1,2)+'      '+saveDay.substring(2,3)+'     '+saveDay.substring(3,4)+'             '+saveDay.substring(4,5)+'     '+saveDay.substring(5,6)+'            '+saveDay.substring(6,7)+'     '+saveDay.substring(7,8), {
            x: agreeDateX,
            y: agreeDateY,
            font: customFont,
            size: 22,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        });

        // 청구인
        page5.drawText( data.name+'                                                 '+data.name, {
            x: signName2X,
            y: signName2Y,
            font: customFont,
            size: 16,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        });

        /**
         * 여섯번째 페이지 가져오기
         */
        const page6 = pdfDoc.getPages()[5];
        // 확인일
        page6.drawText( saveDay.substring(0,4)+'            '+saveDay.substring(4,6)+'               '+saveDay.substring(6,8), {
            x: confirmDateX,
            y: confirmDateY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        });

        // 수익자
        page6.drawText( data.name +'                               ' +data.name, {
            x: beneficiaryX,
            y: beneficiaryY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        });

        // 주민등록번호
        page6.drawText( data.jumin, {
            x: jumin2X,
            y: jumin2Y,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        });

        // 관계
        page6.drawText( relation, {
            x: relationX,
            y: relationY,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        });

        // 연락처
        page6.drawText( data.cell, {
            x: cell2X,
            y: cell2Y,
            font: customFont,
            size: 12,
            color: rgb(0, 0, 0), // 텍스트 색상 (검은색)
        });



        const modifiedBytes = await pdfDoc.save();
        fs.writeFileSync(ourputFileFullPath, modifiedBytes);

        // 파일 생성 후에 파일이 존재하는지 확인하여 성공 메시지 출력
        if (fs.existsSync(ourputFileFullPath)) {
            console.log('PDF 파일이 성공적으로 생성되었습니다.');
        } else {
            console.error('PDF 파일 생성에 실패했습니다.');
        }
    }

};
