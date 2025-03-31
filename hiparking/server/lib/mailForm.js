const util = require('./_util');





module.exports = {
    getForms : function(gubun, dataObject) {
        console.log('type is ::: ', gubun);
        let message = '';

        let videoDiv;
        for(let i = 0; i < dataObject.videoUrl.length; i ++) {
            videoDiv += `<tr>
                <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">링크${i + 1}</th>
                <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;"><a
                    href=${dataObject.videoUrl[i].location} download=${dataObject.datetime + '_'+dataObject.carNum +'_사고 접수 영상_'+i}>사고 접수 동영상 링크${i + 1}</a></td>
            </tr>`;
        }
        let stepForm = {
            insuMail: `
                   <html lang="en">
                  <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                  <title>트루파킹 사고접수 안내</title>
                </head>
                <body>
                <div style="width: 600px; margin: 0 auto">
                  <div style="color: #000000; font-weight: bold; font-size: 22px">
                    사고접수 정보
                    <hr size="3px" color="#000" />
                  </div>
                  <table style="width: 100%">
                    <tbody>
                    <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">트루파킹 결재 여부</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.approvalYN}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">주차장명</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.parking}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">피해자 이름</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.name}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">피해자 연락처</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.phone}</td>
                      </tr>
                       <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">담당자 이름</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.inCargeName}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">담당자 연락처</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.inCargePhone}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">차종</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.car}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">차량번호</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.carNum}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">차량색상</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.color}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">사고내용</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.contents}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">사고일시</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.datetime}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">기타내용</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.etc}</td>
                      </tr>`
                +
                    videoDiv
                +
                    `</tbody>
                  </table>
                 </div>
                </body>
              </html>`
            };


        return stepForm[gubun];
    }
}
