"use client";

import React from "react";
// import CodeAndPreview from "./code-and-preview-tab-group";
import { useChat } from "ai/react";
import { IMessage } from "@/lib/db/schema/message";
import { geist_sans } from "@/lib/misc/fonts";
import { ScrollArea } from "./ui/scroll-area";
import MessageList from "./message-list";
import ChatInput from "./chat-input";
import { createIdGenerator } from "ai";

const ChatPage = ({
  result,
  chatId,
}: {
  result: {
    id: string;
    title: string;
    messages: IMessage[];
    createdAt: Date;
  };
  chatId: string;
}) => {
  const { messages, setInput, handleSubmit } = useChat({
    initialMessages: result.messages.map((message) => message.message),
    body: {
      chatId: chatId,
    },
    experimental_prepareRequestBody: ({ messages }) => {
      const lastMessage = messages[messages.length - 1];
      return {
        chatId: chatId,
        message: lastMessage,
      };
    },
    generateId: createIdGenerator({ prefix: "vi", size: 16 }),
  });

  return (
    <div className="w-full grid grid-cols-[1fr_1.15fr] divide-x">
      <div className="h-screen flex flex-col justify-between bg-[#070808]/20 !border-l-0">
        <div
          className="h-14 border-b px-6 flex items-center tracking-wide text-[15px]"
          style={geist_sans.style}
        >
          {result.title}
        </div>
        <ScrollArea className="h-[calc(100vh-3.5rem)] backdrop-blur-xl bg-transparent border-l-0 flex flex-col px-6">
          <div className="flex flex-col space-y-4 pt-5">
            <MessageList messages={messages} />
          </div>
          <div className="h-72"></div>
        </ScrollArea>
        <div className="relative h-0">
          <div className="absolute bottom-0 w-full pt-3 flex flex-col justify-end h-72">
            <div className="p-4 pb-0">
              <ChatInput setInput={setInput} handleSubmit={handleSubmit} />
              <div className="h-4 w-full bg-background"></div>
            </div>
          </div>
        </div>
      </div>
      {/* <CodeAndPreview chats={messages} /> */}
    </div>
  );
};

export default ChatPage;
