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
    <div style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
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
            style={{
              ...styles.input,
              backgroundColor: isDarkMode ? "#334155" : "#f0f4f8",
              border: isDarkMode ? "1px solid #444" : "1px solid #ccc",
              color: isDarkMode ? "#f1f5f9" : "#1e293b"
            }}
          />
          {message.trim() && (
            <button type="submit" style={styles.sendButton} aria-label="Send message">
              <Send size={20} />
            </button>
          )}
        </div>

        <div style={styles.buttonGroup}>
          {/* Gemini Toggle */}
          <button
            type="button"
            onClick={toggleUseGemini}
            style={{
              ...styles.iconButton,
              backgroundColor: useGemini ? "#dbeafe" : isDarkMode ? "#334155" : "#e2e8f0",
              color: useGemini ? "#1d4ed8" : isDarkMode ? "#cbd5e1" : "#1e293b",
              border: `1px solid ${useGemini ? "#93c5fd" : "#cbd5e1"}`
            }}
            aria-label="Gemini toggle"
          >
            {useGemini ? <Bot size={20} /> : <Briefcase size={20} />}
          </button>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            style={styles.iconButton}
            aria-label="Toggle dark mode"
          >
            <SunMoon size={18} />
          </button>

          {/* Clear Chat */}
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

const baseContainer = {
  padding: "1rem",
  borderTop: "1px solid",
  zIndex: 1000
};

const styles: { [key: string]: React.CSSProperties } = {
  lightContainer: {
    ...baseContainer,
    backgroundColor: "#ffffff",
    borderColor: "#e5e7eb"
  },
  darkContainer: {
    ...baseContainer,
    backgroundColor: "#1e293b",
    borderColor: "#334155"
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
    fontSize: "0.95rem",
    outline: "none",
    transition: "all 0.2s ease"
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
    border: "1px solid #cbd5e1",
    backgroundColor: "#e2e8f0",
    color: "#1e293b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  helperText: {
    textAlign: "center",
    marginTop: "0.5rem",
    fontSize: "0.75rem",
    color: "#94a3b8"
  }
};
