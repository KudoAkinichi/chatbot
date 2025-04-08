// TypingArea.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Trash2, SunMoon, Bot, Briefcase } from "lucide-react";
import { useChat } from "../context/ChatContext";

export default function TypingArea() {
  const [message, setMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { sendMessage, clearChat, isTyping, useGemini, toggleUseGemini } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const darkModeSetting = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = darkModeSetting === "true" || (!darkModeSetting && prefersDark);

    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      sendMessage(message);
      setMessage("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputWrapper}>
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isTyping}
            placeholder={
              useGemini
                ? "Ask Gemini anything..."
                : "Enter your job-related question..."
            }
            style={styles.input}
          />
          {message.trim() && (
            <button type="submit" style={styles.sendButton} aria-label="Send message">
              <Send size={20} />
            </button>
          )}
        </div>

        <div style={styles.buttonGroup}>
          {/* 🔄 Gemini Toggle */}
          <button
            type="button"
            onClick={toggleUseGemini}
            style={{
              ...styles.iconButton,
              backgroundColor: useGemini ? "#d0ebff" : "#eeeeee",
              color: useGemini ? "#0056b3" : "#333",
              border: `1px solid ${useGemini ? "#99ccff" : "#ccc"}`
            }}
            aria-label="Gemini toggle"
          >
            {useGemini ? <Bot size={20} /> : <Briefcase size={20} />}
          </button>

          {/* 🌓 Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            style={styles.iconButton}
            aria-label="Toggle dark mode"
          >
            <SunMoon size={18} />
          </button>

          {/* 🗑️ Clear Chat */}
          <button
            type="button"
            onClick={clearChat}
            style={styles.iconButton}
            aria-label="Clear chat"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </form>

      <p style={styles.helperText}>
        {useGemini
          ? "Using Gemini AI for general questions. Please verify the answers."
          : "This assistant recommends jobs based on your strengths and accessibility preferences."}
      </p>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "1rem",
    backgroundColor: "#1e293b", // dark mode bg
    borderTop: "1px solid #2f3e4e",
    zIndex: 1000
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    maxWidth: "900px",
    margin: "0 auto"
  },
  inputWrapper: {
    position: "relative",
    width: "100%"
  },
  input: {
    width: "100%",
    padding: "0.75rem 3rem 0.75rem 1.25rem",
    borderRadius: "9999px",
    border: "1px solid #444",
    backgroundColor: "#334155",
    fontSize: "0.95rem",
    color: "#f1f5f9"
  },
  sendButton: {
    position: "absolute",
    right: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#38bdf8",
    cursor: "pointer"
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "0.75rem"
  },
  iconButton: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "1px solid #444",
    backgroundColor: "#334155",
    color: "#cbd5e1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  },
  helperText: {
    textAlign: "center",
    marginTop: "0.5rem",
    fontSize: "0.75rem",
    color: "#cbd5e1"
  }
};