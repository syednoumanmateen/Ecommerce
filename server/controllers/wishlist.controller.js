const Wishlist = require("../models/wishlist.model");

// GET: Get Wishlist by User ID
const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const [wishlist] = await Wishlist.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "products",
          localField: "products",
          foreignField: "_id",
          as: "products"
        }
      },
      { $limit: 1 },
      {
        $project: {
          user: 1,
          products: {
            _id: 1,
            name: 1,
            price: 1,
            stock: 1,
            category: 1,
            images: 1
          }
        }
      }
    ]);

    res.status(200).json(
      wishlist || { user: userId, products: [] }
    );
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
