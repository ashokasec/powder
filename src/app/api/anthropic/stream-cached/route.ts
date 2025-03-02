import { SAMPLE_JSON_RES } from "@/app/~/[promptId]/sample-data";

export const GET = () => {
    const predefinedData = JSON.stringify(SAMPLE_JSON_RES)

    const stream = new ReadableStream({
        start(controller) {
            let position = 0;
            const chunkSize = 30000;  // Define how large each chunk should be

            // Function to simulate streaming by pushing chunks to the stream
            const pushNextChunk = () => {
                if (position < predefinedData.length) {
                    // Push a chunk of data to the stream
                    controller.enqueue(predefinedData.slice(position, position + chunkSize));
                    position += chunkSize;

                    // Continue pushing data after a small delay (simulate real-time data streaming)
                    setTimeout(pushNextChunk, 100);  // Delay to simulate data chunks being streamed
                } else {
                    controller.close();  // Close the stream when all data has been sent
                }
            };

            // Start pushing chunks
            pushNextChunk();
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",  // Stream as event-stream
            "Cache-Control": "no-cache, no-transform",  // Prevent caching
            "Connection": "keep-alive",  // Keep the connection alive for streaming
        },
    });
};