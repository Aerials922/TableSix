import express from 'express';
import mysqlRoute from './route/mysqlRoute.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/mysql', mysqlRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});