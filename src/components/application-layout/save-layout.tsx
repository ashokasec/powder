"use client";

import React, { useEffect } from "react";

const SaveLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        alert("💾 Save triggered!");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return <div className="min-h-screen">{children}</div>;
};

export default SaveLayout;
