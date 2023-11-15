var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser  = require("body-parser");
var _util = require("./lib/_util");
const api1001 = require("../routes/api1001");
const api1001_BATCH = require("../routes/api1001_BATCH");

var app = express();
var router = express.Router();
let port = 20102; // vi /etc/nginx/sites-available/insurance-open-api-dev.conf

var allowCORS = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //*,
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, XMLHttpRequest, api_key, X-API-SECRET');
  (req.method === 'OPTIONS') ?
      // res.send(200) :
      res.sendStatus(200) :
      next();
};


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

app.use(bodyParser({limit: '50mb'}));  // pdf body 용량문제 해결
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);
app.use('/api/v1', api1001);
app.use('/api/v1', api1001_BATCH);
// app.use('/users', usersRouter);

app.use(allowCORS);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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

app.listen(port, function(){
  let NOW = _util.toDate();
  console.log('connection for Server : ', port, ' is dev server');
  console.log("SERVER LOAD TIME : ", NOW);
});

// module.exports = app;
