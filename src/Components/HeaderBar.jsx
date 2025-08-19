import React, { useState, useEffect } from "react";
import "../Styles/Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearch } from "../Context/SearchContext";

const HeaderBar = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const [accountInfo, setAccountInfo] = useState({
    name: "",
    email: "",
    accountNumber: "",
    balance: "",
    avatar: "",
    isGoogle: false,
  });

  const { search, setSearch } = useSearch();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Prefer Google OAuth info if available
    const googleName = localStorage.getItem("googleName");
    const googleEmail = localStorage.getItem("googleEmail");
    const googleAvatar = localStorage.getItem("googleAvatar");
    if (googleName && googleEmail && googleAvatar) {
      setAccountInfo({
        name: googleName,
        email: googleEmail,
        accountNumber: "Google Account",
        balance: localStorage.getItem("signupBalance") || "$122,912.50",
        avatar: googleAvatar,
        isGoogle: true,
      });
      return;
    }
    // Fallback to regular signup/login info
    const name = localStorage.getItem("signupName") || "User";
    const email = localStorage.getItem("signupEmail") || "";
    const accountNumberRaw =
      localStorage.getItem("signupWorkspace") || "00000000";
    const accountNumber =
      accountNumberRaw.length >= 8
        ? `${accountNumberRaw.slice(0, 2)}****${accountNumberRaw.slice(-2)}`
        : `****${accountNumberRaw.slice(-4)}`;
    const balance = localStorage.getItem("signupBalance") || "$122,912.50";
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=1a237e&color=fff`;
    setAccountInfo({
      name,
      email,
      accountNumber,
      balance,
      avatar,
      isGoogle: false,
    });
  }, []);

  useEffect(() => {
    const onStorage = () => {
      const googleName = localStorage.getItem("googleName");
      const googleEmail = localStorage.getItem("googleEmail");
      const googleAvatar = localStorage.getItem("googleAvatar");
      if (googleName && googleEmail && googleAvatar) {
        setAccountInfo({
          name: googleName,
          email: googleEmail,
          accountNumber: "Google Account",
          balance: localStorage.getItem("signupBalance") || "$122,912.50",
          avatar: googleAvatar,
          isGoogle: true,
        });
        return;
      }
      const name = localStorage.getItem("signupName") || "User";
      const email = localStorage.getItem("signupEmail") || "";
      const accountNumberRaw =
        localStorage.getItem("signupWorkspace") || "00000000";
      const accountNumber =
        accountNumberRaw.length >= 8
          ? `${accountNumberRaw.slice(0, 2)}****${accountNumberRaw.slice(-2)}`
          : `****${accountNumberRaw.slice(-4)}`;
      const balance = localStorage.getItem("signupBalance") || "$122,912.50";
      const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=1a237e&color=fff`;
      setAccountInfo({
        name,
        email,
        accountNumber,
        balance,
        avatar,
        isGoogle: false,
      });
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
          {accountInfo.email && (
            <div
              className="account-email"
              style={{ fontSize: 14, color: "#b0bec5" }}
            >
              {accountInfo.email}
            </div>
          )}
          <div className="account-number">Acc: {accountInfo.accountNumber}</div>
          <div className="account-balance">Balance: {accountInfo.balance}</div>
        </div>
      </div>
      <div style={{ position: "relative", width: "260px" }}>
        <FontAwesomeIcon
          icon={faSearch}
          className="header-search-icon"
          style={{
            position: "absolute",
            left: 11,
            top: 20,
            color: "#aaa",
            fontSize: 17,
          }}
        />
        <input
          type="text"
          className="header-search"
          placeholder="Search stocks, news, or symbols..."
          style={{ paddingLeft: 36 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button
        className="theme-toggler"
        onClick={toggleTheme}
        aria-label="Toggle dark/light mode"
      >
        <FontAwesomeIcon icon={theme === "dark" ? faMoon : faSun} />
      </button>
    </div>
  );
};

export default HeaderBar;
