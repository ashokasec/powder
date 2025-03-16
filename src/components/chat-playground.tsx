"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatType } from "@/lib/types/chat";
import { PowderChatBubble, UserChatBubble } from "./render-chat-bubble";

import { geist_sans, space_grotesk } from "@/lib/misc/fonts";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ArrowUp, Paperclip, X } from "lucide-react";
import { AutosizeTextarea } from "./ui/resizable-textarea";
import { useChat } from "@/hooks/use-chat";

const FormSchema = z.object({
  userPrompt: z.string(),
});

export const ChatPlayground = ({
  chats,
  title,
  chatId,
}: {
  chats: ChatType[];
  title: string;
  chatId: string;
}) => {
  const { response, isGeneratingResponse, askPowder } =
    useChat();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await askPowder({ userInput: data.userPrompt, chatId });
  }

  useEffect(() => {
    if (chats.length < 1) {
      return;
    }
    const lastMessage = chats[chats.length - 1];
    if (lastMessage.role === "user") {
      askPowder({ userInput: lastMessage.content, chatId });
    }
  }, [chats]);

  return (
    <div className="h-screen flex flex-col justify-between bg-[#070808]/20 !border-l-0">
      <div
        className="h-14 border-b px-6 flex items-center tracking-wide text-[15px]"
        style={geist_sans.style}
      >
        {title}
      </div>
      <ScrollArea className="h-[calc(100vh-3.5rem)] backdrop-blur-xl bg-transparent border-l-0 flex flex-col px-6">
        <div className="flex flex-col space-y-4 pt-5">
          {chats.map((chat, item) => {
            if (chat.role === "user") {
              return <UserChatBubble key={item} text={chat.content} />;
            } else if (chat.role === "assistant") {
              return (
                <PowderChatBubble
                  key={item}
                  response={JSON.parse(chat.content)}
                />
              );
            }
          })}
          {response ? (
            <PowderChatBubble response={response} />
          ) : (
            "No response yet"
          )}
        </div>
        <div className="h-72"></div>
      </ScrollArea>
      <div className="relative h-0">
        <div className="absolute bottom-0 w-full pt-3 flex flex-col justify-end h-72">
          <div className="p-4 pb-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-2xl relative bg-[#1e1e1e] placeholder:text-muted-foreground transition-all"
              >
                <div className="absolute inset-x-0 h-[1px] mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                <FormField
                  control={form.control}
                  name="userPrompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AutosizeTextarea
                          placeholder="Describe the email you want to create... (e.g., promotional email with a product grid)."
                          maxHeight={150}
                          autoFocus
                          style={geist_sans.style}
                          className="z-[10000] font-base w-full h-24 px -4 pt-4 focus:outline-none resize-none bg-transparent text-sm focus-visible:ring-0 shadow-none border-none"
                          translate="no"
                          spellCheck={false}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="p-2 flex justify-between items-center">
                  <div></div>
                  <div className="flex space-x-1.5">
                    <Button
                      variant="ghost"
                      className="aspect-square size-8 bg-white/5 hover:bg-white/15 !text-white rounded-full"
                      style={space_grotesk.style}
                    >
                      <Paperclip />
                    </Button>
                    {isGeneratingResponse ? (
                      <Button
                        type="button"
                        className="aspect-square size-8 disabled:bg-white/15 rounded-full border-blue-200 bg-red-600/20 text-white hover:bg-red-600/50"
                        style={space_grotesk.style}
                      >
                        <X />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={
                          form.watch("userPrompt") === "" ||
                          form.watch("userPrompt") === undefined
                        }
                        className="aspect-square size-8 disabled:bg-white/15 rounded-full border-blue-200 bg-blue-600 text-white hover:bg-blue-700"
                        style={space_grotesk.style}
                      >
                        <ArrowUp />
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </Form>
            <div className="h-4 w-full bg-background"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
