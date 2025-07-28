import express from 'express';
import cors from 'cors';
import mysqlRoute from './route/mysqlRoute.js';
import financialRoute from './route/financialRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/mysql', mysqlRoute);
app.use('/financial', financialRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});