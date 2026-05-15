import { useEffect, useState } from "react";
import "../App.css";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/userServices";

function Users() {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    role: "PATIENT",
    password: "",
    is_active: true,
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("User load error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      role: "PATIENT",
      password: "",
      is_active: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username) {
      alert("Username is required.");
      return;
    }

    try {
      const payload = { ...formData };

      if (editId && !payload.password) {
        delete payload.password;
      }

      if (editId) {
        await updateUser(editId, payload);
        alert("User updated successfully!");
      } else {
        await createUser(payload);
        alert("User created successfully!");
      }

      resetForm();
      loadUsers();
    } catch (error) {
      console.error("User save error:", error.response?.data || error);
      alert(JSON.stringify(error.response?.data));
    }
  };

  const handleEdit = (user) => {
    setEditId(user.id);

    setFormData({
      username: user.username || "",
      email: user.email || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      phone: user.phone || "",
      role: user.role || "PATIENT",
      password: "",
      is_active: user.is_active,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      alert("User deleted successfully!");
      loadUsers();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed.");
    }
  };

  return (
    <div className="users-page">
      <div className="users-header">
        <h2>User Roles</h2>
      </div>

      <div className="user-form-card">
        <h3>{editId ? "Edit User" : "Create User"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="user-form-grid">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="ADMIN">Admin</option>
              <option value="DOCTOR">Doctor</option>
              <option value="RECEPTIONIST">Receptionist</option>
              <option value="LAB_STAFF">Lab Staff</option>
              <option value="PHARMACIST">Pharmacist</option>
              <option value="BILLING_STAFF">Billing Staff</option>
              <option value="PATIENT">Patient</option>
            </select>

            <input
              type="password"
              name="password"
              placeholder={editId ? "New Password optional" : "Password"}
              value={formData.password}
              onChange={handleChange}
            />

            <label>
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
              />
              Active
            </label>
          </div>

          <button type="submit" className="save-user-btn">
            {editId ? "Update User" : "Create User"}
          </button>

          {editId && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="users-table-card">
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.email || "-"}</td>
                <td>{user.phone || "-"}</td>
                <td>
                  <span className={`role-badge role-${String(user.role).toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span
                    className={
                      user.is_active ? "status-active" : "status-inactive"
                    }
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="7" className="empty-text">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;