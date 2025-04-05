const express = require("express");
const router = express.Router();
const {
  authenticateJWT,
  authorizeRole,
} = require("../middleware/authMiddleware");

// Protected route for all authenticated users
router.get("/protected", authenticateJWT, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Admin-only route
router.get("/admin", authenticateJWT, authorizeRole(["admin"]), (req, res) => {
  res.json({ message: "Admin dashboard", user: req.user });
});

// Editor-only route
router.get(
  "/editor",
  authenticateJWT,
  authorizeRole(["editor", "admin"]),
  (req, res) => {
    res.json({ message: "Editor dashboard", user: req.user });
  }
);

module.exports = router;
