import * as financialService from '../service/financialSercive.js';



// Controller function to get external financial data
export const getExternalFinancialData = async (req, res) => {
    try {
        const externalFinancialData = await financialService.getExternalFinancialData(req.query.ticker);
        res.status(200).json({ message: 'External financial data retrieved successfully.', data: externalFinancialData });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving external financial data.', error: error.message });
    }
}

// // Controller function to get financial data
// export const getFinancialData = async (req, res) => {
//     try {
//         // Assuming financialService has a method to fetch financial data
//         const financialData = await financialService.getFinancialData(req.query.ticker);
//         res.status(200).json({ message: 'Financial data retrieved successfully.', data: financialData });
//         return financialData;
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving financial data.', error: error.message });
//     }
// }

// 从数据库获取金融数据
export const getExternalFinancialDataFromDB = async (req, res) => {
    try {
        const externalFinancialData = await financialService.getExternalFinancialDataFromDB(req.query.ticker);
        res.status(200).json({ message: 'External financial data retrieved successfully.', data: externalFinancialData });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving external financial data from DB.', error: error.message });
    }
}

// 从数据库获取最后一条金融数据
export const getLastFinancialData = async (req, res) => {
    try {
        const lastFinancialData = await financialService.getLastFinancialData(req.query.ticker);
        res.status(200).json({ message: 'Last financial data retrieved successfully.', data: lastFinancialData });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving last financial data.', error: error.message });
    }
}

// Controller function to delete financial data table
export const deleteFinancialData = async (req, res) => {
    try {
        await financialService.deleteFinancialData(req.query.ticker);
        res.status(200).json({ message: 'Financial data table deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting financial data table.', error: error.message });
    }
}
// Controller function to update financial data
export const updateFinancialData = async (req, res) => {
    try {
        await financialService.updateFinancialData(req.query.ticker);
        res.status(200).json({ message: 'Financial data updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating financial data.', error: error.message });
    }
}

