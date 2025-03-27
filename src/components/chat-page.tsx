"use client";

import React, { useEffect, useState } from "react";
import CodeAndPreview from "./code-and-preview-tab-group";
import { useChat } from "ai/react";
import { IMessage } from "@/lib/db/schema/message";
import { geist_sans } from "@/lib/misc/fonts";
import { ScrollArea } from "./ui/scroll-area";
import ChatInput from "./chat-input";
import { createIdGenerator } from "ai";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PowderChatBubble, UserChatBubble } from "./render-chat-bubble";
import { parse } from "partial-json";

const FormSchema = z.object({
  userPrompt: z.string(),
});

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
  const [currentCode, setCurrentCode] = useState(undefined);

  const { messages, setInput, handleSubmit, status } = useChat({
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
    onFinish(message) {
      console.log(message);
    },
    generateId: createIdGenerator({ prefix: "user", size: 16 }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    setInput(form.watch("userPrompt"));
  }, [form.watch("userPrompt")]);

  useEffect(() => {
    console.log(status);
  }, [status]);

  useEffect(() => {
    const powderMessages = messages.filter(
      (message) => message.role === "assistant"
    );
    if (powderMessages.length === 0) return;
    const latestCode = parse(
      powderMessages[powderMessages.length - 1].content
    ).code;
    if (!latestCode) {
      console.log("powder ne kabhi code diya hi nahi");
    }
    setCurrentCode(latestCode);
  }, [messages]);

  return (
    <div className="w-full grid grid-cols-[1fr_1.15fr]">
      <div className="h-screen flex flex-col justify-between bg-[#070808]/20 !border-l-0">
        <div
          className="h-14 border-b px-6 flex items-center text-[15px]"
          style={geist_sans.style}
        >
          {result.title}
        </div>
        <ScrollArea className="h-[calc(100vh-3.5rem)] backdrop-blur-xl bg-transparent border-l-0 flex flex-col px-6">
          <div className="flex flex-col space-y-4 pt-5">
            <div className="flex flex-col space-y-6 p-4">
              {messages.map((msg, index) => (
                <div key={index}>
                  {msg.role === "user" && (
                    <UserChatBubble key={index} text={msg.content} />
                  )}
                  {msg.role === "assistant" && (
                    <PowderChatBubble key={index} content={msg.content} />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="h-72"></div>
        </ScrollArea>
        <div className="relative h-0">
          <div className="absolute bottom-0 w-full pt-3 flex flex-col justify-end h-72">
            <div className="p-4 pb-0">
              <ChatInput form={form} handleSubmit={handleSubmit} />
              <div className="h-4 w-full bg-background"></div>
            </div>
          </div>
        </div>
      </div>
      <CodeAndPreview status={status} code={currentCode} />
    </div>
  );
};

export default ChatPage;
