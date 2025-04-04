"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useChat } from "ai/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { IMessage } from "@/lib/db/schema/message";
import { geist_sans } from "@/lib/misc/fonts";
import { createIdGenerator } from "ai";

import ChatInput from "./chat-input";
import { ScrollArea } from "./ui/scroll-area";
import {
  PowderChatBubble,
  PowderThinking,
  UserChatBubble,
} from "./render-chat-bubble";
import CodeAndPreview from "./code-and-preview-tab-group";

const FormSchema = z.object({
  userPrompt: z.string(),
});

interface ChatPageProps {
  result: {
    id: string;
    title: string;
    messages: IMessage[];
    createdAt: Date;
  };
  chatId: string;
}

const ChatPage: React.FC<ChatPageProps> = ({ result, chatId }) => {
  const [selectedMsgId, setSelectedMsgId] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const watchedPrompt = form.watch("userPrompt");

  const { messages, setInput, handleSubmit, status, reload, stop } = useChat({
    initialMessages: result.messages.map((m) => m.message),
    body: { chatId },
    experimental_prepareRequestBody: ({ messages }) => {
      const last = messages[messages.length - 1];
      return { chatId, message: last };
    },
    generateId: createIdGenerator({ prefix: "user", size: 16 }),
  });

  useEffect(() => {
    if (messages.length === 1 && messages[0].role === "user") {
      reload();
    }
  }, [messages.length]);

  const memoMessages = useMemo(() => messages, [messages]);

  useEffect(() => {
    setInput(watchedPrompt);
  }, [watchedPrompt, setInput]);

  return (
    <div className="w-full grid grid-cols-[1fr_1.15fr]">
      {/* Chat Area */}
      <div className="h-screen flex flex-col justify-between border-l-0">
        {/* Header */}
        <div
          className="h-14 border-b px-6 flex items-center text-[15px]"
          style={geist_sans.style}
        >
          {result.title}
        </div>

        {/* Messages */}
        <ScrollArea className="h-[calc(100vh-3.5rem)] backdrop-blur-xl bg-transparent px-6">
          <div className="flex flex-col space-y-8 pt-7 p-4">
            {memoMessages.map((msg, index) => (
              <div key={index}>
                {msg.role === "user" && <UserChatBubble text={msg.content} />}
                {msg.role === "assistant" && (
                  <PowderChatBubble
                    content={msg.content}
                    msgId={msg.id}
                    setCodeMsgId={setSelectedMsgId}
                  />
                )}
              </div>
            ))}
          </div>
          <PowderThinking status={status} />
          <div className="h-72" />
        </ScrollArea>

        {/* Input */}
        <div className="relative h-0">
          <div className="absolute bottom-0 w-full flex flex-col justify-end">
            <div className="px-4 pb-0">
              <ChatInput
                status={status}
                stop={stop}
                form={form}
                handleSubmit={handleSubmit}
              />
              <div className="h-4 w-full bg-background" />
            </div>
          </div>
        </div>
      </div>

      {/* Code Preview Panel */}
      <CodeAndPreview
        status={status}
        content={
          status === "streaming"
            ? memoMessages.filter((msg) => msg.role === "assistant")[-1]?.content
            : memoMessages.find((msg) => msg.id === selectedMsgId)?.content ||
              ""
        }
      />
    </div>
  );
};

export default ChatPage;
