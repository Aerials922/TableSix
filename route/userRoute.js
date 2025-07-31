import express from 'express';
import  * as userController from '../controller/userController.js';

const router = express.Router();

router.get('/getcash', userController.getUserCash);
router.post('/updatecash', userController.updateUserCash);

export default router;
