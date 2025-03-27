"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import { CommonTabsContent } from "./code-and-preview-tab-group";

const CodeBlock = ({ code }: { code: string | undefined }) => {
  const [highlightedHtml, setHighlightedHtml] = useState("");

  useEffect(() => {
    if (!code) return;

    const generateCodeHtml = async () => {
      const html = await codeToHtml(code, {
        lang: "jsx",
        theme: "aurora-x",
      });
      setHighlightedHtml(html);
    };

    generateCodeHtml();
  }, [code]);

  return (
    <CommonTabsContent value="code">
      {code ? (
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <div className="p-4">There&apos; no code at this moment.</div>
      )}
    </CommonTabsContent>
  );
};

export default CodeBlock;
