import connection from "../config/mysql.js";
import User from '../constant/user.js';

export const loginService = async (username, password) => {
    const query = 'SELECT * FROM user WHERE username = ?';
    const [rows] = await connection.query(query, [username]);
    if (rows.length === 0) {
        throw new Error('User not found');
    }
    const userResult = rows[0];
    
    if (userResult && userResult.password === password) {
        // 使用查询结果中的 username 和 password 创建 User 对象
        const user = new User(userResult.username, userResult.password);
        user.cash = userResult.cash; // 设置初始现金余额
        return user;
    } else {
        throw new Error('Invalid username or password');
    }
}
export const registerService = async (username, password, cash) => {
    const query = 'INSERT INTO user (username, password, cash) VALUES (?, ?, ?)';

    try {
        // 插入新用户到数据库
        const [result] = await connection.query(query, [username, password, cash]);

        if (result.affectedRows > 0) {
            // 注册成功，打印日志并返回 true
            console.log(`User ${username} registered successfully with ID ${result.insertId}`);
            return true;
        } else {
            // 注册失败
            throw new Error('Registration failed');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};
