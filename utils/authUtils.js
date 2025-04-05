const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET;

const users = [
  {
    id: 1,
    username: "admin",
    // This is DEFINITELY the hash for "admin123"
    password: "$2b$10$tf5W8LezZUCowNLRnsdxnuj3vQAqgWXx.7yo.8bdFaZN8rd6kTlgy",
    role: "admin",
  },
  {
    id: 2,
    username: "user",
    password: "$2b$10$tf5W8LezZUCowNLRnsdxnuj3vQAqgWXx.7yo.8bdFaZN8rd6kTlgy",
    role: "user",
  },
  {
    id: 3,
    username: "editor",
    password: "$2b$10$tf5W8LezZUCowNLRnsdxnuj3vQAqgWXx.7yo.8bdFaZN8rd6kTlgy",
    role: "editor",
  },
];

const debugUsers = () => users;

const comparePasswords = async (inputPassword, hashedPassword) => {
  console.log("\n=== PASSWORD COMPARISON DEBUG ===");
  console.log("Input:", JSON.stringify(inputPassword));
  console.log("Input length:", inputPassword.length);
  console.log(
    "Char codes:",
    [...inputPassword].map((c) => c.charCodeAt(0))
  );

  const result = await bcrypt.compare(inputPassword, hashedPassword);
  console.log("Comparison result:", result);
  return result;
};

const findUserByUsername = (username) =>
  users.find((user) => user.username === username);

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
      // Add these security enhancements:
      iss: "your-api-domain.com",
      aud: "your-client-domain.com",
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
      algorithm: "HS256", // Explicitly specify algorithm
    }
  );
};

// Add this new function for user registration
const createUser = async (username, password, role = "user") => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    role,
  };
  users.push(newUser);
  return newUser;
};

// Add to authUtils.js
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  findUserByUsername,
  generateToken,
  comparePasswords,
  createUser,
  debugUsers,
  generateRefreshToken,
};
