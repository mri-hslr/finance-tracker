// src/api/api.jsx
import axios from "axios";

const API_URL = "http://localhost:3001";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { authorization: `Bearer ${token}` } : {};
};

/* AUTH */
export const registerUser = (userData) =>
  axios.post(`${API_URL}/register`, userData);

export const loginUser = (userData) =>
  axios.post(`${API_URL}/login`, userData);

/* TRANSACTIONS */
export const addTransaction = (transactionData) =>
  axios.post(`${API_URL}/transactions`, transactionData, {
    headers: getAuthHeader(),
  });

export const getTransactions = () =>
  axios.get(`${API_URL}/transactions`, { headers: getAuthHeader() });

export const deleteTransaction = (id) =>
  axios.delete(`${API_URL}/transactions/${id}`, {
    headers: getAuthHeader(),
  });

export const updateTransaction = (id, updateData) =>
  axios.put(`${API_URL}/transactions/${id}`, updateData, {
    headers: getAuthHeader(),
  });

/* DSA Routes */
export const getRangeSum = (start, end) =>
  axios.get(`${API_URL}/transactions/range-sum`, {
    params: { start, end },
    headers: getAuthHeader(),
  });

export const getAnomalies = () =>
  axios.get(`${API_URL}/transactions/anomalies`, {
    headers: getAuthHeader(),
 });

/* BUDGETS */
export const createBudget = (budgetData) =>
  axios.post(`${API_URL}/budgets`, budgetData, { headers: getAuthHeader() });

export const getBudgets = () =>
  axios.get(`${API_URL}/budgets`, { headers: getAuthHeader() });

export const updateBudget = (id, updateData) =>
  axios.put(`${API_URL}/budgets/${id}`, updateData, { headers: getAuthHeader() });

export const deleteBudget = (id) =>
  axios.delete(`${API_URL}/budgets/${id}`, { headers: getAuthHeader() });

export const suggestBudgetCuts = (goal) =>
  axios.post(
    `${API_URL}/budgets/suggest`,
    { goal },
    {
      headers: getAuthHeader(),
    }
  );
