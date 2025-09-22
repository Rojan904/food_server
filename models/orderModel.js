import mongoose from "mongoose";
//since mongo is nosql whihc works in key vakye pair we work with object
 const orderSchema=new mongoose.Schema({
    foods:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Foods"
         }],
    payment:{
      
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
       ref:"User"

    },
    status:{
        type:String,
        enum:['preparing', 'prepared', 'on the way', 'delivered']
    },

    

},{timestamps:true})

// module.exports=mongoose.model('User', userSchema)
export default mongoose.model('Orders', orderSchema);