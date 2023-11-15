
function db_config() {

    var return_val = {
        "baemin_config_Dev" : {
            host     : 'hana-development.c73he84duiho.ap-northeast-2.rds.amazonaws.com',
            port     : 3306,
            user     : 'simg',
            password : 'simg4*7^3',
            database : 'rentBikeDev',
            options: {
                connectTimeout  : 1000 * 480,
                requestTimeout  : 1000 * 480
            },
            multipleStatements: true
        },
        "baemin_config_prod" : {
            host: 'hana-production.c73he84duiho.ap-northeast-2.rds.amazonaws.com',
            port: 3306,
            user: 'simg',
            password: 'simg$7^#',
            database: 'rentBikeDev',
            options: {
                connectTimeout: 1000 * 480,
                requestTimeout: 1000 * 480
            },
            multipleStatements: true
        },
        "msg_config" : {
            host     : 'baemin-prod.c73he84duiho.ap-northeast-2.rds.amazonaws.com',
            port     : 3306,
            user     : 'root',
            password : 'simg1234',
            database : 'msgSchema',
            options: {
                connectTimeout  : 1000 * 480,
                requestTimeout  : 1000 * 480
            },
            multipleStatements: true
        },
    }

    return return_val;
}

module.exports = db_config;
