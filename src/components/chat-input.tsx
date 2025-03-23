"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ArrowUp, Paperclip } from "lucide-react";
import { AutosizeTextarea } from "./ui/resizable-textarea";
import { Message } from "ai/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { geist_sans, space_grotesk } from "@/lib/misc/fonts";
import { ChatRequestOptions } from "ai";

const FormSchema = z.object({
  userPrompt: z.string(),
});

const ChatInput = ({
  setInput,
  handleSubmit,
}: {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    setInput(form.watch("userPrompt"));
  }, [form.watch("userPrompt")]);

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

export default ChatInput;
