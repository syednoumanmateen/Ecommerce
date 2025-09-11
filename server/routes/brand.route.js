const express = require("express");
const { addBrand, getBrands, getBrand, updateBrand, deleteBrand } = require("../controllers/brand.controller");
const { protect } = require("../middleware")
const router = express.Router();

router.post("/", protect, addBrand);
router.get("/", protect, getBrands);
router.get("/:_id", protect, getBrand);
router.put("/:_id", protect, updateBrand);
router.delete("/:_id", protect, deleteBrand);

module.exports = router;