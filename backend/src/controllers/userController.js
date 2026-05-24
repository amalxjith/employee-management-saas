const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

// Get all users
exports.getUsers = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const search = req.query.search || "";

  const query = {
    name: { $regex: search, $options: "i" },
  };

  const totalUsers = await User.countDocuments(query);

  const users = await User.find(query)
    .select("-password")
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    totalUsers,
    currentPage: page,
    totalPages: Math.ceil(totalUsers / limit),
    users,
  });
});

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json(user);
});

// Get single user
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json(user);
});

exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  user.name = req.body.name || user.name;

  user.email = req.body.email || user.email;

  user.role = req.body.role || user.role;

  const updatedUser = await user.save();

  res.json(updatedUser);
});

// Delete user
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.deleteOne();

  res.json({
    message: "User deleted successfully",
  });
});
