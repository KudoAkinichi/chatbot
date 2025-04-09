"use client";

import React from "react";
import { useChat } from "../context/ChatContext";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

type SuggestionItem = {
  id: string;
  text: string;
  icon: string;
};

const jobSuggestions: SuggestionItem[] = [
  {
    id: "suggestion-1",
    text: "I have a hearing impairment and need job recommendations",
    icon: "👂",
  },
  {
    id: "suggestion-2",
    text: "I use a wheelchair and am looking for suitable careers",
    icon: "♿",
  },
  {
    id: "suggestion-3",
    text: "I have low vision and need accessible job options",
    icon: "👁️",
  },
  {
    id: "suggestion-4",
    text: "I have autism and am looking for good career matches",
    icon: "🧠",
  },
];

const geminiSuggestions: SuggestionItem[] = [
  {
    id: "gemini-1",
    text: "What are some accessible techniques for managing stress at work?",
    icon: "🧘",
  },
  {
    id: "gemini-2",
    text: "Help me write a professional email requesting workplace accommodations",
    icon: "📧",
  },
  {
    id: "gemini-3",
    text: "How can I prepare for a technical interview with accessibility tools?",
    icon: "💻",
  },
  {
    id: "gemini-4",
    text: "Recommend personal development books or resources for people with disabilities",
    icon: "📚",
  },
];

export default function Header() {
  const { messages, useGemini, sendMessage } = useChat();
  const { isDarkMode } = useTheme();

  const shouldShowHeader = messages.length <= 1;
  if (!shouldShowHeader) return null;

  const title = useGemini ? "Gemini Assistant" : "Disability Job Finder";
  const subtitle = useGemini
    ? "Ask me anything - powered by Gemini AI"
    : "Find job recommendations tailored to your specific needs";
  const suggestions = useGemini ? geminiSuggestions : jobSuggestions;

  const handleSuggestionClick = (text: string) => {
    sendMessage(text);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative p-12 border-b border-[color:var(--border-color)] bg-gradient-to-b from-blue-50 to-[color:var(--app-background)] dark:from-blue-950 dark:to-[color:var(--app-background)] text-[color:var(--text-primary)]">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-[1000px] mx-auto"
      >
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm font-medium mb-4">
            {useGemini ? "Assistant Mode" : "Job Finder Mode"}
          </div>
          <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-lg max-w-[600px] mx-auto text-[color:var(--text-secondary)]">
            {subtitle}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4"
        >
          {suggestions.map(({ id, text, icon }) => (
            <motion.div key={id} variants={itemVariants}>
              <div
                onClick={() => handleSuggestionClick(text)}
                className="flex items-center relative p-5 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 shadow-sm hover:shadow cursor-pointer outline-none"
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSuggestionClick(text)
                }
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b from-blue-500 to-purple-500"></div>
                <div className="w-12 h-12 min-w-12 rounded-xl bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-2xl mr-4 transition-transform">
                  {icon}
                </div>
                <div className="font-medium text-[color:var(--text-primary)] leading-relaxed">
                  {text}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.header>
    </div>
  );
}
