import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/users/";

export const getUsers = async () => {
  return await axios.get(API_URL);
};

export const createUser = async (data) => {
  return await axios.post(API_URL, data);
};

export const updateUser = async (id, data) => {
  return await axios.put(`${API_URL}${id}/`, data);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${API_URL}${id}/`);
};