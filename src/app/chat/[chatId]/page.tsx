import AppSidebar from "@/components/application-layout/sidebar";
import React from "react";
import { getChatAction } from "@/lib/actions/chat";
import { notFound } from "next/navigation";
import Provider from "@/components/chat-layout-provider";
import { ChatPlayground } from "@/components/chat-playground";
import CodeAndPreview from "@/components/code-and-preview-tab-group";

const page = async ({ params }: { params: Promise<{ chatId: string }> }) => {
  const { chatId } = await params;
  const [result] = await getChatAction({ chatId });
  if (!result) return notFound();

  return (
    <Provider>
      <AppSidebar />
      <div className="w-full grid grid-cols-[1fr_1.15fr] divide-x">
        {result.messages && result.messages.length > 0 && (
          <>
            <ChatPlayground
              chats={result.messages}
              title="Bio-Inspired Computing Systems"
            />
            <CodeAndPreview
              jsx={JSON.stringify(result.messages)}
              isLLMResponseDone={false}
            />
          </>
        )}
      </div>
    </Provider>
  );
};

export default page;
