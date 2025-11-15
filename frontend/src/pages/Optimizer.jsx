// src/pages/Optimizer.jsx
import React, { useState } from "react";
import NavBar from "../components/Navbar";
import { suggestBudgetCuts } from "../api/api";

export default function Optimizer({ onLogout }) {
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await suggestBudgetCuts(Number(goal));
      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Error fetching suggestions");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: "1.5rem" }}>
      <NavBar onLogout={onLogout} />
      <h2>Budget Optimizer</h2>

      <div className="form-container" style={{ maxWidth: 520 }}>
        <form onSubmit={handleSubmit}>
          <input type="number" placeholder="Savings goal (₹)" value={goal} onChange={(e) => setGoal(e.target.value)} required />
          <button type="submit">Suggest Cuts</button>
        </form>

        {result && (
          <div style={{ marginTop: 16 }}>
            <p>Goal: ₹{result.goal}</p>
            <p>Achieved: {result.achieved ? "Yes" : "No"}</p>
            <p>Total saved by suggestions: ₹{result.totalSaved}</p>

            <h4>Suggested cuts</h4>
            <ul>
              {result.suggestedCuts.map((s) => (
                <li key={s._id || s.description || Math.random()}>
                  {s.description || s.note || s.category || "Transaction"} — ₹{s.amount}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
