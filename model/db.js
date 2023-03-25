const mariadb = require('mariadb');
/*
const pool = mariadb.createPool({
    host : 'svc.gksl2.cloudtype.app',
    user : 'root',
    port:'32586',
    database : 'test10',
    password : '12345', 
    connectionLimit : 5
})
*/
const dotenv = require('dotenv');
dotenv.config();

const connection = ()=>{
    const pool = mariadb.createPool({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        port:process.env.DB_PORT,
        database : process.env.DB_NAME,
        password : process.env.DB_PASS, 
        connectionLimit : 5
    })

    return pool;
}

module.exports = connection;