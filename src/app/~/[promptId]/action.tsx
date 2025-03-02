"use server";

import { renderExistingTemplate } from "@/server/internals/solus-engine";
import { generateFromPrompt } from "@/server/use-case/ai/llm-wrapper";
import { selectPromptUseCase } from "@/server/use-case/prompt";
import { promptSchema } from "@/types/prompts";
import { z } from "zod";
import { createServerAction } from "zsa";

export const generateEmailTemplateFromPromptAction = createServerAction()
  .input(
    z.object({
      prompt: promptSchema.shape.prompt,
    })
  )
  .handler(async ({ input }) => {
    return await generateFromPrompt(input.prompt);
  });

export const getPromptAction = createServerAction()
  .input(z.string())
  .handler(async ({ input }) => {
    return await selectPromptUseCase(input);
  });

export const renderExistingTemplateAction = createServerAction()
  .input(z.string())
  .handler(async ({ input }) => {
    return await renderExistingTemplate(input);
  });
