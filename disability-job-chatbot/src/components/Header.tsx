// src/components/Header.tsx
"use client";

import React from "react";
import Suggestion from "./Suggestion";
import { useChat } from "../context/ChatContext";

// Sample suggestions based on SRS
const suggestions = [
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

export default function Header() {
  const { messages } = useChat();

  // Hide header if there's more than one message (conversation started)
  const showHeader = messages.length <= 1;

  if (!showHeader) return null;

  return (
    <header className="text-center pt-8 pb-4">
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Disability Job Finder
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
        Find job recommendations tailored to your specific needs
      </p>

      <div className="max-w-4xl mx-auto overflow-x-auto pb-4">
        <div className="flex gap-4 px-4">
          {suggestions.map((suggestion) => (
            <Suggestion
              key={suggestion.id}
              text={suggestion.text}
              icon={suggestion.icon}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
