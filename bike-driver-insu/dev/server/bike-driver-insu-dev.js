var createError = require('http-errors');
var express = require('express');
var path = require('path');
var path = require('path');
// var cookieParser = require('cookie-parser');
var bodyParser  = require("body-parser");
var logger = require('morgan');
var joinCheckMsg = require('../routes/sendMsg'); // 인증번호 router
var join = require('../routes/join');


var app = express();
var router = express.Router();

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../client'))); // client
/**
 * express 4.16 이상부터는 bodyParser 를 지원하지 않음.
 * 4.16버전 이상부터는 express 내부에 bodyParser 가 포함되어 있음.
 *

 // app.use(bodyParser({limit: '50mb'}));  // pdf body 용량문제 해결
 // app.use(bodyParser.urlencoded({extended: true}));
 // app.use(bodyParser.json());
 * package.json 파일을 열어서 express 버전을 확인 후, 4.16이상이라면 아래와 같이 해야함.
 **/
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(express({limit: '50mb'}));
app.use(bodyParser({limit: '50mb'}));  // pdf body 용량문제 해결
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build'))); // service

app.get("/", (req, res) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Date: Date.now()
  });
  res.sendFile(path.join(__dirname, "../client/build", "/index.html"));
});

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

app.use('/api/v1', joinCheckMsg);
app.use('/api/v1', join);
// app.use('/', router);

var port = 20202;
app.listen(port, function() {
  console.log('connection for Server' + port);

});
