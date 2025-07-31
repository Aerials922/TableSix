import * as mysqlService from '../service/userService.js';

// get user cash
export const getUserCash = async (req, res) => {
    const username = req.query.username;
    if (!username) {
        return res.status(400).json({ message: 'Username is required.' });
    }
    try {
        const cash = await mysqlService.getUserCash(username);
        if (cash !== null) {
            res.status(200).json({ message: 'User cash retrieved successfully.', cash });
        } else {
            res.status(404).json({ message: `User ${username} not found.` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user cash.', error: error.message });
    }
}

// update user cash
export const updateUserCash = async (req, res) => {
    const username = req.body.username;
    const rechargeAmount = req.body.rechargeAmount;

    if (!username || !rechargeAmount) {
        return res.status(400).json({ message: 'Username and recharge amount are required.' });
    }

    try {
        const success = await mysqlService.updateUserCash(username, rechargeAmount);
        if (success) {
            res.status(200).json({ message: 'User cash updated successfully.' });
        } else {
            res.status(404).json({ message: `User ${username} not found or cash not updated.` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user cash.', error: error.message });
    }
}