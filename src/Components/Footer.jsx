import React from "react";
import "../Styles/Dashboard.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <span>© {new Date().getFullYear()} BlueStock. All rights reserved.</span>
      <span className="footer-links">
        <a href="#" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        <span> | </span>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </a>
      </span>
    </div>
  </footer>
);

export default Footer;
