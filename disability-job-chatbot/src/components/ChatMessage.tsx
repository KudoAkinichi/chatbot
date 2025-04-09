"use client";

import React, { useState } from "react";
import { Copy, Check, User, Bot } from "lucide-react";

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
      line = line.replace(/\*(.*?)\*/g, "<em>$1</em>");

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
      className={`chat-message ${sender === "user" ? "user" : "assistant"}`}
      aria-label={`${sender} message`}
    >
      <div className="avatar">
        {sender === "user" ? (
          <div className="user-avatar">
            <User size={18} />
          </div>
        ) : (
          <div className="assistant-avatar">
            <Bot size={18} />
          </div>
        )}
      </div>

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
          className={`copy-button ${isCopied ? "copied" : ""}`}
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
          padding: 1.25rem;
          border-bottom: 1px solid #e5e7eb;
          background-color: #ffffff;
          transition: all 0.2s ease;
          position: relative;
        }

        .chat-message:hover {
          background-color: #fafbfc;
        }

        .chat-message.assistant {
          background-color: #f9fafb;
        }

        .chat-message.assistant:hover {
          background-color: #f3f4f6;
        }

        .chat-message.user {
          background-color: #f0f7ff;
        }

        .chat-message.user:hover {
          background-color: #e6f0fd;
        }

        .dark .chat-message {
          border-color: #2d3748;
        }

        .dark .chat-message.assistant {
          background-color: #1f2937;
        }

        .dark .chat-message.assistant:hover {
          background-color: #263244;
        }

        .dark .chat-message.user {
          background-color: #1e3a8a22;
        }

        .dark .chat-message.user:hover {
          background-color: #1e3a8a33;
        }

        .avatar {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          width: 32px;
          height: 32px;
        }

        .user-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #3b82f6;
          color: white;
        }

        .assistant-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #10b981;
          color: white;
        }

        .message-content {
          flex: 1;
          overflow-wrap: break-word;
        }

        .message-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .sender-name {
          font-weight: 600;
          font-size: 0.875rem;
          color: #1f2937;
        }

        .dark .sender-name {
          color: #f3f4f6;
        }

        .timestamp {
          font-size: 0.75rem;
          color: #6b7280;
          font-weight: 400;
        }

        .dark .timestamp {
          color: #9ca3af;
        }

        .message-body {
          font-size: 0.95rem;
          line-height: 1.5;
          color: #111827;
        }

        .dark .message-body {
          color: #e5e7eb;
        }

        .message-body p {
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }

        .message-body p:last-child {
          margin-bottom: 0;
        }

        .message-body strong {
          font-weight: 600;
        }

        .message-body em {
          font-style: italic;
        }

        .message-body ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0.75rem 0;
        }

        .message-body li {
          margin-bottom: 0.5rem;
        }

        .message-body li:last-child {
          margin-bottom: 0;
        }

        .copy-button {
          align-self: flex-start;
          padding: 0.5rem;
          border: none;
          background: none;
          color: #9ca3af;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 0.25rem;
          opacity: 0;
          margin-right: -0.5rem;
        }

        .chat-message:hover .copy-button {
          opacity: 1;
        }

        .copy-button:hover {
          color: #111827;
          background-color: #f3f4f6;
        }

        .copy-button.copied {
          color: #10b981;
        }

        .dark .copy-button {
          color: #9ca3af;
        }

        .dark .copy-button:hover {
          color: #f3f4f6;
          background-color: #374151;
        }

        .dark .copy-button.copied {
          color: #34d399;
        }
      `}</style>
    </div>
  );
}
