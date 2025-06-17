import React, { useState } from "react";
import "../Styles/LoginPage.css";
import goldImg from "/Users/sushanthkesava/Downloads/BlueStock/src/assets/stock/ICONS/logo-removebg-preview.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faCheckCircle,
  faExclamationCircle,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    // Simulate sending reset link
    setSubmitted(true);
    setError("");
  };

  return (
    <div className="login-container">
      <div className="log-img">
        <img
          src={goldImg}
          alt="Super Investor Gold"
          style={{
            border: "2.5px solid var(--accent, #ff9800)",
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
      <div className="login-panel">
        <div className="subtitle">Reset your password</div>
        {submitted ? (
          <div className="login-success" style={{ textAlign: "center" }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: 6 }} />
            If an account exists for <b>{email}</b>, a reset link has been sent.
            <br />
            Please check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ paddingLeft: 46 }}
              />
              <label>Email Address</label>
            </div>
            {error && (
              <div className="login-error">
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  style={{ marginRight: 6 }}
                />
                {error}
              </div>
            )}
            <button type="submit" className="create-btn">
              <FontAwesomeIcon
                icon={faCheckCircle}
                style={{ marginRight: 6 }}
              />
              Send Reset Link
            </button>
          </form>
        )}
        <div className="switch-auth" style={{ marginTop: 18 }}>
          <a href="/login" className="switch-btn">
            <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: 6 }} />
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
