"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-8 h-8 bg-white rounded-xl shadow" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-1.5 rounded-xl border border-black/10 bg-white/80 shadow dark:bg-gray-700 dark:border-white/20 active:scale-90 transition-transform duration-200"
    >
      <div
        className={`transition-transform duration-500 ease-out ${isDark ? "rotate-180" : "rotate-0"}`}
      >
        {isDark ? (
          <FiSun className="w-5 h-5 text-amber-500" />
        ) : (
          <FiMoon className="w-5 h-5 text-indigo-600" />
        )}
      </div>
    </button>
  );
};

export default ThemeSwitch;
