import mongoose from "mongoose";
//since mongo is nosql whihc works in key vakye pair we work with object
 const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'Username is required']
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },
    address:{
        type:Array,
        // required:[true, 'Username is required']
    },
    phone:{
        type:String,
        required:[true, 'Phone number is required']
    },
    userType:{
        type:String,
        required:[true, 'User type is required'],
        default:'client',
        enum:['client', 'admin', 'vendor', 'driver']
    },
    profile:{
         type:String,
         default: 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'
    },
    answer:{
        type:String,
        required:[true, 'Answer is required']
    }
},{timestamps:true})

// module.exports=mongoose.model('User', userSchema)
export default mongoose.model('User', userSchema);