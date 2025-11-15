// src/pages/Insights.jsx
import React from "react";
import NavBar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Insights({ onLogout }) {
  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "1.5rem" }}>
      <NavBar onLogout={onLogout} />
      <div className="dashboard-header">
        <h2>Analytics & Insights</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Link to="/insights/anomalies" style={cardStyle}>Anomaly Detection</Link>
        <Link to="/insights/range-sum" style={cardStyle}>Range Sum (Fenwick)</Link>
        <Link to="/insights/optimizer" style={cardStyle}>Budget Optimizer</Link>
      </div>
    </div>
  );
}

const cardStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 120,
  background: "var(--bg-card)",
  borderRadius: 12,
  border: "1px solid var(--border-color)",
  color: "var(--text-primary)",
  textDecoration: "none",
  fontWeight: 600,
};
