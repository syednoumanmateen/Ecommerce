const express = require("express");
const { register, login, forgotPassword, resetPassword, verifyToken } = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/verify", verifyToken);

module.exports = router;
