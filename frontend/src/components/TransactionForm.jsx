// src/components/TransactionForm.jsx
import React, { useState } from "react";
import { addTransaction } from "../api/api";

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    category: "",
    type: "Expense",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    note: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.category || !form.amount || !form.type) throw new Error("Please fill required fields");

      const payload = {
        category: form.category,
        amount: Number(form.amount),
        type: form.type,
        note: form.note,
        date: form.date,
      };

      const res = await addTransaction(payload);
      alert("✅ Transaction added successfully!");
      setForm({ category: "", type: "Expense", amount: "", date: new Date().toISOString().split("T")[0], note: "" });
      if (onAdd) onAdd(res.data);
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Error adding transaction");
    }
  };

  return (
    <div className="form-container">
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit} className="form">
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>

        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>

        <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />

        <input type="date" name="date" value={form.date} onChange={handleChange} required />

        <input type="text" name="note" placeholder="Note (optional)" value={form.note} onChange={handleChange} />

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}
