import mongoose from "mongoose";
//since mongo is nosql whihc works in key vakye pair we work with object
 const categorySchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Category Title is required']
    },
    imageUrl:{
        type:String,
        default:''
    },
    
    

},{timestamps:true})

// module.exports=mongoose.model('User', userSchema)
export default mongoose.model('Category', categorySchema);