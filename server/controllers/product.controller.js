const mongoose = require("mongoose");
const Product = require("../models/Product.model");
const productPopulatePipeline = require("../helper");

const isValidObjectId = (_id) => mongoose.Types.ObjectId.isValid(_id);

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

const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      brand,
      price,
      patternType,
      rating,
      shopRoom,
      page = 1,
      perPage = 10
    } = req.query;

    const match = {};

    if (search) match.name = { $regex: search, $options: "i" };
    if (price) {
      const [minStr, maxStr] = price.split("-");

      const minPrice = minStr !== "null" ? Number(minStr) : null;
      const maxPrice = maxStr !== "null" ? Number(maxStr) : null;

      if (minPrice !== null || maxPrice !== null) {
        match.price = {};
        if (minPrice !== null) match.price.$gte = minPrice;
        if (maxPrice !== null) match.price.$lte = maxPrice;
      }
    }
    if (brand && mongoose.Types.ObjectId.isValid(brand)) match.brand = new mongoose.Types.ObjectId(brand);
    if (category && mongoose.Types.ObjectId.isValid(category)) match.category = new mongoose.Types.ObjectId(category);
    if (patternType && mongoose.Types.ObjectId.isValid(patternType)) match.patternType = new mongoose.Types.ObjectId(patternType);
    if (rating) match.rating = { $eq: Number(rating) };
    if (shopRoom && mongoose.Types.ObjectId.isValid(shopRoom)) match.shopRoom = new mongoose.Types.ObjectId(shopRoom);

    const skip = (Number(page) - 1) * Number(perPage);
    const limit = Number(perPage);

    const products = await Product.aggregate([
      { $match: match },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      ...productPopulatePipeline()
    ]);

    const totalCount = await Product.countDocuments(match);

    res.status(200).json({
      data: products,
      total: totalCount,
      page: Number(page),
      pages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch products",
      message: error.message,
      status: 500,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid product _id", status: 400 });
    }

    const [product] = await Product.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(_id) } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category"
        }
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brand"
        }
      },
      { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "patterntypes",
          localField: "patternType",
          foreignField: "_id",
          as: "patternType"
        }
      },
      { $unwind: { path: "$patternType", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "shoprooms",
          localField: "shopRoom",
          foreignField: "_id",
          as: "shopRoom"
        }
      },
      { $unwind: { path: "$shopRoom", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          name: 1,
          description: 1,
          price: 1,
          quantity: 1,
          images: 1,
          featured: 1,
          rating: 1,
          category: { _id: "$category._id", name: "$category.name" },
          brand: { _id: "$brand._id", name: "$brand.name" },
          patternType: { _id: "$patternType._id", name: "$patternType.name" },
          shopRoom: { _id: "$shopRoom._id", name: "$shopRoom.name" },
          createdAt: 1,
          updatedAt: 1
        }
      },
      { $limit: 1 }
    ]);

    if (!product) {
      return res.status(404).json({ error: "Product not found", status: 404 });
    }

    res.status(200).json({
      data: product,
      message: "Product fetched successfully",
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

const updateProduct = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!isValidObjectId(_id)) {
      return res.status(400).json({ error: "Invalid product _id", status: 400 });
    }

    const updated = await Product.findByIdAndUpdate(_id, req.body, {
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

const deleteProduct = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!isValidObjectId(_id)) {
      return res.status(400).json({ error: "Invalid product _id", status: 400 });
    }

    const deleted = await Product.findByIdAndDelete(_id);

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
