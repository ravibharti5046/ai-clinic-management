import { useEffect, useState } from "react";

import {
  getBills,
  createBill,
  updateBill,
  deleteBill,
} from "../api/billingServices";

import { getPatients } from "../api/patientServices";
import { getAppointments } from "../api/appointmentServices";

function Billing() {
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    patient: "",
    appointment: "",
    consultation_amount: "",
    lab_amount: "",
    pharmacy_amount: "",
    gst_percent: "",
    paid_amount: "",
    payment_method: "",
    insurance_provider: "",
    insurance_claim_number: "",
  });

  useEffect(() => {
    loadBills();
    loadPatients();
    loadAppointments();
  }, []);

  const loadBills = async () => {
    try {
      const response = await getBills();
      setBills(response.data);
    } catch (error) {
      console.error("Bill load error:", error);
    }
  };

  const loadPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error("Patient load error:", error);
    }
  };

  const loadAppointments = async () => {
    try {
      const response = await getAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error("Appointment load error:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      patient: "",
      appointment: "",
      consultation_amount: "",
      lab_amount: "",
      pharmacy_amount: "",
      gst_percent: "",
      paid_amount: "",
      payment_method: "",
      insurance_provider: "",
      insurance_claim_number: "",
    });

    setEditId(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const buildPayload = () => {
    return {
      patient: formData.patient,
      appointment: formData.appointment || null,
      consultation_amount: Number(formData.consultation_amount || 0),
      lab_amount: Number(formData.lab_amount || 0),
      pharmacy_amount: Number(formData.pharmacy_amount || 0),
      gst_percent: Number(formData.gst_percent || 0),
      paid_amount: Number(formData.paid_amount || 0),
      payment_method: formData.payment_method || null,
      insurance_provider: formData.insurance_provider,
      insurance_claim_number: formData.insurance_claim_number,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.patient) {
      alert("Please select patient.");
      return;
    }

    try {
      const payload = buildPayload();

      if (editId) {
        await updateBill(editId, payload);
        alert("Invoice updated successfully!");
      } else {
        await createBill(payload);
        alert("Invoice created successfully!");
      }

      resetForm();
      loadBills();
    } catch (error) {
      console.error("Bill save error:", error.response?.data || error);
      alert(JSON.stringify(error.response?.data));
    }
  };

  const handleEdit = (bill) => {
    setEditId(bill.id);

    setFormData({
      patient: bill.patient,
      appointment: bill.appointment || "",
      consultation_amount: bill.consultation_amount,
      lab_amount: bill.lab_amount,
      pharmacy_amount: bill.pharmacy_amount,
      gst_percent: bill.gst_percent,
      paid_amount: bill.paid_amount,
      payment_method: bill.payment_method || "",
      insurance_provider: bill.insurance_provider || "",
      insurance_claim_number: bill.insurance_claim_number || "",
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this invoice?");
    if (!confirmDelete) return;

    try {
      await deleteBill(id);
      alert("Invoice deleted successfully!");
      loadBills();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed.");
    }
  };

  const handlePrint = (bill) => {
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>${bill.invoice_number}</title>
          <style>
            body {
              font-family: Arial;
              padding: 30px;
              color: #111;
            }

            .header {
              text-align: center;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }

            .clinic-name {
              font-size: 28px;
              font-weight: bold;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }

            th, td {
              border: 1px solid #ccc;
              padding: 10px;
              text-align: left;
            }

            .total {
              margin-top: 20px;
              font-size: 20px;
              font-weight: bold;
              text-align: right;
            }

            .footer {
              margin-top: 50px;
              display: flex;
              justify-content: space-between;
            }
          </style>
        </head>

        <body>
          <div class="header">
            <div class="clinic-name">AI Clinic</div>
            <div>Hospital Management System</div>
            <div>Address: Your Clinic Address</div>
            <div>Phone: 9999999999</div>
          </div>

          <h2>Invoice</h2>

          <p><strong>Invoice No:</strong> ${bill.invoice_number}</p>
          <p><strong>Patient:</strong> ${bill.patient_name}</p>
          <p><strong>Patient ID:</strong> ${bill.patient_unique_id}</p>
          <p><strong>Appointment:</strong> ${bill.appointment_details}</p>
          <p><strong>Date:</strong> ${new Date(bill.created_at).toLocaleDateString()}</p>

          <table>
            <tr>
              <th>Service</th>
              <th>Amount</th>
            </tr>

            <tr>
              <td>Consultation Amount</td>
              <td>₹${bill.consultation_amount}</td>
            </tr>

            <tr>
              <td>Lab Amount</td>
              <td>₹${bill.lab_amount}</td>
            </tr>

            <tr>
              <td>Pharmacy Amount</td>
              <td>₹${bill.pharmacy_amount}</td>
            </tr>

            <tr>
              <td>Subtotal</td>
              <td>₹${bill.subtotal}</td>
            </tr>

            <tr>
              <td>GST (${bill.gst_percent}%)</td>
              <td>₹${bill.gst_amount}</td>
            </tr>

            <tr>
              <td>Total Amount</td>
              <td>₹${bill.total_amount}</td>
            </tr>

            <tr>
              <td>Paid Amount</td>
              <td>₹${bill.paid_amount}</td>
            </tr>

            <tr>
              <td>Payment Status</td>
              <td>${bill.payment_status}</td>
            </tr>

            <tr>
              <td>Payment Method</td>
              <td>${bill.payment_method || "-"}</td>
            </tr>

            <tr>
              <td>Insurance Provider</td>
              <td>${bill.insurance_provider || "-"}</td>
            </tr>

            <tr>
              <td>Insurance Claim No.</td>
              <td>${bill.insurance_claim_number || "-"}</td>
            </tr>
          </table>

          <div class="total">
            Payable Amount: ₹${bill.total_amount}
          </div>

          <div class="footer">
            <p>Patient Signature: ____________</p>
            <p>Authorized Signature: ____________</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="billing-page">
      <div className="billing-card">
        <div className="billing-header">
          <h2>Billing / Invoices</h2>

          <button
            className="primary-btn"
            onClick={() => {
              setShowForm(true);
              setEditId(null);
            }}
          >
            Create Invoice
          </button>
        </div>

        {showForm && (
          <div className="billing-form-card">
            <h3>{editId ? "Edit Invoice" : "Create Invoice"}</h3>

            <form onSubmit={handleSubmit} className="billing-form">
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
                <label>Appointment</label>

                <select
                  name="appointment"
                  value={formData.appointment}
                  onChange={handleChange}
                >
                  <option value="">Select Appointment</option>

                  {appointments.map((appointment) => (
                    <option key={appointment.id} value={appointment.id}>
                      {appointment.patient_name} -{" "}
                      {appointment.appointment_date} -{" "}
                      {appointment.appointment_time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Consultation Amount</label>
                <input
                  type="number"
                  name="consultation_amount"
                  value={formData.consultation_amount}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label>Lab Amount</label>
                <input
                  type="number"
                  name="lab_amount"
                  value={formData.lab_amount}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label>Pharmacy Amount</label>
                <input
                  type="number"
                  name="pharmacy_amount"
                  value={formData.pharmacy_amount}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label>GST Percent</label>
                <input
                  type="number"
                  name="gst_percent"
                  value={formData.gst_percent}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label>Paid Amount</label>
                <input
                  type="number"
                  name="paid_amount"
                  value={formData.paid_amount}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label>Payment Method</label>

                <select
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                >
                  <option value="">Select Payment Method</option>
                  <option value="CASH">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="CARD">Card</option>
                  <option value="INSURANCE">Insurance</option>
                </select>
              </div>

              <div className="form-group">
                <label>Insurance Provider</label>
                <input
                  type="text"
                  name="insurance_provider"
                  value={formData.insurance_provider}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>

              <div className="form-group">
                <label>Insurance Claim Number</label>
                <input
                  type="text"
                  name="insurance_claim_number"
                  value={formData.insurance_claim_number}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="primary-btn">
                  {editId ? "Update Invoice" : "Save Invoice"}
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

        <table className="billing-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Patient</th>
              <th>Subtotal</th>
              <th>GST</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Status</th>
              <th>Print</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.invoice_number}</td>
                <td>{bill.patient_name}</td>
                <td>₹{bill.subtotal}</td>
                <td>₹{bill.gst_amount}</td>
                <td>₹{bill.total_amount}</td>
                <td>₹{bill.paid_amount}</td>
                <td>{bill.payment_status}</td>

                <td>
                  <button
                    className="link-btn"
                    onClick={() => handlePrint(bill)}
                  >
                    Print
                  </button>
                </td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(bill)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(bill.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {bills.length === 0 && (
              <tr>
                <td colSpan="9" className="empty-text">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Billing;