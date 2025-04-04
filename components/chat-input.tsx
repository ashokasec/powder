"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ArrowUp, Square } from "lucide-react";
import { AutosizeTextarea } from "./ui/resizable-textarea";
import { geist_sans, space_grotesk } from "@/lib/misc/fonts";
import { ChatRequestOptions } from "ai";
import { AIResponseStatus } from "@/lib/types/chat";
import { UseFormReturn } from "react-hook-form";

const ChatInput = ({
  form,
  handleSubmit,
  status = "streaming",
  stop,
}: {
  form: UseFormReturn<{
    userPrompt: string;
  }>;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  status: AIResponseStatus;
  stop: () => void;
}) => {
  return (
    <Form {...form}>
      <div>
        <div className="bg-gradient-to-t from-background via-background/50">
          &nbsp;
        </div>
        <form
          onSubmit={() => {
            handleSubmit();
            form.setValue("userPrompt", "");
          }}  
          className="rounded-2xl relative bg-[#2f2f2f] placeholder:text-muted-foreground transition-all"
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
                    className="z-[10000] text-[15px] w-full placeholder:text-gray-400 text-white !min-h-28 px-4 pt-4 focus:outline-none resize-none bg-transparent focus-visible:ring-0 shadow-none border-none"
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
              {status === "submitted" || status === "streaming" ? (
                <Button
                  onClick={() => stop()}
                  className="aspect-square size-8 disabled:bg-white/15 rounded-full border-blue-200 bg-blue-600 text-white hover:bg-blue-700"
                  style={space_grotesk.style}
                >
                  <Square fill="white" />
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
      </div>
    </Form>
  );
};

export default ChatInput;
