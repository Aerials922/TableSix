import * as financialService from '../service/financialSercive.js';
import axios from 'axios';
import express from 'express';

const TslaResponse = await axios.get("https://c4rm9elh30.execute-api.us-east-1.amazonaws.com/default/cachedPriceData?ticker=TSLA");
const TslaData = TslaResponse.data;

const getFinancialData = async (req, res) => {
    try {
        // Assuming financialService has a method to fetch financial data
        const financialData = await financialService.getFinancialData(TslaData.ticker);
        res.status(200).json({ message: 'Financial data retrieved successfully.', data: financialData });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving financial data.', error: error.message });
    }
}
