import axios from "axios";

const API_URL = "http://localhost:3001";

// Get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: token } : {};
};

export const registerUser = (userData) => 
  axios.post(`${API_URL}/register`, userData);

export const loginUser = (userData) => 
  axios.post(`${API_URL}/login`, userData);

export const addTransaction = (transactionData) => 
  axios.post(`${API_URL}/transactions`, transactionData, {
    headers: getAuthHeader()
  });

export const getTransactions = () => 
  axios.get(`${API_URL}/transactions`, {
    headers: getAuthHeader()
  });

export const deleteTransaction = (id) => 
  axios.delete(`${API_URL}/transactions/${id}`, {
    headers: getAuthHeader()
  });