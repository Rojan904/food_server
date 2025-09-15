import express from 'express';
import { loginController, registerController } from '../controllers/authController.js';

const router=express.Router();
//routes
//register ||post
router.post('/register', registerController);
router.post('/login', loginController);


export default router;
