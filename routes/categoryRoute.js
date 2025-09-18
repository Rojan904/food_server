import express from 'express';
import { createCategoryController, deleteCategoryController, getAllCategoryController, updateCatController } from '../controllers/categoryController.js';
import { authMiddleware } from '../middleware/auth_middleware.js';

const router=express.Router();
//routes

//create category ||post
router.post('/create', authMiddleware,createCategoryController );

//get al cat
router.get('/getAll', getAllCategoryController)

//update categ
router.put('/update/:id', authMiddleware, updateCatController)
router.delete('/delete/:id', authMiddleware,deleteCategoryController)
export default router;
