import AppSidebar from "@/components/application-layout/sidebar";
import React from "react";
import { getChatAction } from "@/lib/actions/chat";
import { notFound } from "next/navigation";
import Provider from "@/components/chat-layout-provider";
import ChatPage from "@/components/chat-page";

const page = async ({ params }: { params: Promise<{ chatId: string }> }) => {
  const { chatId } = await params;
  const [result] = await getChatAction({ chatId });
  if (!result) return notFound();

  return (
    <Provider>
      <AppSidebar />
      <ChatPage result={result} chatId={chatId} />
    </Provider>
  );
};

export default page;
