"use client";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="border border-transparent cursor-pointer rounded-full px-5 py-2 bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-row gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
    >
      {theme === "dark" ? (
        <Sun size={24} className="self-center" />
      ) : (
        <Moon size={24} className="self-center" />
      )}
      <span className="self-center">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
