const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {
  findUserByUsername,
  generateToken,
  comparePasswords,
  createUser,
} = require("../utils/authUtils");

router.post("/login", async (req, res) => {
  try {
    console.log("Login request body:", req.body); // Debug log

    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    console.log("Looking for user:", username); // Debug log
    const user = findUserByUsername(username);
    console.log("Found user:", user); // Debug log

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("Comparing passwords..."); // Debug log
    const isValidPassword = await comparePasswords(password, user.password);
    console.log("Password valid:", isValidPassword); // Debug log

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json({
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    // Validate request body
    if (!req.body || !req.body.username || !req.body.password) {
      return res.status(400).json({
        error: "Validation failed",
        message: "Username and password are required",
      });
    }

    const { username, password, role = "user" } = req.body;

    if (findUserByUsername(username)) {
      return res.status(400).json({
        error: "Registration failed",
        message: "Username already exists",
      });
    }

    // Password complexity check
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
      });
    }

    const user = await createUser(username, password, role);
    const token = generateToken(user);
    res.status(201).json({
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Registration failed",
    });
  }
});

router.get("/test-password", async (req, res) => {
  try {
    const testHash =
      "$2a$10$N9qo8uLOickgx2ZMRZoMy.Mr7JYK9FlX2/7x7Z1QzR1U6t5W7Q1qK";
    const match = await bcrypt.compare("admin123", testHash);

    res.json({
      test: "Password comparison test",
      inputPassword: "admin123",
      storedHash: testHash,
      shouldMatch: true,
      actualMatch: match,
      hashRounds: bcrypt.getRounds(testHash),
      sameHash: await bcrypt.compareSync("admin123", testHash),
    });
  } catch (error) {
    console.error("Password test error:", error);
    res
      .status(500)
      .json({ error: "Password test failed", details: error.message });
  }
});

router.get("/debug-users", (req, res) => {
  const { findUserByUsername, debugUsers } = require("../utils/authUtils");
  res.json({
    users: debugUsers(),
    adminExists: !!findUserByUsername("admin"),
    testComparison: "This will show if admin exists",
  });
});

module.exports = router;
