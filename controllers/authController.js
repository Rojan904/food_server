import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
//register
export const registerController=async(req,res)=>{
    try {
     const {userName, email, password, phone, address, answer}   = req.body;

     //validation
     if(!userName || !email || !password || !phone || !address || !answer){
        return res.status(400).send({
            success:false,
            message:'All fields are required',
        });
     }
     //check user
     const existingUser=await userModel.findOne({email});
     if(existingUser){
        return res.status(400).send({
            success:false,
            message:'User already exists',
        });
     }
     //hash password salt is used to has password, jati dherai salt round teti dheri strong
     var salt=bcrypt.genSaltSync(10);
     const hashedPw=await bcrypt.hash(password,salt); 
     //create user
     const user=await userModel.create({userName, email, password:hashedPw, phone, address, answer});
     res.status(201).send({
        success:true,
        message:'User created successfully',
        user,
     });
    } catch (error) {
        console.log('err', error);
        res.status(500).send({
            success:false,
            message:'Error in registerController',
            error,
        });
    }
};
export const loginController=async(req,res)=>{
    try {
        const {email, password}=req.body;
        //validation
        if(!email || !password){
            return res.status(400).send({
                success:false,
                message:'All fields are required',
            });
        }
        //check user
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(400).send({
                success:false,
                message:'User not found',
            });
        }
        //compare user password with hashed password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).send({
                success:false,
                message:'Invalid password',
            });
        }
        //token creeate
        //jwt.sign → creates a JWT (a signed token).
// Payload { id: user._id } → stores the user’s unique ID inside the token.
// process.env.JWT_SECRET → secret key used to sign/verify the token (kept private).
// { expiresIn: '7d' } → token will automatically expire in 7 days.
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'}); 
        user.password=undefined; //not showing password in response
        res.status(200).send({
            success:true,
            message:'User logged in successfully',
            token,
            user,
        });
    } catch (error) {
        console.log('err', error);
        res.status(500).send({
            success:false,
            message:'Error in loginController',
            error,
        });  
    }
}