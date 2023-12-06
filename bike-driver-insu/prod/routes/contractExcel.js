const express = require('express');
const router = express.Router();
const mysqlUtil = require('../server/lib/_sql_util');
const apiUtil = require('../server/lib/_api_lib');
const _util = require('../server/lib/_util');
const crypto = require("crypto");
const excel = require('exceljs');
const path = require('path');

const apiKey = "3C4FDCEA-0715-4D45-B548-BCDB8F1A7750";
router.get('/contractExcel', async function (req, res) {
    try {
        const buffer = await generateExcel();

        const fileName = '바이크 운전자 보험 계약 요청 명단.xlsx'; // 기본 파일명
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent(fileName)}`);
        res.setHeader('Content-Length', buffer.length);
        res.end(buffer);
    } catch (error) {
        console.error('Error generating Excel:', error);
        res.status(500).send('Internal Server Error');
    }
});


async function generateExcel() {
    try {
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');
        worksheet.addRow(['No','이름', '전화번호', '주민등록번호', '보험타입', '상품코드', '요청일자', '요청횟수']);
        let query = "call clientDataExcel('CL', '');";

        const result = await mysqlUtil.mysql_proc_exec(query, apiKey);
        let d = result[0]
        // mysqlUtil.mysql_proc_exec(query, apiKey).then(function(result){
        //     console.log(d);
        //     console.log(d.length);

            // let d = result[0];
            for(let i = 0; i < d.length; i++){
                // console.log(i, '번쨰 : ', d[i]);
                let data = d[i];
                worksheet.addRow([data.No, data.cName, data.cCell, data.cJumin, data.insuType, data.insuPcode, data.requestDay, data.requestCnt])

            }
        // });


        // return;





        // worksheet.addRow(['John Doe', 30]);
        // worksheet.addRow(['Jane Doe', 25]);

        const buffer = await workbook.xlsx.writeBuffer();

        return buffer;
    } catch (error) {
        console.error('Error generating Excel:', error);
        throw error;
    }
}



module.exports = router;