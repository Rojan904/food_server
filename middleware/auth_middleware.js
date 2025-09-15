import jwt from 'jsonwebtoken';
export const authMiddleware=async(req,res,next)=>{
    try {
        //get token from header
        const token=req.headers.authorization.split(' ')[1];
        //verify token
     jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
        if(err){
            return res.status(401).send({
                success:false,
                message:'Unauthorized',
                error:err.message,
            })
        }
        else{
                    //get user from token
console.log(req);
            req.user=decode.id;
            next();
        }
     });
    
    } catch (error) {
        console.log('err', error);
        res.status(500).send({
            success:false,
            message:'Error in auth middleware',
            error:error.message,
        })
    }
}