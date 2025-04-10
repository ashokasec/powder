import AppSidebar from "@/components/application-layout/sidebar";
import React from "react";
import { notFound } from "next/navigation";
import ChatPage from "@/components/chat-page";
import { getChatByIdDB } from "@/lib/db/data-access/chat";

const page = async ({ params }: { params: Promise<{ chatId: string }> }) => {
  const { chatId } = await params;
  const result = await getChatByIdDB({ chatId });
  if (!result) return notFound();

  return (
    <>
      <AppSidebar />
      <ChatPage result={result} chatId={chatId} />
    </>
  );
};

export default page;
