"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { CommonTabsContent } from "./code-and-preview-tabs";

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

const EmailPreview = ({ jsx }: { jsx: string }) => {
  const [html, setHtml] = useState("");
  setHtml("")
  console.log(jsx)

  return (
    <CommonTabsContent value="preview">
      {/* {isPending ? (
        <EmailPreviewSkeleton />
      ) : !isSuccess ? (
        <BlurFade>
          <iframe
            sandbox="allow-scripts allow-same-origin"
            srcDoc={html}
            className="w-full h-screen border"
          />
        </BlurFade>
      ) : (
        <>failed</>
      )} */}
      <iframe
        sandbox="allow-scripts allow-same-origin"
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
