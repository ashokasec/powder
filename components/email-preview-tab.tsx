// ts-nocheck

"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CommonTabsContent } from "./code-and-preview-tab-group";

import React, { useEffect, useState } from "react";
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { renderToStaticMarkup } from "react-dom/server";
import * as Babel from "@babel/standalone";

const preprocessJSX = (jsxCode: string) => {
  // 1. Remove TypeScript interfaces
  jsxCode = jsxCode.replace(/interface\s+[A-Za-z0-9_]+\s*{[^}]+}/g, "");

  // 2. Remove imports
  jsxCode = jsxCode.replace(/import\s+.*?;?\n/g, "");

  // 3. Rename default export to EmailTemplate
  const exportRegex = /export\s+default\s+([A-Za-z0-9_]+)/;
  const match = jsxCode.match(exportRegex);
  if (match) {
    jsxCode = jsxCode.replace(
      exportRegex,
      `const EmailTemplate = ${match[1]};`
    );
  } else {
    jsxCode = jsxCode.replace(
      /function\s+([A-Za-z0-9_]+)/,
      "function EmailTemplate"
    );
  }

  return jsxCode;
};

const EmailPreviewSkeleton = () => {
  return (
    <div className="w-full h-[calc(100vh-8rem-1px)] grid place-items-center bg-white py-6">
      <div className="w-full max-w-xl mx-auto p-6 space-y-6 bg-white rounded-lg border border-gray-300/50">
        {/* Header section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>

          {/* Subject line */}
          <Skeleton className="h-6 w-3/4" />
        </div>

        {/* Divider */}
        <Skeleton className="h-px w-full" />

        {/* Email body */}
        <div className="space-y-4">
          {/* Greeting */}
          <Skeleton className="h-5 w-32" />

          {/* Paragraphs */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />

          {/* Space */}
          <div className="py-2" />

          {/* Second paragraph */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-10/12" />
          <Skeleton className="h-4 w-full" />
        </div>

        {/* Call to action button */}
        <div className="flex justify-center py-2">
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>

        {/* Signature */}
        <div className="space-y-2 pt-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Footer */}
        <div className="pt-6 space-y-3">
          <Skeleton className="h-px w-full" />
          <div className="flex justify-center space-x-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
          <Skeleton className="h-3 w-48 mx-auto" />
          <Skeleton className="h-3 w-32 mx-auto" />
        </div>
      </div>
    </div>
  );
};

const EmailPreview = ({ code }: { code: string }) => {
  console.log(preprocessJSX(code));

  const [html, setHtml] = useState("");

  const compileAndRender = (jsxCode: string) => {
    try {
      const compiledCode = Babel.transform(jsxCode, {
        presets: ["react", "typescript"],
        filename: "file.tsx",
      }).code;

      const Component = new Function(
        "React",
        "Body",
        "Button",
        "Container",
        "Column",
        "Head",
        "Heading",
        "Hr",
        "Html",
        "Img",
        "Link",
        "Preview",
        "Row",
        "Section",
        "Tailwind",
        "Text",
        `${compiledCode}; return EmailTemplate;`
      )(
        React,
        Body,
        Button,
        Container,
        Column,
        Head,
        Heading,
        Hr,
        Html,
        Img,
        Link,
        Preview,
        Row,
        Section,
        Tailwind,
        Text
      );

      setHtml(renderToStaticMarkup(React.createElement(Component)));
    } catch (error) {
      console.error("Compilation Error:", error);
      setHtml(`<pre style="color: red;">${JSON.stringify(error)}</pre>`);
    }
  };

  useEffect(() => {
    if (!code) {
      setHtml(`<pre style="color: red;">There's no code</pre>`);
      return;
    }
    compileAndRender(preprocessJSX(code));
  }, [code]);

  return (
    <CommonTabsContent value="preview">
      <iframe
        sandbox="allow-scripts allow-same-origin allow-forms"
        srcDoc={html}
        className="w-full h-screen border"
      />
      <div className="hidden">
        <EmailPreviewSkeleton />
      </div>
    </CommonTabsContent>
  );
};

export default EmailPreview;
