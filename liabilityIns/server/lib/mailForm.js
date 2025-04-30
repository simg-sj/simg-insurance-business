const util = require('./_util');





module.exports = {
    getForms : function(gubun, dataObject) {
        console.log('type is ::: ', gubun);
        let message = '';


        let stepForm = {
                insuMail : `
                   <html lang="en">
                  <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                  <title>행사주최자 보험 접수 안내</title>
                </head>
                <body>
                <div style="width: 600px; margin: 0 auto">
                  <div style="color: #000000; font-weight: bold; font-size: 22px">
                    접수 정보
                    <hr size="3px" color="#000" />
                  </div>
                  <table style="width: 100%">
                    <tbody>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">담당자성명</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.cName}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">담당자 전화번호</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.cCell}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">담당자 이메일</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.cMail}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">사업자 번호</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.bNo}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">업체명</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.bName}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">행사일자</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.eventFrom} ~ ${dataObject.eventTo}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">행사인원</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.personnel}명</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">행사횟수</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.eventCount}번</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">특이사항</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.etc}</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
                </body>
              </html>
            `
            };


        return stepForm[gubun];
    }
}
