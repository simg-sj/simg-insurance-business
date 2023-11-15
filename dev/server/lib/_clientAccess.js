function client_access_confing() {

    var return_val = {
        "bike_config_dev" : [
            {
                apiProp     : "X-BIKE-INSURANCE-HANA-SECRET",
                baeminKey     : "5FA6DCD9-1E89-4FEB-B19D-4B14D2D0DE46",
                apikey      : "1F478190-F877-11ED-86DA-3B753D9AE9E1",
                apiUrl     : "http://brms-external-api.betabaemin.com",
                under : "/api/v1/insurance/bike/hana/underwriting",
                accident :"/api/v1/insurance/bike/hana/accident-history",
                bpk     : 7,
                dbKey:""
            },
        ],
        "bike_config_prod" : [
            {
                apiProp     : "X-BIKE-INSURANCE-HANA-SECRET",
                baeminKey     : "C2781D4E-ADAD-4985-B8AA-61C4E97BB0E2",
                apikey      : "FA2A5A62-E453-4400-BD21-CB3353AD9582",
                apiUrl     : "https://brms-external-api.baemin.com",
                under : "/api/v1/insurance/bike/hana/underwriting",
                accident :"/api/v1/insurance/bike/hana/accident-history",
                bpk     : 7,
                dbKey:""
            },
        ]
    }
    return return_val;
}

module.exports = client_access_confing;