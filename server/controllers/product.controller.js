const mongoose = require("mongoose");
const Product = require("../models/Product.model");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create Product
const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      data: product,
      message: "Product created successfully",
      status: 201,
    });
  } catch (error) {
    console.error("Add Product error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};

// Get all Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      data: products,
      message: "Products fetched successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Get Products error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};

// Get single Product
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid product ID", status: 400 });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found", status: 404 });
    }

    res.status(200).json({
      data: product,
      message: "Product fetched successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Get Product error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid product ID", status: 400 });
    }

    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Product not found", status: 404 });
    }

    res.status(200).json({
      data: updated,
      message: "Product updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Update Product error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid product ID", status: 400 });
    }

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Product not found", status: 404 });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Delete Product error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
