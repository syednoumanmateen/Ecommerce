const mongoose = require("mongoose");
const Wishlist = require("../models/wishlist.model");
const productPopulatePipeline = require("../helper");

const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalCountResult = await Wishlist.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$items" },
      { $count: "totalItems" }
    ]);

    const totalItems = totalCountResult.length > 0 ? totalCountResult[0].totalItems : 0;

    const wishlists = await Wishlist.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $unwind: { path: "$items", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "products",
          let: { productId: "$items.product" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$productId"] } } },
            ...productPopulatePipeline()
          ],
          as: "items.productDetails"
        }
      },
      {
        $addFields: {
          "items": { $arrayElemAt: ["$items.productDetails", 0] }
        }
      },
      { $project: { "items.productDetails": 0 } },
      { $sort: { "items._id": 1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          status: { $first: "$status" },
          items: { $push: "$items" },
        }
      }
    ]);

    const wishlist = wishlists[0]

    if (!wishlist) {
      return res.status(200).json({
        items: [],
        total: 0,
        page: 1,
        pages: 0,
      });
    }

    res.status(200).json({
      items: wishlist.items,
      user: wishlist.user,
      total: totalItems,
      page,
      pages: Math.ceil(totalItems / limit),
    });
  } catch (error) {
    console.error("Get Wishlist Error:", error.message);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};

const addWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ error: "Invalid payload", status: 400 });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        items: [{ product: productId }]
      });
    } else {
      const exists = wishlist.items.some(
        (i) => i.product.toString() === productId
      );

      if (!exists) {
        wishlist.items.push({ product: productId });
      }
    }

    await wishlist.save();

    res.status(200).json({
      data: wishlist,
      message: "Wishlist updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Add to wishlist error:", error.message);
    res.status(500).json({ error: "Failed to update wishlist", status: 500 });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId
    );

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (error) {
    console.error("Remove from Wishlist Error:", error.message);
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
};

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
  addWishlist,
  removeFromWishlist,
  clearWishlist,
};
