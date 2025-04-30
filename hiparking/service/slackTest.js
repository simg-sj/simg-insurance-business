const apiLib = require('../server/lib/_api_lib');
var unirest = require('unirest');
const mailForm = require('../server/lib/mailForm');

async function slackTest(){
    let messageSlack = `<!subteam^S04JGMUTQ05>`;
    let slackData = {
        "channel": "#slackbottest",
        "username": `쏘카 단체상해 보험 접수 알림`,
        "text": messageSlack,
        //"icon_emoji": ":ghost:"
    };
    let result2 = await apiLib.slackWebHook(slackData);
    console.log(result2)
}

//slackTest()



function mailTest() {
    let endpoint = "https://center-api.simg.kr/v1/api/mail/mailRecv";  // 운영계
    let msg = mailForm.getForms('accession','');
    let data = {
        job: 'mailtest',
        data: '',
        sender: 'jt@simg.kr',
        receive : 'rlarlejr3178@simg.kr, yr.hong@simg.kr',
        subject : '',
        msg : msg,
        cc : '',
        attachments : [
            {
                filename : 'test.jpg',
                path : 'https://db-document-file.s3.ap-northeast-2.amazonaws.com/GENERAL/socar/insuRequest/1724113322878_agree_check_v3_03.jpg'
            }
        ]

    }

    return new Promise(function (resolve, reject) {

        unirest.post(endpoint)
            // .timeout(timeout)
            .headers(
                {
                    'Content-Type': 'application/x-www-form-urlencoded',
                })
            .type('json')
            .json(data)
            .end(function (response) {
                // console.log('from  : ', response.body);
                // console.log('send ', data);
                let d = {
                    'receive':response.body,
                    'send ':data

                }
                resolve(d);
            });
    });
}


mailTest();