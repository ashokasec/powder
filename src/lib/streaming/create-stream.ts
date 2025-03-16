import { createNewMessage } from "@/database/data-access/chat";
import { generateResponseOnUserQuery } from "../llm/tools";
import { parse } from "partial-json"
import { AssitantResponseSchema } from "../types/chat";
import { ZodError } from "zod";

export function createAIStream(prompt: string, chatId: string) {
    let responseText = ""
    return new ReadableStream({
        start(controller) {
            const stream = generateResponseOnUserQuery({ prompt })
            stream.on('text', (text) => {
                responseText += text;
                controller.enqueue(text);
            });

            stream.on("end", async () => {
                controller.close();
                const LLMResponse = parse(responseText);

                try {
                    const validatedAssistantContent = AssitantResponseSchema.parse(LLMResponse);

                    if (validatedAssistantContent.hasCode === true) {
                        await createNewMessage({
                            role: "assistant",
                            content: JSON.stringify(validatedAssistantContent),
                            chatId,
                        });
                        return;
                    }

                    await createNewMessage({
                        role: "assistant",
                        content: JSON.stringify({
                            hasCode: false,
                            text: validatedAssistantContent.text,
                        }),
                        chatId,
                    });
                } catch (err: unknown) {
                    if (err instanceof ZodError) {
                        console.error("Validation failed:", err.errors);
                    } else {
                        console.error("An unexpected error occurred:", err);
                    }
                }
            });

            stream.on('error', (err) => {
                controller.error(err);
            });
        }
    });
}

export function createManualStream({ data, chunkSize = 100 }: { data: string; chunkSize?: number }) {
    return new ReadableStream({
        start(controller) {
            let position = 0;

            const pushNextChunk = () => {
                if (position < data.length) {
                    controller.enqueue(data.slice(position, position + chunkSize));
                    position += chunkSize;

                    setTimeout(pushNextChunk, 100);
                } else {
                    controller.close();
                }
            };

            pushNextChunk();
        },
    });
}