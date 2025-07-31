import connection from '../config/mysql.js';

export const buyingIn = async (username, ticker, amount) => {
    try {
        console.log('Buying in:', { username, ticker, amount });
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
            //检测user表中的现金余额是否足够
            const queryToCheckCash = 'SELECT cash FROM user WHERE id = ?';
            const [cashRows] = await connection.query(queryToCheckCash, [userId]);
            if (cashRows.length === 0 || cashRows[0].cash < amount * price) {
                console.warn(`User ${username} does not have enough cash to buy in.`);
                return res.status(400).json({ message: 'Insufficient cash balance.' });
            }
            //修改user表中的现金余额
            const queryToUpdateCash = 'UPDATE user SET cash = cash - ? * ? WHERE id = ?';
            await connection.query(queryToUpdateCash, [amount, price, userId]);
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
        console.log('Buying out:', { username, ticker, amount });
        const queryToSelectId = 'SELECT id FROM user WHERE username = ?';
        const [rows] = await connection.query(queryToSelectId, [username]);
        console.log('User ID:', rows);
        const queryToGetPrice = 'SELECT close FROM ' + ticker + '_pricedata ORDER BY timestamp DESC LIMIT 1';
        const [priceRows] = await connection.query(queryToGetPrice, [ticker]);
        if (priceRows.length === 0) {
            console.warn(`Ticker ${ticker} not found.`);
            return { message: 'Ticker not found.' };
        }
        const price = priceRows[0].close;
        const userId = rows[0].id;
        if (rows.length != 0) {
            const queryToBuyingOut = 'UPDATE positions SET amount = amount - ?, price = ? WHERE user_id = ? AND ticker = ?';
            await connection.query(queryToBuyingOut, [amount, price, userId, ticker]);

            // 查询当前持仓数量
            const [positionRows] = await connection.query(
                'SELECT amount FROM positions WHERE user_id = ? AND ticker = ?',
                [userId, ticker]
            );
            if (positionRows.length > 0 && Number(positionRows[0].amount) <= 0.000001) {
                // 删除
                await connection.query(
                    'DELETE FROM positions WHERE user_id = ? AND ticker = ?',
                    [userId, ticker]
                );
            }

            // 修改user表中的现金余额
            const queryToUpdateCash = 'UPDATE user SET cash = cash + ? * ? WHERE id = ?';
            await connection.query(queryToUpdateCash, [amount, price, userId]);
            return {
                username,
                ticker,
                amount,
                price
            };
        } else {
            console.warn(`User ${username} not found.`);
            return { message: 'User not found.' };
        }
    } catch (error) {
        console.error('Error during buying out:', error);
    }
}