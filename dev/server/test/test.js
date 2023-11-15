
const fileUtil = require("../server/lib/_fileUtil");
const _util = require("../server/lib/_util");
const _apiUtil= require("../server/lib/api_lib");
const _dateUtil = require("../server/lib/_dateUtils");
const _mysqlUtil = require('../server/lib/sql_util');
const sConfig = require('../server/_SFTP_config');
const sCon = new sConfig();
var unirest = require('unirest');

// fileUtil.FILE_MAKE();

// 사고전문 요청 테스트
// baeminAccidentRequest();

//파일읽기
// fileRead();

//파일 만들기
// fileMake();


// 날짜 체크
// dateCheck();


// sftpCheck();


// sftpAccess();


//심사넣기
// bikeTester();

function baeminAccidentRequest(){
    let sendData =
        {
            "apiDriverId": "610000003",
            "drivingId": "20210715-21071501395346447820-001",
            "investigateDateTime": _util.TimeIsoConvert("20210715155052"),
        };

    console.log(sendData);


    _apiUtil.sendBaeminBikeResult(sendData).then(function(result) {

        console.log(result);
    });
}


function fileRead(){
    var path = "./UPLOAD/BMN.00001.20210514.RCV1";
    fileUtil.FILE_READ(path).then(function(result){
        console.log(result)
    }).catch(function(e){
        console.log(e);
    })


}


function fileMake(){
    var path = "./UPLOAD/TEST/2021/1/07/12";

    var pathDri = path.split("/");
    var pathString = "";
    pathDri.forEach(function(element){
        // console.log(element + "/");
        pathString += element + "/";
        console.log(pathString);
        fileUtil.FILE_DIRECTORY_CHECK(pathString);
    });

    var fileName = "BMN.00001.20210717.RCV";
    var fullPath = path + "/" +fileName;
    var msg = "테스트데이터";
    fileUtil.FILE_MAKE(fileName, fullPath, "utf8",msg);




}


function dateCheck(){

    var t1 = _dateUtil.GET_DATE("YYYYMMDDHHMMSS", "NONE",0);
    console.log("YYYYMMDDHHMMSS : ", t1);

    var t2 = _dateUtil.GET_DATE("SEMI", "NONE",0);
    console.log("SEMI : ", t2);

    var t3 = _dateUtil.GET_DATE("YYMMDD", "NONE",0);
    console.log("YYMMDD : ", t3);

    var t4 = _dateUtil.GET_DATE("HHMMSS", "NONE",0);
    console.log("HHMMSS : ", t4);




    var g1 = _dateUtil.GET_DATE("YYYYMMDDHHMMSS", "YEAR",1);
    console.log("GAB YEAR : ", g1);

    var g2 = _dateUtil.GET_DATE("YYYYMMDDHHMMSS", "YEAR",-1);
    console.log("GAB YEAR : ", g2);




}


function sftpCheck(){

    var REMOTEPATH = "/recv/BMN.00007.20201021.RCV";
    var DOWNPATH = "./DOWNLOAD/";
    var fileName = "test.txt";
    DOWNPATH = DOWNPATH + fileName;
    var config = sCon.DB_TEST;
    // fileUtil.SFTP_FILE_READ_DOWN(config, REMOTEPATH, DOWNPATH); //  파일읽어서 로컬에 다운로드

    // fileUtil.SFTP_FILE_READ_DIR(config, "./recv/"); // 디렉토리의 파일목록읽기


    fileUtil.SFTP_FILE_UPLOAD("./DOWNLOAD/test.txt",config, "/recv/SIMG.test.txt");
}


function bikeTester(){


    let query = "select *, \n" +
        "                convert(aes_decrypt( unhex(a.dCell),'cell23456@#$%^') USING utf8) cell, \n" +
        "                cast(aes_decrypt( unhex(a.dJumin),'jumin23456@#$%^') as char) socialNo\n" +
        " from driverMaster a where dCarNum like '%대구%'";
    console.log("QUERY", query);

    _mysqlUtil.mysql_proc_exec(query).then(function(result){
        // console.log(result);

        result.forEach(function (element) {


            var obj = {
                gubun: "planagree",
                name: element.dName,
                cell1: element.cell.substring(0,3),
                cell2: element.cell.substring(3,7),
                cell3: element.cell.substring(7,11),
                jumin1: element.socialNo.substring(0,6),
                jumin2: element.socialNo.substring(6,13),
                carType : '401',
                carNum: element.dCarNum,
                dambo: '',
                jachaMangi: element.dMangi,
                soyuja: 'bonin', // 본인만됨
                relation:'101',
                soyujaName: '',
                soyujaCell1: '',
                soyujaCell2: '',
                soyujaCell3: '',
                soyujaJumin1: '',
                soyujaJumin2: ''
            };
        console.log(obj);
            // sendUnderwite(obj);

        });




    });




}
function sendUnderwite(obj){
    var url = 'https://connect-bike-dev.simginsu.net/api/v1/flex/planagree';


    unirest.post(url)
        .timeout(3000)
        .headers(
            {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-SECRET': '67E86360-DEFC-11EB-9003-8F90302A9C99',
                // 'X-API-SECRET':'l5Ygh39iO216VHphUoO3HRYqHpzHAC9SpU/u2+g1l3g='
            })
        .type('json')
        .json(obj)
        .end(function (response) {
            console.log('from : ', response.body);
            console.log('send ', obj);


        });
}

// var check ="9101061183448";
var check ="8002165260293";
var ch = validRegistrationNumber(check, "non"); // true 면 통과, false 면 거절
console.log(ch);
// 주민/외국인 등록번호 검사
function validRegistrationNumber( socialNo, type ) {
    // 하이픈제외
    socialNo = socialNo.split("-").join('');
    // 13자리 숫자인지 확인
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
};

