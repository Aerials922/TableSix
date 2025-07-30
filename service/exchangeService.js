import connection from '../config/mysql.js';

export const buyingIn = async (username, ticker, amount) => {
    try {
        const queryToSelectId = 'SELECT id FROM user WHERE username = ?';
        const [rows] = await connection.query(queryToSelectId, [username]);
        if (rows.length != 0) {
            const userId = rows[0].id;
            const queryToBuyingIn = 'INSERT INTO positions (user_id, ticker, amount) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE amount = amount + VALUES(amount)';
        const [result] = await connection.query(queryToBuyingIn, [userId, ticker, amount]);
        } else {
            console.warn(`User ${username} not found.`);
            return res.status(404).json({ message: 'User not found.' });
        }
        
    }catch (error) {
        console.error('Error during buying in:', error);
        
    }   
}

export const buyingOut = async (username, ticker, amount) => {
    
    try {
        const queryToSelectId = 'SELECT id FROM user WHERE username = ?';
        const [rows] = await connection.query(queryToSelectId, [username]);
        if (rows.length != 0) {
            const userId = rows[0].id;
            const queryToBuyingOut = 'UPDATE positions SET amount = amount - ? WHERE user_id = ? AND ticker = ?';
        const [result] = await connection.query(queryToBuyingOut, [amount, userId, ticker]);
        } else {
            console.warn(`User ${username} not found.`);
            return res.status(404).json({ message: 'User not found.' });
        }
        
    }    catch (error) {
        console.error('Error during buying out:', error);
    }
}