// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ onLogout }) {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
      <div>
        <Link to="/dashboard" style={{ marginRight: 16, color: "inherit", textDecoration: "none", fontWeight: 600 }}>Dashboard</Link>
        <Link to="/budgets" style={{ marginRight: 16, color: "inherit", textDecoration: "none" }}>Budgets</Link>
        <Link to="/insights" style={{ marginRight: 16, color: "inherit", textDecoration: "none" }}>Insights</Link>
      </div>
      <div>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}
