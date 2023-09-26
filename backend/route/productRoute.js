const express = require("express");
const router = express.Router();
const {createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct} = require("../controller/productController")

router.post("/", createProduct);
router.get("/:id", getaProduct);
router.get("/", getAllProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;