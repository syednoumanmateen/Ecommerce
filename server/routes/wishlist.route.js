const express = require("express");
const { getWishlist, addToWishlist, removeFromWishlist, clearWishlist } = require("../controllers/wishlist.controller");
const { protect } = require("../middleware");
const router = express.Router();

router.get("/:userId", protect, getWishlist);
router.post("/", protect, addToWishlist);
router.delete("/", protect, removeFromWishlist);
router.delete("/:userId", protect, clearWishlist);

module.exports = router;
