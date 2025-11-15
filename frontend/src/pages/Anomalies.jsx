// src/pages/Anomalies.jsx
import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import { getAnomalies } from "../api/api";

export default function Anomalies({ onLogout }) {
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await getAnomalies();
      setAnomalies(res.data.anomalies || []);
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Error fetching anomalies");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: "1.5rem" }}>
      <NavBar onLogout={onLogout} />
      <h2>Anomaly Detection</h2>

      <div className="form-container">
        {loading ? <p>Loading...</p> : anomalies.length === 0 ? (
          <p>No anomalies detected.</p>
        ) : (
          <ul>
            {anomalies.map((a, i) => (
              <li key={i} style={{ marginBottom: 12, background: "var(--bg-secondary)", padding: 12, borderRadius: 8 }}>
                <strong>{a.transaction.category} — ₹{a.transaction.amount}</strong>
                <div>{a.transaction.note}</div>
                <div style={{ color: "var(--text-muted)" }}>Deviation: {a.deviation}</div>
                <div style={{ color: "var(--text-muted)" }}>On: {new Date(a.transaction.date).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
