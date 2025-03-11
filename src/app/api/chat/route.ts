import { NextRequest } from "next/server";
import { streamResponse } from '@/lib/streaming/stream-response';
import { createAIStream, createManualStream } from "@/lib/streaming/create-stream";
import { getSearchParam } from "@/lib/helpers/request-parser";
import { SAMPLE_RESPONSE } from "@/lib/data/sample-ai-response";

export const POST = async (req: NextRequest) => {
    const sendCached = getSearchParam({ param: "cached", req })

    if (sendCached === "false") {
        const { prompt } = await req.json()
        const stream = createAIStream(prompt)
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