import { createChatDB, createMessageDB, getChatByIdDB } from "@/lib/db/data-access/chat";
import { appendResponseMessages, createDataStreamResponse, Message, smoothStream, streamText } from "ai";
import { aiProvider } from "@/lib/ai/providers";
import { EMAIL_GENERATION_PROMPT } from "@/lib/ai/prompts";
import { generateTitleFromUserPromptAIAccess } from "@/lib/ai/ai-access";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { authenticatedRateLimit } from "@/lib/security/rate-limit";

export async function POST(req: Request) {

    const session = await auth()
    if (!session) {
        return Response.json({ error: "User not authenticated" }, { status: 403 })
    }

    const [allowRequest, rateLimitError] = await authenticatedRateLimit(req, session.user.image);

    if (!allowRequest) {
        return Response.json({ error: rateLimitError }, { status: 429 })
    }


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

    const lastUserMessage = previousMessages
        .filter((msg) => msg.role === "user")
        .at(-1);

    const isDuplicate = lastUserMessage?.content === message.content;

    if (!isDuplicate) {
        await createMessageDB({ message, chatId });
    } else {
        console.log("Duplicate message detected, skipping DB save.");
    }

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