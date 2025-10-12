import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User, Transaction, Budget } from "./db.js";

const app = express();
app.use(express.json()); // Parse JSON body

// -------------------------
// MongoDB Connection
// -------------------------
mongoose
  .connect("mongodb+srv://hslrsharmasingh:323112rm@cluster0.skwiapv.mongodb.net/finance-tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.error(" DB Connection Error:", err));

// -------------------------
// JWT Secret (Hardcoded)
// -------------------------
const JWT_SECRET = "mySecretKey123";

// -------------------------
// Middleware for Auth
// -------------------------
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.userId = decoded.id; // store user ID in request
    next();
  });
}

// -------------------------
// USER AUTH ROUTES
// -------------------------

// Register
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err });
  }
});

// -------------------------
// TRANSACTION CRUD ROUTES
// -------------------------

// Create Transaction
app.post("/transactions", verifyToken, async (req, res) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      user: req.userId,
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ message: "Error creating transaction", error: err });
  }
});

// Read All Transactions (for a user)
app.get("/transactions", verifyToken, async (req, res) => {
  const transactions = await Transaction.find({ user: req.userId });
  res.json(transactions);
});

// Update Transaction
app.put("/transactions/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating transaction", error: err });
  }
});

// Delete Transaction
app.delete("/transactions/:id", verifyToken, async (req, res) => {
  try {
    await Transaction.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting transaction", error: err });
  }
});

// -------------------------
// BUDGET CRUD ROUTES
// -------------------------

// Create Budget
app.post("/budgets", verifyToken, async (req, res) => {
  try {
    const budget = await Budget.create({
      ...req.body,
      user: req.userId,
    });
    res.status(201).json(budget);
  } catch (err) {
    res.status(400).json({ message: "Error creating budget", error: err });
  }
});

// Read All Budgets (for a user)
app.get("/budgets", verifyToken, async (req, res) => {
  const budgets = await Budget.find({ user: req.userId });
  res.json(budgets);
});

// Update Budget
app.put("/budgets/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Budget.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating budget", error: err });
  }
});

// Delete Budget
app.delete("/budgets/:id", verifyToken, async (req, res) => {
  try {
    await Budget.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ message: "Budget deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting budget", error: err });
  }
});

// -------------------------
// SERVER START
// -------------------------
const PORT = 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
