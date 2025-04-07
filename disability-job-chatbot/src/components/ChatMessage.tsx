"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface Props {
  content: string;
  sender: "user" | "assistant";
  timestamp: number;
}

export default function ChatMessage({ content, sender, timestamp }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  // Format timestamp
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Handle copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Process content with proper formatting
  const processContent = (text: string) => {
    // First split by new lines
    const lines = text.split("\n");
    const processedLines = lines.map((line, i) => {
      // Handle bold text with **
      line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      // Handle bullet points
      if (line.trim().startsWith("•")) {
        return `<li class="ml-6 list-disc">${line.substring(1).trim()}</li>`;
      } else if (line.trim() === "") {
        return "<br/>";
      } else {
        return `<p class="mb-2">${line}</p>`;
      }
    });

    return processedLines.join("");
  };

  return (
    <div
      className={`flex gap-4 p-4 ${
        sender === "user"
          ? "bg-blue-50 dark:bg-blue-900/20"
          : "bg-white dark:bg-gray-800"
      } border-b border-gray-200 dark:border-gray-700`}
      aria-label={`${sender} message`}
    >
      {/* Avatar */}
      {/* <div className="flex-shrink-0">
        <div className="w-4 h-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
          <img
            src={
              sender === "user" ? "/images/user.png" : "/images/assistant.svg"
            }
            alt={sender === "user" ? "User avatar" : "Assistant avatar"}
            className="w-full h-full object-cover"
          />
        </div>
      </div> */}

      {/* Message Content */}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <span className="font-medium text-sm">
            {sender === "user" ? "You" : "Job Assistant"}
          </span>
          <span className="text-xs text-gray-500">{formattedTime}</span>
        </div>

        <div
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: processContent(content) }}
        />
      </div>

      {/* Copy button - only for assistant messages */}
      {sender === "assistant" && (
        <button
          onClick={copyToClipboard}
          className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 self-start"
          aria-label={isCopied ? "Copied to clipboard" : "Copy message"}
          title={isCopied ? "Copied!" : "Copy message"}
        >
          {isCopied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      )}
    </div>
  );
}
