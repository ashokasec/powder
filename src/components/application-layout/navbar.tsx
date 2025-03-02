import { Button } from "@/components/ui/button";
import { APP } from "@/config";
import { geist_sans, space_grotesk } from "@/lib/fonts";
import Link from "next/link";
import React from "react";
// import ThemeChanger from "../theme/theme-changer";

export const Logo = () => {
  return (
    <div
      style={space_grotesk.style}
      className="text-[17px] font-semibold lowercase text-white"
    >
      <Link href="/">{APP.name}</Link>
      <span className="pointer-events-none select-none">.me</span>
    </div>
  );
};

const Navbar = () => {
  return (
    <header className=" w-full mx-auto h-16 flex items-center justify-between px-4">
      <Logo />
      <nav>
        <ul>
          <li></li>
        </ul>
      </nav>
      <div className="flex items-center space-x-2">
        <Button
          style={geist_sans.style}
          className="border-blue-200 bg-blue-600 text-white hover:bg-blue-700"
        >
          <Link
            href="https://github.com/ashokasec/uncover.1"
            className="text-sm tracking-wide font-normal"
          >
            Github
          </Link>
        </Button>
        {/* <ThemeChanger /> */}
      </div>
    </header>
  );
};

export default Navbar;
