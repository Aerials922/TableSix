import mysql from 'mysql2/promise';
const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'table_six',
});
export default connection;