import { Link, NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserInjured,
  FaCalendarAlt,
  FaFileInvoice,
  FaFlask,
  FaPrescription,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo-box">
        <div className="logo-icon">+</div>
        <div>
          <h2>AI Clinic</h2>
          <p>Hospital Management</p>
        </div>
      </div>

      <nav className="menu">
        <NavLink to="/admin" end className="menu-item">
          <FaHome /> <span>Dashboard</span>
        </NavLink>

        <Link to="/admin/users" className="sidebar-link">
            User Roles
        </Link>

        <NavLink to="/admin/patients" className="menu-item">
          <FaUserInjured /> <span>Patients</span>
        </NavLink>

        <NavLink to="/admin/appointments" className="menu-item">
          <FaCalendarAlt /> <span>Appointments</span>
        </NavLink>

        <NavLink to="/admin/billing" className="menu-item">
          <FaFileInvoice /> <span>Billing / Invoices</span>
        </NavLink>

        <NavLink to="/admin/reports" className="menu-item">
          <FaFlask /> <span>Lab Reports</span>
        </NavLink>

        <NavLink to="/admin/prescriptions" className="menu-item">
          <FaPrescription /> <span>Prescriptions</span>
        </NavLink>

        <div className="menu-item">
          <FaCog /> <span>Settings</span>
        </div>
      </nav>

      <div className="help-box">
        <h3>Need Help?</h3>
        <p>Contact support for any assistance</p>
        <button>Contact Support</button>
      </div>

      <div className="menu-item logout">
        <FaSignOutAlt /> <span>Logout</span>
      </div>
    </aside>
  );
}

export default Sidebar;