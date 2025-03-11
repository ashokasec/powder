"use client";

import React, { ReactNode } from "react";
import SaveLayout from "@/components/application-layout/save-layout";
import { SidebarProvider } from "@/components/ui/sidebar";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <SaveLayout>
      <SidebarProvider defaultOpen={false}>{children}</SidebarProvider>
    </SaveLayout>
  );
};

export default Provider;
