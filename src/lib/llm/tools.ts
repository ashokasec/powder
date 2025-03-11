import { anthropic, FAST_COMPACT_MODEL } from "@/lib/llm/models";
import { GENERATE_TITLE_PROMPT } from "./prompts";
import { EMAIL_GENERATION_PROMPT } from "@/lib/llm/prompts";


export async function generateTitleFromPromptLLM(prompt: string) {

    // example.
    // input: Generate a title for a React Email template announcing a Black Friday sale.
    // output: Black Friday Sales Email Template

    const response = await anthropic.messages.create({
        model: FAST_COMPACT_MODEL,
        max_tokens: 20,
        system: GENERATE_TITLE_PROMPT,
        messages: [{ role: "user", content: prompt }]
    })

    return response.content
}

export function generateResponseOnUserQuery({ prompt }: { prompt: string }) {
    return anthropic.messages.stream({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 8000,
        system: EMAIL_GENERATION_PROMPT,
        messages: [
            {
                "role": "user",
                "content": [{ "type": "text", "text": prompt }]
            }
        ]
    });
}