var express = require('express');
var path = require('path');
var bodyParser  = require("body-parser");
var logger = require('morgan');
var fs = require('fs');
const multer = require('multer'); // ✅ 추가
const _mysqlUtil = require('./lib/sql_util');
const api1001 = require('../routes/api1001');

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
        res.sendStatus(200) :
        next();
};
app.use(allowCORS); // ✅ CORS 설정

// ✅ 정적 파일 서빙 (HTML 파일)
app.get("/", (req, res) => {
    res.set({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Date: Date.now()
    });
    res.sendFile(path.join(__dirname, "../client/gimpo/dist", "/index.html"));
});

// ✅ 클라이언트로부터 PDF 요청 처리
app.get('/get-pdf', (req, res) => {
    let cmpk = req.query.key;
    let today = req.query.today;
    today = today.replaceAll("'","");
    let fileName = today + '_' + cmpk + '.pdf';

    const pdfPath = path.join(__dirname, '../uploads/', today, cmpk, fileName);
    console.log("pdfPath :::: " + pdfPath);

    // 파일 존재 여부 확인 후 전송
    fs.access(pdfPath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ success: false, message: "파일을 찾을 수 없습니다." });
        }
        const stream = fs.createReadStream(pdfPath);
        stream.pipe(res);
    });
});

// ✅ 정적 파일 서빙 (React/Vue 앱)
app.use(express.static(path.join(__dirname, '../client/gimpo/dist/')));

// ✅ API 라우트 등록 (반드시 에러 핸들러 위에 있어야 함)
app.use('/api/prod', api1001);

// ✅ 404 에러 처리 (API 요청 시)
app.use('/api/*', (req, res) => {
    res.status(404).json({ success: false, message: "해당 API를 찾을 수 없습니다." });
});

// ✅ 전역 에러 핸들러
app.use((err, req, res, next) => {
    console.error('Global Error:', err);

    // ✅ 이미 응답이 전송되었으면, next() 호출 중지
    if (res.headersSent) {
        return;
    }

    // ✅ MulterError 처리 (파일 업로드 관련)
    if (err instanceof multer.MulterError) {
        let errorMessage = "파일 업로드 오류가 발생했습니다.";

        if (err.code === "LIMIT_FILE_SIZE") {
            errorMessage = "파일 크기가 100MB를 초과했습니다.";
        } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
            errorMessage = "예상치 못한 파일 형식입니다.";
        }

        console.log(errorMessage);
        return res.status(400).json({
            success: false,
            message: errorMessage,
            errorCode: err.code
        });
    }

    // ✅ 일반적인 서버 오류 처리
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "서버에서 알 수 없는 오류가 발생했습니다.",
        errorCode: err.errorCode || "UNKNOWN_ERROR"
    });
});

// ✅ React/Vue 앱을 위한 catch-all 처리
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/gimpo/dist/", "/index.html"));
});

// ✅ 서버 실행
var port = 20227;
app.listen(port, function() {
    console.log('Server running on port ' + port);
});
