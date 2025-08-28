const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
  },
}, { timestamps: true });

Category = mongoose.model("Category", categorySchema);
module.exports = Category;
