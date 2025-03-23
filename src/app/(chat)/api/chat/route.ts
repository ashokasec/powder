import { createChatDB, createMessageDB, getChatByIdDB } from "@/lib/db/data-access/chat";
import { createDataStreamResponse, Message, smoothStream, streamText } from "ai";
import { aiProvider } from "@/lib/ai/providers";
import { EMAIL_GENERATION_PROMPT } from "@/lib/ai/prompts";
import { generateTitleFromUserPromptAIAccess } from "@/lib/ai/ai-access";

export async function POST(req: Request) {

    const { message, chatId }: { message: Message; chatId: string } = await req.json()

    const chat = getChatByIdDB({ chatId })

    function getUserMessage() {
        if (message.role === "user") {
            return message.content
        }
    }

    const userMessage = getUserMessage()

    if (!userMessage) {
        return Response.json({ error: "Invalid User Message" })
    }

    if (!chat) {
        const title = await generateTitleFromUserPromptAIAccess({ prompt: message.content })
        await createChatDB(title)
    }

    await createMessageDB({ message: message, chatId })

    return createDataStreamResponse({
        execute: (dataStream) => {
            const result = streamText({
                model: aiProvider.languageModel("email-generation"),
                system: EMAIL_GENERATION_PROMPT,
                messages: [{
                    role: "user",
                    content: userMessage
                }],
                experimental_transform: smoothStream({ chunking: 'word' }),
                onFinish: async ({ response }) => {
                    console.log("response done")
                    console.log(response)
                    await createMessageDB({ chatId, message: response.messages[response.messages.length - 1] as Message })
                },
            });
            result.consumeStream();
            result.mergeIntoDataStream(dataStream, {
                sendReasoning: true,
            });
        },
        onError: (error) => {
            console.log(error)
            return 'Oops, an error occured!';
        },
    });
}