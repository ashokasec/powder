import { z } from "zod";
import { AssistantResponseSample } from "./_sample";

export const chatIdSchema = z.string()
  .regex(/^[a-zA-Z0-9_-]+$/, { message: "Invalid Chat Id" })

export const AssitantResponseSchema = z.object({
  hasCode: z.boolean(),
  text: z.string(),
  emailTemplateName: z.string(),
  code: z.string(),
  codeBreakdown: z.array(z.string()),
  summary: z.string(),
})

export type AssistantResponseType = z.infer<typeof AssitantResponseSchema>;

export type ChatType = {
  role: "user" | "assistant",
  content: string
};

export const SAMPLE_CONV: ChatType[] = [
  { role: "user", content: "Hey, can you generate a welcome email template for my users?" },
  {
    role: "assistant",
    content: JSON.stringify(AssistantResponseSample)
  },
];
