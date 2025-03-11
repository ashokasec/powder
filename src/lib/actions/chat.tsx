"use server";

import {
  createNewChat,
  getAllChats,
  getChatByChatId,
} from "@/database/data-access/chat";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createServerAction } from "zsa";
import { chatIdSchema } from "../types/chat";

export const createNewChatAction = createServerAction()
  .input(z.string())
  .handler(async ({ input }) => {
    // const title = await generateTitleFromPromptLLM(input);
    const chatId = await createNewChat({
      title: "Yehi title hai",
      prompt: input,
    });
    console.log(chatId);
    redirect("/chat/" + chatId);
  });

export const getAllChatsAction = createServerAction().handler(async () => {
  return getAllChats();
});

export const getChatAction = createServerAction()
  .input(
    z.object({
      chatId: chatIdSchema,
    })
  )
  .handler(async ({ input }) => {
    return getChatByChatId(input.chatId);
  });
