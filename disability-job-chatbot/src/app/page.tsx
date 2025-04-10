"use client";

import Header from "@/components/Header";
import ChatContainer from "@/components/ChatContainer";
import TypingArea from "@/components/TypingArea";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <ChatContainer />
      <TypingArea />
    </div>
  );
}
