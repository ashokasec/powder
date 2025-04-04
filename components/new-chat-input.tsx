"use client";

import { prompts } from "@/lib/constants/sample-prompts";
import { arOneSans, geist_sans, inter, space_grotesk } from "@/lib/misc/fonts";
import { createIdGenerator } from "ai";
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import React from "react";
import { AutosizeTextarea } from "./ui/resizable-textarea";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";
import { Session } from "next-auth";
import { Github } from "@/lib/misc/logo";
import { signIn } from "next-auth/react";

export function NewChatInput({ session }: { session: Session | null }) {
  const router = useRouter();

  const { setInput, handleSubmit, input, handleInputChange, status } = useChat({
    experimental_prepareRequestBody: ({ messages }) => {
      const usersLastMessage = messages[messages.length - 1];
      return {
        message: usersLastMessage,
      };
    },
    async onResponse(response) {
      const { chatId } = await response.json();
      router.push(`/chat/${chatId}`);
    },
    generateId: createIdGenerator({ prefix: "user", size: 16 }),
  });

  return (
    <>
      <div className="h-[50vh] flex flex-col items-center justify-end">
        <span className="text-[10px] mb-10 tracking-widest opacity-50 uppercase">
          powder <span className="font-bold">.</span> ashokasec{" "}
          <span className="font-bold">.</span> com
        </span>
        <h1
          className="text-3xl font-semibold leading-tight mb-12"
          style={arOneSans.style}
        >
          Your Emails Deserve a Glow-Up
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl w-full mx-auto rounded-2xl relative bg-[#2f2f2f] placeholder:text-muted-foreground transition-all shadow-xl z-50 shadow-background"
        >
          <div className="absolute inset-x-0 h-[1px] mx-auto shadow-2xl bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          <AutosizeTextarea
            placeholder="Describe the email you want to create... (e.g., promotional email with a product grid)."
            maxHeight={150}
            autoFocus
            defaultValue={input}
            style={geist_sans.style}
            className="z-[10000] text-[15px] w-full placeholder:text-gray-400 text-white !min-h-28 px-4 pt-4 focus:outline-none resize-none bg-transparent focus-visible:ring-0 shadow-none border-none"
            translate="no"
            spellCheck={false}
            onChange={(event) => handleInputChange(event)}
          />
          <div className="p-2 flex justify-between items-center">
            <div></div>
            <div className="flex space-x-1.5">
              {!session ? (
                <span className="flex items-center space-x-2 text-sm">
                  <span className="opacity-15 tracking-wide">Sign In with</span>
                  <Button
                    onClick={() => signIn("github")}
                    className="aspect-square p-0 overflow-hidden disabled:opacity-100 size-9 rounded-xl bg-white/10 text-white hover:bg-white/5 border border-gray-500/30"
                    style={space_grotesk.style}
                  >
                    <span className="scale-[1.2]">
                      <Github />
                    </span>
                  </Button>
                </span>
              ) : (
                <Button
                  type="submit"
                  disabled={
                    input === "" ||
                    input === undefined ||
                    status === "submitted"
                  }
                  className="aspect-square p-0 overflow-hidden disabled:opacity-100 size-9 disabled:bg-white/15 rounded-xl border-blue-200 bg-blue-600 text-white hover:bg-blue-700"
                  style={space_grotesk.style}
                >
                  {status === "submitted" ? (
                    <img
                      src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExand1aDVlbXhpbXlwMGQ5MGVmNGRiaGZkeTg3YXZucXplYnIwdDI1aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BnatsfhXITpQ4GQ/giphy.gif"
                      className="mix-blend-plus-lighter"
                      alt=""
                    />
                  ) : (
                    <ArrowUp />
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="max-w-3xl mx-auto">
        <div
          className="space-y-5 max-w-2xl max-h-64 mx-auto overflow-y-auto min-h-[50vh] hide-scrollbar text-sm leading-relaxed py-14 text-[#b0b0b0]"
          style={inter.style}
        >
          {prompts.map((item) => (
            <div
              key={item.id}
              onClick={() => setInput(item.prompt)}
              className="p-4 hover:text-gray-50 rounded-lg shadow-sm hover:bg-white/[0.015] cursor-pointer transition text-center border border-transparent hover:border-border"
            >
              {item.prompt}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
