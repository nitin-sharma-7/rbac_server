import bcrypt from "bcryptjs";
import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
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
      role: "admin",
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "admin registered successfully", adminId: newUser._id });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server Error", err: error });
  }
};
