import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/prescriptions/";

export const getPrescriptions = async () => {
  return await axios.get(API_URL);
};

export const createPrescription = async (data) => {
  return await axios.post(API_URL, data);
};

export const deletePrescription = async (id) => {
  return await axios.delete(`${API_URL}${id}/`);
};
export const downloadPrescriptionUrl = (id) => {
  return `${API_URL}${id}/download/`;
};
