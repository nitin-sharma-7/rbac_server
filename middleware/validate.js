export const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || username.trim().length < 3) {
    return res
      .status(400)
      .json({ error: "Username must be at least 3 characters" });
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email" });
  }

  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email" });
  }

  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }

  next();
};
