const { UserModel } = require("../models/user-model");

const addAdmin = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new UserModel({ username, password: hashedPassword, role: 'admin' });
  await newAdmin.save();

  res.status(201).json({ message: 'Admin created' });
};

const getAllUsers = async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
};

module.exports = { addAdmin, getAllUsers };