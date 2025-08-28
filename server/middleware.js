const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ error: "No token" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) return res.status(401).json({ error: "Unauthorized" });
        next();
    } catch {
        res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = protect