import React from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Dashboard({ token, onLogout }) {
  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "1.5rem" }}>
      <div className="dashboard-header">
        <h2>Finance Tracker</h2>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <TransactionForm token={token} />
      <TransactionList token={token} />
    </div>
  );
}