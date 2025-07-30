import connection from "../config/mysql.js";

export const getPosition = async (username) => {
    try {
        const queryToSelectId = 'SELECT id FROM user WHERE username = ?';
        const [rows] = await connection.query(queryToSelectId, [username]);
        if (rows.length === 0) {
            console.warn(`User ${username} not found.`);
            return { message: 'User not found.' };
        }
        const userId = rows[0].id;
        const queryToGetPositions = 'SELECT ticker, amount, price FROM positions WHERE user_id = ?';
        const [positions] = await connection.query(queryToGetPositions, [userId]);
        return positions;
    } catch (error) {
        console.error('Error during getting positions:', error);
        throw error;
    }
}