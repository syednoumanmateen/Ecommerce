const mongoose = require("mongoose");
const Category = require("../models/category.model");

const isValidObjectId = (_id) => mongoose.Types.ObjectId.isValid(_id);

// Add category
const addCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();

    res.status(201).json({
      data: category,
      message: "Category created successfully",
      status: 201,
    });
  } catch (error) {
    console.error("Add category error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          parent: 1,
          description: 1,
          image: 1,
        }
      }
    ]);

    res.status(200).json({
      data: categories,
      message: "Categories fetched successfully",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};


// Get single category
const getCategory = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid category _id", status: 400 });
    }

    const [category] = await Category.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(_id) } },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          parent: 1,
          description: 1,
          image: 1,
        }
      },
      { $limit: 1 }
    ]);

    if (!category) {
      return res.status(404).json({ error: "Category not found", status: 404 });
    }

    res.status(200).json({
      data: category,
      message: "Category fetched successfully",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};


// Update category
const updateCategory = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!isValidObjectId(_id)) {
      return res.status(400).json({ error: "Invalid category _id", status: 400 });
    }

    const updated = await Category.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Category not found", status: 404 });
    }

    res.status(200).json({
      data: updated,
      message: "Category updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Update category error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!isValidObjectId(_id)) {
      return res.status(400).json({ error: "Invalid category _id", status: 400 });
    }

    const deleted = await Category.findByIdAndDelete(_id);
    if (!deleted) {
      return res.status(404).json({ error: "Category not found", status: 404 });
    }

    res.status(200).json({
      message: "Category deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Delete category error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};

module.exports = {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
