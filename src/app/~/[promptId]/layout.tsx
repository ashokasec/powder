import SaveLayout from "@/components/application-layout/save-layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <SaveLayout>
      <SidebarProvider defaultOpen={false}>{children}</SidebarProvider>
    </SaveLayout>
  );
};

export default layout;
