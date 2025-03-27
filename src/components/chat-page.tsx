"use client";

import React, { useEffect, useState } from "react";
import { useChat } from "ai/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { IMessage } from "@/lib/db/schema/message";
import { geist_sans } from "@/lib/misc/fonts";
import { createIdGenerator } from "ai";

import ChatInput from "./chat-input";
import { ScrollArea } from "./ui/scroll-area";
import { PowderChatBubble, UserChatBubble } from "./render-chat-bubble";
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

  const { messages, setInput, handleSubmit, status } = useChat({
    initialMessages: result.messages.map((m) => m.message),
    body: { chatId },
    experimental_prepareRequestBody: ({ messages }) => {
      const last = messages[messages.length - 1];
      return { chatId, message: last };
    },
    onFinish(message) {
      console.log("Assistant Response:", message);
    },
    generateId: createIdGenerator({ prefix: "user", size: 16 }),
  });

  useEffect(() => {
    setInput(watchedPrompt);
  }, [watchedPrompt, setInput]);

  return (
    <div className="w-full grid grid-cols-[1fr_1.15fr]">
      {/* Chat Area */}
      <div className="h-screen flex flex-col justify-between bg-[#070808]/20 border-l-0">
        {/* Header */}
        <div className="h-14 border-b px-6 flex items-center text-[15px]" style={geist_sans.style}>
          {result.title}
        </div>

        {/* Messages */}
        <ScrollArea className="h-[calc(100vh-3.5rem)] backdrop-blur-xl bg-transparent px-6">
          <div className="flex flex-col space-y-6 pt-5 p-4">
            {messages.map((msg, index) => (
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
          <div className="h-72" />
        </ScrollArea>

        {/* Input */}
        <div className="relative h-0">
          <div className="absolute bottom-0 w-full pt-3 flex flex-col justify-end h-72">
            <div className="p-4 pb-0">
              <ChatInput form={form} handleSubmit={handleSubmit} />
              <div className="h-4 w-full bg-background" />
            </div>
          </div>
        </div>
      </div>

      {/* Code Preview Panel */}
      {/* Uncomment if you want to re-enable code preview */}
      <CodeAndPreview
        status={status}
        content={
          result.messages.find((msg) => msg.id === selectedMsgId)?.message.content || ""
        }
      />
    </div>
  );
};

export default ChatPage;
