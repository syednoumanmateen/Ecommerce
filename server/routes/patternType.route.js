const express = require("express");
const { addPatternType, getPatternTypes, getPatternType, updatePatternType, deletePatternType } = require("../controllers/patternType.controller");
const { protect } = require("../middleware")
const router = express.Router();

router.post("/", protect, addPatternType);
router.get("/", protect, getPatternTypes);
router.get("/:id", protect, getPatternType);
router.put("/:id", protect, updatePatternType);
router.delete("/:id", protect, deletePatternType);

module.exports = router;