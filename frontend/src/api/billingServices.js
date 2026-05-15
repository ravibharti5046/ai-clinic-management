import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/bills/";

export const getBills = async () => {
  return await axios.get(API_URL);
};

export const createBill = async (data) => {
  return await axios.post(API_URL, data);
};

export const updateBill = async (id, data) => {
  return await axios.put(`${API_URL}${id}/`, data);
};

export const deleteBill = async (id) => {
  return await axios.delete(`${API_URL}${id}/`);
};