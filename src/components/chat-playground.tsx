"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatType } from "@/lib/types/chat";
import ChatInput from "@/components/chat-input";
import { PowderChatBubble, UserChatBubble } from "./render-chat-bubble";
import { geist_sans } from "@/lib/misc/fonts";

export const ChatPlayground = ({
  chats,
  title,
}: {
  chats: ChatType;
  title: string;
}) => {
  return (
    <div className="h-screen flex flex-col justify-between bg-[#070808]/20 !border-l-0">
      <div
        className="h-14 border-b px-6 flex items-center tracking-wide"
        style={geist_sans.style}
      >
        {title}
      </div>
      <ScrollArea className="h-[calc(100vh-3.5rem)] backdrop-blur-xl bg-transparent border-l-0 flex flex-col px-6 pt-6 pb-80">
        <div className="flex flex-col space-y-4">
          {chats.map((chat, item) => {
            if (chat.from === "user") {
              return <UserChatBubble key={item} text={chat.text} />;
            } else if (chat.from === "powder") {
              return (
                <PowderChatBubble
                  key={item}
                  response={chat}
                  isGeneratingCode={false}
                />
              );
            }
          })}
        </div>
      </ScrollArea>
      <div className="relative h-0">
        <div className="absolute bottom-0 w-full pt-3 flex flex-col justify-end h-72">
          <div className="border-t p-4">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
};
