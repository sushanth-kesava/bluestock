import React, { useState } from "react";
import "../Styles/LoginPage.css";
import goldImg from "/Users/sushanthkesava/Downloads/BlueStock/src/assets/stock/ICONS/logo-removebg-preview.png";

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
            If an account exists for <b>{email}</b>, a reset link has been sent.
            <br />
            Please check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email Address</label>
            </div>
            {error && <div className="login-error">{error}</div>}
            <button type="submit" className="create-btn">
              Send Reset Link
            </button>
          </form>
        )}
        <div className="switch-auth" style={{ marginTop: 18 }}>
          <a href="/login" className="switch-btn">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
