"use client";

import React from "react";
import SaveLayout from "../application-layout/save-layout";
import { SidebarProvider } from "./sidebar";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SaveLayout>
      <SidebarProvider defaultOpen={false}>{children}</SidebarProvider>
    </SaveLayout>
  );
};

export default Provider;
