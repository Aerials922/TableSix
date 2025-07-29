import express from 'express';
import * as loginController from '../controller/loginController.js';

const router = express.Router();

router.post('/login', loginController.login);
router.post('/register', loginController.register);

export default router;