import { APP } from "@/config";
import { geist_sans } from "@/lib/fonts";
import React from "react";

const ChatNavbar = ({ title }: { title: string }) => {
  return (
    <nav className="max-h-14 min-h-14 border-b flex items-center px-4 col-span-full">
      <div>{APP.name}</div>
      <div
        className="text-[15px] flex border-l-2 ml-4 items-center px-4 bg-transparent"
        style={geist_sans.style}
      >
        {title}
      </div>
    </nav>
  );
};

export default ChatNavbar;
