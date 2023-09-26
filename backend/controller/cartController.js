const Cart = require("../models/addToCart");
const asyncHandler = require("express-async-handler")

const createElement = asyncHandler(async (req, res) => {
    try {
        // Find matching elements in the Cart collection
        const find = await Cart.findOne(req.body);
        console.log(find)
        if (null) {
            // If no matching element found, create a new one
            const newElement = await Cart.create(req.body);
            console.log("hi")
            res.json(newElement);
        } 
        else {
            // If a matching element is found, compare properties (e.g., quantity)
            if (find.quantity == req.body.quantity) {
                res.json("Element Exists");
                console.log("Already exists")
            } 
            else if(find.quantity != req.body.quantity){
                const updatedElement = await Cart.findByIdAndUpdate(
                    {_id: find._id},
                    { $set: req.body },
                    { new: true }
                );
                res.json(updatedElement);
                console.log(updateElement)
            }
        }
    } catch (error) {
        // Handle errors appropriately (e.g., logging)
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
            { _id: id }, // Use _id instead of id if it's the default MongoDB ObjectId field name
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
        const removeElement = await Cart.findOneAndDelete(id);
        res.json(removeElement);
    } catch (error) {
      throw new Error(error);
    }
  });

module.exports = {createElement,getAllElementByUser, getAllElement, updateElement, deleteElement};