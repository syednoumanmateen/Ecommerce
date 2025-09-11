const express = require("express");
const { addPatternType, getPatternTypes, getPatternType, updatePatternType, deletePatternType } = require("../controllers/patternType.controller");
const { protect } = require("../middleware")
const router = express.Router();

router.post("/", protect, addPatternType);
router.get("/", protect, getPatternTypes);
router.get("/:_id", protect, getPatternType);
router.put("/:_id", protect, updatePatternType);
router.delete("/:_id", protect, deletePatternType);

module.exports = router;