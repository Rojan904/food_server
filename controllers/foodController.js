import foodModel from "../models/foodModel.js";

export const createFoodController=async(req,res)=>{
    try {
    //destructureing from request body
const {title, description, price, restaurant, imageUrl, foodTags, category, code,isAvailable, rating }=req.body
if(!title || !description || !price || !restaurant){
    return res.status(500).send({
        success:false,
        message:"Please enter all fields"
    })
}        
const newFood=new foodModel({
    title, description, price, restaurant, imageUrl, foodTags, category, code,isAvailable, rating
});
await newFood.save();
res.status(201).send({
    success:true,
    message:'New food item created',
    newFood
})
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error creating food",error
        })
    }
}