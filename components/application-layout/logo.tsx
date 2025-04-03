import { APP_NAME } from "@/lib/constants/app";
import { space_grotesk } from "@/lib/misc/fonts";
import React from "react";

const Logo = () => {
  return (
    <div style={space_grotesk.style} className="text-xl font-semibold">
      {APP_NAME}
      <span className="text-gray-400/25">.sh</span>
    </div>
  );
};

export default Logo;
