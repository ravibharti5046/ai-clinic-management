import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import PatientForm from "../components/PatientForm";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchText, setSearchText] = useState("");

  const fetchPatients = () => {
    api.get("patients/")
      .then((res) => setPatients(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAdd = () => {
    setSelectedPatient(null);
    setShowForm(true);
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this patient?");

    if (!confirmDelete) return;

    try {
      await api.delete(`patients/${id}/`);
      alert("Patient deleted successfully");
      fetchPatients();
    } catch (error) {
      console.log(error);
      alert("Error while deleting patient");
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.first_name} ${patient.last_name}`.toLowerCase();
    const phone = patient.phone?.toLowerCase() || "";
    const code = patient.patient_code?.toLowerCase() || "";
    const search = searchText.toLowerCase();

    return (
      fullName.includes(search) ||
      phone.includes(search) ||
      code.includes(search)
    );
  });

  return (
    <div className="card">
      <div className="card-header">
        <h3>Patients</h3>

        <button onClick={handleAdd}>
          Add Patient
        </button>
      </div>

      <div className="table-toolbar">
        <input
          type="text"
          placeholder="Search by name, phone, or patient code..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {showForm && (
        <PatientForm
          selectedPatient={selectedPatient}
          onClose={() => setShowForm(false)}
          onSuccess={fetchPatients}
        />
      )}

      <table>
        <thead>
          <tr>
            <th>Patient Code</th>
            <th>Patient Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Blood Group</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.patient_code}</td>
                <td>{patient.first_name} {patient.last_name}</td>
                <td>{patient.phone}</td>
                <td>{patient.email}</td>
                <td>{patient.gender}</td>
                <td>{patient.blood_group}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(patient)}>
                    Edit
                  </button>

                  <button className="delete-btn" onClick={() => handleDelete(patient.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No patients found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Patients;