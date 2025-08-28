const express = require("express");
const { addShopRoom, getShopRooms, getShopRoom, updateShopRoom, deleteShopRoom } = require("../controllers/shopRoom.controller");
const protect = require("../middleware")
const router = express.Router();

router.post("/", protect, addShopRoom);
router.get("/", protect, getShopRooms);
router.get("/:id", protect, getShopRoom);
router.put("/:id", protect, updateShopRoom);
router.delete("/:id", protect, deleteShopRoom);

module.exports = router;
