const util = require('./_util');





module.exports = {
    getForms : function(gubun, dataObject) {
        console.log('type is ::: ', gubun);
        let message = '';


        let stepForm = {
                accession : `
                   <html lang="en">
                  <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                  <title>더존 풍수해보험 가입안내</title>
                </head>
                <body>
                <div style="width: 600px; margin: 0 auto">
                  <div style="display: flex; justify-content: center">
                    <img
                      alt="풍수해보험 가입안내"
                      src="https://douzone.simg.kr/풍수해_메일_상단_가입안내.png"
                      style="width: fit-content"
                    />
                  </div>
                  <div style="font-size: 18px; line-height: 25px; padding: 30px 0">
                    안녕하세요 ${dataObject.cName} 고객님 <br />
                    풍수해보험을 신청 해주셔서 감사합니다. <br />
                    고객님께서 신청해주신 정보와 함께 가입 절차를 안내드리오니 확인
                    부탁드립니다
                  </div>
                  <div style="color: #000000; font-weight: bold; font-size: 22px">
                    사업장 정보
                    <hr size="3px" color="#000" />
                  </div>
                  <table style="width: 100%">
                    <tbody>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">사업자명</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.bName}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">사업자번호</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.bNo}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">사업장주소</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.address} ${dataObject.buildName}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">우편번호</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.post}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">건물용도</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.useType}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">지하유무</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.undergroundYn}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">사업장면적</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.area} ㎡</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">콘크리트빌딩유무</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.buildType}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    style="
                      color: #000000;
                      font-weight: bold;
                      font-size: 22px;
                      margin-top: 30px;
                    "
                  >
                    가입자 정보
                    <hr size="3px" color="#000" />
                  </div>
                  <table style="width: 100%">
                    <tbody>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">성함</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.cName}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">연락처</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.cCell}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">이메일</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.cMail}</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">계좌이체시 희망하는 은행</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">${dataObject.cBank} 은행</td>
                      </tr>
                    </tbody>
                  </table>
                  <img
                  alt="풍수해보험 가입절차"
                  src="https://douzone.simg.kr/풍수해_메일_가입절차.png"
                  style="width: fit-content; margin-top: 50px;"
                />
                <img
                alt="풍수해보험 안내문"
                src="https://douzone.simg.kr/풍수해_메일_안내문.png"
                style="width: fit-content;"
              />
              <img
                alt="풍수해보험 가입안내처"
                src="https://douzone.simg.kr/풍수해_메일_안내처가입.png"
                style="width: fit-content; margin-bottom: 20px;"
              />
              </div>
                </body>
              </html>
            `,
            application : `
              <html lang="ko">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                  <title>더존 풍수해보험 청약서 안내</title>
                </head>
                <body>
                  <div style="width: 600px; margin: 0 auto">
                  <div style="display: flex; justify-content: center">
                    <img
                      alt="풍수해보험 가입안내"
                      src="https://douzone.simg.kr/풍수해_메일_상단_청약서.png"
                      style="width: fit-content"
                    />
                  </div>
                  <div style="font-size: 18px; line-height: 25px; padding: 30px 0">
                    안녕하세요 ${dataObject.cName} 고객님 <br />
                    신청해주신 정보로 청약서 설계를 완료하여 서류 전달드립니다. <br />
                    첨부되어있는 파일을 확인하신 후 아래 내용을 참고하여 서류 작성 부탁드립니다.
                  </div>
                  <div style="color: #000000; font-weight: bold; font-size: 22px">
                    가입 정보
                    <hr size="3px" color="#000" />
                  </div>
                  <table style="width: 100%">
                    <tbody>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">청약번호</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">+청약번호+</td>
                      </tr>3
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">보험료</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">+보험료+</td>
                      </tr>
                      <tr>
                        <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">보험기간</th>
                        <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">+보험기간+</td>
                      </tr>
                    </tbody>
                  </table>
                  <img
                  alt="풍수해보험 가입절차"
                  src="https://douzone.simg.kr/풍수해_메일_서류결제.png"
                  style="width: fit-content; margin-top: 50px;"
                />
              <img
                alt="풍수해보험 가입안내처"
                src="https://douzone.simg.kr/풍수해_메일_안내처가입.png"
                style="width: fit-content; margin-bottom: 20px;"
              />
              </div>
            </div>
                </body>
              </html>`,
            certificate : `
                        <html lang="ko">
                          <head>
                            <meta charset="UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                            <title>더존 풍수해보험 가입완료 안내</title>
                          </head>
                          <body>
                          <div style="width: 600px; margin: 0 auto">
                            <div style="display: flex; justify-content: center">
                              <img
                                alt="풍수해보험 가입안내"
                                src="https://douzone.simg.kr/풍수해_메일_상단_가입완료.png"
                                style="width: fit-content"
                              />
                            </div>
                            <div style="font-size: 18px; line-height: 25px; padding: 30px 0">
                              안녕하세요 ${dataObject.cName} 고객님 <br />
                              풍수해 보험 가입이 완료되었습니다. <br />
                              증권서류는 첨부파일로 함께 전달드리오니 확인 부탁드립니다. <br />
                              <br / >
                              <div style="font-weight: 500;">*보험기간은 총 1년으로, 만기 1달 전 갱신 안내 메일이 발송 됩니다.</div>
                            </div>
                            <div style="color: #000000; font-weight: bold; font-size: 22px">
                              계약 정보
                              <hr size="3px" color="#000" />
                            </div>
                            <table style="width: 100%">
                              <tbody>
                                <tr>
                                  <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">증권번호</th>
                                  <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">+증권번호+</td>
                                </tr>
                                <tr>
                                  <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">보험료</th>
                                  <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">+보험료+</td>
                                </tr>
                                <tr>
                                  <th style="width: 200px; text-align: left; border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">보험기간</th>
                                  <td style="border-bottom: 2px solid #E6E6E6; padding: 13px 20px;">+보험기간+</td>
                                </tr>
                              </tbody>
                            </table>
                            <div style="font-size: 18px; line-height: 25px; padding: 30px 0">
                                이용해주셔서 감사드립니다.
                              </div>
                        <img
                          alt="풍수해보험 가입안내처"
                          src="https://douzone.simg.kr/풍수해_메일_안내처가입.png"
                          style="width: fit-content; margin-bottom: 20px;"
                        />
                        </div>
                          </body>
                        </html>

            `
            };


        return stepForm[gubun];
    }
}
