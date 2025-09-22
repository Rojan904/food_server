import express from 'express';
import { createFoodController, deleteFoodController, getAllFoodController, getFoodByIdController, getFoodByRestaurantController, orderStatusController, placeOrderController, updateFoodController } from '../controllers/foodController.js';
import { adminMiddleware } from '../middleware/admin_middleware.js';
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

//place order
router.post('/placeOrder', authMiddleware,placeOrderController)

//order status change
router.post('/orderStatus/:id',authMiddleware, adminMiddleware, orderStatusController )
export default router;
