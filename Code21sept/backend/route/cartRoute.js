const express = require("express");
const router = express.Router();
const {createElement,getAllElementByUser, getAllElement, updateElement, deleteElement} = require("../controller/cartController")

router.post("/", createElement);
router.get("/", getAllElement);
router.get("/user", getAllElementByUser);
router.put("/:id", updateElement);
router.delete("/:id", deleteElement);

module.exports = router;