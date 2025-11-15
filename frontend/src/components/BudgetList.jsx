// src/components/BudgetList.jsx
import React, { useEffect, useState } from "react";
import { getBudgets, deleteBudget, updateBudget } from "../api/api";

export default function BudgetList() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchBudgets(); }, []);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const res = await getBudgets();
      setBudgets(res.data || []);
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Error fetching budgets");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this budget?")) return;
    try {
      await deleteBudget(id);
      setBudgets((p) => p.filter((b) => b._id !== id));
      alert("Budget deleted");
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Error deleting budget");
    }
  };

  const handleUpdate = async (id) => {
    const newLimit = prompt("Enter new limit:");
    if (!newLimit) return;
    try {
      const res = await updateBudget(id, { limit: Number(newLimit) });
      setBudgets((p) => p.map((b) => (b._id === id ? res.data : b)));
      alert("Budget updated");
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Error updating budget");
    }
  };

  if (loading) return <p>Loading budgets...</p>;

  return (
    <div className="transactions">
      <h3>Your Budgets</h3>
      {budgets.length === 0 ? <p>No budgets yet.</p> : (
        <ul className="transaction-list">
          {budgets.map((b) => (
            <li key={b._id} className="transaction">
              <div>
                <strong>{b.category}</strong> — Limit: ₹{b.limit}
                <p className="date">Month: {b.month || "N/A"}</p>
              </div>
              <div>
                <span className="amount">{b.spent ? `Spent: ₹${b.spent}` : "No spend yet"}</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => handleUpdate(b._id)}>Edit</button>
                  <button onClick={() => handleDelete(b._id)} className="delete-btn">✕</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
