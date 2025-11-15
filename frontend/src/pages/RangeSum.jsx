// src/pages/RangeSum.jsx
import React, { useState } from "react";
import NavBar from "../components/Navbar";
import { getRangeSum } from "../api/api";

export default function RangeSum({ onLogout }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getRangeSum(start, end);
      setResult(res.data.total);
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Error computing range sum");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: "1.5rem" }}>
      <NavBar onLogout={onLogout} />
      <h2>Range Sum (Fenwick Tree)</h2>

      <div className="form-container" style={{ maxWidth: 520 }}>
        <form onSubmit={handleSubmit}>
          <input type="number" placeholder="Start index (1-based)" value={start} onChange={(e) => setStart(e.target.value)} required />
          <input type="number" placeholder="End index (1-based)" value={end} onChange={(e) => setEnd(e.target.value)} required />
          <button type="submit">Calculate</button>
        </form>

        {result !== null && (
          <div style={{ marginTop: 16 }}>
            <strong>Total:</strong> ₹{result}
          </div>
        )}
      </div>
    </div>
  );
}
