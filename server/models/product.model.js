const mongoose =require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  shopRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShopRoom",
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  patternType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PatternType",
  },
  images: [
    {
      type: String,
    }
  ],
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
