import { z } from "zod"

export const promptSchema = z.object({
    promptId: z.string(),
    prompt: z.string(),
})

export type PromptType = z.infer<typeof promptSchema>