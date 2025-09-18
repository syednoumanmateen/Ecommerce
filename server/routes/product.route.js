const express = require("express");
const { getProducts, getProduct, getBrands, getCategories, getPatternTypes, getShopRooms } = require("../controllers/product.controller");
const { protect } = require("../middleware")
const router = express.Router();

router.get("/product/", protect, getProducts);
router.get("/product/:_id", protect, getProduct);
router.get("/brand/", protect, getBrands);
router.get("/category/", protect, getCategories);
router.get("/pattern-type/", protect, getPatternTypes);
router.get("/shop-room/", protect, getShopRooms);

module.exports = router;