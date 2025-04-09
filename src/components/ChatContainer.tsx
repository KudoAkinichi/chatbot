"use client";

import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useChat } from "../context/ChatContext";

export default function ChatContainer() {
  const { messages, isTyping } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="chat-container"
      aria-label="Chat messages"
      role="log"
    >
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          content={message.content}
          sender={message.sender}
          timestamp={message.timestamp}
        />
      ))}

      {isTyping && (
        <div className="typing-indicator">
          <div className="typing-dots">
            <div className="dot" style={{ animationDelay: "0ms" }} />
            <div className="dot" style={{ animationDelay: "200ms" }} />
            <div className="dot" style={{ animationDelay: "400ms" }} />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />

      <style jsx>{`
        .chat-container {
          flex: 1;
          overflow-y: auto;
          padding-bottom: 8rem;
          padding: 1rem;
          background: #e0f2fe; /* Light blue background */
          color: #111827;
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          padding: 1rem;
          background-color: #bae6fd; /* Lighter blue for typing box */
          border-top: 1px solid #7dd3fc;
          margin-top: 0.5rem;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          max-width: 160px;
        }

        .typing-dots {
          display: flex;
          gap: 6px;
          align-items: center;
          justify-content: center;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #0284c7;
          animation: bounce 1s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @media (prefers-color-scheme: dark) {
          .chat-container {
            background-color: #0c4a6e;
            color: #f0f9ff;
          }

          .typing-indicator {
            background-color: #1e3a8a;
            border-color: #2563eb;
          }

          .dot {
            background-color: #93c5fd;
          }
        }
      `}</style>
    </div>
  );
}
