import { cn } from "@/lib/utils";
import React from "react";

type TextGradientProps = {
  children: string | React.ReactNode;
  className?: string;
};

const TextGradient = (props: TextGradientProps) => {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-gray-700 via-blue-800 to-blue-700 text-transparent bg-clip-text bg-300% animate-gradient",
        props.className
      )}
    >
      {props.children}
    </span>
  );
};

export default TextGradient;
