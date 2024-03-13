/*var createError = require('http-errors');*/
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var bodyParser  = require("body-parser");
var logger = require('morgan');
var api1001 = require('../routes/api1001');
var api1001_BATCH = require('../routes/api1001_BATCH')
var app = express();


var router = express.Router();
app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

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

// app.use(express.static(path.join(__dirname, '../client/build'))); // service



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

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

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use('/api/v1', api1001);
app.use('/api/v1', api1001_BATCH);
app.use('/', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});



var port = 20102
app.listen(port, function() {
  console.log('connection for Server' + port);

});

