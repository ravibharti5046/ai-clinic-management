import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/appointments/";

export const getAppointments = async () => {
  return await axios.get(API_URL);
};

export const createAppointment = async (data) => {
  return await axios.post(API_URL, data);
};

export const deleteAppointment = async (id) => {
  return await axios.delete(`${API_URL}${id}/`);
};