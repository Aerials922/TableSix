import mysql from 'mysql2/promise';
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'n3u3da!',
    database: 'table_six',
});
export default connection;