import mysql from 'mysql2/promise';
const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'n3u3da!',
    database: 'table_six',
});
export default connection;