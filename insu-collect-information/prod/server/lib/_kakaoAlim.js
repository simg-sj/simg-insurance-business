
/**
 * 작성자 : 유종태
 * 작성일 :2021.07.24
 * 내용 :
 * 카카오 템플릿
 *
 *
 * 001 : 가입신청 접수안내
 * 002 : 거절시 심사결과안내
 * 003 : 에러시 심사결과안내
 * 004 : 서류접수 요청
 * 005 : 통과시 심사결과앤내
 * 006 : 자동차보험 만기사전안내
 * 007 : 기명취소시에 계약취소안내
 *
 * **/

module.exports = {


    bike001: function(data){
        console.log(data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let msg1 = data.msg1;
        let msg2 = data.msg2;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"91ab107659437be7236428d01f25912eaae9519b",
            "token":"",
            "templateCode":"tpl_code=TE_8167",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=가입신청안내",
            "message":"message_1="+
                '안녕하세요\n' +
                'DB손해보험 프로미 시간제보험 안내채널입니다.\n' +
                '\n' +
                dName+"님\n" +
                serviceName+" 신청해주셔서 감사합니다.\n" +
                '\n' +
                '- 플랫폼 : '+platform+'\n'+
                '- 상품명 : '+product+'\n'+
                '- 신청자명 : '+dName+'\n'  +
                '- 차량 번호 : '+carNum+'\n'  +
                '\n' +
                '심사결과는 영업일 기준으로 3~4일이 소요되며 신청 URL에서도 심사의 상태및 결과조회가 가능합니다.\n\n' +
                '\n' +
                "심사시에  추가 서류접수가 필요한 경우 별도의 절차를 위하여 개별 연락을 드릴 예정입니다. 이경우 소요기간이 더생길 수 있습니다."+"\n",
            "button_1":{
                "button": [{
                    "name" : "심사결과조회",
                    "linkType" : "WL",
                    "linkTypeName" : "웹링크",
                    "linkMo" : "https://connect-bike.simginsu.net",
                    "linkPc" : "https://connect-bike.simginsu.net",
                    "linkIos" : "",
                    "linkAnd" : ""

                }]
            },
            "failover":"Y",
            "fsubject_1":"가입신청안내",
            "fmessage_1":  '안녕하세요\n' +
                'DB손해보험 프로미 시간제보험 안내채널입니다.\n' +
                '\n' +
                dName+"님\n" +
                serviceName+" 신청해주셔서 감사합니다.\n" +
                '\n' +
                ' 플랫폼 : '+platform+'\n'+
                ' 상품명 : '+product+'\n'+
                ' 신청자명 : '+dName+'\n'  +
                ' 차량 번호 : '+carNum+'\n'  +
                '\n' +
                '심사결과는 영업일 기준으로 3~4일이 소요되며 신청 URL에서도 심사의 상태및 결과조회가 가능합니다.\n\n' +

                '\n' +
                "심사시에  추가 서류접수가 필요한 경우 별도의 절차를 위하여 개별 연락을 드릴 예정입니다. 이경우 소요기간이 더생길 수 있습니다."+"\n"+
                "*심사결과조회 \n" +
                "https://connect-bike.simginsu.net"




        };
    },
    bike002: function(data){
        console.log(data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let msg1 = data.msg1;
        let msg2 = data.msg2;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"91ab107659437be7236428d01f25912eaae9519b",
            "token":"",
            "templateCode":"tpl_code=TE_8170",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=거절 심사결과안내",
            "message":"message_1="+
                '안녕하세요\n' +
                'DB손해보험 프로미 시간제보험 안내채널입니다.\n' +
                '\n' +
                dName+"님\n" +
                '\n' +
                '- 플랫폼 : '+platform+'\n'+
                '- 상품명 : '+product+'\n'+
                '- 신청자명 : '+dName+'\n'  +
                '- 차량 번호 : '+carNum+'\n'  +
                '\n' +
                "보험가입 심사결과 주요 인수심사 기준에 부합하지 않아 거절되었습니다.\n\n"+
                "*  주요 인수 기준  *\n" +
                "- 1.연령 만 24~59세\n" +
                "- 2.사고다발 유형\n" +
                "- 3.음주 및 무면허 \n" +
                "- 4.중대과실 경력 \n" +
                "- 5.보험가입 경력 부족 \n" +
                "- 6.신청정보의 적합성 오류\n"+
                "- 7.가입불가 차량\n"+
                "- 8.오토바이 책임보험의 부재\n"
                +"* 책임보험 부재로 인한경우라면 서류접수시 결과변경이 가능하오니 연락부탁드립니다. *\n"
                +"문의 전화 : 1877 - 3006"+"\n",
            "failover":"Y",
            "fsubject_1":"거절 심사결과안내",
            "fmessage_1":"안녕하세요\n" +
                "DB손보 자동차 시간제보험 안내채널입니다.\n" +
                "\n" +
                dName+"님\n" +
                "\n" +
                '- 플랫폼 : '+platform+'\n'+
                '- 상품명 : '+product+'\n'+
                '- 신청자명 : '+dName+'\n'  +
                '- 차량 번호 : '+carNum+'\n'  +
                "\n" +
                "\n" +
                "보험가입 심사결과 주요 인수심사 기준에 부합하지 않아 거절되었습니다. \n" +
                "\n" +
                "\n" +
                "*  주요 인수 기준  *\n" +
                "- 1.연령 만 24~59세\n" +
                "- 2.사고다발 유형\n" +
                "- 3.음주 및 무면허 \n" +
                "- 4.중대과실 경력 \n" +
                "- 5.보험가입 경력 부족 \n" +
                "- 6.신청정보의 적합성 오류\n"+
                "- 7.가입불가 차량\n"+
                "- 8.오토바이 책임보험의 부재\n"
                +"* 책임보험 부재로 인한경우라면 서류접수시 결과변경이 가능하오니 연락부탁드립니다. *\n"
                +"문의 전화 : 1877 - 3006"+"\n"+"\n",




        };
    },
    bike003: function(data){
        console.log(data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let msg1 = data.msg1;
        let msg2 = data.msg2;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"91ab107659437be7236428d01f25912eaae9519b",
            "token":"",
            "templateCode":"tpl_code=TE_8170",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=거절 심사결과안내",
            "message":"message_1="+
                '안녕하세요\n' +
                'DB손해보험 프로미 시간제보험 안내채널입니다.\n' +
                '\n' +
                dName+"님\n" +
                '\n' +
                '- 플랫폼 : '+platform+'\n'+
                '- 상품명 : '+product+'\n'+
                '- 신청자명 : '+dName+'\n'  +
                '- 차량 번호 : '+carNum+'\n'  +
                '\n' +
                "보험가입 심사결과 주요 인수심사 기준에 부합하지 않아 거절되었습니다.\n\n"+
                "* 현재 고객님께서는 입력하신 정보의 적합성이 맞지않아 거절이 되셨습니다.\n\n"+
                "* 고객센터로 문의 부탁드립니다.\n\n"+
                "* 고객센터 [ 1877-3006 ] ",
            "failover":"Y",
            "fsubject_1":"거절 심사결과안내",
            "fmessage_1":"안녕하세요\n" +
                "DB손보 자동차 시간제보험 안내채널입니다.\n" +
                "\n" +
                dName+"님\n" +
                "\n" +
                '- 플랫폼 : '+platform+'\n'+
                '- 상품명 : '+product+'\n'+
                '- 신청자명 : '+dName+'\n'  +
                '- 차량 번호 : '+carNum+'\n'  +
                "\n" +
                "\n" +
                "보험가입 심사결과 주요 인수심사 기준에 부합하지 않아 거절되었습니다.\n\n"+
                "* 현재 고객님께서는 입력하신 정보의 적합성이 맞지않아 거절이 되셨습니다.\n\n"+
                "* 고객센터로 문의 부탁드립니다.\n\n"+
                "* 고객센터 [ 1877-3006 ] ",




        };
    },
    bike004: function(data){
        console.log(data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let msg1 = data.msg1;
        let msg2 = data.msg2;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"91ab107659437be7236428d01f25912eaae9519b",
            "token":"",
            "templateCode":"tpl_code=TF_2794",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=서류접수요청",
            "message":"message_1="+
                '안녕하세요\n' +
                'DB손해보험 프로미 시간제보험 안내채널입니다.\n' +
                "[ 추가 서류 요청 ]"+
                '\n' +
                dName+"님\n" +
                '\n' +
                '- 플랫폼 : '+platform+'\n'+
                '- 상품명 : '+product+'\n'+
                '- 신청자명 : '+dName+'\n'  +
                '- 차량 번호 : '+carNum+'\n'  +
                '\n' +
                '- 심사중 별도의 서류가 추가로 필요하여 아래의 버튼을 통하여 이동되는 페이지에서 필요서류를 첨부하여 주시기 바랍니다.\n\n' +
                '\n',
            "button_1":{
                "button": [{
                    "name" : "서류제출",
                    "linkType" : "WL",
                    "linkTypeName" : "웹링크",
                    "linkMo" : "https://connect-bike.simginsu.net/documentsubmit",
                    "linkPc" : "https://connect-bike.simginsu.net/documentsubmit",
                    "linkIos" : "",
                    "linkAnd" : ""

                }]
            },
            "failover":"Y",
            "fsubject_1":"서류접수요청",
            "fmessage_1":  '안녕하세요\n' +
                'DB손해보험 프로미 시간제보험 안내채널입니다.\n' +
                "[ 추가 서류 요청 ]"+
                '\n' +
                dName+"님\n" +
                '\n' +
                ' 플랫폼 : '+platform+'\n'+
                ' 상품명 : '+product+'\n'+
                ' 신청자명 : '+dName+'\n'  +
                ' 차량 번호 : '+carNum+'\n'  +
                '\n' +
                '- 심사중 별도의 서류가 추가로 필요하여 아래의 URL을 통하여 이동되는 페이지에서 필요서류를 첨부하여 주시기 바랍니다.\n\n' +
                '\n' +
                "서류제출 : \n" +
                "https://connect-bike.simginsu.net/documentsubmit"+"\n"

        };
    },
    bike005: function(data){
        console.log(data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let fromDay = data.fromDay;
        let msg1 = data.msg1;
        let msg2 = data.msg2;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"91ab107659437be7236428d01f25912eaae9519b",
            "token":"",
            "templateCode":"tpl_code=TE_8169",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=심사통과결과안내",
            "message":"message_1="+
                '안녕하세요\n' +
                'DB손해보험 프로미 시간제보험 안내채널입니다.\n' +
                '\n' +
                dName+"님\n" +
                '\n' +
                '- 플랫폼 : '+platform+'\n'+
                '- 상품명 : '+product+'\n'+
                '- 신청자명 : '+dName+'\n'  +
                '- 차량 번호 : '+carNum+'\n'  +
                '\n' +
                '보험가입 심사결과 통과되었습니다.\n\n' +
                '\n'+
                '시간제 보험적용은  ' + fromDay + '  00시 부터 적용됩니다.'+
                '\n'+
                '\n'+
                '* 주의사항 *'+
                '\n'+
                '- 운행 오토바이의 변경시 보험사에 즉시 통보바랍니다. 계약시 등록한 오토바이이외의 운행은 보상에 제한이 있을 수 있습니다.\n' +
                '\n'+
                "- 계약한 오토바이의 책임보험 용도의변경및 계약내용 변경시 즉시 통보바랍니다. 보상에 제한이 있을 수 있습니다.\n"+
                '\n'+
                "- 배달중의 사고발생시에는 DB손해보험 사고접수번호로 접수 부탁드립니다.\n"+
                "[ 사고접수 1588 - 0100 ]",
            "failover":"Y",
            "fsubject_1":"심사통과결과안내",
            "fmessage_1":  '안녕하세요\n' +
                'DB손해보험 프로미 시간제보험 안내채널입니다.\n' +
                '\n' +
                dName+"님\n" +
                '\n' +
                ' 플랫폼 : '+platform+'\n'+
                ' 상품명 : '+product+'\n'+
                ' 신청자명 : '+dName+'\n'  +
                ' 차량 번호 : '+carNum+'\n'  +
                '\n' +
                '보험가입 심사결과 통과되었습니다.\n\n' +
                '\n'+
                '시간제 보험적용은  ' + fromDay + '  00시 부터 적용됩니다.'+
                '\n'+
                '\n'+
                '* 주의사항 *'+
                '\n'+
                '- 운행 오토바이의 변경시 보험사에 즉시 통보바랍니다. 계약시 등록한 오토바이이외의 운행은 보상에 제한이 있을 수 있습니다.\n' +
                '\n'+
                "- 계약한 오토바이의 책임보험 용도의변경및 계약내용 변경시 즉시 통보바랍니다. 보상에 제한이 있을 수 있습니다.\n"+
                '\n'+
                "- 배달중의 사고발생시에는 DB손해보험 사고접수번호로 접수 부탁드립니다.\n"+
                "[ 사고접수 1588 - 0100 ]"

        };
    },

    bike006: function(data){
        console.log(data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let fromDay = data.fromDay;
        let msg1 = data.msg1;
        let msg2 = data.msg2;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"91ab107659437be7236428d01f25912eaae9519b",
            "token":"",
            "templateCode":"tpl_code=TF_4149",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=계약 해지안내",
            "message":"message_1="+
                '안녕하세요\n' +
                'DB손해보험 자동차 시간제보험 안내채널입니다.\n' +
                '\n' +
                dName+"님\n" +
                '\n' +
                '- 플랫폼 : '+platform+'\n'+
                '- 상품명 : '+product+'\n'+
                '- 신청자명 : '+dName+'\n'  +
                '- 차량 번호 : '+carNum+'\n'  +
                '\n' +
                dName+"님께서 계약하신 내용이 계약해지 처리되어 안내드립니다.\n\n"+
                "* "+fromDay+" 부터 보험적용이 해지되었습니다.\n\n"+
                "* 재가입시 심사신청 페이지에서 재등록 부탁드립니다. \n\n"+
                "* 감사합니다. \n",
            "failover":"Y",
            "fsubject_1":"계약 해지안내",
            "fmessage_1":"안녕하세요\n" +
                'DB손해보험 자동차 시간제보험 안내채널입니다.\n' +
                '\n' +
                dName+"님\n" +
                '\n' +
                '- 플랫폼 : '+platform+'\n'+
                '- 상품명 : '+product+'\n'+
                '- 신청자명 : '+dName+'\n'  +
                '- 차량 번호 : '+carNum+'\n'  +
                '\n' +
                dName+"님께서 계약하신 내용이 계약해지 처리되어 안내드립니다.\n\n"+
                "* "+fromDay+" 부터 보험적용이 해지되었습니다.\n\n"+
                "* 재가입시 심사신청 페이지에서 재등록 부탁드립니다. \n\n"+
                "* 감사합니다. \n",




        };
    },
    bike007: function(data){
        console.log(data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let msg1 = data.msg1;
        let msg2 = data.msg2;
        let url = data.url;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"91ab107659437be7236428d01f25912eaae9519b",
            "token":"",
            "templateCode":"tpl_code=TG_5175",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=가입신청안내",
            "message":"message_1="+
                '안녕하세요r\n' +
                'DB손해보험 프로미 시간제보험 안내채널입니다.\n' +
                '\n' +
                dName+"님\n" +
                serviceName+" 신청해주셔서 감사합니다.\n" +
                '\n' +
                '- 플랫폼 : '+platform+'\n'+
                '- 상품명 : '+product+'\n'+
                '- 신청자명 : '+dName+'\n'  +
                '- 차량 번호 : '+carNum+'\n'  +
                '\n' +
                '심사결과는 영업일 기준으로 3~4일이 소요되며 신청 URL에서도 심사의 상태및 결과조회가 가능합니다.\n\n' +
                '\n' +
                "심사시에  추가 서류접수가 필요한 경우 별도의 절차를 위하여 개별 연락을 드릴 예정입니다. 이경우 소요기간이 더생길 수 있습니다."+"\n"+
                '\n'+
                url,
            "button_1":{
                "button": [{
                    "name" : "심사결과조회",
                    "linkType" : "WL",
                    "linkTypeName" : "웹링크",
                    "linkMo" : url,
                    "linkPc" : url,
                    "linkIos" : "",
                    "linkAnd" : ""

                }]
            },
            "failover":"Y",
            "fsubject_1":"가입신청안내",
            "fmessage_1":

                serviceName+ " 심사가 통과되었습니다.\n" +
                "\n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : " + platform + "\n" +
                "- 신청자명 : " + dName + "\n" +
                "- 상품명 : " + serviceName + "\n" +
                "\n" +
                "아래 신청버튼을 통해 렌탈 바이크를 신청해주세요.\n" +
                "\n" +
                "■ 유의사항\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                msg3 + "\n" +
                msg4 + "\n" +
                msg5 + "\n" +
                "\n" +
                "렌탈 바이크 신청하기\n" +
                url
                /*
                '안녕하세요\n' +
                'DB손해보험 프로미 시간제보험 안내채널입니다.\n' +
                '\n' +
                dName+"님\n" +
                serviceName+" 신청해주셔서 감사합니다.\n" +
                '\n' +
                '- 플랫폼 : '+platform+'\n'+
                '- 상품명 : '+product+'\n'+
                '- 신청자명 : '+dName+'\n'  +
                '- 차량 번호 : '+carNum+'\n'  +
                '\n' +
                '심사결과는 영업일 기준으로 3~4일이 소요되며 신청 URL에서도 심사의 상태및 결과조회가 가능합니다.\n\n' +
                '\n' +
                "심사시에  추가 서류접수가 필요한 경우 별도의 절차를 위하여 개별 연락을 드릴 예정입니다. 이경우 소요기간이 더생길 수 있습니다."+"\n"+
                '\n'+
                url
                */



        };
    },
    hana_dev_requestSMS: function(data){
        console.log(data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        // let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let msg1 = data.msg1;
        let msg2 = data.msg2;
        let msg3 = data.msg3;
        let serviceName = '하나손해보험 렌탈 바이크 시간제보험';
        // return;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"231626da2291a41524e2afd2a708558e512a392f",
            "token":"",
            "templateCode":"tpl_code=TO_0427",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=렌트 이륜차 심사요청 완료 안내_TEST#3",
            "message":"message_1="+
                "하나손해보험 렌탈 바이크 시간제보험을 신청해주셔서 감사합니다. \n" +
                // serviceName + " 안내 채널입니다.\n" +
                "\n" +
                // dName + "님 "+ serviceName + "을 신청해주셔서 감사합니다.\n" +
                // "\n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : " + platform + "\n" +
                "- 신청자명 : " + dName + "\n" +
                "- 상품 : "+ serviceName + "\n" +
                "\n" +
                "■ 유의사항\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                msg3


                // '■ 심사결과조회' +
                // 'https://hana-rent-bike-dev.simg.kr'
                // '\n' +
                // '심사결과는 영업일 기준으로 3~4일이 소요되며 신청 URL에서도 심사의 상태및 결과조회가 가능합니다.\n\n' +
                // '\n' +
                // "심사시에  추가 서류접수가 필요한 경우 별도의 절차를 위하여 개별 연락을 드릴 예정입니다. 이경우 소요기간이 더생길 수 있습니다."+"\n"
            ,
            "button_1":{
                "button": [{
                    "name" : "심사결과조회",
                    "linkType" : "WL",
                    "linkTypeName" : "웹링크",
                    "linkMo" : "https://hana-rent-bike-dev.simg.kr/",
                    "linkPc" : "https://hana-rent-bike-dev.simg.kr/",
                    "linkIos" : "",
                    "linkAnd" : ""

                }]
            },
            "failover":"Y",
            "fsubject_1":"가입신청안내",
            "fmessage_1":
                "하나손해보험 렌탈 바이크 시간제보험을 신청해주셔서 감사합니다. \n" +
                // serviceName + " 안내 채널입니다.\n" +
                "\n" +
                // dName + "님 "+ serviceName + "을 신청해주셔서 감사합니다.\n" +
                // "\n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : " + platform + "\n" +
                "- 신청자명 : " + dName + "\n" +
                "- 상품 : "+ serviceName + "\n" +
                "\n" +
                "■ 유의사항\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                msg3 + "\n" +
                '■ 심사결과조회\n' +
                'https://hana-rent-bike-dev.simg.kr/'




        };

    },
    hana_dev_resultAcceptSMS: function(data){
        console.log('hana_dev_resultAcceptSMS : ', data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        // let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let msg1 = data.msg1;
        let msg2 = data.msg2;
        let msg3 = data.msg3;
        let msg4 = data.msg4;
        let msg5 = data.msg5;
        let url = data.url;
        let serviceName = '하나손해보험 렌탈 바이크 시간제보험';
        // return;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"231626da2291a41524e2afd2a708558e512a392f",
            "token":"",
            "templateCode":"tpl_code=TO_0894",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=렌트 이륜차 심사 통과 안내_TEST#2",
            "message":"message_1="+
                serviceName +" 심사가 통과되었습니다.\n" +
                "\n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : " + platform + "\n" +
                "- 신청자명 : " + dName  + "\n" +
                "- 상품명 : " + serviceName + "\n" +
                "\n" +
                "아래 신청버튼을 통해 렌탈 바이크를 신청해주세요.\n" +
                "\n" +
                "■ 유의사항\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                msg3 + "\n" +
                msg4 + "\n" +
                msg5

            ,
            "button_1":{
                "button": [{
                    "name" : "렌탈 바이크 신청하기",
                    "linkType" : "WL",
                    "linkTypeName" : "웹링크",
                    "linkMo" : url,
                    "linkPc" : url,
                    "linkIos" : "",
                    "linkAnd" : ""

                }]
            },
            "failover":"Y",
            "fsubject_1":"가입신청안내",
            "fmessage_1":
                "안녕하세요. \n" +
                serviceName +" 안내 채널입니다.\n" +
                "\n" +
                dName + "님 "+ serviceName +"의 심사결과 통과되어 안내드립니다.\n" +
                "아래 페이지에서 렌트 차량과 렌트사를 선택해주세요.\n" +
                "\n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : " + platform +"\n" +
                "- 상품명 : " + serviceName +"\n" +
                "- 신청자명 : " + dName + "\n" +
                "아래 신청버튼을 통해 렌탈 바이크를 신청해주세요" + "\n" +
                "\n" +
                "■ 유의사항\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                msg3 + "\n" +
                msg4 + "\n" +
                msg5 + "\n" +

                "■ 렌트사 선택 페이지\n" +
                url



        };

    },
    hana_dev_resultRejectSMS: function(data){
        console.log('hana_dev_resultRejectSMS : ', data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        // let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let msg1 = data.msg1;
        let msg2 = data.msg2;
        let msg3 = data.msg3;
        let msg4 = data.msg4;
        let url = data.url;
        let rejectWhy = data.rejectWhy
        let serviceName = '하나손해보험 렌탈 바이크 시간제보험';
        // return;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"231626da2291a41524e2afd2a708558e512a392f",
            "token":"",
            "templateCode":"tpl_code=TO_0540",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=렌트 이륜차 심사 거절 안내_TEST#1",
            "message":"message_1="+

                serviceName+" 심사 결과, 인수 심사 기준에 부합하지 않아 거절되었습니다.\n" +
                "\n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : " + platform +"\n" +
                "- 신청자명 : " + dName + "\n" +
                "- 거절사유 : " + rejectWhy + "\n" +
                "- 상품명 : " + serviceName + "\n" +
                "\n" +
                msg1 + "\n" +
                msg2 + "\n"


                // serviceName + " 심사 결과, 인수 심사 기준에 부합하지 않아 거절되었습니다.\n" +
                // "\n" +
                // "■ 신청 정보\n" +
                // "- 플랫폼 : " + platform +"\n" +
                // "- 신청자명 : " + dName+"\n" +
                // "- 거절사유 : " + rejectWhy +"\n" +
                // "- 상품명 : " + serviceName +"\n" +
                // "\n" +
                // msg1 + "\n" +
                // msg2 + "\n"


                // "안녕하세요. \n" +
                // serviceName +" 안내 채널입니다.\n" +
                // "\n" +
                // dName+"님 "+ serviceName + "의 심사결과 거절되어 안내드립니다.\n" +
                // "\n" +
                // "■ 신청 정보\n" +
                // "- 플랫폼 : " + platform +"\n" +
                // "- 상품명 : " + serviceName +"\n" +
                // "- 신청자명 : " + dName+"\n" +
                // "\n" +
                // "보험가입 심사결과 주요 인수심사 기준에 부합하지 않아 거절되었습니다.\n" +
                // "\n" +
                // "거절사유는 " + rejectWhy + "입니다."

            ,
            "button_1":{
                "button": [{
                    "name" : "배민커넥트 문의하기",
                    "linkType" : "WL",
                    "linkTypeName" : "웹링크",
                    "linkMo" : url,
                    "linkPc" : url,
                    "linkIos" : "",
                    "linkAnd" : ""

                }]
            },
            "failover":"Y",
            "fsubject_1":"가입신청안내",
            "fmessage_1":
                serviceName + " 심사 결과, 인수 심사 기준에 부합하지 않아 거절되었습니다.\n" +
                "\n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : " + platform +"\n" +
                "- 신청자명 : " + dName+"\n" +
                "- 거절사유 : " + rejectWhy +"\n" +
                "- 상품명 : " + serviceName +"\n" +
                "\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                "\n" +
                "배민커넥트 문의하기\n" +
                url



        };

    },
    hana_dev_rent_request: function(data){
        console.log('hana_dev_rent_request : ', data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        let bikeName = data.bikeName;
        let rentGugan = data.rentGugan;
        let rentGubun = data.rentGubun;
        let rentCompany = data.rentCompany;
        // let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let msg1 = data.msg1;
        let msg2 = data.msg2;
        let msg3 = data.msg3;
        let msg4 = data.msg4;
        let url = data.url;
        let rejectWhy = data.rejectWhy
        let serviceName = '하나손해보험 렌탈 바이크 시간제보험';
        // return;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"231626da2291a41524e2afd2a708558e512a392f",
            "token":"",
            "templateCode":"tpl_code=TO_2417",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=렌트 이륜차 렌트 신청완료_TEST#1",
            "message":"message_1="+


                "렌탈 바이크 계약 신청이 완료되었습니다.\n" +
                "\n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : " + platform + "\n" +
                "- 신청자명 : " + dName + "\n" +
                "- 이륜차명 : " + bikeName +"\n" +
                "- 렌탈 개월수 : " + rentGugan +"\n" +
                "- 차량형태 : " + rentGubun +"\n" +
                "- 렌탈사 : " + rentCompany +"\n" +
                "\n" +
                "■ 유의사항\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                msg3 + "\n" +
                msg4 + "\n"





            ,
            "button_1":{
                "button": [{
                    "name" : "렌탈 정보 확인하기",
                    "linkType" : "WL",
                    "linkTypeName" : "웹링크",
                    "linkMo" : url,
                    "linkPc" : url,
                    "linkIos" : "",
                    "linkAnd" : ""

                }]
            },
            "failover":"Y",
            "fsubject_1":"가입신청안내",
            "fmessage_1":
                "렌탈 바이크 계약 신청이 완료되었습니다.\n" +
                "\n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : "+ platform + "\n" +
                "- 신청자명 : " + dName +"\n" +
                "- 이륜차명 : " + bikeName +"\n" +
                "- 렌탈 개월수 : " + rentGugan +"\n" +
                "- 차량형태 : " + rentGubun + "\n" +
                "- 렌탈사 : " + rentCompany +"\n" +
                "\n" +
                "■ 유의사항\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                msg3 + "\n" +
                msg4 + "\n" +
                "\n" +
                "렌탈 정보 확인하기 \n" +
                url



        };

    },
    hana_dev_rent_cancel: function(data){
        console.log('hana_dev_rent_cancel : ', data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        let bikeName = data.bikeName;
        let rentGugan = data.rentGugan;
        let rentGubun = data.rentGubun;
        let rentCompany = data.rentCompany;
        // let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let msg1 = data.msg1;
        let msg2 = data.msg2;
        let msg3 = data.msg3;
        let msg4 = data.msg4;
        let url = data.url;
        let rejectWhy = data.rejectWhy
        let serviceName = '하나손해보험 렌탈 바이크 시간제보험';
        // return;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"231626da2291a41524e2afd2a708558e512a392f",
            "token":"",
            "templateCode":"tpl_code=TO_3008",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=시간제보험 이륜차 렌탈 해지 완료 _TEST#2",
            "message":"message_1="+

                "하나손해보험 렌탈 바이크 시간제보험의 렌탈이 해지되었습니다.\n" +
                " \n" +
                "■ 해지 정보\n" +
                "- 플랫폼 : "+ platform + "\n" +
                "- 신청자명 : " + dName +"\n" +
                "- 이륜차명 : " + bikeName +"\n" +
                "- 렌탈 개월수 : " + rentGugan +"\n" +
                "- 차량형태 : " + rentGubun + "\n" +
                "- 렌탈사 : " + rentCompany +"\n" +
                " \n" +
                "■ 유의 사항\n" +
                msg1

            ,
            "button_1":{
                "button": [{
                    "name" : "렌탈 옵션 신청하기",
                    "linkType" : "WL",
                    "linkTypeName" : "웹링크",
                    "linkMo" : "https://hana-rent-bike-dev.simg.kr/rentselect/",
                    "linkPc" : "https://hana-rent-bike-dev.simg.kr/rentselect/",
                    "linkIos" : "",
                    "linkAnd" : ""

                }]
            },
            "failover":"Y",
            "fsubject_1":"가입신청안내",
            "fmessage_1":
                "하나손해보험 렌탈 바이크 시간제보험의 렌탈이 해지되었습니다.\n" +
                " \n" +
                "■ 해지 정보\n" +
                "- 플랫폼 : "+ platform + "\n" +
                "- 신청자명 : " + dName +"\n" +
                "- 이륜차명 : " + bikeName +"\n" +
                "- 렌탈 개월수 : " + rentGugan +"\n" +
                "- 차량형태 : " + rentGubun + "\n" +
                "- 렌탈사 : " + rentCompany +"\n" +
                " \n" +
                "■ 유의 사항\n" +
                msg1 + "\n" +

                "렌탈 옵션 선택하기\n" +
                "https://hana-rent-bike-dev.simg.kr/rentselect/"



        };

    },
    /*  */
    /**
     * 운영계 알림톡 발송 세팅
     * 1. hana_prod_requestSMS : 시간제보험 심사요청 완료 안내
     * 2. hana_prod_resultAcceptSMS : 시간제보험 심사통과 + 체결완료 안내
     * 3. hana_prod_resultRejectSMS : 시간제보험 심사거절 안내
     * 4. hana_prod_rent_request : 렌트사 선택 완료 알림톡 발송
     * 5. hana_prod_insurSuccess : 시간제보험 심사통과 on | 이륜차렌트계약(책임보험가입) on | 시간제보험 기명 on
     *                              - 배민에 결과 전달 다음날 아침 9시 [ 테스트계와 공용 ** 웹링크가 따로 없음 ]
     * 6. hana_prod_rent_cancel : 렌트계약 해지 [ 이륜차반납 | 책임보험해약 ] - SIMG CMS 각 완료 처리시 바로 발송
     */
    hana_prod_requestSMS: function(data){
        console.log(data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        // let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let msg1 = data.msg1;
        let msg2 = data.msg2;
        let msg3 = data.msg3;
        let serviceName = '하나손해보험 렌탈 바이크 시간제보험';
        // return;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"231626da2291a41524e2afd2a708558e512a392f",
            "token":"",
            "templateCode":"tpl_code=TO_2909",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=렌트 이륜차 심사요청 완료 안내_TEST#3",
            "message":"message_1="+
                "하나손해보험 렌탈 바이크 시간제보험을 신청해주셔서 감사합니다. \n" +
                // serviceName + " 안내 채널입니다.\n" +
                "\n" +
                // dName + "님 "+ serviceName + "을 신청해주셔서 감사합니다.\n" +
                // "\n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : " + platform + "\n" +
                "- 신청자명 : " + dName + "\n" +
                "- 상품 : "+ serviceName + "\n" +
                "\n" +
                "■ 유의사항\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                msg3


            // '■ 심사결과조회' +
            // 'https://hana-rent-bike-dev.simg.kr'
            // '\n' +
            // '심사결과는 영업일 기준으로 3~4일이 소요되며 신청 URL에서도 심사의 상태및 결과조회가 가능합니다.\n\n' +
            // '\n' +
            // "심사시에  추가 서류접수가 필요한 경우 별도의 절차를 위하여 개별 연락을 드릴 예정입니다. 이경우 소요기간이 더생길 수 있습니다."+"\n"
            ,
            "button_1":{
                "button": [{
                    "name" : "심사결과조회",
                    "linkType" : "WL",
                    "linkTypeName" : "웹링크",
                    "linkMo" : "https://hana-rent-bike.simg.kr/",
                    "linkPc" : "https://hana-rent-bike.simg.kr/",
                    "linkIos" : "",
                    "linkAnd" : ""

                }]
            },
            "failover":"Y",
            "fsubject_1":"가입신청안내",
            "fmessage_1":
                "하나손해보험 렌탈 바이크 시간제보험을 신청해주셔서 감사합니다. \n" +
                // serviceName + " 안내 채널입니다.\n" +
                "\n" +
                // dName + "님 "+ serviceName + "을 신청해주셔서 감사합니다.\n" +
                // "\n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : " + platform + "\n" +
                "- 신청자명 : " + dName + "\n" +
                "- 상품 : "+ serviceName + "\n" +
                "\n" +
                "■ 유의사항\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                msg3 + "\n" +
                '■ 심사결과조회\n' +
                'https://hana-rent-bike.simg.kr/'




        };

    },
    hana_prod_resultAcceptSMS: function(data){
        console.log('hana_dev_resultAcceptSMS : ', data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        // let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let msg1 = data.msg1;
        let msg2 = data.msg2;
        let msg3 = data.msg3;
        let msg4 = data.msg4;
        let msg5 = data.msg5;
        let url = data.url;
        let serviceName = '하나손해보험 렌탈 바이크 시간제보험';
        // return;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"231626da2291a41524e2afd2a708558e512a392f",
            "token":"",
            "templateCode":"tpl_code=TO_2908",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=렌트 이륜차 심사 통과 안내_PROD#1",
            "message":"message_1="+
                serviceName +" 심사가 통과되었습니다.\n" +
                "\n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : " + platform + "\n" +
                "- 신청자명 : " + dName  + "\n" +
                "- 상품명 : " + serviceName + "\n" +
                "\n" +
                "아래 신청버튼을 통해 렌탈 바이크를 신청해주세요.\n" +
                "\n" +
                "■ 유의사항\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                msg3 + "\n" +
                msg4 + "\n" +
                msg5

            ,
            "button_1":{
                "button": [{
                    "name" : "렌탈 바이크 신청하기",
                    "linkType" : "WL",
                    "linkTypeName" : "웹링크",
                    "linkMo" : url,
                    "linkPc" : url,
                    "linkIos" : "",
                    "linkAnd" : ""

                }]
            },
            "failover":"Y",
            "fsubject_1":"가입신청안내",
            "fmessage_1":
                "안녕하세요. \n" +
                serviceName +" 안내 채널입니다.\n" +
                "\n" +
                dName + "님 "+ serviceName +"의 심사결과 통과되어 안내드립니다.\n" +
                "아래 페이지에서 렌트 차량과 렌트사를 선택해주세요.\n" +
                "\n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : " + platform +"\n" +
                "- 상품명 : " + serviceName +"\n" +
                "- 신청자명 : " + dName + "\n" +
                "아래 신청버튼을 통해 렌탈 바이크를 신청해주세요" + "\n" +
                "\n" +
                "■ 유의사항\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                msg3 + "\n" +
                msg4 + "\n" +
                msg5 + "\n" +

                "■ 렌트사 선택 페이지\n" +
                url



        };

    },
    hana_prod_resultRejectSMS: function(data){
        console.log('hana_dev_resultRejectSMS : ', data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        // let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let msg1 = data.msg1;
        let msg2 = data.msg2;
        let msg3 = data.msg3;
        let msg4 = data.msg4;
        let url = data.url;
        let rejectWhy = data.rejectWhy
        let serviceName = '하나손해보험 렌탈 바이크 시간제보험';
        // return;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"231626da2291a41524e2afd2a708558e512a392f",
            "token":"",
            "templateCode":"tpl_code=TO_0540",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=렌트 이륜차 심사 거절 안내_TEST#1",
            "message":"message_1="+

                serviceName+" 심사 결과, 인수 심사 기준에 부합하지 않아 거절되었습니다.\n" +
                "\n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : " + platform +"\n" +
                "- 신청자명 : " + dName + "\n" +
                "- 거절사유 : " + rejectWhy + "\n" +
                "- 상품명 : " + serviceName + "\n" +
                "\n" +
                msg1 + "\n" +
                msg2 + "\n"


            // serviceName + " 심사 결과, 인수 심사 기준에 부합하지 않아 거절되었습니다.\n" +
            // "\n" +
            // "■ 신청 정보\n" +
            // "- 플랫폼 : " + platform +"\n" +
            // "- 신청자명 : " + dName+"\n" +
            // "- 거절사유 : " + rejectWhy +"\n" +
            // "- 상품명 : " + serviceName +"\n" +
            // "\n" +
            // msg1 + "\n" +
            // msg2 + "\n"


            // "안녕하세요. \n" +
            // serviceName +" 안내 채널입니다.\n" +
            // "\n" +
            // dName+"님 "+ serviceName + "의 심사결과 거절되어 안내드립니다.\n" +
            // "\n" +
            // "■ 신청 정보\n" +
            // "- 플랫폼 : " + platform +"\n" +
            // "- 상품명 : " + serviceName +"\n" +
            // "- 신청자명 : " + dName+"\n" +
            // "\n" +
            // "보험가입 심사결과 주요 인수심사 기준에 부합하지 않아 거절되었습니다.\n" +
            // "\n" +
            // "거절사유는 " + rejectWhy + "입니다."

            ,
            "button_1":{
                "button": [{
                    "name" : "배민커넥트 문의하기",
                    "linkType" : "WL",
                    "linkTypeName" : "웹링크",
                    "linkMo" : url,
                    "linkPc" : url,
                    "linkIos" : "",
                    "linkAnd" : ""

                }]
            },
            "failover":"Y",
            "fsubject_1":"가입신청안내",
            "fmessage_1":
                serviceName + " 심사 결과, 인수 심사 기준에 부합하지 않아 거절되었습니다.\n" +
                "\n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : " + platform +"\n" +
                "- 신청자명 : " + dName+"\n" +
                "- 거절사유 : " + rejectWhy +"\n" +
                "- 상품명 : " + serviceName +"\n" +
                "\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                "\n" +
                "배민커넥트 문의하기\n" +
                url



        };

    },
    hana_prod_rent_request: function(data){
        console.log('hana_prod_rent_request : ', data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        let bikeName = data.bikeName;
        let rentGugan = data.rentGugan;
        let rentGubun = data.rentGubun;
        let rentCompany = data.rentCompany;
        // let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let msg1 = data.msg1;
        let msg2 = data.msg2;
        let msg3 = data.msg3;
        let msg4 = data.msg4;
        let url = data.url;
        let rejectWhy = data.rejectWhy
        let serviceName = '하나손해보험 렌탈 바이크 시간제보험';
        // return;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"231626da2291a41524e2afd2a708558e512a392f",
            "token":"",
            "templateCode":"tpl_code=TO_2905",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=렌트 이륜차 렌트 신청완료_TEST#1",
            "message":"message_1="+

                // "렌탈 바이크 계약 신청이 완료되었습니다.\n" +
                // "\n" +
                // "■ 신청 정보\n" +
                // "- 플랫폼 : "+ platform + "\n" +
                // "- 신청자명 : " + dName +"\n" +
                // "- 이륜차명 : " + bikeName +"\n" +
                // "- 렌탈 개월수 : " + rentGugan +"\n" +
                // "- 차량형태 : " + rentGubun + "\n" +
                // "- 렌탈사 : " + rentCompany +"\n" +
                // "\n" +
                // "■ 유의사항\n" +
                // msg1 + "\n" +
                // msg2 + "\n" +
                // msg3 + "\n" +
                // msg4 + "\n"

                "렌탈 바이크 계약 신청이 완료되었습니다.\n" +
                "\n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : " + platform + "\n" +
                "- 신청자명 : " + dName + "\n" +
                "- 이륜차명 : " + bikeName +"\n" +
                "- 렌탈 개월수 : " + rentGugan +"\n" +
                "- 차량형태 : " + rentGubun +"\n" +
                "- 렌탈사 : " + rentCompany +"\n" +
                "\n" +
                "■ 유의사항\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                msg3 + "\n" +
                msg4 + "\n"





            ,
            "button_1":{
                "button": [{
                    "name" : "렌탈 정보 확인하기",
                    "linkType" : "WL",
                    "linkTypeName" : "웹링크",
                    "linkMo" : url,
                    "linkPc" : url,
                    "linkIos" : "",
                    "linkAnd" : ""

                }]
            },
            "failover":"Y",
            "fsubject_1":"가입신청안내",
            "fmessage_1":
                "렌탈 바이크 계약 신청이 완료되었습니다.\n" +
                "\n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : "+ platform + "\n" +
                "- 신청자명 : " + dName +"\n" +
                "- 이륜차명 : " + bikeName +"\n" +
                "- 렌탈 개월수 : " + rentGugan +"\n" +
                "- 차량형태 : " + rentGubun + "\n" +
                "- 렌탈사 : " + rentCompany +"\n" +
                "\n" +
                "■ 유의사항\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                msg3 + "\n" +
                msg4 + "\n" +
                "\n" +
                "렌탈 정보 확인하기 \n" +
                url



        };

    },
    hana_prod_insurSuccess: function(data){
        console.log('hana_prod_insurSuccess : ', data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        // let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let rentCompany = data.rentCompany;
        let msg1 = data.msg1;
        let msg2 = data.msg2;
        let msg3 = data.msg3;
        let msg4 = data.msg4;
        let url = data.url;
        let rejectWhy = data.rejectWhy
        let serviceName = '하나손해보험 렌탈 바이크 시간제보험';
        // return;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"231626da2291a41524e2afd2a708558e512a392f",
            "token":"",
            "templateCode":"tpl_code=TO_2911",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=렌트 이륜차 심사 거절 안내_TEST#1",
            "message":"message_1="+

                "하나손해보험 렌탈 바이크 시간제보험 이용이 가능합니다.\n" +
                " \n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : " + platform + "\n" +
                "- 신청자명 : " + dName + "\n" +
                "- 이륜차량번호 : " + carNum + "\n" +
                "- 렌탈사 : " + rentCompany + "\n" +
                "\n" +
                "■ 유의 사항\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                msg3


            ,
            /*
            "button_1":{
                "button": [{
                    "name" : "배민커넥트 문의하기",
                    "linkType" : "WL",
                    "linkTypeName" : "웹링크",
                    "linkMo" : url,
                    "linkPc" : url,
                    "linkIos" : "",
                    "linkAnd" : ""

                }]
            },
             */
            "failover":"Y",
            "fsubject_1":"가입신청안내",
            "fmessage_1":
                "하나손해보험 렌탈 바이크 시간제보험 이용이 가능합니다.\n" +
                " \n" +
                "■ 신청 정보\n" +
                "- 플랫폼 : " + platform + "\n" +
                "- 신청자명 : " + dName + "\n" +
                "- 이륜차량번호 : " + carNum + "\n" +
                "- 렌탈사 : " + rentCompany + "\n" +
                "\n" +
                "■ 유의 사항\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                msg3



        };

    },
    hana_prod_rent_cancel: function(data){
        console.log('hana_prod_rent_cancel : ', data);
        let platform = data.platform;
        let cell = data.cell;
        let dName = data.dName;
        let bikeName = data.bikeName;
        let rentGugan = data.rentGugan;
        let rentGubun = data.rentGubun;
        let rentCompany = data.rentCompany;
        // let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let msg1 = data.msg1;
        let msg2 = data.msg2;
        let msg3 = data.msg3;
        let msg4 = data.msg4;
        let url = data.url;
        let rejectWhy = data.rejectWhy
        let serviceName = '하나손해보험 렌탈 바이크 시간제보험';
        // return;

        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"231626da2291a41524e2afd2a708558e512a392f",
            "token":"",
            "templateCode":"tpl_code=TO_3009",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=시간제보험 이륜차 렌탈 해지 완료 _PROD#1",
            "message":"message_1="+

                "하나손해보험 렌탈 바이크 시간제보험의 렌탈이 해지되었습니다.\n" +
                " \n" +
                "■ 해지 정보\n" +
                "- 플랫폼 : " + platform + "\n" +
                "- 신청자명 : " + dName + "\n" +
                "- 이륜차량명 : " + bikeName + "\n" +
                "- 렌탈개월수 : " + rentGugan + "\n" +
                "- 차량형태 : " + rentGubun + "\n" +
                "- 렌탈사 : " + rentCompany + "\n" +
                " \n" +
                "■ 유의 사항\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                msg3




            ,
            "button_1":{
                "button": [{
                    "name" : "렌탈 옵션 신청하기",
                    "linkType" : "WL",
                    "linkTypeName" : "웹링크",
                    "linkMo" : "https://hana-rent-bike.simg.kr/rentselect/",
                    "linkPc" : "https://hana-rent-bike.simg.kr/rentselect/",
                    "linkIos" : "",
                    "linkAnd" : ""

                }]
            },
            "failover":"Y",
            "fsubject_1":"렌탈 바이크 반납안내",
            "fmessage_1":
                "하나손해보험 렌탈 바이크 시간제보험의 렌탈이 해지되었습니다.\n" +
                " \n" +
                "■ 해지 정보\n" +
                "- 플랫폼 : "+ platform + "\n" +
                "- 신청자명 : " + dName +"\n" +
                "- 이륜차명 : " + bikeName +"\n" +
                "- 렌탈 개월수 : " + rentGugan +"\n" +
                "- 차량형태 : " + rentGubun + "\n" +
                "- 렌탈사 : " + rentCompany +"\n" +
                " \n" +
                "■ 유의 사항\n" +
                msg1 + "\n" +
                msg2 + "\n" +
                msg3 + "\n" +
                "\n" +

                "렌탈 옵션 선택하기\n" +
                "https://hana-rent-bike.simg.kr/rentselect/"



        };

    },

};




