const jwt = require("jsonwebtoken");
const User = require("./models/user.model");

const protect = async (req, res, next) => {
    const unauthorized = (msg = "Unauthorized") =>
        res.status(401).json({ error: msg });

    try {
        const token = req.headers.authorization?.split(" ")[1];
        const user = decodeToken(token)
        if (!user) return unauthorized();

        req.user = user;
        next();
    } catch {
        return unauthorized();
    }
};

const decodeToken = async (token) => {
    try {
        if (!token) return unauthorized("No token provided");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return await User.findById(decoded._id).select("-password");
    } catch (e) {
        return null
    }
}

module.exports = { protect, decodeToken };
