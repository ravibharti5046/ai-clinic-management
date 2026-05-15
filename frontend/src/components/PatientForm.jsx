import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function PatientForm({ onClose, onSuccess, selectedPatient }) {
  const [formData, setFormData] = useState({
    patient_code: "",
    first_name: "",
    last_name: "",
    gender: "MALE",
    date_of_birth: "",
    blood_group: "",
    phone: "",
    email: "",
    address: "",
    emergency_contact: "",
    allergies: "",
    medical_history: "",
  });

  useEffect(() => {
    if (selectedPatient) {
      setFormData({
        patient_code: selectedPatient.patient_code || "",
        first_name: selectedPatient.first_name || "",
        last_name: selectedPatient.last_name || "",
        gender: selectedPatient.gender || "MALE",
        date_of_birth: selectedPatient.date_of_birth || "",
        blood_group: selectedPatient.blood_group || "",
        phone: selectedPatient.phone || "",
        email: selectedPatient.email || "",
        address: selectedPatient.address || "",
        emergency_contact: selectedPatient.emergency_contact || "",
        allergies: selectedPatient.allergies || "",
        medical_history: selectedPatient.medical_history || "",
      });
    }
  }, [selectedPatient]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedPatient) {
        await api.put(`patients/${selectedPatient.id}/`, formData);
        alert("Patient updated successfully");
      } else {
        await api.post("patients/", formData);
        alert("Patient added successfully");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
      alert("Error while saving patient");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h2>{selectedPatient ? "Edit Patient" : "Add Patient"}</h2>
          <button onClick={onClose}>X</button>
        </div>

        <form onSubmit={handleSubmit} className="patient-form">
          <div className="form-row">
            <div className="form-group">
              <label>Patient Code</label>
              <input
                type="text"
                name="patient_code"
                value={formData.patient_code}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Blood Group</label>
              <select
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Emergency Contact</label>
              <input
                type="text"
                name="emergency_contact"
                value={formData.emergency_contact}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Allergies</label>
            <textarea
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Medical History</label>
            <textarea
              name="medical_history"
              value={formData.medical_history}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              {selectedPatient ? "Update Patient" : "Save Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientForm;