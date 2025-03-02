"use server";

import { insertPromptUseCase } from "@/server/use-case/prompt";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createServerAction } from "zsa";

export const createNewPromptAction = createServerAction()
  .input(z.string())
  .handler(async ({ input }) => {
    const promptId = await insertPromptUseCase(input);
    redirect(`/~/${promptId}`);
  });
