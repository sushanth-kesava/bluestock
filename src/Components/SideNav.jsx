import React, { useState } from "react";
import "../Styles/Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartLine,
  faUserCircle,
  faCog,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import logo from "/Users/sushanthkesava/Downloads/BlueStock/src/assets/stock/bluestock-assets/other item uploading soon/logo.png";

const navItems = [
  {
    label: "Home",
    icon: <FontAwesomeIcon icon={faHome} title="Home" />,
    link: "#",
  },
  {
    label: "Market",
    icon: <FontAwesomeIcon icon={faChartLine} title="Market" />,
    link: "#",
  },
  {
    label: "Account",
    icon: <FontAwesomeIcon icon={faUserCircle} title="Account" />,
    link: "#",
  },
  {
    label: "Settings",
    icon: <FontAwesomeIcon icon={faCog} title="Settings" />,
    link: "#",
  },
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
          <FontAwesomeIcon icon={faBars} size="lg" />
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
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          {!collapsed && <span className="nav-label">Logout</span>}
        </button>
      </div>
    </nav>
  );
};

export default SideNav;
