import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        GEMINI_API_KEY: z.string(),
        MONGODB_URI: z.string(),
        OPENAI_API_KEY: z.string()
    },
    runtimeEnv: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        GEMINI_API_KEY: process.env.GEMINI_API_KEY,
        MONGODB_URI: process.env.MONGODB_URI,
    },
});