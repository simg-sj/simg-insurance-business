/*var createError = require('http-errors');*/
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var bodyParser  = require("body-parser");
var logger = require('morgan');
var api1001 = require('../routes/api1001');
var api1001_BATCH = require('../routes/api1001_BATCH')
var app = express();
const groupCms = require('../routes/groupCms');
var router = express.Router();
app.use(logger('dev'));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

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


app.use(express.static(path.join(__dirname, '../client/build'))); // service


app.get("/", (req, res) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Date: Date.now()
  });
  res.sendFile(path.join(__dirname, "build", "/index.html"));
});


app.use('/api/v1', api1001);
app.use('/api/v1', api1001_BATCH);
app.use('/', router);
app.use('/cms/group/', groupCms);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

var port = 20104
app.listen(port, function() {
  console.log('connection for Server' + port);

});

