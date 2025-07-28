import axios from 'axios';

const OUTPUT_SIZE = 'compact'; // 可选值：compact 或 full
const API_KEY = 'NDUWW8NOMS7G2JCB';
const INTERVAL = '30min';

export const getFinancialData = async (symbol) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${INTERVAL}&outputsize=${OUTPUT_SIZE}&apikey=${API_KEY}`;
    try {
        const response = await axios.get(url);
        const data = response.data["Time Series (30min)"];
        if (!data) throw new Error('No data returned');

        // 分别存储各项数据
        const timestamps = [];
        const opens = [];
        const highs = [];
        const lows = [];
        const closes = [];
        const volumes = [];

        for (const time in data) {
            timestamps.push(time);
            opens.push(Number(data[time]["1. open"]));
            highs.push(Number(data[time]["2. high"]));
            lows.push(Number(data[time]["3. low"]));
            closes.push(Number(data[time]["4. close"]));
            volumes.push(Number(data[time]["5. volume"]));
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

        return {
            timestamps: sortedTimestamps,
            opens: sortedOpens,
            highs: sortedHighs,
            lows: sortedLows,
            closes: sortedCloses,
            volumes: sortedVolumes
        };
    } catch (error) {
        throw new Error('Error fetching financial data: ' + error.message);
    }
};

// 示例调用
getFinancialData('FB').then(data => {
    console.log('timestamps:', data.timestamps);
    console.log('opens:', data.opens);
    console.log('highs:', data.highs);
    console.log('lows:', data.lows);
    console.log('closes:', data.closes);
    console.log('volumes:', data.volumes);
});