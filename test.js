import axios from 'axios';

const coin = 'bitcoin';
const vs_currency = 'usd';  // target currency of market data
const days = 2;             // data up to number of days ago
const interval = 'daily';   // data interval//1 day from current time = 5-minutely data
                            // 2 - 90 days from current time = hourly data
                            // above 90 days from current time = daily data (00:00 UTC)
const precision = 3;        // decimal places for currency price values

const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${vs_currency}&days=${days}&interval=${interval}&precision=${precision}`;

axios.get(url, {
    headers: {
        'accept': 'application/json',
        'x-cg-demo-api-key': 'CG-Dg6b6nfB7wPLZfSp6UmZ2UQx'
    }
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error('Error fetching data:', error.message);
});