"use client";

import { useEffect, useState } from "react";
import { applyMode, readMode, setMode, THEME_EVENT, type ThemeMode } from "@/lib/theme";
import { Monitor, Moon, Sun } from "@/components/icons";

/** Keeps "system" mode in step with the OS setting while the page is open. */
function useThemeMode(): ThemeMode {
  const [mode, setModeState] = useState<ThemeMode>("system");
  useEffect(() => {
    const sync = () => setModeState(readMode());
    sync();
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (readMode() === "system") applyMode("system");
    };
    mq.addEventListener("change", onSystemChange);
    window.addEventListener(THEME_EVENT, sync);
    return () => {
      mq.removeEventListener("change", onSystemChange);
      window.removeEventListener(THEME_EVENT, sync);
    };
  }, []);
  return mode;
}

/** Header button: flips between light and dark. Icons swap via CSS, so no flash. */
export function ThemeToggle() {
  useThemeMode();
  return (
    <button
      type="button"
      onClick={() => setMode(document.documentElement.classList.contains("dark") ? "light" : "dark")}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="inline-flex size-9 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-muted hover:text-fg"
    >
      <Moon className="size-[18px] dark:hidden" />
      <Sun className="hidden size-[18px] dark:block" />
    </button>
  );
}

const OPTIONS: Array<{ mode: ThemeMode; label: string; Icon: typeof Sun }> = [
  { mode: "system", label: "System", Icon: Monitor },
  { mode: "light", label: "Light", Icon: Sun },
  { mode: "dark", label: "Dark", Icon: Moon },
];

/** Footer control: explicit System / Light / Dark. */
export function ThemeSelect() {
  const mode = useThemeMode();
  return (
    <div role="radiogroup" aria-label="Color theme" className="inline-flex rounded-lg border border-line bg-surface p-0.5">
      {OPTIONS.map(({ mode: m, label, Icon }) => (
        <button
          key={m}
          type="button"
          role="radio"
          aria-checked={mode === m}
          onClick={() => setMode(m)}
          className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
            mode === m ? "bg-muted text-fg" : "text-fg-muted hover:text-fg"
          }`}
        >
          <Icon className="size-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}
