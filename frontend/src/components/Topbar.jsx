import { FaBars, FaBell, FaSearch } from "react-icons/fa";

function Topbar() {
  return (
    <header className="topbar">
      <div className="left-topbar">
        <FaBars />
        <h1>Dashboard</h1>
      </div>

      <div className="right-topbar">
        <div className="search-box">
          <FaSearch />
          <input type="text" placeholder="Search here..." />
        </div>

        <div className="notification">
          <FaBell />
          <span>5</span>
        </div>

        <div className="profile">
          <div>
            <h4>Dr. Rahul Verma</h4>
            <p>Administrator</p>
          </div>
          <img src="https://i.pravatar.cc/100?img=12" alt="profile" />
        </div>
      </div>
    </header>
  );
}

export default Topbar;