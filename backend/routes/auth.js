const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, username, password, livingCity } = req.body;
  if (!name || !username || !password || !livingCity) {
    return res.status(400).json({ error: "Name, username, password, and living city are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ error: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, username, password: hashedPassword, livingCity });

    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, username: user.username, name: user.name, livingCity: user.livingCity });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid username or password" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid username or password" });

    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, username: user.username, name: user.name, livingCity: user.livingCity });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;