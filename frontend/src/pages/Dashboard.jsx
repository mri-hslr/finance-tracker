// src/pages/Dashboard.jsx
import React, { useState } from "react";
import NavBar from "../components/Navbar";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Dashboard({ onLogout }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdd = () => setRefreshKey((k) => k + 1);

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "1.5rem" }}>
      <NavBar onLogout={onLogout} />
      <div className="dashboard-header">
        <h2>Finance Tracker</h2>
      </div>
      <TransactionForm onAdd={handleAdd} />
      <TransactionList refreshKey={String(refreshKey)} />
    </div>
  );
}
