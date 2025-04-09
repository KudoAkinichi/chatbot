"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Message,
  DisabilityData,
  INITIAL_MESSAGE,
  generateResponse,
} from "../lib/chatbotLogic";
import geminiService from "../lib/GeminiService";

interface ChatContextType {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (content: string) => void;
  clearChat: () => void;
  useGemini: boolean;
  toggleUseGemini: () => void;
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
  const [useGemini, setUseGemini] = useState(false);

  // Load chat history and settings from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("chat-messages");
    const savedDisabilityData = localStorage.getItem("disability-data");
    const savedUseGemini = localStorage.getItem("use-gemini");

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    if (savedDisabilityData) {
      setDisabilityData(JSON.parse(savedDisabilityData));
    }

    if (savedUseGemini) {
      setUseGemini(JSON.parse(savedUseGemini));
    }

    setIsInitialized(true);
  }, []);

  // Save chat history and settings to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("chat-messages", JSON.stringify(messages));
      localStorage.setItem("disability-data", JSON.stringify(disabilityData));
      localStorage.setItem("use-gemini", JSON.stringify(useGemini));
    }
  }, [messages, disabilityData, useGemini, isInitialized]);

  const toggleUseGemini = () => {
    setUseGemini(!useGemini);
    geminiService.resetConversation();
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      let response: string;

      if (useGemini) {
        response = await geminiService.getResponse(content);
      } else {
        const result = generateResponse(content, disabilityData);
        response = result.response;
        setDisabilityData(result.updatedData);
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: response,
        sender: "assistant",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating response:", error);

      const errorMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: `Sorry, I encountered an error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        sender: "assistant",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // ✅ Updated: Removed window.confirm and just resets chat state
  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setDisabilityData({ type: null, jobPreference: null });
    geminiService.resetConversation();
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isTyping,
        sendMessage,
        clearChat,
        useGemini,
        toggleUseGemini,
      }}
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
