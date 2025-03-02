import TextGradient from "@/components/ui/text-gradient";
import { geist_sans } from "@/lib/fonts";
import React from "react";

const Header = () => {
  return (
    <>
      <TextGradient className=" from-blue-200 via-blue-100 to-blue-50 px-4 text-center">
        <h1
          className="text-[2.5rem] font-bold leading-tight"
          style={geist_sans.style}
        >
          Prompts to React Email Template
        </h1>
      </TextGradient>
      <h3
        style={geist_sans.style}
        className="mt-3 text-base text-gray-400 px-4"
      ></h3>
    </>
  );
};

export default Header;
