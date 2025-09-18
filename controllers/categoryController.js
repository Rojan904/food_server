import categoryModel from "../models/categoryModel.js";

export const createCategoryController=async(req,res)=>{
    try {
        const {title, imageUrl}=req.body;
        if(!title || !imageUrl){
            return res.status(500).send({
                success:false,
                message:"Please provide category  title or image"
            })
        }
        const newCategory=new categoryModel({title, imageUrl});
        await newCategory.save()
        res.status(201).send({ success:true,
            message:"category created", newCategory})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in creating catrgory", error
        })
    }
}

export const getAllCategoryController=async(req,res)=>{

    try {
        const categories=await categoryModel.find({})
        if(!categories){
            return res.status(404).send({
                success:false,
                message:"No categories found"
            })
        }
        res.status(200).send({
            success:true,
            totalCategories: categories.length,
            categories 
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in fetching catrgory", error
        })
    }
}

export const updateCatController= async(req,res)=>{
    try {
        const categoryId=req.params.id;
        const {title, imageUrl}=req.body;
        const updatedCat=await categoryModel.findByIdAndUpdate(categoryId,{title, imageUrl}, {new:true});
        if(!updatedCat){
            res.status(500).send({
                success:false,
                message:"No cat found"
            })

        }
        res.status(200).send({
            success:true,
            message:"Catefory update success"
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in updating category", error
        })
    }

    
}
export const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
        return    res.status(500).send({
                success:false,
                message:"no category id"
            })
        }
        const category=await categoryModel.findById(id)
        if(!category){
           return res.status(500).send({
                success:false,
                message:"no category found"
            })
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"deleted category"
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in deleting category", error
        })
    }
}