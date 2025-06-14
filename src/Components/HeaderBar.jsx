import React, { useState, useEffect } from "react";
import "../Styles/Dashboard.css";

const HeaderBar = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const [accountInfo, setAccountInfo] = useState({
    name: "",
    accountNumber: "",
    balance: "",
    avatar: "",
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Get user info from localStorage (set during signup/login)
    const name = localStorage.getItem("signupName") || "User";
    const accountNumberRaw =
      localStorage.getItem("signupWorkspace") || "00000000";
    const accountNumber =
      accountNumberRaw.length >= 8
        ? `${accountNumberRaw.slice(0, 2)}****${accountNumberRaw.slice(-2)}`
        : `****${accountNumberRaw.slice(-4)}`;
    const balance = "$122,912.50"; // You can make this dynamic if needed
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=1a237e&color=fff`;
    setAccountInfo({ name, accountNumber, balance, avatar });
  }, []);

  // Optionally, update info if localStorage changes (e.g., on login)
  useEffect(() => {
    const onStorage = () => {
      const name = localStorage.getItem("signupName") || "User";
      const accountNumberRaw =
        localStorage.getItem("signupWorkspace") || "00000000";
      const accountNumber =
        accountNumberRaw.length >= 8
          ? `${accountNumberRaw.slice(0, 2)}****${accountNumberRaw.slice(-2)}`
          : `****${accountNumberRaw.slice(-4)}`;
      const balance = "$122,912.50";
      const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=1a237e&color=fff`;
      setAccountInfo({ name, accountNumber, balance, avatar });
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="header-bar">
      <div className="account-info">
        <img src={accountInfo.avatar} alt="avatar" className="account-avatar" />
        <div>
          <div className="account-name">{accountInfo.name}</div>
          <div className="account-number">Acc: {accountInfo.accountNumber}</div>
          <div className="account-balance">Balance: {accountInfo.balance}</div>
        </div>
      </div>
      <input
        type="text"
        className="header-search"
        placeholder="Search stocks, news, or symbols..."
      />
      <button
        className="theme-toggler"
        onClick={toggleTheme}
        aria-label="Toggle dark/light mode"
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </button>
    </div>
  );
};

export default HeaderBar;
