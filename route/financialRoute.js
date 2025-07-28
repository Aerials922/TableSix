import express from 'express';
import  * as financialController from '../controller/financialController.js';

const router = express.Router();
router.get('/get', financialController.getFinancialData);
export default router;