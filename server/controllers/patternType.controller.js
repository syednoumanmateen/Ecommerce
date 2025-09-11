const mongoose = require("mongoose");
const PatternType = require("../models/patternType.model");

const isValidObjectId = (_id) => mongoose.Types.ObjectId.isValid(_id);

// Create
const addPatternType = async (req, res) => {
  try {
    const patternType = new PatternType(req.body);
    await patternType.save();

    res.status(201).json({
      data: patternType,
      message: "Pattern Type created successfully",
      status: 201,
    });
  } catch (error) {
    console.error("Add PatternType error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};

// Get all
const getPatternTypes = async (req, res) => {
  try {
    const patternTypes = await PatternType.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]);

    res.status(200).json({
      data: patternTypes,
      message: "Pattern Types fetched successfully",
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


// Get single
const getPatternType = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid _id", status: 400 });
    }

    const [patternType] = await PatternType.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(_id) } },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          createdAt: 1,
          updatedAt: 1
        }
      },
      { $limit: 1 }
    ]);

    if (!patternType) {
      return res.status(404).json({ error: "Pattern Type not found", status: 404 });
    }

    res.status(200).json({
      data: patternType,
      message: "Pattern Type fetched successfully",
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


// Update
const updatePatternType = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!isValidObjectId(_id)) {
      return res.status(400).json({ error: "Invalid _id", status: 400 });
    }

    const updated = await PatternType.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Pattern Type not found", status: 404 });
    }

    res.status(200).json({
      data: updated,
      message: "Pattern Type updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Update PatternType error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};

// Delete
const deletePatternType = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!isValidObjectId(_id)) {
      return res.status(400).json({ error: "Invalid _id", status: 400 });
    }

    const deleted = await PatternType.findByIdAndDelete(_id);

    if (!deleted) {
      return res.status(404).json({ error: "Pattern Type not found", status: 404 });
    }

    res.status(200).json({
      message: "Pattern Type deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Delete PatternType error:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      status: 500,
    });
  }
};

module.exports = {
  addPatternType,
  getPatternTypes,
  getPatternType,
  updatePatternType,
  deletePatternType,
};
