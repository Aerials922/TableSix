import express from 'express';
import * as positionController from '../controller/positionController.js';

const router = express.Router();
router.get('/get', positionController.getPosition);
export default router;