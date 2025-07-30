import connection from '../config/mysql.js';

export const buyingIn = async (username, ticker, amount) => {
    try {
        const queryToSelectId = 'SELECT id FROM user WHERE username = ?';
        const [rows] = await connection.query(queryToSelectId, [username]);
        const queryToGetPrice = 'SELECT close FROM ' + ticker + '_pricedata ORDER BY timestamp DESC LIMIT 1';
        const [priceRows] = await connection.query(queryToGetPrice, [ticker]);
        if (priceRows.length === 0) {
            console.warn(`Ticker ${ticker} not found.`);
            return res.status(404).json({ message: 'Ticker not found.' });
        }
        const price = priceRows[0].close;
        if (rows.length != 0) {
            const userId = rows[0].id;
            const queryToBuyingIn = 'INSERT INTO positions (user_id, ticker, amount, price) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE amount = amount + VALUES(amount)';
            const [result] = await connection.query(queryToBuyingIn, [userId, ticker, amount, price]);
            return {
                username,
                ticker,
                amount,
                price
            };
        } else {
            console.warn(`User ${username} not found.`);
            return res.status(404).json({ message: 'User not found.' });
        }

    } catch (error) {
        console.error('Error during buying in:', error);

    }
}

export const buyingOut = async (username, ticker, amount) => {

    try {
        const queryToSelectId = 'SELECT id FROM user WHERE username = ?';
        const [rows] = await connection.query(queryToSelectId, [username]);
        const queryToGetPrice = 'SELECT close FROM ' + ticker + '_pricedata ORDER BY timestamp DESC LIMIT 1';
        const [priceRows] = await connection.query(queryToGetPrice, [ticker]);
        if (priceRows.length === 0) {
            console.warn(`Ticker ${ticker} not found.`);
            return res.status(404).json({ message: 'Ticker not found.' });
        }
        const price = priceRows[0].close;
        if (rows.length != 0) {
            const userId = rows[0].id;
            const queryToBuyingOut = 'UPDATE positions SET amount = amount - ?, price = ?WHERE user_id = ? AND ticker = ?';
            const [result] = await connection.query(queryToBuyingOut, [amount, price, userId, ticker]);
        } else {
            console.warn(`User ${username} not found.`);
            return res.status(404).json({ message: 'User not found.' });
        }
        return {
            username,
            ticker,
            amount,
            price
        };

    } catch (error) {
        console.error('Error during buying out:', error);
    }
}