import { Router } from "express";
import { validateRegister } from "../middleware/validate.js";
import { registerAdmin } from "../controller/AdminController.js";
import { loginUser } from "../controller/userController.js";
import {
  getAllExpensesForAdmin,
  updateExpenseStatus,
} from "../controller/expenseController.js";

const router = Router();

router.post("/admin/register", validateRegister, registerAdmin);
router.post("/admin/login", loginUser);
router.get("/admin/expenses", getAllExpensesForAdmin);
router.put("/expenses/:id/status", updateExpenseStatus);

export default router;
