import mysql from 'mysql2/promise';
const connection = mysql.createPool({
    host: '119.28.157.86',
    user: 'root',
    password: '123456!',
    database: 'table_six',
});
export default connection;