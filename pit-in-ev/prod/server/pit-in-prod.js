var express = require('express');
var path = require('path');
var bodyParser  = require("body-parser");
var logger = require('morgan');
var fs = require('fs');
var api1001 = require('../routes/api1001');
const _mysqlUtil = require('./lib/sql_util');

let app = express();
let router = express.Router();
app.use(logger('dev'));

app.use(bodyParser({limit: '50mb'}));  // pdf body 용량문제 해결
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var allowCORS = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //*,
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, XMLHttpRequest, api_key, X-API-SECRET,x-access-token');
    (req.method === 'OPTIONS') ?
        // res.send(200) :
        res.sendStatus(200) :
        next();
};
app.use(allowCORS); // localhost 에서 개발할 때 이걸 열어주지 않으면 들어올 수 없다

app.use(express.static(path.join(__dirname, '../client/build'))); // service


let checkIp = function(req, res, next) {
    let clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("Client IP Address:", clientIP);
    let job = 'new'
    let apiKey = '40078030-F15D-11EE-8CAD-550F9CAFDA95';
    let query = `CALL userStatistics('${job}','${clientIP}', 6)`;

    _mysqlUtil.mysql_proc_exec(query,apiKey).then(function(result){
        //     // console.log('mysql result is : ', result);
        console.log('mysql result[0][0] is : ', result);
        let d = result[0][0];
        console.log('d is : ', d);
        console.log('code : ', d.code);

        //res.json(d);
    });
    next();
};


app.get("/", checkIp, (req, res) => {
    res.set({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Date: Date.now()
    });
    res.sendFile(path.join(__dirname, "../client/build", "/index.html"));
});

app.get("*", checkIp, (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "/index.html"));
});









// 클라이언트로부터 PDF를 요청하는 엔드포인트
app.get('/get-pdf', (req, res) => {
    // PDF 파일의 경로
    const pdfPath = path.join(__dirname, './lib/보험약관_신한 EV배터리 교체비용보상보험.pdf');
    console.log("pdfPath :::: " + pdfPath);
    // 파일을 읽어서 스트림으로 전송
    const stream = fs.createReadStream(pdfPath);
    stream.pipe(res);
});







app.use('/api/v1', api1001);



var port = 42520;
app.listen(port, function() {
    console.log('connection for Server' + port);
});
