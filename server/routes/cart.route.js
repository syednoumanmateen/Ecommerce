const express = require("express");
const { addCart, getCart, updateCart, removeFromCart, clearCart } = require("../controllers/cart.controller");
const { protect } = require("../middleware")
const router = express.Router();

router.post("/", protect, addCart);
router.get("/:userId", protect, getCart);
router.put("/:userId", protect, updateCart);
router.delete("/", protect, removeFromCart);
router.delete("/:userId", protect, clearCart);

module.exports = router;