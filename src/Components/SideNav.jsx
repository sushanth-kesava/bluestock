import React, { useState } from "react";
import "../Styles/Dashboard.css";
import {
  FaHome,
  FaChartLine,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import logo from "/Users/sushanthkesava/Downloads/BlueStock/src/assets/stock/bluestock-assets/other item uploading soon/logo.png";

const navItems = [
  { label: "Home", icon: <FaHome title="Home" />, link: "#" },
  { label: "Market", icon: <FaChartLine title="Market" />, link: "#" },
  { label: "Account", icon: <FaUserCircle title="Account" />, link: "#" },
  { label: "Settings", icon: <FaCog title="Settings" />, link: "#" },
];

const SideNav = ({ onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Home");

  return (
    <nav className={`side-nav${collapsed ? " collapsed" : ""}`}>
      <div className="sidenav-top">
        <img src={logo} alt="Bluestock Logo" className="header-logo" />
        <button
          className="collapse-btn"
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? "Expand" : "Collapse"}
        >
          <FaBars size={18} />
        </button>
      </div>
      <ul>
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.link}
              className={`nav-link${active === item.label ? " active" : ""}`}
              onClick={() => setActive(item.label)}
              data-tooltip={item.label}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && <span className="nav-label">{item.label}</span>}
            </a>
          </li>
        ))}
      </ul>
      <div className="side-divider" />
      <div className="logout-section">
        <button className="logout-btn" onClick={onLogout} title="Logout">
          <FaSignOutAlt size={22} />
          {!collapsed && <span className="nav-label">Logout</span>}
        </button>
      </div>
    </nav>
  );
};

export default SideNav;
