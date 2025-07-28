import connection from "../config/mysql.js";
import * as financialService from '../service/financialSercive.js';
import axios from 'axios';

let src = "https://c4rm9elh30.execute-api.us-east-1.amazonaws.com/default/cachedPriceData?ticker=";
// getFinancialData function to fetch financial data
export const getFinancialData = async (ticker) => {
    src = src + ticker;
    try {
        // Fetch financial data from the service
        const financialResponse = await axios.get(src);
        return financialResponse.data;
    } catch (error) {
        throw new Error('Error fetching financial data: ' + error.message);
    }
}