const express = require("express");
const { addCart, getCart, updateCart, deleteCart ,clearCart} = require("../controllers/cart.controller");
const protect = require("../middleware")
const router = express.Router();

router.post("/", protect, addCart);
router.get("/:userId", protect, getCart);
router.put("/:userId", protect, updateCart);
router.delete("/:userId", protect, deleteCart);
router.delete("/clear/:userId", protect, clearCart);

module.exports = router;