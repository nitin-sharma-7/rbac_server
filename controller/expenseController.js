import jwt from "jsonwebtoken";
import { expenseModel } from "../models/expenseModel.js";
import { userModel } from "../models/userModel.js";

export const addExpense = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const { employee, employeeId, amount, category, date, notes } = req.body;

    const newExpense = new expenseModel({
      employee,
      employeeId,
      amount,
      category,
      date,
      notes,
    });

    const savedExpense = await newExpense.save();

    res.status(201).json({
      message: "Expense added successfully",
      expense: savedExpense,
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getExpensesByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.query;

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }
    if (!employeeId) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    const expenses = await expenseModel.find({ employeeId });

    res.status(200).json({
      message: "Expenses fetched successfully",
      expenses,
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllExpensesForAdmin = async (req, res) => {
  try {
    const { id } = req.query;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await userModel.findById(id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const expenses = await expenseModel.find().sort({ createdAt: -1 });

    res.status(200).json({ expenses });
  } catch (error) {
    console.error("Error fetching admin expenses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateExpenseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }

    if (!id || !status) {
      return res
        .status(400)
        .json({ message: "Expense ID and status are required" });
    }

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only" });
    }

    const updatedExpense = await expenseModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({
      message: "Expense status updated successfully",
      updatedExpense,
    });
  } catch (error) {
    console.error("Error updating expense status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
