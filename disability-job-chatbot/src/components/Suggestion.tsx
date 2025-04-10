"use client";

import React from "react";
import { useChat } from "../context/ChatContext";

interface Props {
  text: string;
  icon: string;
}

export default function Suggestion({ text, icon }: Props) {
  const { sendMessage } = useChat();

  const handleClick = () => {
    sendMessage(text);
  };

  return (
    <button
      onClick={handleClick}
      className="min-w-[220px] flex-shrink-0 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all text-left"
      aria-label={`Use suggestion: ${text}`}
    >
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium flex-1">{text}</p>
        <span className="text-2xl ml-2">{icon}</span>
      </div>
    </button>
  );
}
