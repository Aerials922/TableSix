import connection from '../config/mysql.js';

// 根据username获取用户的cash
export const getUserCash = async (username) => {
    try {
        const query = 'SELECT cash FROM user WHERE username = ?';
        const [rows] = await connection.query(query, [username]);
        if (rows.length > 0) {
            return rows[0].cash;
        } else {
            console.warn(`User ${username} not found.`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching user cash:', error);
        throw error;
    }
}

// 根据用户username更新用户的现金余额
export const updateUserCash = async (username, rechargeAmount) => {
    try {
        const query = 'UPDATE user SET cash = cash + ? WHERE username = ?';
        const [result] = await connection.query(query, [rechargeAmount, username]);
        if (result.affectedRows > 0) {
            console.log(`User ${username} cash updated successfully.`);
            return true;
        } else {
            console.warn(`User ${username} not found or cash not updated.`);
            return false;
        }
    } catch (error) {
        console.error('Error updating user cash:', error);
        throw error;
    }
}