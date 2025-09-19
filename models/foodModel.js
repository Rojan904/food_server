import mongoose from "mongoose";
//since mongo is nosql whihc works in key vakye pair we work with object
 const foodSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Food Title is required']
    },
    description:{
        type:String,
        required:[true,'Description is required']
    },
    price:{
        type:Number,
        required:[true,'Price is required']

    },
    foodTags:{
        type:String
    },
    category:{
        type:String
    },
    code:{
        type:String
 
    },
    imageUrl:{
        type:String,
        default:''
    },
    isFoodAvailble:{
        type:Boolean,
        default:true
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingCount:{
        type:String
    }
    

},{timestamps:true})

// module.exports=mongoose.model('User', userSchema)
export default mongoose.model('Foods', foodSchema);