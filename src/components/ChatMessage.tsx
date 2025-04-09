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

  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const processContent = (text: string) => {
    const lines = text.split("\n");
    const processedLines = lines.map((line) => {
      line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      if (line.trim().startsWith("•")) {
        return `<li>${line.substring(1).trim()}</li>`;
      } else if (line.trim() === "") {
        return "<br/>";
      } else {
        return `<p>${line}</p>`;
      }
    });
    return processedLines.join("");
  };

  return (
    <div
      className={`chat-message ${sender}`}
      aria-label={`${sender} message`}
    >
      <div className="message-content">
        <div className="message-meta">
          <span className="sender-name">
            {sender === "user" ? "You" : "Job Assistant"}
          </span>
          <span className="timestamp">{formattedTime}</span>
        </div>

        <div
          className="message-body"
          dangerouslySetInnerHTML={{ __html: processContent(content) }}
        />
      </div>

      {sender === "assistant" && (
        <button
          onClick={copyToClipboard}
          className="copy-button"
          aria-label={isCopied ? "Copied to clipboard" : "Copy message"}
          title={isCopied ? "Copied!" : "Copy message"}
        >
          {isCopied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      )}

      <style jsx>{`
        .chat-message {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          margin: 0.5rem 0;
          border-radius: 0.75rem;
          background-color: #e0f2fe; /* Light blue background */
          border: 1px solid #bae6fd;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        }

        .dark .chat-message {
          background-color: #1e3a8a33; /* Dark mode light-blue-tint */
          border-color: #1e40af;
        }

        .message-content {
          flex: 1;
        }

        .message-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.25rem;
        }

        .sender-name {
          font-weight: 600;
          font-size: 0.875rem;
        }

        .timestamp {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .dark .timestamp {
          color: #cbd5e1;
        }

        .message-body {
          font-size: 0.95rem;
          color: #1e3a8a;
        }

        .dark .message-body {
          color: #dbeafe;
        }

        .message-body p {
          margin-bottom: 0.5rem;
        }

        .message-body ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }

        .copy-button {
          align-self: flex-start;
          padding: 0.5rem;
          border: none;
          background: none;
          color: #3b82f6;
          cursor: pointer;
          transition: color 0.2s;
        }

        .copy-button:hover {
          color: #1d4ed8;
        }

        .dark .copy-button {
          color: #93c5fd;
        }

        .dark .copy-button:hover {
          color: #bfdbfe;
        }
      `}</style>
    </div>
  );
}
