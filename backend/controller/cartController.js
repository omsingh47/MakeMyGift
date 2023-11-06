const Cart = require("../models/addToCart");
const asyncHandler = require("express-async-handler")

const createElement = asyncHandler(async (req, res) => {
    try {
        // Find matching elements in the Cart collection
        const find = await Cart.findOne({
            product_id: req.body.product_id, // Add other fields you want to check for equality here
        });
        
        if (!find) {
            // If no matching element found, create a new one
            const newElement = await Cart.create(req.body);
            res.json(newElement);
        } 
        else {
            res.json("Element Exists");

            // if (find.quantity === req.body.quantity) {
            //     
            // } else {
            //     // Update the quantity of the existing element
            //     const updatedElement = await Cart.findByIdAndUpdate(
            //         { _id: find._id },
            //         { $set: { quantity: req.body.quantity } },
            //         { new: true }
            //     );
            //     res.json(updatedElement);
            // }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
const getAllElementByUser = asyncHandler(async(req, res)=>{
    console.log(req.query.user)
    const str = req.query.user.toString();
    try{
        console.log("first")
        const findAllElement = await Cart.find({user: str }); //This will help us search and apply filter.. Just write ?shop_tage=shop1
        res.json(findAllElement);
    }
    catch(error){
        throw new Error(error);
    } 
});
const getAllElement = asyncHandler(async(req, res)=>{
    try{
        const findAllElement = await Cart.find(req.query); //This will help us search and apply filter.. Just write ?shop_tage=shop1
        res.json(findAllElement);
    }
    catch(error){
        throw new Error(error);
    }
    
});
const updateElement = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const editElement = await Cart.findOneAndUpdate(
            { product_id: id }, // Use _id instead of id if it's the default MongoDB ObjectId field name
            { $set: req.body }, // Use $set to update the fields in req.body
            { new: true }
        );
        res.json(editElement);
    } catch (error) {
      throw new Error(error);
    }
  });
const deleteElement = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const removeElement = await Cart.findOneAndDelete({product_id:id});
        res.json(removeElement);
    } catch (error) {
      throw new Error(error);
    }
});

module.exports = {createElement,getAllElementByUser, getAllElement, updateElement, deleteElement};