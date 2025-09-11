const express = require("express");
const { addCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("../controllers/category.controller");
const { protect } = require("../middleware")
const router = express.Router();

router.post("/", protect, addCategory);
router.get("/", protect, getCategories);
router.get("/:_id", protect, getCategory);
router.put("/:_id", protect, updateCategory);
router.delete("/:_id", protect, deleteCategory);

module.exports = router;