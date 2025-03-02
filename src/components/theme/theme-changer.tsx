"use client"

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react'

const ThemeChanger = () => {
    const { theme, setTheme } = useTheme();
  
    return theme === "light" ? (
      <div
        onClick={() => setTheme("dark")}
        className="rounded-full aspect-square grid place-content-center size-8 min-w-fit border p-1 cursor-pointer"
      >
        <Moon className="w-4" />
      </div>
    ) : (
      <div
        onClick={() => setTheme("light")}
        className="rounded-full aspect-square grid place-content-center size-8 min-w-fit border p-1 cursor-pointer"
      >
        <Sun className="w-4" />
      </div>
    );
  };

export default ThemeChanger