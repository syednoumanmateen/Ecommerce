const mongoose = require("mongoose");
const ShopRoom = require("../models/shopRoom.model");

const isValidObjectId = (_id) => mongoose.Types.ObjectId.isValid(_id);

// Create
const addShopRoom = async (req, res) => {
  try {
    const shopRoom = new ShopRoom(req.body);
    await shopRoom.save();

    res.status(201).json({
      data: shopRoom,
      message: "Shop Room created successfully",
      status: 201
    });
  } catch (error) {
    console.error("Add ShopRoom error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500
    });
  }
};

// Get all
const getShopRooms = async (req, res) => {
  try {
    const shopRooms = await ShopRoom.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories"
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "featuredProducts",
          foreignField: "_id",
          as: "featuredProducts"
        }
      },
      {
        $project: {
          name: 1,
          slug: 1,
          description: 1,
          image: 1,
          categories: { _id: 1, name: 1 },
          featuredProducts: { _id: 1, name: 1, price: 1 },
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]);

    res.status(200).json({
      data: shopRooms,
      message: "Shop Rooms fetched successfully",
      status: 200
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500
    });
  }
};


// Get one
const getShopRoom = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid Shop Room _id", status: 400 });
    }

    const [shopRoom] = await ShopRoom.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(_id) } },
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories"
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "featuredProducts",
          foreignField: "_id",
          as: "featuredProducts"
        }
      },
      {
        $project: {
          name: 1,
          slug: 1,
          description: 1,
          image: 1,
          categories: { _id: 1, name: 1 },
          featuredProducts: { _id: 1, name: 1, price: 1 },
          createdAt: 1,
          updatedAt: 1
        }
      },
      { $limit: 1 }
    ]);

    if (!shopRoom) {
      return res.status(404).json({ error: "Shop Room not found", status: 404 });
    }

    res.status(200).json({
      data: shopRoom,
      message: "Shop Room fetched successfully",
      status: 200
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500
    });
  }
};

// Update
const updateShopRoom = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!isValidObjectId(_id)) {
      return res.status(400).json({ error: "Invalid Shop Room _id", status: 400 });
    }

    const updated = await ShopRoom.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({ error: "Shop Room not found", status: 404 });
    }

    res.status(200).json({
      data: updated,
      message: "Shop Room updated successfully",
      status: 200
    });
  } catch (error) {
    console.error("Update ShopRoom error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500
    });
  }
};

// Delete
const deleteShopRoom = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!isValidObjectId(_id)) {
      return res.status(400).json({ error: "Invalid Shop Room _id", status: 400 });
    }

    const deleted = await ShopRoom.findByIdAndDelete(_id);
    if (!deleted) {
      return res.status(404).json({ error: "Shop Room not found", status: 404 });
    }

    res.status(200).json({
      message: "Shop Room deleted successfully",
      status: 200
    });
  } catch (error) {
    console.error("Delete ShopRoom error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500
    });
  }
};

module.exports = {
  addShopRoom,
  getShopRooms,
  getShopRoom,
  updateShopRoom,
  deleteShopRoom
};
