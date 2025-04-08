// src/components/TypingArea.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Trash2, SunMoon, Bot, Briefcase } from "lucide-react";
import { useChat } from "../context/ChatContext";

export default function TypingArea() {
  const [message, setMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { sendMessage, clearChat, isTyping, useGemini, toggleUseGemini } =
    useChat();
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize dark mode based on system preference or previous setting
  useEffect(() => {
    const darkModeSetting = localStorage.getItem("darkMode");
    if (darkModeSetting === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (darkModeSetting === "false") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      // Check system preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(systemPrefersDark);
      if (systemPrefersDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      sendMessage(message);
      setMessage("");
      // Focus back on input after sending
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={message}
              placeholder={
                useGemini
                  ? "Ask Gemini anything..."
                  : "Enter your job-related question..."
              }
              onChange={(e) => setMessage(e.target.value)}
              disabled={isTyping}
              className="w-full p-3 pr-12 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              aria-label="Type your message"
            />
            {message.trim() && (
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                disabled={isTyping}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={toggleUseGemini}
            className={`p-3 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700 ${
              useGemini
                ? "bg-blue-100 text-blue-600 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-600"
                : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            }`}
            aria-label={
              useGemini
                ? "Switch to job recommendations"
                : "Switch to Gemini AI"
            }
            aria-pressed={useGemini}
          >
            {useGemini ? <Bot size={18} /> : <Briefcase size={18} />}
          </button>

          <button
            type="button"
            onClick={toggleDarkMode}
            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <SunMoon size={18} />
          </button>

          <button
            type="button"
            onClick={clearChat}
            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Clear chat history"
          >
            <Trash2 size={18} />
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
          {useGemini
            ? "Using Gemini AI for general questions. Gemini may display inaccurate info, so double-check responses."
            : "This chatbot helps suggest job roles that may suit your strengths and accessibility needs."}
        </p>
      </div>
    </div>
  );
}
