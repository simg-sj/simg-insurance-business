const util = require('./_util');
module.exports = {
    getForms : function(gubun, dataObject) {
        console.log('type', dataObject.type);
        let param = dataObject;
        let message = '';
        let types = '임직원';
        if(dataObject.type === '02') types = '배우자';
        if(dataObject.type === '03') types = '자녀';

        let date = util.getTimeyymmddhhmmss('dash');
        if(gubun === 'socar-accident'){
             message =  '<!DOCTYPE html>\n' +
                '<html lang="en">\n' +
                '  <head>\n' +
                '    <meta charset="UTF-8" />\n' +
                '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
                '    <meta http-equiv="X-UA-Compatible" content="ie=edge" />\n' +
                '    <title>단체상해 보험 접수</title>\n' +
                '    <link href=”http://fonts.googleapis.com/css?family=Open+Sans”\n' +
                '    rel=”stylesheet” type=”text/css”>\n' +
                '  </head>\n' +
                '  <body>\n' +
                '    <table\n' +
                '      align="center"\n' +
                '      border="0"\n' +
                '      cellpadding="0"\n' +
                '      cellspacing="0"\n' +
                '      width="600"\n' +
                '      style="border-spacing: 0; font-family: Helvetica, sans-serif !important; color:#222;"\n' +
                '    >\n' +
                '      <tr>\n' +
                '        <td align="left" style="padding: 10px 0 20px;">\n' +
                '          <img\n' +
                '            src="https://kickgoing-accident-m.simgbiz.net/imgcloud/SIMG_02.png"\n' +
                '            alt=""\n' +
                '            width="59"\n' +
                '            height="auto"\n' +
                '            style="display: block; margin:0 auto;"\n' +
                '          />\n' +
                '          <!-- <span>SIMG NOTIFICATION</span> -->\n' +
                '        </td>\n' +
                '      </tr>\n' +
                '      <tr>\n' +
                '        <td\n' +
                '          bgcolor="#06c2ac"\n' +
                '          style="padding: 7px 20px 4px; color: #fff; font-weight: bold; font-size: 22px;font-family: Arial, Helvetica, sans-serif !important;"\n' +
                '        >\n' +
                '          단체상해 보험 접수 [ 쏘카 ]\n' +
                '        </td>\n' +
                '      </tr>\n' +
                '      <tr>\n' +
                '        <td\n' +
                '          align="center"\n' +
                '          style="border-spacing: 0; border-style: none; padding: 0;  border: 1px solid #ddd; border-width: 0 1px"\n' +
                '        ></td>\n' +
                '      </tr>\n' +
                '      <tr>\n' +
                '        <td\n' +
                '          align="left"\n' +
                '          style="padding: 10px;border-right: 1px solid #ddd; border-left: 1px solid #ddd; font-size: 12pt;"\n' +
                '        >\n' +
                '          <table class="result-table" style="width:100%;">\n' +
                '            <tr style="background-color: #f1f1f1;">\n' +
                '              <td>구분</td>\n' +
                '              <td id="nameTxt">'+types+'</td>\n' +
                '            </tr>\n';

            if(param.type === '01'){
                console.log('param is :::: ', param);

                message += '            <tr>\n' +
                '              <td>접수자</td>\n' +
                '              <td id="nameTxt">'+param.name+'</td>\n' +
                '            </tr>\n' +
                '            <tr style="background-color: #f1f1f1;">\n' +
                '              <td>이메일</td>\n' +
                '              <td id="damboTxt">'+param.email+'</td>\n' +
                '            </tr>\n' +
                '            <tr style="background-color: #f1f1f1;">\n' +
                '              <td>연락처</td>\n' +
                '              <td id="damboTxt">'+param.cell+'</td>\n' +
                '            </tr>\n';
            }else {
                message += '      <tr>\n' +
                    '              <td>접수자</td>\n' +
                    '              <td id="damboTxt">'+param.reqName+'</td>\n' +
                    '            </tr>\n' +
                    '            <tr style="background-color: #f1f1f1;">\n' +
                    '              <td>이메일</td>\n' +
                    '              <td id="damboTxt">'+param.reqEmail+'</td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '              <td>연락처</td>\n' +
                    '              <td id="requestTxt">'+param.reqCell+'</td>\n' +
                    '            </tr>\n' +
                    '            <tr style="background-color: #f1f1f1;">\n' +
                    '              <td>임직원 성명</td>\n' +
                    '              <td id="requestTxt">'+param.executivesName+'</td>\n' +
                    '            </tr>\n' +
                    '            <tr>\n' +
                    '              <td>임직원 연락처</td>\n' +
                    '              <td id="pStateTxt">'+param.executivesCell+'</td>\n' +
                    '            </tr>\n';
            }

               message += '    <tr style="background-color: #f1f1f1;">\n' +
                '              <td>접수일자</td>\n' +
                '              <td id="pStateTxt">'+date+'</td>\n' +
                '            </tr>\n' +
                '          </table>\n' +
                '        </td>\n' +
                '      </tr>\n' +
                '      <tr></tr>\n' +
                '      <tr>\n' +
                '        <td style="padding: 10px;"></td>\n' +
                '      </tr>\n' +
                '      <tr>\n' +
                '        <td style="border-top: 2px solid #06c2ac;  padding: 10px 0;">\n' +
                '          <span\n' +
                '            style="font-size: 13px;\n' +
                '          font-weight: bold;"\n' +
                '          >\n' +
                '            SIMG (주) | 사업자등록번호 : 128-87-16058 <br> TEL : 070-7841-5959 | \n' +
                '            FAX : 02-6455-0223 <br> E-mail : jt@simg.kr\n' +
                '          </span>\n' +
                '        </td>\n' +
                '      </tr>\n' +
                '    </table>\n' +
                '  </body>\n' +
                '</html>\n';
        }

        return message;
    }
}
