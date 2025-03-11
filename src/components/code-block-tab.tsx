"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { CodeType, CommonTabsContent } from "./code-and-preview-tab-group";

const CodeBlock = ({ jsx }: { jsx: CodeType["jsx"] }) => {
  const [highlightedHtml, setHighlightedHtml] = useState("");

  const generateCodeHtml = async () => {
    const html = await codeToHtml(jsx, {
      lang: "jsx",
      theme: "aurora-x",
    });
    setHighlightedHtml(html);
  };

  useEffect(() => {
    generateCodeHtml();
  }, [jsx]);

  return (
    <CommonTabsContent value="code">
      <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
    </CommonTabsContent>
  );
};

export default CodeBlock;
