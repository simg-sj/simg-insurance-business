
function access_confing() {

    var return_val = {
        "acc_test" : [
            {
                apikey      : "6AAE28A0-82C9-11EE-9FA0-AB83F22BCE84",
                enckey      : "8C165E493A4F3E028EF66CB7D3BA1B94",
                iv          : "b6a8603a46e76d24",
                bpk         : 2,
                plfName     : "벨류맵",
                dbKey       : "client_prod_db_config",
                url     : "https://insurance-open-api-dev.simg.kr/",
                infoPage : "https://insurance-info-test.simg.kr/"
            },
            {
                apikey      : "6F9013A0-7C5D-11EE-A02B-FFB0FF9E9C81",
                enckey      : "4D642908641E1BF379EE836A4880D135",
                iv          : "4bef31f208e93910",
                bpk         :1,
                plfName     : "마이체크업",
                dbKey       : "client_prod_db_config",
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
            {
                apikey      : "FA4A2F94-B9F4-41A0-B064-BFA28CE23BF6",
                enckey      : "B04367245B0909C80448F3DF4C242783",
                iv          : "9d962141142afb22",
                bpk         : 7,
                plfName     : "더존 비즈온",
                dbKey       : "client_prod_db_config",
                url     : "https://douzone.simg.kr/",
                infoPage : "https://douzone.simg.kr/"
            },
            {
                apikey      : "B205AE40-5DE7-11EF-ACD4-0FB53CCF9E72",
                enckey      : "B04367245B0909C80448F3DF4C242783",
                iv          : "9d962141142afb22",
                bpk         : 2,
                plfName     : "하이파킹",
                dbKey       : "parking_db_config",
                url     : "https://hiparking.simg.kr/",
                infoPage : "https://hiparking-insu.simg.kr/"
            },
            {
                apikey      : "3BF7D5E8-1DEF-4AE2-8CA2-5004BF40EC8A",
                enckey      : "C659AD2C842080A8ED3567114AB9025B",
                iv          : "5041a9fa5d5b4bb4",
                bpk         : 8,
                plfName     : "행사주최자보험",
                dbKey       : "client_prod_db_config",
                url     : "https://eventInsu.simg.kr/",
                infoPage : "https://eventInsu.simg.kr/"
            },
        ]
    }
    return return_val;
}

module.exports = access_confing;
