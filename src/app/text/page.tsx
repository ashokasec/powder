// @ts-nocheck

"use client";

import React, { useState } from "react";
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

export default function EmailEditor() {
  const [jsxCode, setJsxCode] = useState("");

  const [htmlPreview, setHtmlPreview] = useState("");

  const compileAndRender = () => {
    try {
      const compiledCode = Babel.transform(jsxCode, {
        presets: ["react"],
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

      setHtmlPreview(renderToStaticMarkup(React.createElement(Component)));
    } catch (error) {
      console.error("Compilation Error:", error);
      setHtmlPreview(`<pre style="color: red;">${error.message}</pre>`);
    }
  };

  return (
    <div>
      <h2>Email JSX Editor</h2>
      <textarea
      className="bg-transparent"
        value={jsxCode}
        onChange={(e) => setJsxCode(e.target.value)}
        rows={10}
        cols={50}
      />
      <button onClick={compileAndRender}>Render Preview</button>

      <h2>HTML Output:</h2>
      <iframe srcDoc={htmlPreview} className="w-full h-screen" />
    </div>
  );
}
