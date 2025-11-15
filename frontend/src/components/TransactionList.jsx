// src/components/TransactionList.jsx
import React, { useEffect, useState } from "react";
import { getTransactions, deleteTransaction } from "../api/api";

export default function TransactionList({ refreshKey }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line
  }, [refreshKey]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await getTransactions();
      setTransactions(res.data || []);
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Error fetching transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;
    try {
      await deleteTransaction(id);
      alert("Transaction deleted!");
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Error deleting transaction");
    }
  };

  return (
    <div className="transactions">
      <h3>Recent Transactions</h3>
      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul className="transaction-list">
          {transactions.map((t) => (
            <li key={t._id} className={`transaction ${t.type?.toLowerCase()}`}>
              <div>
                <strong>{t.category}</strong> — {t.note || "No note"}
                <p className="date">{new Date(t.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <span className={`amount ${t.type === "Expense" ? "negative" : "positive"}`}>
                  {t.type === "Expense" ? "-" : "+"}₹{t.amount}
                </span>
                <button className="delete-btn" onClick={() => handleDelete(t._id)}>✕</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
