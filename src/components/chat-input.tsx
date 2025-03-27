"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ArrowUp, Paperclip } from "lucide-react";
import { AutosizeTextarea } from "./ui/resizable-textarea";
import { useChat } from "ai/react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { geist_sans, space_grotesk } from "@/lib/misc/fonts";
import { ChatRequestOptions, createIdGenerator } from "ai";
import { useRouter } from "next/navigation";

const ChatInput = ({
  form,
  handleSubmit,
}: {
  form: UseFormReturn<
    {
      userPrompt: string;
    }
  >;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
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
          </div>
        </div>
      </form>
    </Form>
  );
};

export const NewChatInput = () => {
  const FormSchema = z.object({
    userPrompt: z.string(),
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { setInput, handleSubmit } = useChat({
    experimental_prepareRequestBody: ({ messages }) => {
      const usersLastMessage = messages[messages.length - 1];
      return {
        message: usersLastMessage,
      };
    },
    onFinish(message, options) {
      console.log("yo yo", message, options);
    },
    async onResponse(response) {
      const { chatId } = await response.json();
      router.push(`/chat/${chatId}`);
    },
    generateId: createIdGenerator({ prefix: "user", size: 16 }),
  });

  useEffect(() => {
    setInput(form.watch("userPrompt"));
  }, [form.watch("userPrompt")]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl relative bg-[#1e1e1e] placeholder:text-muted-foreground transition-all max-w-3xl w-full mx-auto"
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
                  className="z-[10000] font-base w-full h-24 px-4 pt-4 focus:outline-none resize-none bg-transparent text-sm focus-visible:ring-0 shadow-none border-none"
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
              className="aspect-square size-9 bg-white/5 hover:bg-white/15 !text-white rounded-xl"
              style={space_grotesk.style}
            >
              <Paperclip />
            </Button>
            <Button
              type="submit"
              disabled={
                form.watch("userPrompt") === "" ||
                form.watch("userPrompt") === undefined
              }
              className="aspect-square size-9 disabled:bg-white/15 rounded-xl border-blue-200 bg-blue-600 text-white hover:bg-blue-700"
              style={space_grotesk.style}
            >
              <ArrowUp />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ChatInput;
