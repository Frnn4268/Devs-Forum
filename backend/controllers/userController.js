import User from "../model/user.js";

const createUser = async (req, res) => {
  const { name, password, email, profileImage } = req.body;
  try {
    const findUser = await User.findOne({ name });
    if (findUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const newUser = await User.create({ name, password, email, profileImage });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (findUser.password === password) {
      return res.status(200).json(findUser);
    }
    return res.status(400).json({ message: "Incorrect password" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { createUser, loginUser, getAllUsers };
