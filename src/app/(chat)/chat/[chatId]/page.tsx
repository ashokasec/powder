import AppSidebar from "@/components/application-layout/sidebar";
import React from "react";
import { notFound } from "next/navigation";
import Provider from "@/components/chat-layout-provider";
import ChatPage from "@/components/chat-page";
import { MOCK_CHAT_ID } from "@/lib/constants/app";
import { getChatByIdDB } from "@/lib/db/data-access/chat";

const page = async ({ params }: { params: Promise<{ chatId: string }> }) => {
  const { chatId } = await params;
  const result = await getChatByIdDB({ chatId: MOCK_CHAT_ID });
  if (!result) return notFound();

  return (
    <Provider>
      <AppSidebar />
      <ChatPage result={result} chatId={chatId} />
    </Provider>
  );
};

export default page;
