const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    if (!token) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const user = await User.findOne({ email });

    return res
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Sign in successful", user, token });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res.status(401).json({ error: "Invalid email or password" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const user = new User({ fullName, email, password });
    await user.save();
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).json({ message: "Sign up successful" });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(400).json({ error: "Error creating account" });
  }
});

module.exports = router;
