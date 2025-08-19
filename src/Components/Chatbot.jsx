import React, { useState, useRef, useEffect } from "react";
import "../Styles/Chatbot.css";

const SUGGESTIONS = [
  "Show me today's market summary",
  "How to buy stocks on NSE?",
  "What is an IPO?",
  "Top gainers today",
  "Help",
];

const CHATBOT_HISTORY_KEY = "bluestock_chatbot_history";

const Chatbot = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(CHATBOT_HISTORY_KEY);
    return saved
      ? JSON.parse(saved)
      : [
          {
            sender: "bot",
            text: "Hi! I’m Bluestock AI. How can I help you today?",
          },
        ];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(messages.length <= 1);
  const [minimized, setMinimized] = useState(false);
  const [drag, setDrag] = useState({
    x: 0,
    y: 0,
    dragging: false,
    offsetX: 0,
    offsetY: 0,
  });
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(CHATBOT_HISTORY_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (!minimized)
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, minimized]);

  // Drag handlers
  const onMouseDown = (e) => {
    setDrag({
      ...drag,
      dragging: true,
      offsetX:
        e.clientX - (containerRef.current?.getBoundingClientRect().left || 0),
      offsetY:
        e.clientY - (containerRef.current?.getBoundingClientRect().top || 0),
    });
    document.body.style.userSelect = "none";
  };
  useEffect(() => {
    const onMouseMove = (e) => {
      if (drag.dragging) {
        setDrag((d) => ({
          ...d,
          x: e.clientX - d.offsetX,
          y: e.clientY - d.offsetY,
        }));
      }
    };
    const onMouseUp = () => {
      setDrag((d) => ({ ...d, dragging: false }));
      document.body.style.userSelect = "";
    };
    if (drag.dragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [drag.dragging]);

  const sendMessage = async (e, suggestion) => {
    if (e) e.preventDefault();
    const userInput = suggestion || input;
    if (!userInput.trim()) return;
    const userMsg = { sender: "user", text: userInput };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setShowSuggestions(false);
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.affiliateplus.xyz/api/chatbot?message=" +
          encodeURIComponent(userInput) +
          "&botname=BluestockAI&ownername=Bluestock",
        { method: "GET" }
      );
      const data = await response.json();
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: data.message || "Sorry, I didn’t get that." },
      ]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "bot",
          text: "Sorry, there was an error or you are offline.",
        },
      ]);
    }
    setLoading(false);
  };

  const handleSuggestion = (s) => {
    sendMessage(null, s);
  };

  const handleClear = () => {
    setMessages([
      {
        sender: "bot",
        text: "Hi! I’m Bluestock AI. How can I help you today?",
      },
    ]);
    setShowSuggestions(true);
  };

  if (minimized)
    return (
      <div
        className="chatbot-minimized"
        style={{
          position: "fixed",
          bottom: drag.y || 90,
          right: drag.x || 30,
          zIndex: 1002,
        }}
        onClick={() => setMinimized(false)}
        title="Open chatbot"
      >
        🤖 Bluestock AI
      </div>
    );

  return (
    <div
      className="chatbot-container"
      ref={containerRef}
      role="dialog"
      aria-label="Bluestock AI Chatbot"
      style={{
        left: drag.x || "auto",
        top: drag.y || "auto",
        right: drag.x ? "auto" : 30,
        bottom: drag.y ? "auto" : 90,
        cursor: drag.dragging ? "grabbing" : "default",
      }}
    >
      <div
        className="chatbot-header"
        onMouseDown={onMouseDown}
        style={{ cursor: "grab" }}
      >
        <span>Bluestock AI Chat</span>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            className="chatbot-min-btn"
            onClick={() => setMinimized(true)}
            title="Minimize chatbot"
            aria-label="Minimize chatbot"
            tabIndex={0}
            type="button"
          >
            
          </button>
          <button
            className="chatbot-clear-btn"
            onClick={handleClear}
            title="Clear chat"
            aria-label="Clear chat"
            tabIndex={0}
            type="button"
          >
            🗑️
          </button>
        </div>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chatbot-msg ${msg.sender}`}
            style={{
              background:
                msg.sender === "bot"
                  ? "var(--accent-blue, #1e90ff)"
                  : "var(--accent-orange, #ff9800)",
              color: "#fff",
              fontWeight: msg.sender === "bot" ? 600 : 500,
              boxShadow:
                msg.sender === "bot"
                  ? "0 2px 8px #1e90ff22"
                  : "0 2px 8px #ff980022",
            }}
            aria-live={msg.sender === "bot" ? "polite" : undefined}
          >
            <span className="chatbot-avatar">
              {msg.sender === "bot" ? "🤖" : "🧑"}
            </span>
            <span style={{ whiteSpace: "pre-line" }}>{msg.text}</span>
          </div>
        ))}
        {loading && (
          <div className="chatbot-msg bot">
            <span className="chatbot-avatar">🤖</span>
            <span className="chatbot-typing">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {showSuggestions && (
        <div className="chatbot-suggestions">
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              className="chatbot-suggestion-btn"
              onClick={() => handleSuggestion(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}
      <form className="chatbot-input-row" onSubmit={sendMessage}>
        <input
          className="chatbot-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          disabled={loading}
          aria-label="Type your message"
        />
        <button
          className="chatbot-send"
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
