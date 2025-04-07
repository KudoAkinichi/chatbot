// src/components/ChatContainer.tsx
"use client";

import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useChat } from "../context/ChatContext";

export default function ChatContainer() {
  const { messages, isTyping } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto pb-32"
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

      {/* Loading indicator */}
      {isTyping && (
        <div className="flex gap-4 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-shrink-0">
            {/* <div className="w-4 h-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              <img
                src="/images/assistant.svg"
                alt="Assistant avatar"
                className="w-4 h-4 object-cover animate-pulse"
              />
            </div> */}
          </div>
          <div className="flex items-center">
            <div className="flex space-x-2">
              <div
                className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                style={{ animationDelay: "600ms" }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Invisible element to scroll to */}
      <div ref={messagesEndRef} />
    </div>
  );
}
