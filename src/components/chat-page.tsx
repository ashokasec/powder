"use client";

import React, { useEffect } from "react";
import { ChatPlayground } from "./chat-playground";
import CodeAndPreview from "./code-and-preview-tab-group";
import { useChat } from "@/hooks/use-chat";
import { ChatType } from "@/lib/types/chat";

const ChatPage = ({
  result,
  chatId,
}: {
  result: {
    id: string;
    title: string;
    messages: ChatType[];
    createdAt: Date;
  };
  chatId: string;
}) => {
  const { messages, setMessages } = useChat();

  useEffect(() => {
    setMessages(result.messages);
  }, []);

  return (
    <div className="w-full grid grid-cols-[1fr_1.15fr] divide-x">
      <ChatPlayground chats={messages} chatId={chatId} title="Bio-Inspired Computing Systems" />
      <CodeAndPreview chats={messages} />
    </div>
  );
};

export default ChatPage;
