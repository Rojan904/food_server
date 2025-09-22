import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";

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

export const getAllFoodController=async(req,res)=>{
    try {
        const foods=await foodModel.find({});
        if(!foods){
          return  res.status(404).send({
                success:false,
                message:"No foods found",error
            })
        }
        res.status(200).send({
            success:true,
            totalFoods:foods.length,
            foods
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error getting food",error
        })
    }
}
export const getFoodByIdController=async(req,res)=>{
    try {
        const foodId=req.params.id;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:"No foodid found"
            })
        }
        const foods=await foodModel.findById(foodId);
        if(!foods){
           return res.status(404).send({
                success:false,
                message:"No foods found"
            })
        }
        res.status(200).send({
            success:true,
            foods
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error getting food",error
        })
    }
}
export const getFoodByRestaurantController=async(req,res)=>{
    try {
        const restId=req.params.id;
        if(!restId){
            return res.status(404).send({
                success:false,
                message:"No foodid found"
            })
        }
        const foods=await foodModel.find({restaurant:restId});
        if(!foods){
           return res.status(404).send({
                success:false,
                message:"No foods found"
            })
        }
        res.status(200).send({
            success:true,
            message:"food based on restaurant",
            foods
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error getting food",error
        })
    }
}

export const updateFoodController=async(req,res)=>{
    try {
        const foodId=req.params.id;
     if(!foodId){
        return res.status(400),send({success:false,
            message:"No food id found"
        })
    }
        const food=await foodModel.findById(foodId)
        if(!food){
            return res.status(400),send({success:false,
                message:"No food  found"
            })}
            const {
                title, description, price, restaurant, imageUrl, foodTags, category, code,isAvailable, rating
            }=req.body
        const updatedFood=await foodModel.findByIdAndUpdate(foodId,
{title, description, price, restaurant, imageUrl, foodTags, category, code,isAvailable, rating},
{new:true}

        )

        res.status(200).send({
            success:true,
            message:"Food item updated"
        })
        } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error updateing food",error
        })
    }
}

export const deleteFoodController=async(req,res)=>{
    try {
        const foodId=req.params.id;
        if(!foodId){
            return res.status(400),send({success:false,
                message:"No food id found"
            })
        }
        const food=await foodModel.findById(foodId)
        if(!food){
            return res.status(400),send({success:false,
                message:"No food  found"
            })}

          await foodModel.findByIdAndDelete(foodId)
          res.status(200).send({
            success:true,
            message:"Food item deleted"
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error updateing food",error
        })
    }
}
export const placeOrderController=async(req,res)=>{
try {
    const {cart}=req.body;
    if(!cart){
        return  res.status(500).send({
            success:false,
            message:"Add food cart or paymnet ",
        })
    }
    let total=0;
    cart.map((i)=> {total+=i});
    const newOrder=new orderModel({
        foods:cart,
        payment:total,
        buyer: req.user
    })
    newOrder.save();
    res.status(200).send({
        success:true,
        message:"Order placed", newOrder
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error placing order",error
    })
}
}

export const orderStatusController=async(req,res)=>{
    try {
        const orderId=req.params.id;
        if(!orderId){
            return  res.status(404).send({
                success:false,
                message:"Add order id ",
            })
        }
        const {status}=req.body;
        const order=await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
        res.status(200).send({
            success:true,
            message:"Order status updated",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error changind order status",error
        })  
    }
}