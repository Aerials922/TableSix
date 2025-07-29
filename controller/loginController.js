import * as loginService from '../service/loginService.js';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Validate user credentials (this is a placeholder, implement your own logic)
        const user = await loginService.loginService(username, password);
        if (user) {
            console.log(`User ${username} logged in successfully.`);
            res.status(200).json({ message: 'Login successful.', user:user.toJSON()});
        } else {
            console.warn(`Failed login attempt for user ${username}.`);
            res.status(401).json({ message: 'Invalid username or password.' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during login.', error: error.message });
    }
}
export const register = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;
        // Validate user credentials (this is a placeholder, implement your own logic)
        const cash = 10000; // Default cash balance for new users
        if (password === confirmPassword) {
            const result = await loginService.registerService(username, password, cash);
            if (result) {
                console.log(`User ${username} registered successfully.`);
                res.status(201).json({ message: 'Registration successful.' });
            } else {
                console.warn(`Failed registration attempt for user ${username}.`);
                res.status(400).json({ message: 'Registration failed.' });
            }
        }else {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error during registration.', error: error.message });
    }
}