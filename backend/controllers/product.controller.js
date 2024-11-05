import  Product from "../models/product.model.js"
import mongoose from "mongoose";

export const getProducts = async (req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success:true,data:products})
    }catch(err){
        res.status(500).json({success:false,message: "server error"})
    }
}

export const createProduct = async (req,res)=>{
    const product = req.body;
if(!product.name || !product.price || !product.image){
    return res.status(404).json({success:false ,message: "Please provide all details"});
}
const newProduct = new Product(product);

try{
    await newProduct.save();
    res.status(210).json({success: true, data : newProduct})
}catch(err){
    console.error("Error in creating product : ", err.message);
    res.status(500).json({success:false,message: "server error"})
}
}


export const deleteProduct = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess:false,data: "Invalid Id"})
    }
    try{
        const deleteProduct =  await Product.findByIdAndDelete(id);
        
        if(!deleteProduct){
            return res.status(400).json({success:false,message:"Product not found"})
        }
        
        res.status(200).json({success:true,data:"product deleted"})
    }catch(err){
        console.log(err);
        res.status(500).json({success:false,message: "server error"})
    }
}

export const updateProduct = async(req,res)=>{
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess:false,data: "Invalid Id"})
    }
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,data: updatedProduct})
    }catch(err){
        res.status(500).json({success:false,message:"server Error"})
    }
}