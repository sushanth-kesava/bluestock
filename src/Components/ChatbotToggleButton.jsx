import React from "react";

const ChatbotToggleButton = ({ onClick, isOpen }) => (
  <button
    className="chatbot-toggle-btn"
    onClick={onClick}
    aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
    style={{
      position: "fixed",
      bottom: 24,
      right: 32,
      zIndex: 1003,
      background: "var(--accent-blue, #1e90ff)",
      color: "#fff",
      border: "none",
      borderRadius: "50%",
      width: 56,
      height: 56,
      boxShadow: "0 4px 16px rgba(30,144,255,0.18)",
      fontSize: 28,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background 0.2s, box-shadow 0.2s",
    }}
  >
    {isOpen ? (
      "✕"
    ) : (
      <span role="img" aria-label="Chatbot">
        💬
      </span>
    )}
  </button>
);

export default ChatbotToggleButton;
