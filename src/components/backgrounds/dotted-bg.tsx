import { cn } from "@/lib/utils";
import React from "react";

const DottedBG = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute inset-0 -z-10 h-full w-full bg-blue-50/50 bg-[radial-gradient(#d0d4dd_1px,transparent_1px)] [background-size:16px_16px]", className)}></div>
  );
};

export default DottedBG;
