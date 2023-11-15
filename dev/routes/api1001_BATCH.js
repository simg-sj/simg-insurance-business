const _util = require('../server/lib/_util');
const apiUtil = require('../server/lib/_api_lib');
const express = require('express');
const router = express.Router();



router.get("/dev"+"/api1001_b", function(req, res){
    res.send('SIMG OPEN API 1001 BATCH DEV ROUTER');
});












module.exports = router;