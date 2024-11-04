const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  res.status(201).json({ user, token: generateToken(user.id) });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ user, token: generateToken(user.id) });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
