const express = require("express");
const { addProduct, getProducts, getProduct, updateProduct, deleteProduct } = require("../controllers/product.controller");
const { protect } = require("../middleware")
const router = express.Router();

router.post("/", protect, addProduct);
router.get("/", protect, getProducts);
router.get("/:_id", protect, getProduct);
router.put("/:_id", protect, updateProduct);
router.delete("/:_id", protect, deleteProduct);

module.exports = router;