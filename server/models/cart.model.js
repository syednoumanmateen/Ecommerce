const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ["active", "ordered", "cancelled"],
    default: "active",
  }
}, { timestamps: true });

cartSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
