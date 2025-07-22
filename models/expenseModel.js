// models/Expense.js
import { model, Schema } from "mongoose";

const expenseSchema = new Schema({
  employeeId: {
    type: String,
    required: true,
  },
  employee: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ["Travel", "Food", "Supplies", "Other"], // You can modify these categories
  },
  date: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    default: "",
    trim: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});
export const expenseModel = model("expense", expenseSchema);
