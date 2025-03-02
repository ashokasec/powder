import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { geist_sans } from "@/lib/fonts";
import { LLMResponseType } from "@/types/chat";
import { Code, Copy, TvMinimal } from "lucide-react";
import { useEffect, useState } from "react";
import CodeBlock from "./code-block";
import EmailPreview from "./email-preview";

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
    <TabsContent value={value} className="h-[calc(100vh-7rem)] m-0 p-2">
      <ScrollArea
        className={`h-[calc(100vh-8rem)] w-full border rounded-lg overflow-clip relative ${
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
    <TabsList className="bg-transparent w-full rounded-none justify-between p-0 px-1.5 flex items-center border-b h-14">
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
    response,
    isLLMResponseDone,
  }: {
    response: LLMResponseType;
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
      <Tabs
        value={currentTab}
        className="w-full"
        onValueChange={(value) => setCurrentTab(value as CurrentTabType)}
      >
        <TabHeaders currentTab={currentTab} jsx={response.code ?? ""} />
        <CodeBlock jsx={response.code ?? ""} />
        <EmailPreview jsx={response.code ?? ""} />
      </Tabs>
    );
  };

  export default CodeAndPreview;