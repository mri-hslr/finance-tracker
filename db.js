
import mongoose from "mongoose";



// -------------------------
// User Schema
// -------------------------
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// -------------------------
// Transaction Schema
// -------------------------
const TransactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: {
      type: String,
      enum: ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Other"],
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    type: { type: String, enum: ["Income", "Expense"], required: true },
    date: { type: Date, default: Date.now },
    note: { type: String },
  },
  { timestamps: true }
);

// -------------------------
// Budget Schema
// -------------------------
const BudgetSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: {
      type: String,
      enum: ["Food", "Transport", "Entertainment", "Bills", "Shopping", "Other"],
      required: true,
    },
    limit: { type: Number, required: true, min: 0 },
    spent: { type: Number, default: 0 },
    month: { type: String }, // e.g., "Oct-2025"
  },
  { timestamps: true }
);

// -------------------------
// Model Creation
// -------------------------
const User = mongoose.model("User", UserSchema);
const Transaction = mongoose.model("Transaction", TransactionSchema);
const Budget = mongoose.model("Budget", BudgetSchema);

// -------------------------
// Exports
// -------------------------
export { User, Transaction, Budget };
