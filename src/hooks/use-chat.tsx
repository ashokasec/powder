import { useRef, useState } from "react";
import { parse } from "partial-json";
import { AssistantResponseType, ChatType } from "@/lib/types/chat";

export function useChat() {
  const [input, setInput] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<ChatType[]>([]);
  const [response, setResponse] = useState<AssistantResponseType | undefined>(
    undefined
  );
  const [isResponseDone, setIsResponseDone] = useState<boolean | undefined>(
    undefined
  );
  const [isGeneratingResponse, setIsGeneratingResponse] = useState<
    boolean | undefined
  >(undefined);

  const abortControllerRef = useRef<AbortController | null>(null);
  const readerRef = useRef<ReadableStreamDefaultReader | null>(null);

  const askPowder = async ({
    userInput,
    chatId,
  }: {
    userInput: string;
    chatId: string;
  }) => {
    setIsGeneratingResponse(true);
    setIsResponseDone(false);

    try {
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const response = await fetch("/api/chat?cached=true", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput, chatId }),
        signal: controller.signal,
      });

      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let text = "";

        while (!done) {
          const { value, done: isDone } = await reader.read();
          done = isDone;
          text += decoder.decode(value, { stream: true });
          setResponse(parse(text));
        }
        setIsGeneratingResponse(false);
        setIsResponseDone(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Request canceled:", error.message);
        setIsGeneratingResponse(undefined);
        setResponse(undefined);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsGeneratingResponse(false);
      setIsResponseDone(true);
      abortControllerRef.current = null;
      readerRef.current = null;
    }
  };

  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (readerRef.current) {
      readerRef.current.cancel();
    }
    setIsGeneratingResponse(false);
    setIsResponseDone(true);
  };

  return {
    input,
    setInput,
    messages,
    setMessages,
    response,
    askPowder,
    isResponseDone,
    cancelRequest,
    isGeneratingResponse,
  };
}
