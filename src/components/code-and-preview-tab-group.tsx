"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { geist_sans } from "@/lib/misc/fonts";
import { Code, Copy, TvMinimal } from "lucide-react";
import { useEffect, useState } from "react";
import CodeBlock from "./code-block-tab";
import EmailPreview from "./email-preview-tab";
import { AIResponseStatus } from "@/lib/types/chat";
import { fromMarkdown } from "mdast-util-from-markdown";
import { visit } from "unist-util-visit";

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
  code,
}: {
  currentTab: CurrentTabType;
  code: string | undefined;
}) => {
  function handleCopy(value: string) {
    navigator.clipboard.writeText(value);
  }

  return currentTab === "code" ? (
    <Button
      className="border py-1.5 px-2 h-fit"
      onClick={() => handleCopy(code || "")}
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

const CodeAndPreview = ({
  content,
  status,
}: {
  content: string;
  status: AIResponseStatus;
}) => {
  const [currentTab, setCurrentTab] = useState<CurrentTabType>("code");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!content) return;
    const tree = fromMarkdown(content);
    visit(tree, "code", (node) => {
      setCode(node.value);
    });
  }, [content]);

  // useEffect(() => {
  //   if (status === "streaming") {
  //     setCurrentTab("code");
  //   }
  // }, [status]);

  return (
    <div className="bg-transparent h-screen w-full backdrop-blur-xl">
      <Tabs
        value={currentTab}
        onValueChange={(value) => setCurrentTab(value as CurrentTabType)}
      >
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
              disabled={status !== "ready"}
              className={`border pr-4 border-transparent h-10 data-[state=active]:border-border data-[state=active]:bg-[#171717] !shadow-none ${status !== "ready" && "cursor-not-allowed"}`}
            >
              <TvMinimal className="h-4 mr-0.5" /> Preview
            </TabsTrigger>
          </div>
          <div>
            <CopyCode currentTab={currentTab} code={code} />
          </div>
        </TabsList>
        <CodeBlock code={code} setCode={setCode} />
        {<EmailPreview code={code} />}
      </Tabs>
    </div>
  );
};

export default CodeAndPreview;
