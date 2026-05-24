const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { protect, admin } = require("../middleware/authMiddleware");

// Admin routes
router.get("/", protect, admin, getUsers);

// Protected routes
router.get("/:id", protect, getUserById);

router.post("/", protect, admin, createUser);

router.put("/:id", protect, admin, updateUser);

// Admin only
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
