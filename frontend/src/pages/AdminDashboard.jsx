import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import StatCard from "../components/StatCard";

import {
  FaUsers,
  FaCalendarCheck,
  FaFileInvoice,
  FaFlask,
  FaPrescription,
} from "react-icons/fa";

function AdminDashboard() {
  const [patients, setPatients] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [reports, setReports] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get("patients/").then((res) => setPatients(res.data)).catch(console.log);
    api.get("invoices/").then((res) => setInvoices(res.data)).catch(console.log);
    api.get("reports/").then((res) => setReports(res.data)).catch(console.log);
    api.get("prescriptions/").then((res) => setPrescriptions(res.data)).catch(console.log);
    api.get("appointments/").then((res) => setAppointments(res.data)).catch(console.log);
  }, []);

  return (
    <>
      <div className="stats-grid">
        <StatCard icon={<FaUsers />} title="Total Patients" value={patients.length} growth="Live from API" />
        <StatCard icon={<FaCalendarCheck />} title="Appointments" value={appointments.length} growth="Live from API" />
        <StatCard icon={<FaFileInvoice />} title="Invoices" value={invoices.length} growth="Live from API" />
        <StatCard icon={<FaFlask />} title="Lab Reports" value={reports.length} growth="Live from API" />
        <StatCard icon={<FaPrescription />} title="Prescriptions" value={prescriptions.length} growth="Live from API" />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3>Recent Patients</h3>
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Phone</th>
                <th>Age</th>
              </tr>
            </thead>

            <tbody>
              {patients.slice(0, 5).map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.first_name} {patient.last_name}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Upcoming Appointments</h3>
          </div>

          {appointments.slice(0, 5).map((item) => (
            <div className="list-item" key={item.id}>
              <strong>{item.patient_name || item.patient}</strong>
              <p>{item.date || item.appointment_date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;






