import * as mysqlService from '../service/mysqlService.js';
export const initDatabase = async (req, res) => {
    try {
        const result = await mysqlService.createTables();
        res.status(200).json({ message: 'Database initialized successfully.', result });
    } catch (error) {
        
        res.status(500).json({ message: 'Error initializing database.', error: error.message });
    }
}
export const createTables = async (req, res) => {
    try {
        const result = await mysqlService.createTables();
        res.status(200).json({ message: 'Tables created successfully.', result });
    } catch (error) {
        res.status(500).json({ message: 'Error creating tables.', error: error.message });
    }
}