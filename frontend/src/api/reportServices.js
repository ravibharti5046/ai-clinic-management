import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/reports/";

export const getReports = async () => {
  return await axios.get(API_URL);
};

export const createReport = async (formData) => {
  return await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateReport = async (id, formData) => {
  return await axios.put(`${API_URL}${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteReport = async (id) => {
  return await axios.delete(`${API_URL}${id}/`);
};