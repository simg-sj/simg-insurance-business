const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../../.env' });
const mysql_util = require('./sql_util');
const _util = require('./_util');

module.exports = {
    // accessToken 발급 함수
    makeAccessToken: function (Object) {
        const token = jwt.sign(
            Object,
            process.env.REFRESH_TOKEN_SECRUE_KEY,
            {expiresIn: "60m"}
        );
        return token;
    },
    // refreshToken 발급 함수
    makeRefreshToken: function () {
        const refreshToken = jwt.sign(
            {},
            process.env.REFRESH_TOKEN_SECRUE_KEY,
            {
                algorithm: "HS256",
                expiresIn: "60m"
            }
        );
        console.log(refreshToken)
        return refreshToken;
    },

    // refresh token 유효성 검사
    refreshVerify: async function (token,apiKey, param) {
        const sql = (param) => {
            return `select refreshToken
                    from CmsUser
                    where userId = '${param.userId}' and password = '${param.password}';`
        };

        try {
            let res = await mysql_util.mysql_proc_exec(sql, apiKey);
            console.log('res ::: ', res);
            let d = res[0][0];
            return d;
        } catch (error) {
            console.log('Cms ERROR : ', error)

            throw error;
        }
    },

    // access token 유효성 검사
    verify: function (token) {
        try {
            const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRUE_KEY);
            return {
                ok: true,
                id: decoded.id
            };
        } catch (error) {
            return {
                ok: false,
                message: error.message,
            };
        }
    }
}


