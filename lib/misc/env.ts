import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        ADMIN_EMAIL: z.string(),
        MONGODB_URI: z.string(),
        OPENAI_API_KEY: z.string()
    },
    runtimeEnv: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        MONGODB_URI: process.env.MONGODB_URI,
    },
});