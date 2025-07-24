import express from 'express';
import * as mysqlController from '../controllers/mysqlController.js';

const router = express.Router();
router.get('/init', mysqlController.initDatabase);
router.get('/create-tables', mysqlController.createTables);

export default router;