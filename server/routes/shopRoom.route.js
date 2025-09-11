const express = require("express");
const { addShopRoom, getShopRooms, getShopRoom, updateShopRoom, deleteShopRoom } = require("../controllers/shopRoom.controller");
const { protect } = require("../middleware")
const router = express.Router();

router.post("/", protect, addShopRoom);
router.get("/", protect, getShopRooms);
router.get("/:_id", protect, getShopRoom);
router.put("/:_id", protect, updateShopRoom);
router.delete("/:_id", protect, deleteShopRoom);

module.exports = router;
