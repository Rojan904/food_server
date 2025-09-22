import express from 'express';
import { createFoodController, deleteFoodController, getAllFoodController, getFoodByIdController, getFoodByRestaurantController, updateFoodController } from '../controllers/foodController.js';
import { authMiddleware } from '../middleware/auth_middleware.js';

const router=express.Router();
//routes
router.post('/create', authMiddleware, createFoodController)
router.get('/getAll',getAllFoodController)
router.get('/getFoodById/:id',getFoodByIdController)
//get food by restaurant
router.get('/getByRestaurantId/:id',getFoodByRestaurantController)

router.put('/update/:id', authMiddleware,updateFoodController)
router.delete('/delete/:id', authMiddleware,deleteFoodController)
export default router;
