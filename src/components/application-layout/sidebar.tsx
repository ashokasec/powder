"use client";

import * as React from "react";
import { Flame, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants/app";
import { arOneSans, geist_sans } from "@/lib/misc/fonts";
import { getChats } from "@/lib/actions/chat";
import { useServerAction } from "zsa-react";
import { ScrollArea } from "../ui/scroll-area";

function HistoryList({
  chats,
  setOpen,
}: {
  chats:
    | {
        id: string;
        title: string;
        createdAt: Date;
      }[]
    | undefined;
  setOpen: (arg0: boolean) => void;
}) {
  return chats && chats.length > 0 ? (
    <ul className="space-y-3">
      {chats.map((chat) => (
        <li key={chat.id}>
          <Link
            style={geist_sans.style}
            href={`/chat/${chat.id}`}
            onClick={() => {
              setOpen(false);
            }}
            className="block px-2 line-clamp-1 py-1 text-sm rounded-md hover:bg-white/[0.085] text-gray-300 overflow-hidden text-ellipsis"
          >
            {chat.title || "Untitled Chat"}
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-400">No chat history</p>
  );
}

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { open, setOpen } = useSidebar();
  const { execute, data, isPending } = useServerAction(getChats);

  React.useEffect(() => {
    execute();
  }, [open]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader
        className={`flex h-14 flex-row justify-between ${
          open ? "items-center" : "justify-center"
        } border-b font-medium`}
      >
        <Link href="/" className="flex items-center justify-center">
          <span className="grid w-6 text-gray-100 place-items-center">
            <Flame className="w-5" />
          </span>
          {open && (
            <span
              className="text-gray-100 ml-2 tracking-wide"
              style={arOneSans.style}
            >
              {APP_NAME}
            </span>
          )}
        </Link>
        {open && (
          <SidebarMenuButton
            tooltip={open ? "Close Sidebar" : "Open Sidebar"}
            asChild
          >
            <SidebarTrigger className="text-white transition-all w-fit" />
          </SidebarMenuButton>
        )}
      </SidebarHeader>
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <SidebarContent className="pt-2 gap-0">
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="New Email" asChild>
                  <Link
                    href="/"
                    className="!text-gray-100 border bg-white/[0.025] hover:bg-white/[0.05]"
                  >
                    <Plus size={18} />
                    <span>New Email</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          {open && (
            <div className="p-3 pt-1">
              {isPending ? (
                <p className="text-gray-400">Loading chats...</p>
              ) : (
                <HistoryList chats={data} setOpen={setOpen} />
              )}
            </div>
          )}
          {!open && (
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={open ? "Close Sidebar" : "Open Sidebar"}
                    asChild
                  >
                    <SidebarTrigger className="text-white transition-all w-fit" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          )}
        </SidebarContent>
      </ScrollArea>
    </Sidebar>
  );
}
