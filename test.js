import connection from "../config/mysql.js";
import * as financialService from '../service/financialSercive.js';
import axios from 'axios';

let src = "https://c4rm9elh30.execute-api.us-east-1.amazonaws.com/default/cachedPriceData?ticker=TSLA";
// getFinancialData function to fetch financial data
export const getFinancialData = async (ticker) => {
    
    // 用于存储所有 volume 的数组
    let volumes = [];
    try {
        // Fetch financial data from the service
        const financialResponse = await axios.get(src);

        let financialData = financialResponse.data;

        saveFinancialData(ticker, financialData);
        return financialData;

    } catch (error) {
        throw new Error('Error fetching financial data: ' + error.message);
    }
}

export const saveFinancialData = async (ticker, financialData) => {
    try {
        // Assuming financialData is already fetched
        let priceData = financialData.price_data || {};
        let volumes = Array.isArray(priceData.volume) ? priceData.volume : [];
        let highs = Array.isArray(priceData.high) ? priceData.high : [];
        let lows = Array.isArray(priceData.low) ? priceData.low : [];
        let opens = Array.isArray(priceData.open) ? priceData.open : [];
        let closes = Array.isArray(priceData.close) ? priceData.close : [];
        let timestamps = Array.isArray(priceData.timestamp) ? priceData.timestamp : [];

        // Save each piece of data into the database
        for (let i = 0; i < volumes.length; i++) {
            await connection.query(`
                INSERT INTO ${ticker}_pricedata (volume, open, close, high, low, timestamp)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [volumes[i], opens[i], closes[i], highs[i], lows[i], timestamps[i]]);
        }
        console.log(`${ticker} financial data saved successfully.`);
    } catch (error) {
        console.error(`Error saving financial data for ${ticker}:`, error);
    }
}
getFinancialData('TSLA'); // Example call to fetch and save financial data for TSLA 