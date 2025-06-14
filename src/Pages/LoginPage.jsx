import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/LoginPage.css";
import "../Pages/ForgotPassword.jsx";
import goldImg from "../assets/stock/ICONS/logo-removebg-preview.png";
const SocialButton = ({ provider, onClick }) => (
  <button
    className={`${provider}-btn social-btn`}
    onClick={onClick}
    type="button"
  >
    Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}
  </button>
);

const Divider = () => <div className="divider">or</div>;

const ForgotPassword = () => (
  <div className="forgot-password">
    <Link to="/forgot-password">Forgot Password?</Link>
  </div>
);
const TermsAndPrivacy = () => (
  <div className="terms-privacy">
    <div className="terms">
      By logging in, you agree to our <a href="#">terms of service</a>
    </div>
    <div className="privacy-policy">
      Read our <a href="#">privacy policy</a> for more details.
    </div>
  </div>
);

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedEmail = localStorage.getItem("signupEmail");
    const savedPassword = localStorage.getItem("signupPassword");
    if (email === savedEmail && password === savedPassword) {
      setError("");
      onLogin && onLogin();
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
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
        <div className="subtitle">Welcome to BlueStock – Secure Login</div>
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
          <div className="input-group">
            <input
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="create-btn">
            Login
          </button>
        </form>
        <ForgotPassword />
        <Divider />
        <div className="form-top-buttons">
          <SocialButton
            provider="google"
            onClick={() => alert("Google login coming soon!")}
          />
          <SocialButton
            provider="facebook"
            onClick={() => alert("Facebook login coming soon!")}
          />
        </div>
        <label className="remember-me">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember this device
        </label>
        <div className="switch-auth">
          Don't have an account?{" "}
          <button
            type="button"
            className="switch-btn"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
          <TermsAndPrivacy />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
