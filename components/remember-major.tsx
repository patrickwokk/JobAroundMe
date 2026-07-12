"use client";

import { useEffect } from "react";

/** Visiting a major page quietly remembers it, so the home page can greet you. */
export function RememberMajor({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      window.localStorage.setItem("jam.major", slug);
    } catch {
      /* private mode — fine */
    }
  }, [slug]);
  return null;
}
