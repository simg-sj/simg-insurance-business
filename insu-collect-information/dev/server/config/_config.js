
function db_config() {

    var return_val = {
        "client_dev_db_config" : {
            host     : 'simg-center.c73he84duiho.ap-northeast-2.rds.amazonaws.com',
            port     : 3306,
            user     : 'simg',
            password : 'simg8970',
            database : 'simgClientDev',
            options: {
                connectTimeout  : 1000 * 480,
                requestTimeout  : 1000 * 480
            },
            multipleStatements: true
        },
        "client_prod_db_config" : {
            host     : 'simg-center.c73he84duiho.ap-northeast-2.rds.amazonaws.com',
            port     : 3306,
            user     : 'simg',
            password : 'simg8970',
            database : 'simg_client',
            options: {
                connectTimeout: 1000 * 480,
                requestTimeout: 1000 * 480
            },
            multipleStatements: true
        },
    }

    return return_val;
}

module.exports = db_config;
