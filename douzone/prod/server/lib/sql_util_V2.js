// lib/sql_util.js
const mysql = require('mysql2/promise');  // ← 추천: promise 기반 mysql2 쓰면 코드 깔끔

// 모든 스키마별 Pool 미리 생성
const pools = {};
const dbConfigs = require('../config/_config'); // { schema1: {host, user, ...}, schema2: {host, user, ...} }

for (const schema in dbConfigs) {
    pools[schema] = mysql.createPool(dbConfigs[schema]);
}

// 이제 mysql_proc_exec 수정
async function mysql_proc_exec(query, apiKey) {
    const schema = _util.getDbAccessInfo(apiKey);

    const pool = pools[schema];
    if (!pool) {
        throw new Error('Invalid DB Schema');
    }

    try {
        const [rows] = await pool.query(query);
        return rows;
    } catch (err) {
        console.error('쿼리 에러:', err);
        throw err;
    }
}

module.exports = {
    mysql_proc_exec
};
