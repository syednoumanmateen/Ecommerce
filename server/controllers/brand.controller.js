const Brand = require("../models/brand.model");
const mongoose = require("mongoose");

// Helper: check for valid ObjectId
const isValidObjectId = (_id) => mongoose.Types.ObjectId.isValid(_id);

// Create brand
const addBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();

    res.status(201).json({
      data: brand,
      message: "Brand created successfully",
      status: 201,
    });
  } catch (error) {
    console.error("Add brand error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};

// Get all brands
const getBrands = async (req, res) => {
  try {
    const brands = await Brand.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1
        }
      }
    ]);

    res.status(200).json({
      data: brands,
      message: "Brands fetched successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Get brands error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};

// Get single brand by _id
const getBrand = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!isValidObjectId(_id)) {
      return res.status(400).json({ error: "Invalid brand _id", status: 400 });
    }

    const brand = await Brand.aggregate([{
      $match: { _id: new mongoose.Types.ObjectId(_id) }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1
      }
    }, { $limit: 1 }
    ]);

    if (!brand && brand.length) {
      return res.status(404).json({ error: "Brand not found", status: 404 });
    }

    res.status(200).json({
      data: brand,
      message: "Brand fetched successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Get brand error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};

// Update brand
const updateBrand = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!isValidObjectId(_id)) {
      return res.status(400).json({ error: "Invalid brand _id", status: 400 });
    }

    const updated = await Brand.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Brand not found", status: 404 });
    }

    res.status(200).json({
      data: updated,
      message: "Brand updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Update brand error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};

// Delete brand
const deleteBrand = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!isValidObjectId(_id)) {
      return res.status(400).json({ error: "Invalid brand _id", status: 400 });
    }

    const deleted = await Brand.findByIdAndDelete(_id);

    if (!deleted) {
      return res.status(404).json({ error: "Brand not found", status: 404 });
    }

    res.status(200).json({
      message: "Brand deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Delete brand error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};

module.exports = {
  addBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
};
