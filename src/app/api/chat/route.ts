import { NextRequest } from "next/server";
import { streamResponse } from '@/lib/streaming/stream-response';
import { createAIStream, createManualStream } from "@/lib/streaming/create-stream";
import { getSearchParam } from "@/lib/helpers/request-parser";
import { SAMPLE_RESPONSE } from "@/lib/data/sample-ai-response";
import { createNewMessage } from "@/database/data-access/chat";
import { revalidatePath } from "next/cache";

export const POST = async (req: NextRequest) => {
    const sendCached = getSearchParam({ param: "cached", req })

    if (sendCached === "false") {
        const { prompt, chatId } = await req.json()
        if (!chatId) return Response.json({ error: "Invalid Chat." }, { status: 400 })
        const message = await createNewMessage({ role: "user", content: prompt, chatId })
        revalidatePath(`/chat/${chatId}`)
        if (!message) return Response.json({ error: "Invalid Chat." }, { status: 400 })
        const stream = createAIStream(message, chatId)
        return streamResponse(stream)
    }
    else {
        const predefinedData = JSON.stringify(SAMPLE_RESPONSE)
        const stream = createManualStream({ data: predefinedData, chunkSize: 100 })
        return streamResponse(stream)
    }

}

export const GET = async () => {
    const predefinedData = JSON.stringify(SAMPLE_RESPONSE)
    const stream = createManualStream({ data: predefinedData, chunkSize: 100 })
    return streamResponse(stream)
}