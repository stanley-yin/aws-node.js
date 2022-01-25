const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "ls-d79d603c118a2aba867250d55cdd2bf276ac871d.cxkg1sljtrq7.ap-northeast-1.rds.amazonaws.com",
    user: "dbmasteruser",
    password: 'LV`n2J{g{%m0`_L2mWOJLD}_J4zegW.O',
    database: "test1",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit:0,
});

module.exports = pool.promise();