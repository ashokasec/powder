import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import { createOpenAI, openai } from '@ai-sdk/openai';
import { experimental_createProviderRegistry as createProviderRegistry } from 'ai';
import { env } from '@/lib/misc/env';
import { customProvider } from 'ai';

export const availableModels = {
    openai: "openai",
    anthropic: "anthropic"
}

export const aiRegistery = createProviderRegistry({
    anthropic,
    google,
    openai: createOpenAI({
        apiKey: env.OPENAI_API_KEY,
    }),
});

export const aiProvider = customProvider({
    languageModels: {
        'title-model': openai("gpt-4o-mini"),
        'email-generation': google("gemini-2.5-pro-exp-03-25"),
        // 'email-generation': anthropic("claude-3-haiku-20240307")
    }
})