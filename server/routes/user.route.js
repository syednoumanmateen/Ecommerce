const express = require("express");
const { register, login, forgotPassword, resetPassword, getProfile, updateProfile, verifyToken } = require("../controllers/user.controller");
const { protect } = require("../middleware");
const router = express.Router();

// Auth Routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/verify", verifyToken);

// Profile Routes (protected)
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;
