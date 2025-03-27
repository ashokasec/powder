import { createChatDB, createMessageDB, getChatByIdDB } from "@/lib/db/data-access/chat";
import { appendResponseMessages, createDataStreamResponse, Message, smoothStream, streamText } from "ai";
import { aiProvider } from "@/lib/ai/providers";
import { EMAIL_GENERATION_PROMPT } from "@/lib/ai/prompts";
import { generateTitleFromUserPromptAIAccess } from "@/lib/ai/ai-access";
import { redirect } from "next/navigation";

export async function POST(req: Request) {

    const { message, chatId }: { message: Message; chatId: string } = await req.json()

    const chat = await getChatByIdDB({ chatId })

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
        const savedChatId = await createChatDB({ title, userMessage: message })
        return Response.json({ success: true, chatId: savedChatId })
    }

    const previousMessages = chat?.messages.map((message) => message.message)

    if (!previousMessages) {
        return redirect("/")
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
                    const newMessage = appendResponseMessages({
                        messages: previousMessages,
                        responseMessages: response.messages,
                    }).at(-1)!;
                    await createMessageDB({ chatId, message: newMessage })
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