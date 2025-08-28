const Wishlist = require("../models/wishlist.model");

// GET: Get Wishlist by User ID
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.params.userId }).populate("products");
    res.status(200).json(wishlist || { user: req.params.userId, products: [] });
  } catch (error) {
    console.error("Get Wishlist Error:", error.message);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};

// POST: Add Product to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [productId] });
    } else if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Add to Wishlist Error:", error.message);
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
};

// DELETE: Remove Product from Wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) return res.status(404).json({ error: "Wishlist not found" });

    wishlist.products = wishlist.products.filter(
      (pid) => pid.toString() !== productId
    );

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Remove from Wishlist Error:", error.message);
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
};

// DELETE: Clear Entire Wishlist
const clearWishlist = async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({ user: req.params.userId });
    res.status(200).json({ message: "Wishlist cleared" });
  } catch (error) {
    console.error("Clear Wishlist Error:", error.message);
    res.status(500).json({ error: "Failed to delete wishlist" });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
};
