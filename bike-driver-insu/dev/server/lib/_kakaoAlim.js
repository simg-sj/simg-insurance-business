module.exports = {


    joinAlim: function(data){
        console.log(data);
        let platform = data.platform;
        let cell = data.cell;
        let cName = data.cName;
        let serviceName = data.serviceName;
        let product = data.product;
        let carNum = data.dCarNum;
        let note1 = data.note1;


        return result = {
            "ALIGO_API_KEY":"xme5by3owdpvjw22tr57qzc2dwh7ch8f",
            "ALIGO_USER_ID":"yoojjtt",
            "ALIGO_SENDER_KEY":"91ab107659437be7236428d01f25912eaae9519b",
            "token":"",
            "templateCode":"tpl_code=TQ_2887",
            "sender":"sender=18773006",
            "receiver":"receiver_1="+cell,
            "subject":"subject_1=가입신청안내",
            "message":"message_1="+
                "안녕하세요\n" +
                "에스아이엠지 가입신청 안내 채널입니다.\n" +
                cName+ "님\n" +
                product + " 가입 신청 감사합니다.\n" +
                "\n" +
                "▣ 가입 신청 정보\n" +
                "- 상품명 : " + product + "\n" +
                "- 소속플랫폼 : " + platform + "\n" +
                "- 신청자명 : " + cName + "\n" +
                "- 연락처 : " + cell + "\n" +
                "\n" +
                "신청 주신 정보로 곧 담당자가 연락드릴 예정입니다.\n" +
                "\n" +
                "▣ 유의 사항\n" +
                note1,
            "failover":"Y",
            "fsubject_1":"가입신청안내",
            "fmessage_1":  "안녕하세요\n" +
                "에스아이엠지 가입신청 안내 채널입니다.\n" +
                cName+ "님\n" +
                product + " 가입 신청 감사합니다.\n" +
                "\n" +
                "▣ 가입 신청 정보\n" +
                "- 상품명 : " + product + "\n" +
                "- 소속플랫폼 : " + platform + "\n" +
                "- 신청자명 : " + cName + "\n" +
                "- 연락처 : " + cell + "\n" +
                "\n" +
                "신청 주신 정보로 곧 담당자가 연락드릴 예정입니다.\n" +
                "\n" +
                "▣ 유의 사항\n" +
                note1,




        };
    },
};

