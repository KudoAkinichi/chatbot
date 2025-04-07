// src/context/ChatContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Message,
  DisabilityData,
  INITIAL_MESSAGE,
  generateResponse,
} from "../lib/chatbotLogic";

interface ChatContextType {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (content: string) => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [disabilityData, setDisabilityData] = useState<DisabilityData>({
    type: null,
    jobPreference: null,
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("chat-messages");
    const savedDisabilityData = localStorage.getItem("disability-data");

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    if (savedDisabilityData) {
      setDisabilityData(JSON.parse(savedDisabilityData));
    }

    setIsInitialized(true);
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("chat-messages", JSON.stringify(messages));
      localStorage.setItem("disability-data", JSON.stringify(disabilityData));
    }
  }, [messages, disabilityData, isInitialized]);

  // Function to send a new message
  const sendMessage = (content: string) => {
    if (!content.trim() || isTyping) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay for assistant response
    setTimeout(() => {
      // Generate assistant response
      const { response, updatedData } = generateResponse(
        content,
        disabilityData
      );

      // Add assistant message
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: response,
        sender: "assistant",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setDisabilityData(updatedData);
      setIsTyping(false);
    }, 600);
  };

  // Function to clear chat history
  const clearChat = () => {
    if (window.confirm("Are you sure you want to delete all the chats?")) {
      setMessages([INITIAL_MESSAGE]);
      setDisabilityData({ type: null, jobPreference: null });
    }
  };

  return (
    <ChatContext.Provider
      value={{ messages, isTyping, sendMessage, clearChat }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
