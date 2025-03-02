"use client";

import { geist_sans, space_grotesk } from "@/lib/fonts";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Paperclip } from "lucide-react";
import { useServerAction } from "zsa-react";
import { createNewPromptAction } from "../action";

const FormSchema = z.object({
  userPrompt: z.string(),
});

export default function Prompter() {
  const { execute, isPending } = useServerAction(createNewPromptAction);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("kiya oh");
    execute(data.userPrompt);
  }

  console.log(form.watch("userPrompt"));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[60%] mx-auto rounded-2xl relative bg-white/[0.07] transition-all scale-110"
      >
        <div className="absolute inset-x-0 h-[1px] mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        <FormField
          control={form.control}
          name="userPrompt"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  style={geist_sans.style}
                  className="z-[10000] font-base w-full h-24 pl-4 pt-4 pr-16 focus:outline-none resize-none bg-transparent text-sm focus-visible:ring-0 shadow-none border-none"
                  spellCheck={false}
                  placeholder="Describe the email you want to create... (e.g., promotional email with a product grid)."
                  translate="no"
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
                form.watch("userPrompt") === undefined ||
                isPending
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
}
