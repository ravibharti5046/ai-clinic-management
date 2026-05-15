import { useEffect, useState } from "react";

import {
  getReports,
  createReport,
  updateReport,
  deleteReport,
} from "../api/reportServices";

import { getPatients } from "../api/patientServices";

function Reports() {
  const [reports, setReports] = useState([]);
  const [patients, setPatients] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    patient: "",
    report_title: "",
    report_file: null,
    ai_summary: "",
  });

  useEffect(() => {
    loadReports();
    loadPatients();
  }, []);

  const loadReports = async () => {
    try {
      const response = await getReports();
      setReports(response.data);
    } catch (error) {
      console.error("Error loading reports:", error);
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

  const resetForm = () => {
    setFormData({
      patient: "",
      report_title: "",
      report_file: null,
      ai_summary: "",
    });

    setEditId(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "report_file") {
      setFormData({
        ...formData,
        report_file: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.patient || !formData.report_title) {
      alert("Please select patient and enter report title.");
      return;
    }

    if (!editId && !formData.report_file) {
      alert("Please upload report file.");
      return;
    }

    try {
      const payload = new FormData();

      payload.append("patient", formData.patient);
      payload.append("report_title", formData.report_title);
      payload.append("ai_summary", formData.ai_summary || "");

      if (formData.report_file) {
        payload.append("report_file", formData.report_file);
      }

      if (editId) {
        await updateReport(editId, payload);
        alert("Report updated successfully!");
      } else {
        await createReport(payload);
        alert("Report uploaded successfully!");
      }

      resetForm();
      loadReports();
    } catch (error) {
      console.error("Report save error:", error.response?.data || error);
      alert(JSON.stringify(error.response?.data));
    }
  };

  const handleEdit = (report) => {
    setEditId(report.id);

    setFormData({
      patient: report.patient,
      report_title: report.report_title,
      report_file: null,
      ai_summary: report.ai_summary || "",
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    try {
      await deleteReport(id);
      alert("Report deleted successfully!");
      loadReports();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed.");
    }
  };

  const handleDownload = (fileUrl) => {
    if (!fileUrl) {
      alert("File not available.");
      return;
    }

    window.open(fileUrl, "_blank");
  };

  return (
    <div className="report-page">
      <div className="report-card">
        <div className="report-header">
          <h2>Lab Reports</h2>

          <button
            className="primary-btn"
            onClick={() => {
              setShowForm(true);
              setEditId(null);
            }}
          >
            Upload Report
          </button>
        </div>

        {showForm && (
          <div className="report-form-card">
            <h3>{editId ? "Edit Report" : "Upload Lab Report"}</h3>

            <form onSubmit={handleSubmit} className="report-form">
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
                <label>Report Title</label>

                <input
                  type="text"
                  name="report_title"
                  value={formData.report_title}
                  onChange={handleChange}
                  placeholder="Example: Blood Test, X-Ray, MRI"
                  required
                />
              </div>

              <div className="form-group">
                <label>Report File</label>

                <input
                  type="file"
                  name="report_file"
                  onChange={handleChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required={!editId}
                />

                {editId && (
                  <small>
                    Leave empty if you do not want to change existing file.
                  </small>
                )}
              </div>

              <div className="form-group full-width">
                <label>AI Summary</label>

                <textarea
                  name="ai_summary"
                  value={formData.ai_summary}
                  onChange={handleChange}
                  placeholder="Example: Hemoglobin is low. WBC is normal."
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="primary-btn">
                  {editId ? "Update Report" : "Save Report"}
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <table className="report-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Patient</th>
              <th>Patient Unique ID</th>
              <th>Report Name</th>
              <th>AI Summary</th>
              <th>Uploaded On</th>
              <th>Download</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{String(report.id).slice(0, 8)}</td>

                <td>{report.patient_name}</td>

                <td>{String(report.patient_unique_id).slice(0, 8)}</td>

                <td>{report.report_title}</td>

                <td>{report.ai_summary || "No Summary"}</td>

                <td>
                  {report.created_at
                    ? new Date(report.created_at).toLocaleDateString()
                    : "-"}
                </td>

                <td>
                  <button
                    className="link-btn"
                    onClick={() => handleDownload(report.report_file_url)}
                  >
                    Download
                  </button>
                </td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(report)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(report.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {reports.length === 0 && (
              <tr>
                <td colSpan="8" className="empty-text">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;