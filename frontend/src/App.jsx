import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import Users from "./pages/Users";
import AdminDashboard from "./pages/AdminDashboard";
import Patients from "./pages/Patients";
import Billing from "./pages/Billing";
import Reports from "./pages/Reports";
import Prescriptions from "./pages/Prescriptions";
import Appointments from "./pages/Appointments";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<Users />} />
          <Route index element={<AdminDashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="billing" element={<Billing />} />
          <Route path="reports" element={<Reports />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="appointments" element={<Appointments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;