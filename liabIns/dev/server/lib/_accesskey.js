
function access_confing() {

    var return_val = {
        "acc_test" : [
            {
                apikey      : "6AAE28A0-82C9-11EE-9FA0-AB83F22BCE84",
                enckey      : "8C165E493A4F3E028EF66CB7D3BA1B94",
                iv          : "b6a8603a46e76d24",
                bpk         : 2,
                plfName     : "벨류맵",
                dbKey       : "client_dev_db_config",
                url     : "https://insurance-open-api-dev.simg.kr/",
                infoPage : "https://insurance-info-test.simg.kr/"
            },
            {
                apikey      : "6F9013A0-7C5D-11EE-A02B-FFB0FF9E9C81",
                enckey      : "4D642908641E1BF379EE836A4880D135",
                iv          : "4bef31f208e93910",
                bpk         :1,
                plfName     : "마이체크업",
                dbKey       : "client_dev_db_config",
                url     : "https://insurance-open-api-dev.simg.kr/",
                infoPage : "https://test-mycheckup-insu.simg.kr/"
            },
            {
                apikey      : "A721EAC4-289D-4E2E-B24E-00B16C885C8C",
                enckey      : "B0E195E013C99D59E09B7817B0E7C2CB",
                iv          : "72994385f5d9b9c5",
                bpk         : 11,
                plfName     : "쏘카",
                dbKey       : "simgCms",
                url     : "https://insurance-open-api-dev.simg.kr/",
                infoPage : "https://socar-accident.simgbiz.net/"
            },

        ],
        "acc_prod" : [
            {
                apikey     : "3C4FDCEA-0715-4D45-B548-BCDB8F1A7750",
                enckey     : "B0E195E013C99D59E09B7817B0E7C2CB",
                iv     : "72994385f5d9b9c5",
                bpk     : 2,
                plfName : "벨류맵",
                dbKey : "client_prod_db_config",
                url : "https://insurance-open-api-dev.simg.kr/",
                infoPage : "https://insurance-info.simg.kr/"
            },
            {
                apikey      : "B9452A8B-C7A4-4712-A823-77EB5BC647F2",
                enckey      : "1E2211CC3BC0091936790E98F7DBAE52",
                iv          : "e9f87f9e2f97b2a0",
                bpk         : 1,
                plfName     : "마이체크업",
                dbKey       : "client_prod_db_config",
                url     : "https://insurance-open-api-dev.simg.kr/",
                infoPage : "https://mycheckup-insu.simg.kr/"
            },
            {
                apikey      : "A721EAC4-289D-4E2E-B24E-00B16C885C8C",
                enckey      : "B0E195E013C99D59E09B7817B0E7C2CB",
                iv          : "72994385f5d9b9c5",
                bpk         : 11,
                plfName     : "쏘카",
                dbKey       : "simgCms",
                url     : "https://insurance-open-api-dev.simg.kr/",
                infoPage : "https://socar-accident.simgbiz.net/"
            },
        ]
    }
    return return_val;
}

module.exports = access_confing;
