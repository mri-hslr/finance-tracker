// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";
import Budgets from "./pages/Budgets";
import Insights from "./pages/Insights";
import RangeSum from "./pages/RangeSum";
import Anomalies from "./pages/Anomalies";
import Optimizer from "./pages/Optimizer";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/login";
  };

  return (
    <Router>
      <Routes>
        {!token ? (
          <>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
            <Route path="/budgets" element={<Budgets onLogout={handleLogout} />} />
            <Route path="/insights" element={<Insights onLogout={handleLogout} />} />
            <Route path="/insights/range-sum" element={<RangeSum onLogout={handleLogout} />} />
            <Route path="/insights/anomalies" element={<Anomalies onLogout={handleLogout} />} />
            <Route path="/insights/optimizer" element={<Optimizer onLogout={handleLogout} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
