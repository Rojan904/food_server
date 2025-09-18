import restaurantModel from "../models/restaurantModel.js"

export const createRestaurantController=async(req,res)=>{
    try {
        const {title, imageUrl, foods, time, pickup, delivery, isOpen, logo, rating, ratingCount, code, coords}=req.body
    
    if(!title || !coords){
        return res.status(500).send({
            success:false,
            message:"Please provide title and address"
        })
    }
    const newRestaurant=new restaurantModel({
      title, imageUrl, foods, time, pickup, delivery, isOpen, logo,rating, ratingCount, code, coords  
    })
    await newRestaurant.save();
    res.status(201).send({
        success:true,
        message:"New restaurant created successfully"
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in creating restaurant",
            error
        })
    }
}

export const getAllRestaurantController=async(req,res)=>{
try {
    const restaurants=await restaurantModel.find({});
    if(!restaurants){
        return res.status(404).send({
            success:false,
            message:"No restaurant available"
        })
    }
    res.status(200).send({
        success:true,
        totalCount:restaurants.length,
        restaurants
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in getting restaurant",
        error
    })
}
}

export const getRestaurantByIdController=async(req,res)=>{
try {
    const restaurantId=req.params.id;
    if(!restaurantId){
        return res.status(404).send({
            success:false,
            message:"Please provide restaurant id"
        })
    }
    const restaurant=await restaurantModel.findById(restaurantId);
    if(!restaurant){
        return res.status(404).send({
            success:false,
            message:"No restaurant found"
        })
    }
    res.status(200).send({
        success:true,
        restaurant
    })
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error in getting restaurant",error
    })
}
}

export const deleteRestaurantController=async(req,res)=>{
    try {
        const restaurantId=req.params.id;
            if(!restaurantId){
                return res.status(404).send({
                    success:false,
                    message:"No restaurant found"
                })
            }
            await restaurantModel.findByIdAndDelete(restaurantId)
            res.status(200).send({
                success:true,
                message:"Deleted successfully"
            })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in deleting restaurant",error
        })
    }
}