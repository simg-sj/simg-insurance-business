var express = require('express');
var path = require('path');
var bodyParser  = require("body-parser");
var logger = require('morgan');

var app = express();


var router = express.Router();
app.use(logger('dev'));

app.use(bodyParser({limit: '50mb'}));  // pdf body 용량문제 해결
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '../client/insuRequest/build'))); // service


app.get("/", (req, res) => {
    res.set({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Date: Date.now()
    });

    console.log(__dirname);
    res.sendFile(path.join(__dirname, "../client/insuRequest/build", "/index.html"));

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

app.use('/', router);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/insurRequest/build/index.html'));
});

var port = 20103
app.listen(port, function() {
    console.log('connection for Server' + port);


});

