"use client";

import * as React from "react";
import { Flame, History, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
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
import { arOneSans } from "@/lib/misc/fonts";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader
        className={`flex h-14 flex-row justify-between ${
          open ? "items-center" : "justify-center"
        } border-b font-medium`}
      >
        <Link href="/" className="flex items-center justify-center">
          <span className="grid w-6 text-gray-300 place-items-center">
            <Flame className="w-5" />
          </span>
        {open && <span className="text-gray-300 ml-2 tracking-wide" style={arOneSans.style}>{APP_NAME}</span>}
        </Link>
        {open && (
                <SidebarMenuButton
                  tooltip={open ? "Close Sidebar" : "Open Sidebar"}
                  asChild
                >
                  <SidebarTrigger className="text-gray-400 transition-all w-fit" />
                </SidebarMenuButton>
        )}
      </SidebarHeader>
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="New Email" asChild>
                <Link href="/" className="!text-gray-300  hover:bg-gray-200/5">
                  <span>
                    <Plus size={18} />
                  </span>
                  <span>New Email</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="History" asChild>
                <Link href="/" className="!text-gray-300  hover:bg-gray-200/5">
                  <span>
                    <History size={18} />
                  </span>
                  <span>History</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {!open && (
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={open ? "Close Sidebar" : "Open Sidebar"}
                  asChild
                >
                  <SidebarTrigger className="text-gray-400 transition-all w-fit" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <div className="h-40"></div>
      </SidebarFooter>
    </Sidebar>
  );
}
