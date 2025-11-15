// src/components/BudgetForm.jsx
import React, { useState } from "react";

export default function BudgetForm({ onCreate }) {
  const [form, setForm] = useState({ category: "", limit: "", month: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.category || !form.limit) return alert("Category and limit required");
    const payload = { category: form.category, limit: Number(form.limit), month: form.month || undefined };
    onCreate(payload);
    setForm({ category: "", limit: "", month: "" });
  };

  return (
    <div className="form-container">
      <h3>Create Budget</h3>
      <form onSubmit={handleSubmit}>
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
        <input type="number" name="limit" placeholder="Limit" value={form.limit} onChange={handleChange} required />
        <input type="text" name="month" placeholder="Month (e.g., Nov-2025)" value={form.month} onChange={handleChange} />
        <button type="submit">Create Budget</button>
      </form>
    </div>
  );
}
