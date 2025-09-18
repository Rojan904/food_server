import express from 'express';
import { createRestaurantController, deleteRestaurantController, getAllRestaurantController, getRestaurantByIdController } from '../controllers/restaurantController.js';
import { authMiddleware } from '../middleware/auth_middleware.js';

const router=express.Router();
//routes

//create restaurant ||post
router.post('/create', authMiddleware,createRestaurantController );

//get all resturant
router.get('/getAll', getAllRestaurantController)

//get restaurant by id
router.get('/get/:id', getRestaurantByIdController)

router.delete('/delete/:id', authMiddleware, deleteRestaurantController)


export default router;
