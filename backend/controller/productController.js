const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler")
const slugify = require('slugify')
const createProduct = asyncHandler(async(req, res)=>{
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    }
    catch(error){
        throw new Error(error);
    }
    
});
const getaProduct = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    try{
        const findProduct = await Product.findById(id);
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
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findOneAndUpdate(
            { _id: id }, // Use _id instead of id if it's the default MongoDB ObjectId field name
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
        const updateProduct = await Product.findOneAndDelete(id);
        res.json(updateProduct);
    } catch (error) {
      throw new Error(error);
    }
  });

module.exports = {createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct};