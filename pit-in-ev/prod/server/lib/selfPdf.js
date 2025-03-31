require('dotenv').config({ path: '../../.env' });
const mysql_util = require('./sql_util');
const _util = require('./_util');
const { addTextAndImageToPDF } = require('./pdf');

async function selfMakePdf() {
    try {
        let param = {
           cmpk: 1000001204,
           filePk: 322,
           cName: '임동무',
           businessType: '01',
           cCell: '01032116203',
           s3Key: 'GENERAL/PitIn/Join/1730880603090_1000001203_SIGN_20241106.png',
           payType: '02',
           carType: '아이오닉 5 EV (롱레인지)',
           carNum: '경기35바5885',
           premiums: '39,000',
           cPayDt : '매월 05일',
            contractDate : '2024-11-07',
            contractYear : '2024-11-08 00:00 ~ 2025-11-08 00:00 (1년)'
        }
        let today = _util.getTimeyymmddhhmmss('day');
        let apiKey = '40078030-F15D-11EE-8CAD-550F9CAFDA95';
        let saved = await addTextAndImageToPDF(param);
        console.log('saved :::' , saved)
        let query = `INSERT INTO file (cmpk, originalname, mimetype, fieldname, contentType,location,type, s3Key, bucket, createdYMD)
                                 VALUES ('${param.cmpk}', '${saved.originalname}', 'application/pdf', 'pdf', 'application/pdf', '${saved.Location}','contract', '${saved.key}', '${saved.Bucket}', '${today}');`
        console.log('regiFiles Query ::: ', query)
        let result = await mysql_util.mysql_proc_exec(query, apiKey)
        console.log('regiFiles result is ::: ', query)
    }catch(e){
        throw e;
        console.log(e);
    }
}



selfMakePdf();
