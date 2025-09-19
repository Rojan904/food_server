import express from 'express';
import { createFoodController } from '../controllers/foodController.js';
import { authMiddleware } from '../middleware/auth_middleware.js';

const router=express.Router();
//routes
router.post('/create', authMiddleware, createFoodController)
export default router;
