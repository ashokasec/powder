import { geist_sans } from "@/lib/misc/fonts";
import { Message } from "ai";
import React from "react";
import { PowderChatBubble } from "./render-chat-bubble";

const UserChatBubble = ({ text }: { text: string }) => {
  return (
    <div className="flex">
      <div className="aspect-square size-7 bg-blue-600 text-white text-sm leading-none rounded-full grid place-items-center select-none mr-3">
        S
      </div>
      <div className="text-base leading-relaxed space-y-2 text-gray-300 rounded-br-none max-w-[95%]">
        <p
          style={geist_sans.style}
          className="text-gray-300 tracking-wide text-[15px] mt-0.5"
        >
          {text}
        </p>
      </div>
    </div>
  );
};

const MessageList = ({ messages }: { messages: Message[] }) => {
  if (!messages || messages.length === 0) {
    return <></>;
  }
  return (
    <div className="flex flex-col space-y-6 p-4">
      {messages.map((msg, index) => (
        <div key={index}>
          {msg.role === "user" && <UserChatBubble key={index} text={msg.content} />}
          {msg.role === "assistant" && (
            <PowderChatBubble key={index} content={msg.content} />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
