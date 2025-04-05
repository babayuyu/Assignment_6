require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");

const app = express();

// Enhanced Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:8100",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsing with error handling
app.use(
  express.json({
    limit: "10kb", // Limit payload size
    strict: true, // Only accept arrays and objects
  })
);

// Error handling for JSON parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});
app.use(limiter);

// Routes
app.use("/auth", authRoutes);
app.use("/api", protectedRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Limit to 5 requests per window
  message: "Too many login attempts, please try again later",
});
app.use("/auth/login", authLimiter);
app.use("/auth/register", authLimiter);
