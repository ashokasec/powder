import { generateResponseOnUserQuery } from "../llm/tools";

export function createAIStream(prompt: string) {
    return new ReadableStream({
        start(controller) {
            const stream = generateResponseOnUserQuery({ prompt })
            stream.on('text', (text) => {
                controller.enqueue(text);
            });

            stream.on('end', () => {
                controller.close();
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