import connection from "../config/mysql.js";
import * as financialService from '../service/financialSercive.js';
import axios from 'axios';
import * as mysqlService from '../service/mysqlService.js';

let src = "https://c4rm9elh30.execute-api.us-east-1.amazonaws.com/default/cachedPriceData?ticker=";
// getFinancialData function to fetch financial data
export const getFinancialData = async (ticker) => {
    src = src + ticker;
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
        // 示例：将 ticker 转为小写
        let low_ticker = ticker.toLowerCase();
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
                INSERT INTO ${low_ticker}_pricedata (volume, open, close, high, low, timestamp)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [volumes[i], opens[i], closes[i], highs[i], lows[i], timestamps[i]]);
        }
        console.log(`${ticker} financial data saved successfully.`);
    } catch (error) {
        console.error(`Error saving financial data for ${ticker}:`, error);
    }
}

export const deleteFinancialData = async (ticker) => {
    try {
        // 将 ticker 转为小写
        let low_ticker = ticker.toLowerCase();
        await connection.query(`
            DROP TABLE ${low_ticker}_pricedata
        `);
        console.log(`${low_ticker} financial data deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting financial data for ${low_ticker}:`, error);
    }
}
export const updateFinancialData = async (ticker) => {
    try {
        deleteFinancialData(ticker);
        mysqlService.createTables();
        getFinancialData(ticker);
        console.log(`${ticker} financial data updated successfully.`);
    } catch (error) {
        console.error(`Error updating financial data for ${ticker}:`, error);
    }
}