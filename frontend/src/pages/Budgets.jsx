// src/pages/Budgets.jsx
import React from "react";
import NavBar from "../components/Navbar";
import BudgetForm from "../components/BudgetForm";
import BudgetList from "../components/BudgetList";
import { createBudget } from "../api/api";

export default function Budgets({ onLogout }) {
  const handleCreate = async (payload) => {
    try {
      await createBudget(payload);
      alert("Budget created");
      window.location.reload(); // quick refresh; or implement local state lift
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Error creating budget");
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "1.5rem" }}>
      <NavBar onLogout={onLogout} />
      <div className="dashboard-header">
        <h2>Budgets</h2>
      </div>

      <BudgetForm onCreate={handleCreate} />
      <BudgetList />
    </div>
  );
}
