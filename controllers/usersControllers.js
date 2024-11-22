const User = require("../models/User.js");
const Note = require("../models/Note.js");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc get all users
// @route GET /users
// @access Private

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users?.length) {
    return res.status(404).json({
      message: "Users not found!",
    });
  }
  res.json(users);
});

// @desc create new users
// @route GET /users
// @access Private

const createUsers = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;

  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(404).send({
      message: "Plaese fill your username, password and roles!!",
    });
  }

  // check for duplicates:

  const findDuplicate = await User.findOne({ username }).lean().exec();

  if (findDuplicate) {
    return res.status(400).json({
      message: "Duplicate User name",
    });
  }

  // Hash passsword:

  const hashPassword = await bcrypt.hash(password, 10); //salt rounds

  const userObj = { username, password: hashPassword, roles };

  // create and store new user:
  const user = await User.create(userObj);
  if (user) {
    res.status(200).json({
      message: `New user ${username} created`,
    });
  } else {
    res.status(400).json({
      message: "Invalid user data received!",
    });
  }
});

// @desc update the user
// @route GET /users
// @access Private

const updateUsers = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;

  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(404).json({
      message: "All fields are required!",
    });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    res.status(404).json({
      message: "User not found!",
    });
  }

  // find duplicate:

  const findDuplicate = await User.findOne({ username }).lean().exec();

  if (findDuplicate && findDuplicate._id.toString() !== id) {
    res.status(404).json({
      message: "Duplicate username",
    });
  }

  user.username = username;
  user.roles = roles;
  user.active = active;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updateUser = await user.save();

  res.status(200).json({
    message: `${updateUser.username} updated!`,
  });
});

// @desc delete the user
// @route GET /users
// @access Private

const deleteUsers = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User ID Required!" });
  }

  const notes = await Note.findOne({ user: id }).lean().exec();
  if (notes) {
    res.status(400).json({ message: "User has assigned Notes" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    res.status(400).json({ message: "User not found!" });
  }

  const result = await user.deleteOne();

  const reply = `User ${result.username} with id ${result._id} deleted!`;

  res.json(reply);
});

module.exports = {
  getAllUsers,
  createUsers,
  updateUsers,
  deleteUsers,
};
