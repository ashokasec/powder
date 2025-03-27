import { z } from "zod";

export const chatIdSchema = z.string()
  .regex(/^[a-zA-Z0-9_-]+$/, { message: "Invalid Chat Id" })

export type AIResponseStatus = "streaming" | "ready" | "submitted" | "error"

export const AssitantResponseSchema = z.object({
  hasCode: z.boolean(),
  text: z.string(),
  emailTemplateName: z.string(),
  code: z.string(),
  codeBreakdown: z.array(z.string()),
  summary: z.string(),
})

export type AssistantResponseType = z.infer<typeof AssitantResponseSchema>;