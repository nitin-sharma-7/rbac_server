import bcrypt from "bcryptjs";
import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already registered" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server Error", err: error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // 3. Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
