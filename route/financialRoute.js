import express from 'express';
import  * as financialController from '../controller/financialController.js';

const router = express.Router();
router.get('/get', financialController.getFinancialData);
router.put('/update', financialController.updateFinancialData);
router.delete('/delete', financialController.deleteFinancialData);
router.get('/external', financialController.getExternalFinancialData);
export default router;