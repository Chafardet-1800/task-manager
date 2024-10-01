"use client";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return;
  }

  if (resolvedTheme === "dark") {
    return (
      <div className="p-3 rounded-full bg-gray-400">
        <FiSun color="#111827" onClick={() => setTheme("light")} size={20} />
      </div>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <div className="p-3 rounded-full bg-gray-900">
        <FiMoon color="#9ca3af" onClick={() => setTheme("dark")} size={20} />
      </div>
    );
  }
}
