"use client";

import { arOneSans, geist_sans, inter, space_grotesk } from "@/lib/misc/fonts";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIdGenerator } from "ai";
import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { AutosizeTextarea } from "./ui/resizable-textarea";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";
import { Session } from "next-auth";
import { Github } from "@/lib/misc/logo";
import { signIn } from "next-auth/react";

const prompts = [
  {
    id: 1,
    prompt:
      "Generate a monthly newsletter email for a SaaS product update, featuring new features, user testimonials, and a call-to-action to try the latest version.",
  },
  {
    id: 2,
    prompt:
      "Create an announcement email for a new AI-powered analytics tool, highlighting key features, benefits, and an early access sign-up link.",
  },
  {
    id: 3,
    prompt:
      "Write an invitation email for a cybersecurity webinar, detailing the topic, guest speakers, date, and a registration link.",
  },
  {
    id: 4,
    prompt:
      "Generate a promotional email offering a 20% discount on a digital marketing course for a limited time, with a strong CTA to purchase.",
  },
  {
    id: 5,
    prompt:
      "Write a persuasive cold email introducing a B2B lead generation tool to potential customers, emphasizing ROI and ease of use.",
  },
  {
    id: 6,
    prompt:
      "Generate an email announcing a new API for developers, including documentation links, key capabilities, and a quick-start guide.",
  },
  {
    id: 7,
    prompt:
      "Write an email for a Capture The Flag cybersecurity event, with details about prizes, rules, and how to sign up.",
  },
  {
    id: 8,
    prompt:
      "Create a technical email sharing the latest open-source contributions, bug fixes, and roadmap updates for a developer community.",
  },
  {
    id: 9,
    prompt:
      "Draft an email inviting select developers to beta test a new AI-based SQL query generator, ArceeQL.AI, with feedback instructions.",
  },
  {
    id: 10,
    prompt:
      "Generate a release notes email highlighting performance improvements, security patches, and resolved issues for a web application.",
  },
  {
    id: 11,
    prompt:
      "Create a welcome email for a new user signing up for a design SaaS, guiding them through first steps and showcasing key features.",
  },
  {
    id: 12,
    prompt:
      "Write a follow-up email reminding a customer about the items left in their cart, with a personalized discount to encourage checkout.",
  },
  {
    id: 13,
    prompt:
      "Generate an email for inactive users of a productivity app, showcasing new features and offering an incentive to return.",
  },
  {
    id: 14,
    prompt:
      "Draft an email reminding users their subscription is about to expire, with an exclusive renewal discount.",
  },
  {
    id: 15,
    prompt:
      "Write a congratulatory email for users who completed 100 tasks in a task management app, offering a reward or badge.",
  },
];

const NewChatInput = ({ session }: { session: Session | null }) => {
  const FormSchema = z.object({
    userPrompt: z.string(),
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { setInput, handleSubmit, status } = useChat({
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

  useEffect(() => {
    const subscription = form.watch((value) => {
      setInput(value.userPrompt || "");
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <>
      <div className="h-[50vh] flex flex-col items-center justify-end">
        <span className="text-[10px] mb-10 tracking-widest opacity-50 uppercase">powder <span className="font-bold">.</span> ashokasec <span className="font-bold">.</span> com</span>
        <h1
          className="text-3xl font-semibold leading-tight mb-12"
          style={arOneSans.style}
        >
          Your Emails Deserve a Glow-Up
        </h1>
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl w-full mx-auto rounded-2xl relative bg-[#2f2f2f] placeholder:text-muted-foreground transition-all shadow-xl z-50 shadow-[#141414]"
          >
            <div className="absolute inset-x-0 h-[1px] mx-auto shadow-2xl bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            <FormField
              control={form.control}
              name="userPrompt"
              disabled={status === "submitted"}
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
                {!session ? (
                  <span className="flex items-center space-x-2 text-sm">
                    <span className="opacity-15 tracking-wide">
                      Sign In with
                    </span>
                    <Button
                      onClick={() => signIn()}
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
                      form.watch("userPrompt") === "" ||
                      form.watch("userPrompt") === undefined ||
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
        </Form>
      </div>
      <div className="max-w-3xl mx-auto">
        <div
          className="space-y-5 max-w-2xl max-h-64 mx-auto overflow-y-auto min-h-[50vh] hide-scrollbar text-sm leading-relaxed py-14 text-[#b0b0b0]"
          style={inter.style}
        >
          {prompts.map((item) => (
            <div
              key={item.id}
              onClick={() => form.setValue("userPrompt", item.prompt)}
              className="p-4 hover:text-gray-50 rounded-lg shadow-sm hover:bg-white/[0.015] cursor-pointer transition text-center border border-transparent hover:border-border"
            >
              {item.prompt}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewChatInput;
