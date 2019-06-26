const mysql = require('mysql');
//创建数据库连接对象
const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'project',
        multipleStatements: true
    })
    //暴露数据库连接对象
module.exports = conn