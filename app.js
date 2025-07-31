import express from 'express';
import cors from 'cors';
import mysqlRoute from './route/mysqlRoute.js';
import financialRoute from './route/financialRoute.js';
import loginRoute from './route/loginRoute.js';
import exchangeRoute from './route/exchangeRoute.js';
import positionRoute from './route/positionRoute.js';
import userRoute from './route/userRoute.js'; 
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/tab_six/mysql', mysqlRoute);
app.use('/tab_six/stock', financialRoute);
app.use('/tab_six/', loginRoute);
app.use('/tab_six/exchange', exchangeRoute);
app.use('/tab_six/position', positionRoute);
app.use('/tab_six/user', userRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});