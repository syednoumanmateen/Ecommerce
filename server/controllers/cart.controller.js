const Cart = require("../models/cart.model");

const addCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !Array.isArray(items)) {
      return res.status(400).json({ error: "Invalid payload", status: 400 });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items });
    } else {
      items.forEach((item) => {
        const existing = cart.items.find(
          (i) => i.product.toString() === item.product
        );
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          cart.items.push(item);
        }
      });
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

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(200).json({
        items: [],
        total: 0,
        page: 1,
        pages: 0,
      });
    }

    const skip = (page - 1) * limit;
    const paginatedItems = cart.items.slice(skip, skip + limit);

    res.status(200).json({
      items: paginatedItems,
      total: cart.items.length,
      page,
      pages: Math.ceil(cart.items.length / limit),
    });
  } catch (error) {
    console.error("Get cart error:", error.message);
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
