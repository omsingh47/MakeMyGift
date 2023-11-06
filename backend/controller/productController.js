const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler")

const createProduct = asyncHandler(async(req, res)=>{
    try{
        const find = await Product.findOne({product_id : req.body.product_id})
        if(find){
            return res.status(401).json({message: "This product already exists"});
        }
        else{
            const newProduct = await Product.create(req.body);
            res.json(newProduct);
        }
    }
    catch(error){
        throw new Error(error);
    }
    
});
const getaProduct = asyncHandler(async(req, res)=>{
    const {id} = req.params; ///:id is defined in router...
    console.log(req.params);
    try{
        const findProduct = await Product.findOne({product_id : id});
        if (!findProduct) {
            res.status(404).json({ message: "Product not found" });
          }
          res.json(findProduct);
    }
    catch(error){
        throw new Error(error);
    }
});
const getAllProduct = asyncHandler(async(req, res)=>{
    try{
        const findAllProduct = await Product.find(req.query); //This will help us search and apply filter.. Just write ?shop_tage=shop1
        res.json(findAllProduct);
    }
    catch(error){
        throw new Error(error);
    }
    
});
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateProduct = await Product.findOneAndUpdate(
            { product_id: id }, // Use _id instead of id if it's the default MongoDB ObjectId field name
            { $set: req.body }, // Use $set to update the fields in req.body
            { new: true }
        );
        res.json(updateProduct);
    } catch (error) {
      throw new Error(error);
    }
  });
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateProduct = await Product.findOneAndDelete({product_id:id});
        res.json(updateProduct);
    } catch (error) {
      throw new Error(error);
    }
  });

module.exports = {createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct};