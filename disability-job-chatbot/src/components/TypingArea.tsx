"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Trash2,
  SunMoon,
  Bot,
  Briefcase,
  X,
  MessageCircle,
} from "lucide-react";
import { useChat } from "../context/ChatContext";

export default function TypingArea() {
  const [message, setMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTypingArea, setShowTypingArea] = useState(false);
  const { sendMessage, clearChat, isTyping, useGemini, toggleUseGemini } =
    useChat();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const darkModeSetting = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldUseDark =
      darkModeSetting === "true" || (!darkModeSetting && prefersDark);

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

  const confirmClearChat = () => {
    clearChat();
    setShowDeleteModal(false);
  };

  return (
    <>
      {!showTypingArea && (
        <button
          onClick={() => setShowTypingArea(true)}
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            backgroundColor: "#3b82f6",
            color: "#fff",
            border: "none",
            padding: "0.75rem 1.25rem",
            borderRadius: "999px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            zIndex: 1001,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <MessageCircle size={18} />
          Chat
        </button>
      )}

      {showTypingArea && (
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
                <button
                  type="submit"
                  style={styles.sendButton}
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              )}
            </div>

            <div style={styles.buttonGroup}>
              <button
                type="button"
                onClick={toggleUseGemini}
                style={{
                  ...styles.iconButton,
                  backgroundColor: useGemini ? "#d0ebff" : "#eeeeee",
                  color: useGemini ? "#0056b3" : "#333",
                  border: `1px solid ${useGemini ? "#99ccff" : "#ccc"}`,
                }}
                aria-label="Gemini toggle"
              >
                {useGemini ? <Bot size={18} /> : <Briefcase size={18} />}
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                style={styles.iconButton}
                aria-label="Clear chat"
              >
                <Trash2 size={16} />
              </button>

              <button
                type="button"
                onClick={() => setShowTypingArea(false)}
                style={styles.iconButton}
                aria-label="Close chat input"
              >
                <X size={16} />
              </button>
            </div>
          </form>

          <p style={styles.helperText}>
            {useGemini
              ? "Using Gemini AI for general questions. Please verify the answers."
              : "This assistant recommends jobs based on your strengths and accessibility preferences."}
          </p>

          {showDeleteModal && (
            <div style={styles.modalOverlay}>
              <div style={styles.modalContent}>
                <div style={styles.modalHeader}>
                  <h3>Clear Chat</h3>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    style={styles.modalClose}
                  >
                    <X size={18} />
                  </button>
                </div>
                <p style={{ margin: "1rem 0" }}>
                  Are you sure you want to delete all chat messages?
                </p>
                <div style={styles.modalActions}>
                  <button
                    style={styles.cancelBtn}
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button style={styles.confirmBtn} onClick={confirmClearChat}>
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "0.5rem 1rem",
    backgroundColor: "#1e293b",
    borderTop: "1px solid #2f3e4e",
    zIndex: 1000,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    maxWidth: "900px",
    margin: "0 auto",
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "0.55rem 2.75rem 0.55rem 1rem",
    borderRadius: "9999px",
    border: "1px solid #444",
    backgroundColor: "#334155",
    fontSize: "0.85rem",
    color: "#f1f5f9",
  },
  sendButton: {
    position: "absolute",
    right: "0.65rem",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#38bdf8",
    cursor: "pointer",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
  },
  iconButton: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    border: "1px solid #444",
    backgroundColor: "#334155",
    color: "#cbd5e1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  helperText: {
    textAlign: "center",
    marginTop: "0.3rem",
    fontSize: "0.7rem",
    color: "#cbd5e1",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: "#f8fafc",
    color: "#1e293b",
    padding: "1.5rem",
    borderRadius: "12px",
    maxWidth: "400px",
    width: "90%",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalClose: {
    background: "none",
    border: "none",
    color: "#1e293b",
    cursor: "pointer",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.75rem",
    marginTop: "1.25rem",
  },
  cancelBtn: {
    backgroundColor: "#e2e8f0",
    color: "#1e293b",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
  },
  confirmBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
