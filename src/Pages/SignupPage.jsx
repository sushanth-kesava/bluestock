import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SignupPage.css";
import goldImg from "../assets/stock/ICONS/logo-removebg-preview.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faIdCard,
  faCheckCircle,
  faExclamationCircle,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

// SignupPage component handles user registration with floating label inputs and modern styling
const SignupPage = ({ onSignup }) => {
  const navigate = useNavigate();
  // State for form fields and feedback
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }
    // Save all details to localStorage (for demo only)
    localStorage.setItem("signupName", name);
    localStorage.setItem("signupEmail", email);
    localStorage.setItem("signupPassword", password);
    localStorage.setItem("signupWorkspace", workspace);
    setError("");
    setSuccess("Account created! You can now log in.");
    // Optionally switch to login page after signup
    onSignup && onSignup();
    navigate("/login");
  };

  return (
    <div className="login-container signup-container">
      <div className="log-img">
        <img
          src={goldImg}
          alt="Super Investor Gold"
          style={{
            border: "2.5px solid var(--accent, #b2ff59)",
            width: "auto",
            height: "auto",
            maxWidth: "100%",
            maxHeight: "50px",
            borderRadius: 0,
            objectFit: "contain",
            background: "none",
            boxShadow: "none",
          }}
        />
      </div>
      <div className="login-panel signup-panel">
        <div className="subtitle">Create your BlueStock account</div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input
              type="text"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ minWidth: 0, paddingLeft: 32 }}
            />
            <label>Full Name</label>
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ minWidth: 0, paddingLeft: 32 }}
            />
            <label>Email Address</label>
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faIdCard} className="input-icon" />
            <input
              type="password"
              placeholder=" "
              value={workspace}
              onChange={(e) => setWorkspace(e.target.value)}
              required
              style={{ minWidth: 0, paddingLeft: 32 }}
            />
            <label>Account Number</label>
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ minWidth: 0, paddingLeft: 32 }}
            />
            <label>Password</label>
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ minWidth: 0, paddingLeft: 32 }}
            />
            <label>Confirm Password</label>
          </div>
          {/* Error and success messages */}
          {error && (
            <div className="login-error">
              <FontAwesomeIcon
                icon={faExclamationCircle}
                style={{ marginRight: 6 }}
              />
              {error}
            </div>
          )}
          {success && (
            <div className="login-success">
              <FontAwesomeIcon
                icon={faCheckCircle}
                style={{ marginRight: 6 }}
              />
              {success}
            </div>
          )}
          <button
            type="submit"
            className="create-btn"
            style={{
              fontSize: "1.1rem",
              padding: "0.7em 2em",
            }}
          >
            <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: 6 }} />
            Sign Up
          </button>
        </form>
        <div className="switch-auth">
          Already have an account?{" "}
          <button
            type="button"
            className="switch-btn"
            onClick={() => navigate("/login")}
            style={{ fontSize: "1rem" }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
