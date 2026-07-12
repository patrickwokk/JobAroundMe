"use client";

/**
 * Saved listings live in localStorage — no account, no server, survives visits.
 * Components stay in sync via a window event fired on every change.
 */

const KEY = "jam.saved";
export const SAVED_EVENT = "jam:saved-changed";

export function readSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw) ? raw.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function toggleSaved(jobId: string): boolean {
  const current = new Set(readSaved());
  const nowSaved = !current.has(jobId);
  if (nowSaved) current.add(jobId);
  else current.delete(jobId);
  window.localStorage.setItem(KEY, JSON.stringify([...current]));
  window.dispatchEvent(new Event(SAVED_EVENT));
  return nowSaved;
}
