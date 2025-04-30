var unirest = require('unirest');
var axios = require('axios');
const makeForm = require('./mailForm');

module.exports = {
    BASE_URL: {
        development: 'http://52.78.231.120', //'http://uidesign.ac.kr',
        production: 'http://uidesign.ac.kr',
        lambda:'https://0j8iqqmk2l.execute-api.ap-northeast-2.amazonaws.com',
        kakaolambda:'https://hvu4nwsphl.execute-api.ap-northeast-2.amazonaws.com'

    },
    api:{
        test: 'test.php',
        request: 'api.php',

    },
    prodInfo : {
        endPoint : "https://brms-insurance.woowa.in",
        secretKey : "X-INSURANCE-SEGMENT-SECRET",
        key : "F268D756-2D11-41A8-B54B-CE969C1BB39A"
    },
    urlInfo : "/api/v1/insurance-segment/accident-history",
    applicationId: undefined,
    privateKey: undefined,
    mode: 'development',
    token: undefined,
    getUrl: function (uri = []) {
        return [].concat([this.BASE_URL[this.mode]]).concat(uri).join('/');
    },
    setConfig: function (applicationId, privateKey, mode = 'development') {
        this.applicationId = applicationId;
        this.privateKey = privateKey;
        this.mode = mode;
    },
    getRemainAligoSms: function(data){
        let _this = this;

        let endpoint = this.BASE_URL.lambda + "/aligo-remain-check-get";
        return new Promise(function (resolve, reject) {
            console.log('Aligo Lambda AWS SERVICE ~!');
            unirest.get(endpoint)
                .headers(
                    {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                .end(function (response) {
                    console.log('from AWS LAMBDA_CHECK : ', response.body);
                    resolve(response.body);
                });
        });
    },
    googleSheetInsert : async function(data, bpk){
        try{
           let endpoint = 'https://script.google.com/macros/s/AKfycbybrmXXkSs6o1O02SLXn5Yme5GYyZBMcFHbQ3Vc9xYRgZ50U3M4Dz-8ByR3EDfEckGVxg/exec';
            if(bpk === 1) {
                endpoint= 'https://script.google.com/macros/s/AKfycbzSARA8UjpiFsam-gW_drdYd1dpJB8ZqEQ2Sjox-9PKlt3_TMvA00LTqJOAViZKb1Ymtw/exec';
            }
            console.log('bpk is :::', bpk);
            console.log('endpoint is :: ', endpoint);
            let result = await axios.post(endpoint, data)
            if(result.code === '200'){
                return 200;
            }else {
                return 401;
            }
        }catch(e){
            console.log(e);
        }
    },
    sendAligoSms: function(data){
        let _this = this;

        let endpoint = this.BASE_URL.lambda + "/aligo-send";

        return new Promise(function (resolve, reject) {
            console.log('Aligo Lambda AWS MSG SEND DATA : ' , data);
            unirest.post(endpoint)
                .headers(
                    {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                .type('json')
                .json(data)
                .end(function (response) {
                    console.log('from AWS LAMBDA_SEND: ', response.body);

                    let d = {
                        'receive':response.body,
                        'sendD':data

                    }
                    resolve(d);
                });
        });
    },
    sendAligoKakao: function(data){
        let _this = this;

        return new Promise(function (resolve, reject) {

            let endpoint = "https://hvu4nwsphl.execute-api.ap-northeast-2.amazonaws.com" + "/prod/";
            console.log(endpoint);

            unirest.post(endpoint)
                .headers(
                    {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    })
                .type('json')
                .json(data)
                .end(function (response) {

                    console.log('send ', data);
                    console.log('from AWS LAMBDA_SEND: ', response.body);

                    let d = {
                        'receive':response.body,
                        'sendD':data

                    }
                    resolve(d);
                });
        });
    },

    getBaeminGps: function(data){
        let _this = this;

        const timeout =  1000*30; // 밀리초로 설정 천분의 1초 = 1000*1
        var d = {
            riderId:data.riderId,
            investigateDateTime:data.investigateDateTime
        };
        var url = _this.prodInfo.endPoint + _this.urlInfo; //baemin
        // var url = testUrl; //testMode
        console.log("End point is : ", url);
        console.log("Send Data is : ", d);

        return new Promise(function (resolve, reject) {

            unirest.post(url)
                .timeout(timeout)
                .headers(
                    {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-INSURANCE-SEGMENT-SECRET': 'F268D756-2D11-41A8-B54B-CE969C1BB39A',
                        // 'X-API-SECRET':'l5Ygh39iO216VHphUoO3HRYqHpzHAC9SpU/u2+g1l3g='
                    })
                .type('json')
                .json(data)
                .end(function (response) {
                    console.log('from BAEMIN GPS : ', response.body);
                    console.log('send ', data);
                    let d = {
                        'receive':response.body,
                        'sendD':data

                    }
                    resolve(d);
                });
        });
    },
    getBaeminPromiGps: function(data){
        let _this = this;

        const timeout =  1000*30; // 밀리초로 설정 천분의 1초 = 1000*1
        var url = "http://brms-insurance.betabaemin.in" + "/api/v1/insurance/car/accident-history"; //baemin ( 실서버 )

        // var url = "https://brms-insurance.woowa.in" + "/api/v1/insurance/car/accident-history"; //baemin ( 운영서버 )
        console.log("End point is : ", url);
        console.log("Send Data is : ", data);

        return new Promise(function (resolve, reject) {

            unirest.post(url)
                .timeout(timeout)
                .headers(
                    {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CAR-INSURANCE-SECRET': '246E575D-A23A-4BAC-87E3-0367D140692D',
                        // 'X-CAR-INSURANCE-SECRET': '0CEAF447-A033-4E38-A301-37C7C6B97EAA',
                    })
                .type('json')
                .json(data)
                .end(function (response) {
                    console.log('from BAEMIN RESPONSE : ', response.body);
                    // console.log('send ', data);
                    let d = {
                        'receive':response.body,
                        // 'sendD':data

                    }
                    resolve(d);
                });
        });
    },
    sendContract: function(data){
        let _this = this;

        // const timeout =  1000*30; // 밀리초로 설정 천분의 1초 = 1000*1

        // let endpoint = "https://baemin-api.simgbiz.net/api/flex/contractagree"; // 테스트계
        let endpoint = "https://connectrider.simginsu.net/api/flex/contractagree";  // 운영계
        console.log(endpoint);

        // var url = testUrl; //testMode
        console.log("End point is : ", endpoint);
        console.log("Send Data is : ", data);

        return new Promise(function (resolve, reject) {

            unirest.post(endpoint)
            // .timeout(timeout)
                .headers(
                    {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-INSURANCE-SEGMENT-SECRET': 'F268D756-2D11-41A8-B54B-CE969C1BB39A',
                        // 'X-API-SECRET':'l5Ygh39iO216VHphUoO3HRYqHpzHAC9SpU/u2+g1l3g='
                    })
                .type('json')
                .json(data)
                .end(function (response) {
                    console.log('from DB : ', response.body);
                    console.log('send ', data);
                    let d = {
                        'receive':response.body,
                        'sendD':data

                    }
                    resolve(d);
                });
        });
    },
    sendKakao: function(data){
        let _this = this;

        // const timeout =  1000*30; // 밀리초로 설정 천분의 1초 = 1000*1

        // let endpoint = "https://baemin-api.simgbiz.net/api/flex/contractagree"; // 테스트계
        let endpoint = "https://connectrider.simginsu.net/cms/flex/kakaoAlim";  // 운영계
        console.log(endpoint);

        // var url = testUrl; //testMode
        // console.log("End point is : ", endpoint);
        // console.log("Send Data is : ", data);

        return new Promise(function (resolve, reject) {

            unirest.post(endpoint)
            // .timeout(timeout)
                .headers(
                    {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-INSURANCE-SEGMENT-SECRET': 'F268D756-2D11-41A8-B54B-CE969C1BB39A',
                        // 'X-API-SECRET':'l5Ygh39iO216VHphUoO3HRYqHpzHAC9SpU/u2+g1l3g='
                    })
                .type('json')
                .json(data)
                .end(function (response) {
                    console.log('from DB : ', response.body);
                    console.log('send ', data);
                    let d = {
                        'receive':response.body,
                        'sendD':data

                    }
                    resolve(d);
                });
        });
    },
    sendDocUpload: function(data){
        let _this = this;

        // const timeout =  1000*30; // 밀리초로 설정 천분의 1초 = 1000*1

        // 징구요청 업로드 URL 전송
        // let endpoint = "https://baemin-api.simgbiz.net/api/flex/contractagree"; // 테스트계
        let endpoint = "https://connectrider.simginsu.net/cms/flex/underwrite";  // 운영계
        console.log(endpoint);

        // var url = testUrl; //testMode
        console.log("End point is : ", endpoint);
        console.log("Send Data is : ", data);

        return new Promise(function (resolve, reject) {

            unirest.post(endpoint)
            // .timeout(timeout)
                .headers(
                    {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-INSURANCE-SEGMENT-SECRET': 'F268D756-2D11-41A8-B54B-CE969C1BB39A',
                        // 'X-API-SECRET':'l5Ygh39iO216VHphUoO3HRYqHpzHAC9SpU/u2+g1l3g='
                    })
                .type('json')
                .json(data)
                .end(function (response) {
                    console.log('from DB : ', response.body);
                    console.log('send ', data);
                    let d = {
                        'receive':response.body,
                        'sendD':data

                    }
                    resolve(d);
                });
        });
    },

    sendBikeResult: function(data, url, prop, key ){
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // unable to verify the first certificate 세팅
        // console.log("data!!!! : ", data);
        console.log("End point is : ", url);
        console.log("PROP is : ", prop);
        console.log("KEY is : ", key);


        return new Promise(function (resolve, reject) {

            unirest.post(url)

                .headers(
                    {
                        'Content-Type': 'application/json',
                        'X-BIKE-INSURANCE-HANA-SECRET': key
                    })
                .type('json')
                .json(data)
                .end(function (response) {
                    console.log('from  RESPONSE : ', response.body);
                    // console.log('send ', data);
                    let d = {
                        'receive':response.body,
                        // 'sendD':data

                    }
                    resolve(d);
                });
        });
    },
    sendaccidendSelect: function(data, url, prop, key ){
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // unable to verify the first certificate 세팅
        // console.log("data!!!! : ", data);
        console.log("End point is : ", url);
        console.log("PROP is : ", prop);
        console.log("KEY is : ", key);


        return new Promise(function (resolve, reject) {

            unirest.post(url)

                .headers(
                    {
                        'Content-Type': 'application/json',
                    })
                .type('json')
                .json(data)
                .end(function (response) {
                    console.log('from  RESPONSE : ', response.body);
                    // console.log('send ', data);
                    let d = {
                        'receive':response.body,
                        // 'sendD':data

                    }
                    resolve(d);
                });
        });
    },
    slackWebHook : function(data, url){
        if(!url){
            var BASEURL = "https://hooks.slack.com/services/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";
            url = BASEURL;
        }


        return new Promise(function (resolve, reject) {

            unirest.post(url)

                .headers(
                    {
                        'Content-Type': 'application/json',
                    })
                .type('json')
                .json(data)
                .end(function (response) {
                    console.log('from SLACK RESPONSE : ', response.body);
                    // console.log('send ', data);
                    let d = {
                        'receive':response.body,
                        // 'sendD':data

                    }
                    resolve(d);
                });
        });
    },
    mailHook : function(gubun, dataObject, sendEmail, receiveEmail, subject, cc, attachments){
        let _this = this;
        console.log('center api act ~!')
        let endpoint = "https://center-api.simg.kr/v1/api/mail/mailRecv";  // 운영계

        console.log('dataObject is :::: ', dataObject);
        let msg = makeForm.getForms(dataObject.type, dataObject);
            console.log('msg is :::: ', msg);
        let data = {
            job: gubun,
            data: dataObject,
            sender: sendEmail,
            receive : receiveEmail,
            subject : subject,
            msg : msg,
            cc : cc,
            attachments : attachments

        }

        // console.log(data);

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
    },
};
