import connection from "../config/mysql.js";
import axios from 'axios';
import * as mysqlService from '../service/mysqlService.js';

// original api
// let src = "https://c4rm9elh30.execute-api.us-east-1.amazonaws.com/default/cachedPriceData?ticker=";
// external api
const OUTPUT_SIZE = 'compact'; // 可选值：compact 或 full
const API_KEY = 'NDUWW8NOMS7G2JCB';
const INTERVAL = '30min';   // 1min 5min 15min 30min 60min

// getFinancialData function to fetch financial data
// export const getFinancialData = async (ticker) => {
//     const url = src + ticker
//     // 用于存储所有 volume 的数组
//     let volumes = [];
//     try {
//         // Fetch financial data from the service
//         const financialResponse = await axios.get(url);

//         let financialData = financialResponse.data;

//         saveFinancialData(ticker, financialData);
//         return financialData;

//     } catch (error) {
//         throw new Error('Error fetching financial data: ' + error.message);
//     }
// }

// 获取外部API的金融数据
export const getExternalFinancialData = async (ticker) => {
    try {
        const external_url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=${INTERVAL}&outputsize=${OUTPUT_SIZE}&apikey=${API_KEY}`;
        const externalfinancialResponse = await axios.get(external_url);
        const externalfinancialData = externalfinancialResponse.data[`Time Series (${INTERVAL})`];
        if (!externalfinancialData) throw new Error('No data returned from external API');
        // 分别存储各项数据
        const timestamps = [];
        const opens = [];
        const highs = [];
        const lows = [];
        const closes = [];
        const volumes = [];
        for (const time in externalfinancialData) {
            timestamps.push(time);
            opens.push(Number(externalfinancialData[time]["1. open"]));
            highs.push(Number(externalfinancialData[time]["2. high"]));
            lows.push(Number(externalfinancialData[time]["3. low"]));
            closes.push(Number(externalfinancialData[time]["4. close"]));
            volumes.push(Number(externalfinancialData[time]["5. volume"]));
        }
        // 按时间升序排列
        const sorted = timestamps.map((t, i) => ({
            timestamp: t,
            open: opens[i],
            high: highs[i],
            low: lows[i],
            close: closes[i],
            volume: volumes[i]
        })).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        // 拆分回各数组
        const sortedTimestamps = sorted.map(d => d.timestamp);
        const sortedOpens = sorted.map(d => d.open);
        const sortedHighs = sorted.map(d => d.high);
        const sortedLows = sorted.map(d => d.low);
        const sortedCloses = sorted.map(d => d.close);
        const sortedVolumes = sorted.map(d => d.volume);
        // 保存外部API数据到数据库
        saveExternalFinancialData(ticker, sortedVolumes, sortedOpens, sortedCloses, sortedHighs, sortedLows, sortedTimestamps);
        // 将各种数据放在一个元组返回
        let DataGroup = {
            timestamps: sortedTimestamps,
            opens: sortedOpens,
            highs: sortedHighs,
            lows: sortedLows,
            closes: sortedCloses,
            volumes: sortedVolumes
        };
        return DataGroup;
    } catch (error) {
        throw new Error('Error fetching external financial data: ' + error.message);
    }
}

// export const saveFinancialData = async (ticker, financialData) => {
//     try {
//         // 将 ticker 转为小写
//         let low_ticker = ticker.toLowerCase();
//         // Assuming financialData is already fetched
//         let priceData = financialData.price_data || {};
//         let volumes = Array.isArray(priceData.volume) ? priceData.volume : [];
//         let highs = Array.isArray(priceData.high) ? priceData.high : [];
//         let lows = Array.isArray(priceData.low) ? priceData.low : [];
//         let opens = Array.isArray(priceData.open) ? priceData.open : [];
//         let closes = Array.isArray(priceData.close) ? priceData.close : [];
//         let timestamps = Array.isArray(priceData.timestamp) ? priceData.timestamp : [];

//         // Save each piece of data into the database
//         for (let i = 0; i < volumes.length; i++) {
//             await connection.query(`
//                 INSERT INTO ${low_ticker}_pricedata (volume, open, close, high, low, timestamp)
//                 VALUES (?, ?, ?, ?, ?, ?)
//             `, [volumes[i], opens[i], closes[i], highs[i], lows[i], timestamps[i]]);
//         }
//         console.log(`${ticker} financial data saved successfully.`);
//     } catch (error) {
//         console.error(`Error saving financial data for ${ticker}:`, error);
//     }
// }



// 保存外部API金融数据
export const saveExternalFinancialData = async (ticker, volumes, opens, closes, highs, lows, timestamps) => {
    try {
        // 将 ticker 转为小写
        let low_ticker = ticker.toLowerCase();
        // 如果数据表不存在则创建
        await connection.query(`
            CREATE TABLE IF NOT EXISTS ${low_ticker}_pricedata (
                id int auto_increment primary key,
                volume BIGINT,
                open decimal(20,8) not null,
                close decimal(20,8) not null,
                high  decimal(20,8) not null,
                low  decimal(20,8) not null,
                timestamp datetime
            )
        `);
        // 保存数据到数据库
        for (let i = 0; i < volumes.length; i++) {
            await connection.query(`
                INSERT INTO ${low_ticker}_pricedata (volume, open, close, high, low, timestamp)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [volumes[i], opens[i], closes[i], highs[i], lows[i], timestamps[i]]);
        }
        console.log(`${ticker} financial data saved successfully.`);
    } catch (error) {
        console.error(`Error saving external financial data for ${ticker}:`, error);
    }
}

// 从数据库获取金融数据
export const getExternalFinancialDataFromDB = async (ticker) => {
    try {
        let low_ticker = ticker.toLowerCase();
        const [rows] = await connection.query(
            `SELECT volume, open, close, high, low, timestamp FROM ${low_ticker}_pricedata ORDER BY timestamp ASC`
        );
        // 分别提取各项数据
        let timestamps = [];
        let opens = [];
        let highs = [];
        let lows = [];
        let closes = [];
        let volumes = [];
        for (const row of rows) {
            timestamps.push(row.timestamp);
            opens.push(Number(row.open));
            highs.push(Number(row.high));
            lows.push(Number(row.low));
            closes.push(Number(row.close));
            volumes.push(Number(row.volume));
        }
        // 将各种数据放在一个元组返回
        let DataGroup = {
            timestamps: timestamps,
            opens: opens,
            highs: highs,
            lows: lows,
            closes: closes,
            volumes: volumes
        };
        console.log(`${ticker} financial data retrieved successfully from DB.`);
        return DataGroup;
    } catch (error) {
        console.error(`Error fetching external financial data from DB for ${ticker}:`, error);
        return { timestamps: [], opens: [], highs: [], lows: [], closes: [], volumes: [] };
    }
}

// 删除金融数据
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