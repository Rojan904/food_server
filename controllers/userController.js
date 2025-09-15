import bcrypt from 'bcryptjs';
import userModel from "../models/userModel.js";

export const getUserController=async(req, res)=>{
//  res.status(200).send('User datat');
//  console.log(req.body.id);
 console.log(req.user);
try {
    const user=await userModel.findById({_id:req.user})
    if(!user){
        return res.status(404).send({
            success:false,
            message:'User not found',
        });
    }
    //hide password
    user.password=undefined;
    res.status(200).send({
        success:true,
        message:"User get successful",
        user
    });

   
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error in getUserController',
        error,
    });
}
}

export const updateUserController=async(req, res)=>{
    try {
        const user=await userModel.findById({_id: req.user})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        //update
        const {userName, address, phone }=req.body
        //username xa vani if ma, first ma user ma jun existing xa tei basxa haina vani userName le update gardinxa 
        if(userName) user.userName=userName; 
        if(address) user.address=address;
        if(phone) user.phone=phone;

        //save user
        await user.save()
        res.status(200).send({
            success:true
            ,message:"User updated successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in update user",error
        })
    }
}
export const resetPasswordController=async(req,res)=>{
    try {
        const {email,newPassword,answer}=req.body;
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,  
                message:"Provide all fields"
            })
        }
        const user=await userModel.findOne({email,answer})
        if(!user){
            return res.status(500).send({
                 success:false,
                message:"User not found or invalud answer"

            })

        }
        //hash password
        var salt=bcrypt.genSaltSync(10);
        const hashedPw=await bcrypt.hash(newPassword,salt); 
        user.password=hashedPw
        await user.save();
        res.status(200).send({
              success:true,
                message:"Password reset succesfully"
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in reset password",
            error
        })
    }
}

export const updatePasswordController=async(req,res)=>{
    try {
        const user=await userModel.findById({_id:req.user})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found'
            })
        }
        //get data from user
        const {oldPassword, newPassword}=req.body
        if(!oldPassword ||!newPassword){
            return res.status(500).send({
                success:false,
                message:"Please provide old or new password"
            })
        }
        const isMatch=await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            return res.status(400).send({
                success:false,
                message:'Invalid password',
            });
        }
        var salt=bcrypt.genSaltSync(10);
        const hashedPw=await bcrypt.hash(newPassword,salt); 
        user.password=hashedPw;
        await user.save()
        res.status(200).send({
            success:true,
            message:"Passwrd updated"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in update password",
            error
        })
    }
}

export const deleteUserController=async(req,res)=>{
try {
    const userId=req.params.id;
    await userModel.findByIdAndDelete(userId)
return res.status(200).send({
    success:true,
    message:"Your account has been deleted"
})
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error in delete user",
        error
    })
    
}

}

// {
  
//     "email":"roj@12.com",
//     "password":"12345"
    
// }