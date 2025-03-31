var express = require('express');
var path = require('path');
var bodyParser  = require("body-parser");
var logger = require('morgan');
var fs = require('fs');
const _mysqlUtil = require('./lib/sql_util');
const groupCms = require('../routes/groupCms');

let app = express();
let router = express.Router();
app.use(logger('dev'));

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: false}));
app.use(bodyParser.json());
var allowCORS = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //*,
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, XMLHttpRequest, api_key, X-API-SECRET');
    (req.method === 'OPTIONS') ?
        // res.send(200) :
        res.sendStatus(200) :
        next();
};
app.use(allowCORS); // localhost 에서 개발할 때 이걸 열어주지 않으면 들어올 수 없다



app.get("/", (req, res) => {
    res.set({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Date: Date.now()
    });
    res.sendFile(path.join(__dirname, "../client/valuemap/build", "/index.html"));
});


// 클라이언트로부터 PDF를 요청하는 엔드포인트
app.get('/get-pdf', (req, res) => {
    let cmpk = req.query.key;
    let today = req.query.today;
    today = today.replaceAll("'","");
    let fileName = today+'_'+cmpk+'.pdf';

    // PDF 파일의 경로
    const pdfPath = path.join(__dirname, '../uploads/',today,cmpk,fileName);
    console.log("pdfPath :::: " + pdfPath);
    // 파일을 읽어서 스트림으로 전송
    const stream = fs.createReadStream(pdfPath);
    stream.pipe(res);
});


app.use(express.static(path.join(__dirname, '../client/valuemap/build'))); // service


app.use('/cms/group', groupCms);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/valuemap/build", "/index.html"));
});





var port = 20107;
app.listen(port, function() {
    console.log('connection for Server' + port);

});
