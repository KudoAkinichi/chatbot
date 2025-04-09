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
    <div className="chat-container" aria-label="Chat messages" role="log">
      <div className="messages-wrapper">
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

        <div ref={messagesEndRef} className="scroll-marker" />
      </div>

      <style jsx>{`
        .chat-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          background: #f9fafb;
          color: #111827;
          height: 100%;
        }

        .messages-wrapper {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
          padding-bottom: 120px; /* Extra space at bottom for input area */
        }

        .messages-wrapper::-webkit-scrollbar {
          width: 6px;
        }

        .messages-wrapper::-webkit-scrollbar-track {
          background: transparent;
        }

        .messages-wrapper::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 10px;
        }

        .scroll-marker {
          height: 1px;
          width: 100%;
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          padding: 1rem;
          background-color: #ffffff;
          border-top: 1px solid #e5e7eb;
          margin: 0.5rem 1rem;
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
          background-color: #9ca3af;
          animation: bounce 1s infinite;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @media (prefers-color-scheme: dark) {
          .chat-container {
            background-color: #111827;
            color: #f9fafb;
          }

          .typing-indicator {
            background-color: #1f2937;
            border-color: #374151;
          }

          .dot {
            background-color: #6b7280;
          }

          .messages-wrapper::-webkit-scrollbar-thumb {
            background-color: #4b5563;
          }
        }
      `}</style>
    </div>
  );
}
