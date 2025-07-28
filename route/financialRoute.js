import express from 'express';
import financialController from '../controller/financialController.js';

const router = express.Router();
router.get('/', financialController.getFinancialData);