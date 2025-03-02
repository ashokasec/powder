"use client";

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/application-layout/sidebar";
import { LLMResponseType, SAMPLE_CONV } from "@/types/chat";
import ChatNavbar from "./_components/chat-navbar";
import { parse } from "partial-json";
import { ConversationPlayground } from "./_components/conversation-playground";
import CodeAndPreview from "./_components/code-and-preview/code-and-preview-tabs";

const Page = () => {
  const [llmResponse, setLlmResponse] = useState<LLMResponseType>({});
  const [isLLMResponseDone, setIsLLMResponseDone] = useState(false);

  const getData = async () => {
    const response = await fetch("/api/anthropic/stream-cached");

    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder(); // To decode the chunks into text
      let done = false;
      let text = "";

      while (!done) {
        // Read each chunk of data from the stream
        const { value, done: isDone } = await reader.read();
        done = isDone;

        text += decoder.decode(value, { stream: true });

        setLlmResponse(parse(text));
      }

      setIsLLMResponseDone(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* <div className="absolute h-screen w-full -z-10">
        <figure className="h-full opacity-30">
          <img src="/images/background.png" className="h-full" />
        </figure>
      </div> */}
      <AppSidebar />
      <div className="w-full grid grid-cols-[1fr_1.15fr] divide-x">
        <ChatNavbar title="Jo bhi kaho acha hua" />
        <ConversationPlayground conversation={SAMPLE_CONV} />
        <div className="bg-transparent h-[calc(100vh-3.5rem)] w-full backdrop-blur-xl">
          <CodeAndPreview
            response={llmResponse}
            isLLMResponseDone={isLLMResponseDone}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
