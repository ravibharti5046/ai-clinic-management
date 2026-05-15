import { useEffect, useState } from "react";

import {
  getAppointments,
  createAppointment,
  deleteAppointment,
} from "../api/appointmentServices";

import { getPatients } from "../api/patientServices";
import { getDoctors } from "../api/doctorServices";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    appointment_date: "",
    appointment_time: "",
    symptoms: "",
    status: "BOOKED",
    queue_number: "",
    ai_summary: "",
  });

  useEffect(() => {
    loadAppointments();
    loadPatients();
    loadDoctors();
  }, []);

  const loadAppointments = async () => {
    try {
      const response = await getAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error("Error loading appointments:", error);
    }
  };

  const loadPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error("Error loading patients:", error);
    }
  };

  const loadDoctors = async () => {
    try {
      const response = await getDoctors();
      setDoctors(response.data);
    } catch (error) {
      console.error("Error loading doctors:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.patient ||
      !formData.doctor ||
      !formData.appointment_date ||
      !formData.appointment_time
    ) {
      alert("Please select patient, doctor, date and time.");
      return;
    }

    try {
      const payload = {
        patient: formData.patient,
        doctor: formData.doctor,
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        symptoms: formData.symptoms,
        status: formData.status,
        queue_number: formData.queue_number
          ? Number(formData.queue_number)
          : null,
        ai_summary: formData.ai_summary || "",
      };

      await createAppointment(payload);

      alert("Appointment booked successfully!");

      setFormData({
        patient: "",
        doctor: "",
        appointment_date: "",
        appointment_time: "",
        symptoms: "",
        status: "BOOKED",
        queue_number: "",
        ai_summary: "",
      });

      loadAppointments();
    } catch (error) {
      console.error("Backend Error:", error.response?.data || error);
      alert(JSON.stringify(error.response?.data));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      loadAppointments();
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Delete failed.");
    }
  };

  return (
    <div className="appointment-page">
      <h2>Appointments</h2>

      <div className="appointment-card">
        <h3>Book Appointment</h3>

        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-group">
            <label>Patient</label>
            <select
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              required
            >
              <option value="">Select Patient</option>

              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.patient_code} - {patient.first_name}{" "}
                  {patient.last_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Doctor</label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
            >
              <option value="">Select Doctor</option>

              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.doctor_code || doctor.id} -{" "}
                  {doctor.name || doctor.username || String(doctor.id).slice(0, 8)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Appointment Date</label>
            <input
              type="date"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Appointment Time</label>
            <input
              type="time"
              name="appointment_time"
              value={formData.appointment_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Symptoms</label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="Enter symptoms"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="BOOKED">Booked</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="RESCHEDULED">Rescheduled</option>
            </select>
          </div>

          <div className="form-group">
            <label>Queue Number</label>
            <input
              type="number"
              name="queue_number"
              value={formData.queue_number}
              onChange={handleChange}
              placeholder="Optional"
            />
          </div>

          <div className="form-group full-width">
            <label>AI Summary</label>
            <textarea
              name="ai_summary"
              value={formData.ai_summary}
              onChange={handleChange}
              placeholder="Optional AI summary"
            ></textarea>
          </div>

          <button type="submit" className="primary-btn">
            Book Appointment
          </button>
        </form>
      </div>

      <div className="appointment-card">
        <h3>Appointment List</h3>

        <table className="appointment-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Symptoms</th>
              <th>Status</th>
              <th>Queue</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{String(appointment.id).slice(0, 8)}</td>
                <td>{appointment.patient_name}</td>
                <td>{appointment.doctor_name || appointment.doctor}</td>
                <td>{appointment.appointment_date}</td>
                <td>{appointment.appointment_time}</td>
                <td>{appointment.symptoms || "-"}</td>
                <td>{appointment.status}</td>
                <td>{appointment.queue_number || "-"}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(appointment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {appointments.length === 0 && (
              <tr>
                <td colSpan="9" className="empty-text">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointments;