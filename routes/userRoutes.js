import { Router } from "express";
import { validateLogin, validateRegister } from "../middleware/validate.js";
import { loginUser, registerUser } from "../controller/userController.js";
import { validateExpense } from "../middleware/validateExpense.js";
import {
  addExpense,
  getExpensesByEmployee,
} from "../controller/expenseController.js";

const router = Router();

router.post("/user/register", validateRegister, registerUser);
router.post("/user/login", validateLogin, loginUser);
router.post("/user/addexpense", validateExpense, addExpense);
router.get("/user/expenses", getExpensesByEmployee);

export default router;
