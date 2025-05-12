
/**
 * 작성자 : 오정현
 * 작성일 :2024.03.12
 * 내용 :
 * 카카오 템플릿
 *
 * valueupmap_join_info : 밸류맵 가입시 발송 알림톡
 *
 *
 * **/

module.exports = {


    valueupmap_join_info: function(data){
        console.log(data);
        // let platform = data.platform;
        let cell = data.cell;
        let cName = data.cName;
        let url = data.infoUrl;
        // let serviceName = data.serviceName;
        // let product = data.product;
        // let carNum = data.dCarNum;
        // let msg1 = data.msg1;
        // let msg2 = data.msg2;
        let info = "아울러 희망하시는 상담 일자를 등록해 주시면 최적의 보험을 설계하여 안내해 드리겠습니다.\n" +
            "상담 희망일 미 입력 시 임의의 날짜에 상담 연락을 받아보실 수 있습니다.\n" +
            url;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"0e8832a8a0a7e4573c7453c387480484e6c012fd",
            "token":"",
            "templateCode":"tpl_code=TT_3848",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=밸류맵 보험가입정보 안내",
            "message":"message_1="+
                "밸류맵 " + cName + "고객님! \n" +
                "안녕하세요, SIMG 입니다.\n" +
                "\n" +
                "임대차보증금 소송 보험 가입이 완료되었으며,\n" +
                "아래의 URL 클릭시 보험 가입 증명을 확인하실 수 있습니다.\n" +
                "\n" +
                "이는 화재보험 상담을 신청하신 고객님께 무료로 제공되는 혜택이며,\n" +
                "밸류맵 가입 시 등록한 이메일 주소로 화재보험 가입 신청 안내서를 송부하였으니 확인 부탁드립니다.\n" +
                "\n" +
                url + "\n" +
                "\n" +
                "감사합니다.\n" +
                "SIMG 드림",
                /*
                "밸류맵 " + cName + "고객님! \n" +
                "안녕하세요, SIMG 입니다.\n" +
                "\n" +
                "임대차보증금 소송 보험이 가입이 완료되었습니다. \n" +
                "이는 화재보험 상담을 신청하신 밸류맵 고객님께 제공되는 무료 혜택이며, 아래의 URL 클릭 시 가입 증명을 확인하실 수 있습니다.\n" +
                "\n" +
                info + "\n" +
                "\n" +
                "감사합니다.\n" +
                "SIMG 드림",
                 */
            // "button_1":{
            //     "button": [{
            //         "name" : "심사결과조회",
            //         "linkType" : "WL",
            //         "linkTypeName" : "웹링크",
            //         "linkMo" : "https://connect-bike.simginsu.net",
            //         "linkPc" : "https://connect-bike.simginsu.net",
            //         "linkIos" : "",
            //         "linkAnd" : ""
            //
            //     }]
            // },
            "failover":"Y",
            "fsubject_1":"밸류맵 보험가입정보 안내",
            "fmessage_1":  '안녕하세요\n' +
                "밸류맵 " + cName + "고객님! \n" +
                "안녕하세요, SIMG 입니다.\n" +
                "\n" +
                "임대차보증금 소송 보험 가입이 완료되었으며,\n" +
                "아래의 URL 클릭시 보험 가입 증명을 확인하실 수 있습니다.\n" +
                "\n" +
                "이는 화재보험 상담을 신청하신 고객님께 무료로 제공되는 혜택이며,\n" +
                "밸류맵 가입 시 등록한 이메일 주소로 화재보험 가입 신청 안내서를 송부하였으니 확인 부탁드립니다.\n" +
                "\n" +
                url + "\n" +
                "\n" +
                "감사합니다.\n" +
                "SIMG 드림",




        };
    },
    mycheckup_join_info: function(data){
        console.log(data);
        // let platform = data.platform;
        let cell = data.cell;
        let cName = data.cName;
        let url = data.infoUrl;
        // let serviceName = data.serviceName;
        // let product = data.product;
        // let carNum = data.dCarNum;
        // let msg1 = data.msg1;
        // let msg2 = data.msg2;
        // let info = "아울러 희망하시는 상담 일자를 등록해 주시면 최적의 보험을 설계하여 안내해 드리겠습니다.\n" +
        //     "상담 희망일 미 입력 시 임의의 날짜에 상담 연락을 받아보실 수 있습니다.\n" +
        //     url;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"0e8832a8a0a7e4573c7453c387480484e6c012fd",
            "token":"",
            "templateCode":"tpl_code=TR_8720",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=마이체크업 보험가입정보 안내",
            "message":"message_1="+
                "안녕하세요, "+ cName + "고객님! \n" +
                "\n" +
                "건강검진전용 1회성 용종보험(프로미고객사랑보험)의 가입이 완료되었습니다. \n" +
                "아래의 URL 클릭 시 가입 증명 및 보험금 청구 절차를 확인하실 수 있습니다.\n" +
                "\n" +
                url + "\n" +
                "\n" +
                "감사합니다.\n" +
                "DB손해보험 대리점 SIMG 드림",
            // "button_1":{
            //     "button": [{
            //         "name" : "심사결과조회",
            //         "linkType" : "WL",
            //         "linkTypeName" : "웹링크",
            //         "linkMo" : "https://connect-bike.simginsu.net",
            //         "linkPc" : "https://connect-bike.simginsu.net",
            //         "linkIos" : "",
            //         "linkAnd" : ""
            //
            //     }]
            // },
            "failover":"Y",
            "fsubject_1":"마이체크업 보험가입정보 안내",
            "fmessage_1":  '안녕하세요\n' +
                "안녕하세요, "+ cName + "고객님! \n" +
                "\n" +
                "건강검진전용 1회성 용종보험(프로미고객사랑보험)의 가입이 완료되었습니다. \n" +
                "아래의 URL 클릭 시 가입 증명 및 보험금 청구 절차를 확인하실 수 있습니다.\n" +
                "\n" +
                url + "\n" +
                "\n" +
                "감사합니다.\n" +
                "DB손해보험 대리점 SIMG 드림",




        };
    },


};




