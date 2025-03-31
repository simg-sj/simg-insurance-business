const _util = require('../server/lib/_util');
const apiUtil = require('../server/lib/_api_lib');
const express = require('express');
const router = express.Router();
const fs = require('fs');
/* DB CONFIG */
const Config = require('../server/config/_config');
const Con = new Config();
/* mysql util*/
const _mysqlUtil = require('../server/lib/sql_util');
/*const crypto = require('crypto');*/
const multer = require('multer');
const path = require('path');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['../xml/userInfo.xml']);
const kakaAlim = require('../server/lib/_kakaoAlim');
const {slackWebHook} = require("../server/lib/_api_lib");
const msgService = require('../service/msgService');
const service = require('../service/insuService');
const cmsService = require('../service/cmsService');
/* AWS 파일 업로드 */
const { uploadS3Image } = require('../server/lib/fileUpload');

router.get("/", function(req, res){
    res.send('SIMG OPEN API GROUP-ACCIDENT CMS ROUTER');
});




// 단체 상해 업체 조회
router.post("/api"+"/biz", async (req, res) => {
    let request_data = req.body;
    let routerName = "/cms/biz";
    console.log("============================================================");
    console.log('request_data_json is : ',request_data);
    console.log("============================================================")
    let today = _util.getTimeyymmddhhmmss('dash');
    console.log("__________________API CALL", today, "ROUTER : ", 'groupCms');

    try {
        let bizResult = await service.requestBiz(req);
        console.log("bizResult ::::::::",bizResult);
        res.json(bizResult);
    } catch (error) {
        console.error('ERROR : ',error)
        console.log('__________________ERROR__________________')

        let response = {code: '500', message: '서버에러'}
        console.log('response : ', response)


        return res.json(response);
    }
});


//단체 상해 접수 조회
router.post("/api"+"/insu"+"/insuRequest", async (req, res) => {
    let request_data = req.body;
    let routerName = "/insu/insuRequest";
    console.log("============================================================");
    console.log('request_data_json is : ',request_data);
    console.log("============================================================")
    let today = _util.getTimeyymmddhhmmss('dash');
    console.log("__________________API CALL", today, "ROUTER : ", 'groupCms');

    try {
        let insuResult = await cmsService.getInsu(req);

        return res.json(insuResult);
    } catch (error) {
        console.error('ERROR : ',error)
        console.log('__________________ERROR__________________')

        let response = {code: '500', message: '서버에러'}
        console.log('response : ', response)


        return res.json(response);
    }
});



module.exports = router;
