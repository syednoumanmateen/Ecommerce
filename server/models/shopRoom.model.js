const mongoose = require("mongoose");

const shopByRoomSchema = new mongoose.Schema({
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
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  featuredProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
}, { timestamps: true });

const ShopByRoom = mongoose.model("ShopByRoom", shopByRoomSchema);
module.exports = ShopByRoom;