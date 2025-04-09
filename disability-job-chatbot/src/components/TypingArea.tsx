"use client";

import React, { useState, useRef } from "react";
import { Send, Trash2, SunMoon, Bot, Briefcase } from "lucide-react";
import { useChat } from "../context/ChatContext";
import { useTheme } from "../context/ThemeContext";

export default function TypingArea() {
  const [message, setMessage] = useState("");
  const { sendMessage, clearChat, isTyping, useGemini, toggleUseGemini } =
    useChat();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      sendMessage(message);
      setMessage("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className="typing-area-container fixed bottom-0 left-0 right-0 p-4 bg-[color:var(--app-background)] border-t border-[color:var(--border-color)] z-10">
      <form className="flex flex-col gap-3 max-w-[900px] mx-auto">
        <div className="relative w-full">
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
            className="w-full py-3 px-5 rounded-full border border-[color:var(--border-color)] bg-[color:var(--input-background)] text-[color:var(--text-primary)] text-sm"
          />
          {message.trim() && (
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-[color:var(--accent-color)] cursor-pointer"
              aria-label="Send message"
              onClick={handleSubmit}
            >
              <Send size={20} />
            </button>
          )}
        </div>

        <div className="flex justify-center gap-3">
          {/* Gemini Toggle */}
          <button
            type="button"
            onClick={toggleUseGemini}
            className={`w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all
              ${
                useGemini
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600"
                  : "bg-[color:var(--input-background)] text-[color:var(--text-tertiary)] border-[color:var(--border-color)]"
              } border`}
            aria-label="Gemini toggle"
          >
            {useGemini ? <Bot size={20} /> : <Briefcase size={20} />}
          </button>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="w-11 h-11 rounded-full border border-[color:var(--border-color)] bg-[color:var(--input-background)] text-[color:var(--text-tertiary)] flex items-center justify-center cursor-pointer"
            aria-label="Toggle dark mode"
          >
            <SunMoon size={18} />
          </button>

          {/* Clear Chat */}
          <button
            type="button"
            onClick={clearChat}
            className="w-11 h-11 rounded-full border border-[color:var(--border-color)] bg-[color:var(--input-background)] text-[color:var(--text-tertiary)] flex items-center justify-center cursor-pointer"
            aria-label="Clear chat"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </form>

      <p className="text-center mt-2 text-xs text-[color:var(--text-tertiary)]">
        {useGemini
          ? "Using Gemini AI for general questions. Please verify the answers."
          : "This assistant recommends jobs based on your strengths and accessibility preferences."}
      </p>
    </div>
  );
}
