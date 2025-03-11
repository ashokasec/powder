"use client"

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { geist_sans } from "@/lib/misc/fonts";
import { Code, Copy, TvMinimal } from "lucide-react";
import { useEffect, useState } from "react";
import CodeBlock from "./code-block-tab";
import EmailPreview from "./email-preview-tab";

export type CurrentTabType = "code" | "preview";

export type CodeType = {
  jsx: string;
  html: string;
  highlightedHtml: string;
};

export const CommonTabsContent = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => {
  return (
    <TabsContent value={value} className="h-[calc(100vh-3.5rem)] m-0 p-2">
      <ScrollArea
        className={`h-[calc(100vh-4.5rem)] w-full border rounded-lg overflow-clip relative ${
          value === "code" ? "bg-[#070808]/50" : "bg-white"
        }`}
      >
        {children}
      </ScrollArea>
    </TabsContent>
  );
};

const CopyCode = ({
  currentTab,
  jsx,
}: {
  currentTab: CurrentTabType;
  jsx: CodeType["jsx"];
}) => {
  function handleCopy(value: string) {
    navigator.clipboard.writeText(value);
  }

  return currentTab === "code" ? (
    <Button
      className="border py-1.5 px-2 h-fit"
      onClick={() => handleCopy(jsx)}
    >
      <Copy />{" "}
      <span style={geist_sans.style} className="text-[13px]">
        React Email
      </span>
    </Button>
  ) : (
    <Button className="border py-1.5 px-2 h-fit">
      <Copy />{" "}
      <span style={geist_sans.style} className="text-[13px]">
        HTML
      </span>
    </Button>
  );
};

export const TabHeaders = ({
  currentTab,
  jsx,
}: {
  currentTab: CurrentTabType;
  jsx: CodeType["jsx"];
}) => {
  return (
    <TabsList className="bg-transparent w-full rounded-none justify-between p-0 border-b px-1.5 flex items-center h-14">
      <div>
        <TabsTrigger
          value="code"
          className="border pr-5 border-transparent h-10 data-[state=active]:border-border data-[state=active]:bg-[#171717] !shadow-none"
        >
          <Code className="h-4 mr-0.5" /> Code
        </TabsTrigger>
        <TabsTrigger
          value="preview"
          className="border pr-4 border-transparent h-10 data-[state=active]:border-border data-[state=active]:bg-[#171717] !shadow-none"
        >
          <TvMinimal className="h-4 mr-0.5" /> Preview
        </TabsTrigger>
      </div>
      <div>
        <CopyCode currentTab={currentTab} jsx={jsx} />
      </div>
    </TabsList>
  );
};

const CodeAndPreview = ({
  jsx,
  isLLMResponseDone,
}: {
  jsx: CodeType["jsx"];
  isLLMResponseDone: boolean;
}) => {
  const [currentTab, setCurrentTab] = useState<CurrentTabType>("code");

  useEffect(() => {
    if (isLLMResponseDone === true) {
      setTimeout(() => {
        setCurrentTab("preview");
      }, 1000);
    }
  }, [isLLMResponseDone]);

  return (
    <div className="bg-transparent h-screen w-full backdrop-blur-xl">
      <Tabs
        value={currentTab}
        className="w-full"
        onValueChange={(value) => setCurrentTab(value as CurrentTabType)}
      >
        <TabHeaders currentTab={currentTab} jsx={jsx} />
        <CodeBlock jsx={jsx} />
        <EmailPreview jsx={jsx} />
      </Tabs>
    </div>
  );
};

export default CodeAndPreview;
