import express from 'express';
import  * as exchangeController from '../controller/exchangeController.js';

const router = express.Router();
// router.get('/get', financialController.getFinancialData);
router.post('/buyingIn', exchangeController.buyingIn);
router.post('/buyingOut', exchangeController.buyingOut);
export default router;