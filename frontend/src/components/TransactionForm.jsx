import React, { useState } from "react";

export default function TransactionForm({ token, onAdd }) {
  const [form, setForm] = useState({
    category: "",
    type: "Expense",
    amount: "",
    date: new Date().toISOString().split('T')[0], // Today's date
    note: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error adding transaction");
      }

      alert("✅ Transaction added successfully!");
      setForm({ 
        category: "", 
        type: "Expense", 
        amount: "", 
        date: new Date().toISOString().split('T')[0],
        note: "" 
      });

      if (onAdd) onAdd(data);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="form-container">
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit} className="form">
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
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

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="note"
          placeholder="Note (optional)"
          value={form.note}
          onChange={handleChange}
        />

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}