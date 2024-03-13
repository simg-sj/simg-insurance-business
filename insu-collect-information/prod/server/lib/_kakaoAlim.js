
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


};




