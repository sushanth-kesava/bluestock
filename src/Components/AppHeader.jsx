import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faBars,
  faNewspaper,
  faTachometerAlt,
  faSignOutAlt,
  faMoon,
  faSun,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/AppHeader.css";
import blue from "../assets/stock/Bluestock Logos/Copy_of_logo.png";
import { useSearch } from "../Context/SearchContext";

function AppHeader() {
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState(
    document.body.getAttribute("data-theme") || "light"
  );
  const { search, setSearch } = useSearch();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showLogoutMsg, setShowLogoutMsg] = React.useState(false);

  React.useEffect(() => {
    function handleClickOutside(e) {
      const dropdown = document.getElementById("grid-dropdown-content");
      const gridIcon = document.querySelector(".grid-icon");
      if (
        dropdown &&
        !dropdown.contains(e.target) &&
        gridIcon &&
        !gridIcon.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setShowDropdown(false);
    setShowLogoutMsg(true);
    setTimeout(() => {
      setShowLogoutMsg(false);
      navigate("/login");
    }, 1200);
  };
  const handleSettings = () => {
    navigate("/settings");
  };
  const handleDashboard = () => {
    navigate("/dashboard");
  };
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.setAttribute("data-theme", savedTheme);
    }
  }, []);
  return (
    <header className="app-header enhanced-app-header">
      <div className="app-header-left">
        <img
          src={blue}
          alt="Bluestock Logo"
          className="app-header-logo"
          style={{ height: "2vw", width: "2vw", minWidth: 32, minHeight: 32 }}
        />
        <span className="app-header-brand-name">BLUESTOCK</span>
      </div>
      <nav className="app-header-nav">
        <a href="/user-main" className="app-header-link">
          IPO
        </a>
        <a href="#" className="app-header-link">
          COMMUNITY
        </a>
        <div className="app-header-dropdown">
          <button className="app-header-dropbtn">PRODUCTS ▾</button>
          <div className="app-header-dropdown-content">
            <a href="#">Product 1</a>
            <a href="#">Product 2</a>
            <a href="#">Product 3</a>
          </div>
        </div>
        <a href="#" className="app-header-link">
          BROKERS
        </a>
        <a href="#" className="app-header-link live-news">
          <FontAwesomeIcon icon={faNewspaper} style={{ marginRight: 4 }} /> LIVE
          NEWS
          <span className="new-badge">NEW</span>
        </a>
      </nav>
      <div
        className="app-header-right"
        style={{ display: "flex", alignItems: "center", gap: 10 }}
      >
        <div
          className="universal-search-bar-wrap enhanced-universal-search"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 0,
            marginRight: 12,
          }}
        >
          <FontAwesomeIcon icon={faSearch} className="universal-search-icon" />
          <input
            className="universal-search-bar"
            type="text"
            placeholder="Search stocks, IPOs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Universal search"
            autoComplete="off"
            spellCheck={false}
            maxLength={64}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text-main, #222)",
              fontSize: "1.02rem",
              fontWeight: 500,
              width: "120px",
              textAlign: "left",
              transition: "box-shadow 0.18s, border 0.18s",
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.07)",
              borderRadius: 8,
            }}
            onFocus={(e) => e.target.parentNode.classList.add("focused")}
            onBlur={(e) => e.target.parentNode.classList.remove("focused")}
          />
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: 6 }} />
          Logout
        </button>
        <button
          className="grid-icon"
          title="Menu"
          onClick={() => setShowDropdown((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={showDropdown}
          aria-controls="grid-dropdown-content"
          type="button"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div
          className="grid-dropdown-content"
          id="grid-dropdown-content"
          style={{ display: showDropdown ? "block" : "none" }}
        >
          <button
            className="dropdown-btn"
            onClick={handleDashboard}
            type="button"
          >
            <FontAwesomeIcon
              icon={faTachometerAlt}
              style={{ marginRight: 8 }}
            />
            Dashboard
          </button>
          <button
            className="dropdown-btn"
            onClick={handleSettings}
            type="button"
          >
            <FontAwesomeIcon icon={faCog} style={{ marginRight: 8 }} />
            Settings
          </button>
          <button className="dropdown-btn" onClick={toggleTheme} type="button">
            <FontAwesomeIcon
              icon={theme === "dark" ? faSun : faMoon}
              style={{ marginRight: 8 }}
            />
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        {showLogoutMsg && (
          <div className="logout-toast">Logged out successfully!</div>
        )}
      </div>
    </header>
  );
}

export default AppHeader;
