import express from 'express';
import { deleteUserController, getUserController, resetPasswordController, updatePasswordController, updateUserController } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth_middleware.js';

const router=express.Router();
//routes
//get user  
router.get('/getUser',authMiddleware
    , getUserController);

//update user
router.put('/updateUser', authMiddleware, updateUserController)

router.post('/resetPassword', authMiddleware, resetPasswordController)

//password update
router.post('/updatePassword', authMiddleware,updatePasswordController)

//delete
router.delete('/deleteUser/:id', authMiddleware, deleteUserController)
export default router;
