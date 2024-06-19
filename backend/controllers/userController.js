import User from "../model/user.js";

// Controller to create a new user
const createUser = async (req, res) => {
  const { name, password, email, profileImage } = req.body; // Extract data from request body
  try {
    const findUser = await User.findOne({ name }); // Check if username already exists
    if (findUser) {
      return res.status(400).json({ message: "Username already exists" }); // If exists, return error
    }
    const newUser = await User.create({ name, password, email, profileImage }); // Create new user
    return res.status(201).json({ message: "User created successfully" }); // Return success message
  } catch (error) {
    res.status(500).json({ message: "Server Error" }); // Return server error message
  }
};

// Controller to log in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body; // Extract data from request body
  try {
    const findUser = await User.findOne({ email }); // Find user by email
    if (!findUser) {
      return res.status(400).json({ message: "User does not exist" }); // If user doesn't exist, return error
    }
    if (findUser.password === password) {
      return res.status(200).json(findUser); // If password matches, return user data
    }
    return res.status(400).json({ message: "Incorrect password" }); // If password doesn't match, return error
  } catch (error) {
    res.status(500).json({ message: "Server Error" }); // Return server error message
  }
};

// Controller to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}); // Find all users
    return res.status(200).json(users); // Return users data
  } catch (error) {
    res.status(500).json({ message: "Server Error" }); // Return server error message
  }
};

export { createUser, loginUser, getAllUsers };
