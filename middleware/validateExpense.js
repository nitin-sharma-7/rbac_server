export const validateExpense = (req, res, next) => {
  const { employee, employeeId, amount, category, date } = req.body;

  if (!employee || !employeeId || !amount || !category || !date) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled!" });
  }

  next();
};
