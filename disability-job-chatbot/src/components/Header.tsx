"use client";

import React from "react";
import { useChat } from "../context/ChatContext";
import { motion } from "framer-motion";

type SuggestionItem = {
  id: string;
  text: string;
  icon: string;
};

const jobSuggestions: SuggestionItem[] = [
  { id: "suggestion-1", text: "I have a hearing impairment and need job recommendations", icon: "👂" },
  { id: "suggestion-2", text: "I use a wheelchair and am looking for suitable careers", icon: "♿" },
  { id: "suggestion-3", text: "I have low vision and need accessible job options", icon: "👁️" },
  { id: "suggestion-4", text: "I have autism and am looking for good career matches", icon: "🧠" },
];

const geminiSuggestions: SuggestionItem[] = [
  { id: "gemini-1", text: "What are some techniques for managing work-related stress?", icon: "🧘" },
  { id: "gemini-2", text: "Write me a professional email requesting flexible working hours", icon: "📧" },
  { id: "gemini-3", text: "How do I prepare for a technical interview in software development?", icon: "💻" },
  { id: "gemini-4", text: "What are the best personal development books for professionals?", icon: "📚" },
];

export default function Header() {
  const { messages, useGemini, sendMessage } = useChat();

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
    <div style={styles.container}>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={styles.header}
      >
        <div style={styles.textCenter}>
          <div style={styles.modeBadge}>
            {useGemini ? "Assistant Mode" : "Job Finder Mode"}
          </div>
          <h1 style={styles.title}>{title}</h1>
          <p style={styles.subtitle}>{subtitle}</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={styles.grid}
        >
          {suggestions.map(({ id, text, icon }) => (
            <motion.div key={id} variants={itemVariants} style={styles.cardWrapper}>
              <div
                onClick={() => handleSuggestionClick(text)}
                style={styles.suggestionCard}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleSuggestionClick(text)}
              >
                <div style={styles.accentLine} />
                <div style={styles.iconContainer}>{icon}</div>
                <div style={styles.cardText}>{text}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.header>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "relative",
    padding: "3rem 1rem",
    borderBottom: "1px solid rgba(229, 231, 235, 0.2)",
    background: "linear-gradient(to bottom, #eff6ff, #ffffff)",
    color: "#1f2937",
    overflowX: "hidden",
  },
  header: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  textCenter: {
    textAlign: "center",
    marginBottom: "2.5rem",
  },
  modeBadge: {
    display: "inline-block",
    padding: "0.25rem 1rem",
    borderRadius: "999px",
    backgroundColor: "#dbeafe",
    color: "#2563eb",
    fontSize: "0.875rem",
    fontWeight: 500,
    marginBottom: "1rem",
  },
  title: {
    fontSize: "2.75rem",
    fontWeight: 800,
    marginBottom: "1rem",
    background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "1.125rem",
    maxWidth: "600px",
    margin: "0 auto",
    color: "#4b5563",
  },
  grid: {
    display: "block",
    maxHeight: "300px",
    overflowY: "auto",
    paddingRight: "0.5rem",
  },
  cardWrapper: {
    marginBottom: "1rem",
  },
  suggestionCard: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    padding: "1.25rem",
    borderRadius: "12px",
    border: "1px solid #c7d2fe",
    background: "linear-gradient(135deg, #dbeafe, #ede9fe)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.05)",
    cursor: "pointer",
    outline: "none",
  },
  accentLine: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "4px",
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px",
    background: "linear-gradient(to bottom, #3b82f6, #8b5cf6)",
  },
  iconContainer: {
    width: "48px",
    height: "48px",
    minWidth: "48px",
    borderRadius: "12px",
    backgroundColor: "#bfdbfe",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    marginRight: "1rem",
    transition: "transform 0.3s ease",
  },
  cardText: {
    fontWeight: 500,
    color: "#1f2937",
    lineHeight: 1.4,
  },
};
