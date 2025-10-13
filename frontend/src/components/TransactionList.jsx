import React, { useEffect, useState } from "react";

export default function TransactionList({ token }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:3001/transactions", {
        headers: { Authorization: token },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error fetching data");

      setTransactions(data);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;

    try {
      const res = await fetch(`http://localhost:6000/transactions/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error deleting");

      alert("Transaction deleted!");
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="transactions">
      <h3>Recent Transactions</h3>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul className="transaction-list">
          {transactions.map((t) => (
            <li key={t._id} className={`transaction ${t.type.toLowerCase()}`}>
              <div>
                <strong>{t.category}</strong> — {t.note || "No note"}
                <p className="date">
                  {new Date(t.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <span
                  className={`amount ${
                    t.type === "Expense" ? "negative" : "positive"
                  }`}
                >
                  {t.type === "Expense" ? "-" : "+"}₹{t.amount}
                </span>
                <button className="delete-btn" onClick={() => handleDelete(t._id)}>
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
