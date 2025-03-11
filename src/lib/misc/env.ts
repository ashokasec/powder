import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        GEMINI_API_KEY: z.string(),
        MONGODB_URI: z.string(),
        SOLUS_API_KEY: z.string(),
        SOLUS_ENGINE_SERVER: z.string()
    },
    runtimeEnv: {
        GEMINI_API_KEY: process.env.GEMINI_API_KEY,
        MONGODB_URI: process.env.MONGODB_URI,
        SOLUS_API_KEY: process.env.SOLUS_API_KEY,
        SOLUS_ENGINE_SERVER: process.env.SOLUS_ENGINE_SERVER,
    },
});