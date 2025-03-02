import { BASE_PROMPT } from '@/server/llm/prompts';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();
const userPrompt = "Our Newest Features Are Live – Explore Now"
const finalPrompt = BASE_PROMPT.replace("{userInput}", userPrompt);

export const GET = () => {
    const stream = new ReadableStream({
        start(controller) {
            client.messages.stream({
                model: 'claude-3-5-haiku-20241022',
                max_tokens: 6000,
                system: finalPrompt,
                messages: [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": userPrompt
                            }
                        ]
                    }
                ]
            }).on('text', (text) => {
                controller.enqueue(text);
            }).on('end', () => {
                // Close the stream when it's done
                controller.close();
            }).on('error', (err) => {
                controller.error(err);
            });
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
        },
    });
}


