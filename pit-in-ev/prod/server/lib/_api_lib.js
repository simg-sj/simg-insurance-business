var unirest = require('unirest');


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
    }

};
