import { space_grotesk } from "@/lib/fonts";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className=" w-full mx-auto h-16 flex items-center justify-center px-4">
      <div
        className="text-[13px] space-x-3 text-blue-500 font-medium"
        style={space_grotesk.style}
      >
        <Link
          href="https://github/ashokasec"
          className="hover:text-blue-600 transition-all hover:underline"
        >
          Github
        </Link>
        <Link
          href="https://x.com/ashokasec"
          className="hover:text-blue-600 transition-all hover:underline"
        >
          Twitter
        </Link>
        <Link
          href="https://t.me/ashokasec"
          className="hover:text-blue-600 transition-all hover:underline"
        >
          Telegram
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
