import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ForgotPassword from "./Pages/ForgotPassword";
import UpcomingIPO from "./Pages/UpcomingIPO";
import { SearchProvider } from "./Context/SearchContext";
import Chatbot from "./Components/Chatbot";
import ChatbotToggleButton from "./Components/ChatbotToggleButton";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };

  // Protect dashboard route
  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  // Redirect to IPO page if already logged in
  const AuthRoute = ({ children }) => {
    return isLoggedIn ? <Navigate to="/user-main" replace /> : children;
  };

  return (
    <SearchProvider>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage onLogin={handleLogin} />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <SignupPage onSignup={() => {}} />
            </AuthRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AuthRoute>
              <ForgotPassword />
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-main"
          element={
            <PrivateRoute>
              <UpcomingIPO />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <Navigate to={isLoggedIn ? "/user-main" : "/login"} replace />
          }
        />
      </Routes>
      <ChatbotToggleButton
        isOpen={chatbotOpen}
        onClick={() => setChatbotOpen((open) => !open)}
      />
      {chatbotOpen && <Chatbot />}
    </SearchProvider>
  );
}

export default App;
