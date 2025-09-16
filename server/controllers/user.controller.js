const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user.model");
const { decodeToken } = require("../middleware");

const sanitizeUser = (user) => {
  const { password, resetPasswordToken, resetPasswordExpires, ...rest } = user.toObject();
  return rest;
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: sanitizeUser(user),
      status: 201,
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ error: "Register failed", message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 15;
    await user.save();
    res.status(200).json({
      token,
      user: sanitizeUser(user),
      status: 200,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Login failed", message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 15;
    await user.save();

    res.status(200).json({
      message: "Password reset token generated",
      token: hashedToken,
      status: 200,
    });
  } catch (error) {
    console.error("Forgot password error:", error.message);
    res.status(500).json({ error: "Something went wrong", message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset", status: 200 });
  } catch (error) {
    console.error("Reset password error:", error.message);
    res.status(500).json({ error: "Reset failed", message: error.message });
  }
};

const verifyToken = async (req, res) => {
  const errorResponse = { message: "Invalid or expired token", valid: false };

  try {
    const decoded = await decodeToken(req.body.token);

    if (!decoded) {
      return res.status(400).json(errorResponse);
    }

    return res.status(200).json({
      message: "Verified successfully",
      valid: true,
      status: 200,
    });
  } catch (err) {
    return res.status(500).json(errorResponse);
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyToken
};
