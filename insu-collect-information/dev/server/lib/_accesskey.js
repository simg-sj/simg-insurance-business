
function access_confing() {

    var return_val = {
        "acc_test" : [
            {
                apikey      : "1F478190-F877-11ED-86DA-3B753D9AE9E1",
                enckey      : "96C004DE15033A7CC34FEA599197D764",
                iv          : "7635b399089076e8",
                bpk         : 7,
                rbpk        : 1, // 테스트때문에 1로 설정 [ 아직 이륜차 렌트차량 정보 + 렌트사 정보 받지 못함 ]
                plfName     : "배달의민족",
                dbKey       : "baemin_config_Dev",
                joinUrl     : "https://hana-rent-bike-dev.simg.kr/"
            },
            {
                apikey      : "650E36A0-D771-11ED-A201-8F58828963CF",
                enckey      : "88C9003AA709C296A125C3F8A14602C0",
                iv          : "7e160581552dc32b",
                bpk         :8,
                rbpk        : 4,
                plfName     : "딜버",
                dbKey       : "baemin_config_Dev",
                joinUrl     : "https://hana-rent-bike-dev.simg.kr/"
            },
            {
                apikey      : "8C8FE668-DF0A-49DE-B9E6-F94D3C1F4806",
                enckey      : "4880BA2E2E62455D203F3F888E026A93",
                iv          : "c6a22f9bfaef5f13",
                bpk         : 9,
                rbpk        : 5,
                plfName     : "딜리온",
                dbKey       : "baemin_config_Dev",
                joinUrl     : "https://hana-rent-bike-dev.simg.kr/"
            }
        ],
        "acc_prod" : [
            {
                apikey     : "FA2A5A62-E453-4400-BD21-CB3353AD9582",
                enckey     : "40385B5CBE5FF4E3B4A299659B2E612C",
                iv     : "f5b0c253fe5d8c4f",
                bpk     : 7,
                plfName : "배달의민족",
                dbKey : "baemin_config_prod",
                joinUrl : "https://hana-rent-bike.simg.kr/"
            },
            {
                apikey      : "66082700-D771-11ED-96C9-F57C53DE7061",
                enckey      : "D8A1F6165F52935797DC92036B165C9E",
                iv          : "53b1ceeac9f790b9",
                bpk         : 8,
                rbpk        : 4,
                plfName     : "딜버",
                dbKey       : "baemin_config_prod",
                joinUrl     : "https://hana-rent-bike-dev.simg.kr/"
            },
            {
                apikey      : "95A72E1B-D0C0-4FCA-8375-C33CB482CCD5",
                enckey      : "7A4254A905DD0FAFFF16B48DEC0A991F",
                iv          : "91c5527d35ebe0f2",
                bpk         : 9,
                rbpk        : 5,
                plfName     : "딜리온",
                dbKey       : "baemin_config_prod",
                joinUrl     : "https://hana-rent-bike-dev.simg.kr/"
            }
        ]
    }
    return return_val;
}

module.exports = access_confing;
