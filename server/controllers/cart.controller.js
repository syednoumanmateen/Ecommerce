const mongoose = require("mongoose");
const Cart = require("../models/cart.model");
const productPopulatePipeline = require("../helper");

const addCart = async (req, res) => {
  try {
    const { userId, item } = req.body;

    if (!userId || !item || !item.productId || !item.quantity || !item.price) {
      return res.status(400).json({ error: "Invalid payload", status: 400 });
    }

    const newItem = {
      product: item.productId,
      quantity: item.quantity,
      price: item.price
    };

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [newItem] });
    } else {
      const existingItem = cart.items.find(
        (i) => i.product.toString() === item.productId
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        cart.items.push(newItem);
      }
    }

    await cart.save();

    res.status(200).json({
      data: cart,
      message: "Cart updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Add to cart error:", error.message);
    res.status(500).json({ error: "Failed to update cart", status: 500 });
  }
};


const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalCountResult = await Cart.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$items" },
      { $count: "totalItems" }
    ]);

    const totalItems = totalCountResult.length > 0 ? totalCountResult[0].totalItems : 0;

    const carts = await Cart.aggregate([
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
          "items.product": { $arrayElemAt: ["$items.productDetails", 0] }
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

    const cart = carts[0];

    if (!cart) {
      return res.status(200).json({
        items: [],
        total: 0,
        page: 1,
        pages: 0,
      });
    }

    res.status(200).json({
      items: cart.items,
      user: cart.user,
      total: totalItems,
      page,
      pages: Math.ceil(totalItems / limit),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart", status: 500 });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: "Items must be an array", status: 400 });
    }

    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { items },
      { new: true, runValidators: true }
    ).populate("items.product");

    if (!cart) {
      return res.status(404).json({ error: "Cart not found", status: 404 });
    }

    res.status(200).json({
      data: cart,
      message: "Cart updated",
      status: 200,
    });
  } catch (error) {
    console.error("Update cart error:", error.message);
    res.status(500).json({ error: "Failed to update cart", status: 500 });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await Cart.findOneAndDelete({ user: userId });

    if (!result) {
      return res.status(404).json({ error: "Cart not found", status: 404 });
    }

    res.status(200).json({
      message: "Cart deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Delete cart error:", error.message);
    res.status(500).json({ error: "Failed to delete cart", status: 500 });
  }
};

const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found", status: 404 });
    }

    cart.items = []; // empty the items array
    await cart.save();

    res.status(200).json({
      message: "Cart cleared successfully",
      status: 200,
      data: cart
    });
  } catch (error) {
    console.error("Clear cart error:", error.message);
    res.status(500).json({ error: "Failed to clear cart", status: 500 });
  }
};

module.exports = {
  addCart,
  getCart,
  updateCart,
  deleteCart,
  clearCart
};
