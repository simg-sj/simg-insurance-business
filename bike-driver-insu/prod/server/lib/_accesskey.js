
function access_confing() {

    var return_val = {
        "acc_test" : [
            {
                apikey      : "491B32C8-7AAA-4F1A-928F-1B97671990F2",
                enckey      : "",
                iv          : "",
                bpk         : 0,
                plfName     : "",
                dbKey       : "client_dev_db_config",
                joinUrl     : "https://bike-driver-insu-dev.simg.kr/"
            },
            {
                apikey      : "3A3672E0-877E-11EE-B95A-37EA279471BC",
                enckey      : "8DDD6E2C3E98A37EC34968B4729F9F85",
                iv          : "883ebad34db5eadf",
                bpk         : 3,
                plfName     : "온나플러스",
                dbKey       : "client_dev_db_config",
                joinUrl     : "https://bike-driver-insu-dev.simg.kr/"
            },
            {
                apikey      : "564B9289-ECB6-4AA9-94D2-0CC9C8DA7EFB",
                enckey      : "4BBE94B08925641471C7365FA42C2570",
                iv          : "e414d3dedb956b1a",
                bpk         :4,
                plfName     : "이누리",
                dbKey       : "client_dev_db_config",
                joinUrl     : "https://bike-driver-insu-dev.simg.kr/"
            },
            {
                apikey      : "3C5449D0-877E-11EE-A10C-5BD01AD53E52",
                enckey      : "A65A7086F4ABF81686C67AF1EC8375D7",
                iv          : "aba1c6e16f603182",
                bpk         :5,
                plfName     : "바리코퍼레이션",
                dbKey       : "client_dev_db_config",
                joinUrl     : "https://bike-driver-insu-dev.simg.kr/"
            },

        ],
        "acc_prod" : [
            {
                apikey      : "491B32C8-7AAA-4F1A-928F-1B97671990F2",
                enckey      : "",
                iv          : "",
                bpk         : 0,
                plfName     : "",
                dbKey       : "client_dev_db_config",
                joinUrl     : "https://bike-driver-insu-dev.simg.kr/"
            },
            {
                apikey     : "3C4FDCEA-0715-4D45-B548-BCDB8F1A7750",
                enckey     : "1EA85197CE6D6E096DD813A018399CC5",
                iv     : "3c9bed1e668d7fec",
                bpk     : 3,
                plfName : "온나플러스",
                dbKey : "client_prod_db_config",
                joinUrl     : "https://bike-driver-insu.simg.kr/"
            },
            {
                apikey      : "B9452A8B-C7A4-4712-A823-77EB5BC647F2",
                enckey      : "C6EC58342223B555FF560719A326CE1F",
                iv          : "eebfa75565a09b2a",
                bpk         : 4,
                plfName     : "이누리",
                dbKey       : "client_prod_db_config",
                joinUrl     : "https://bike-driver-insu.simg.kr/"
            },
            {
                apikey      : "B8155760-98AB-11EE-B91C-F5E6D3038D0E",
                enckey      : "017CD432DD0414E579EBF117D1F96086",
                iv          : "958a0e30e8be5ff9",
                bpk         : 5,
                plfName     : "바리코퍼레이션",
                dbKey       : "client_prod_db_config",
                joinUrl     : "https://bike-driver-insu.simg.kr/"
            },
        ]
    }
    return return_val;
}

module.exports = access_confing;
