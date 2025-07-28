import * as financialService from '../service/financialSercive.js';
import axios from 'axios';
import express from 'express';



// Controller function to get financial data
export const getFinancialData = async (req, res) => {
    try {
        // Assuming financialService has a method to fetch financial data
        const financialData = await financialService.getFinancialData(req.query.ticker);
        res.status(200).json({ message: 'Financial data retrieved successfully.', data: financialData });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving financial data.', error: error.message });
    }
}
