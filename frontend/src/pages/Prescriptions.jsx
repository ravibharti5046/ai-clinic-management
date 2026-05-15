import { useEffect, useState } from "react";

import {
  getPrescriptions,
  createPrescription,
  deletePrescription,
} from "../api/prescriptionServices";

import { getPatients } from "../api/patientServices";
import { getDoctors } from "../api/doctorServices";
import { downloadPrescriptionUrl } from "../api/prescriptionServices";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    diagnosis: "",
    symptoms: "",
    medicines: "",
    advice: "",
    follow_up_date: "",
  });

  useEffect(() => {
    loadPrescriptions();
    loadPatients();
    loadDoctors();
  }, []);

  const loadPrescriptions = async () => {
    try {
      const response = await getPrescriptions();
      setPrescriptions(response.data);
    } catch (error) {
      console.error("Error loading prescriptions:", error);
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

    if (!formData.patient || !formData.medicines) {
      alert("Please select patient and enter medicines.");
      return;
    }

    try {
      const payload = {
        patient: formData.patient,
        doctor: formData.doctor || null,
        diagnosis: formData.diagnosis,
        symptoms: formData.symptoms,
        medicines: formData.medicines,
        advice: formData.advice,
        follow_up_date: formData.follow_up_date || null,
      };

      await createPrescription(payload);

      alert("Prescription created successfully!");

      setFormData({
        patient: "",
        doctor: "",
        diagnosis: "",
        symptoms: "",
        medicines: "",
        advice: "",
        follow_up_date: "",
      });

      loadPrescriptions();
    } catch (error) {
      console.error("Prescription Error:", error.response?.data || error);
      alert(JSON.stringify(error.response?.data));
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePrescription(id);
      loadPrescriptions();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed.");
    }
  };
  const handleDownload = (id) => {
    window.open(downloadPrescriptionUrl(id), "_blank");
  };

  return (
    <div className="appointment-page">
      <h2>Prescriptions</h2>

      <div className="appointment-card">
        <h3>Create Prescription</h3>

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
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.doctor_code || doctor.id} - {doctor.name || doctor.username || String(doctor.id).slice(0, 8)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group full-width">
            <label>Diagnosis</label>
            <textarea
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              placeholder="Enter diagnosis"
            ></textarea>
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

          <div className="form-group full-width">
            <label>Medicines</label>
            <textarea
              name="medicines"
              value={formData.medicines}
              onChange={handleChange}
              placeholder="Enter medicines"
              required
            ></textarea>
          </div>

          <div className="form-group full-width">
            <label>Advice</label>
            <textarea
              name="advice"
              value={formData.advice}
              onChange={handleChange}
              placeholder="Enter advice"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Follow Up Date</label>
            <input
              type="date"
              name="follow_up_date"
              value={formData.follow_up_date}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="primary-btn">
            Save Prescription
          </button>
        </form>
      </div>

      <div className="appointment-card">
        <h3>Prescription List</h3>

        <table className="appointment-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Diagnosis</th>
              <th>Symptoms</th>
              <th>Medicines</th>
              <th>Advice</th>
              <th>Follow Up</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {prescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td>{String(prescription.id).slice(0, 8)}</td>
                <td>{prescription.patient_name}</td>
                <td>{prescription.doctor_name}</td>
                <td>{prescription.diagnosis || "-"}</td>
                <td>{prescription.symptoms || "-"}</td>
                <td>{prescription.medicines}</td>
                <td>{prescription.advice || "-"}</td>
                <td>{prescription.follow_up_date || "-"}</td>
                <td>
                  <button
                    className="primary-btn"
                    onClick={() => handleDownload(prescription.id)}
                    style={{ marginRight: "8px" }}
                  >
                    Download
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(prescription.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {prescriptions.length === 0 && (
              <tr>
                <td colSpan="9" className="empty-text">
                  No prescriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Prescriptions;