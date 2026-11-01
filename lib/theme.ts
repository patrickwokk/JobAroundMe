"use client";

export type ThemeMode = "system" | "light" | "dark";

const KEY = "jam.theme";
export const THEME_EVENT = "jam:theme-changed";

export function readMode(): ThemeMode {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

export function applyMode(mode: ThemeMode): void {
  const dark =
    mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
}

export function setMode(mode: ThemeMode): void {
  try {
    if (mode === "system") window.localStorage.removeItem(KEY);
    else window.localStorage.setItem(KEY, mode);
  } catch {
    /* private mode — the class still applies for this visit */
  }
  applyMode(mode);
  window.dispatchEvent(new Event(THEME_EVENT));
}
