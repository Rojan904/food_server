import userModel from '../models/userModel.js';
export const adminMiddleware=async(req,res,next)=>{
    try {
        //get token from header
        const user=await userModel.findById(req.user)
        if(user.userType!=='admin'){
            return res.status(401).send({
                success:false,
                message:'Only admin access'
            })
        }
        else{
            next()
        }
    
    } catch (error) {
        console.log('err', error);
        res.status(500).send({
            success:false,
            message:'Error in auth middleware',
            error:error.message,
        })
    }
}