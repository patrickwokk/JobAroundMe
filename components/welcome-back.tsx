"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MAJOR_BY_SLUG } from "@/lib/majors";
import { ArrowRight } from "@/components/icons";

/** "Pick up where you left off" — shown once a major page has been visited. */
export function WelcomeBack() {
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    try {
      setSlug(window.localStorage.getItem("jam.major"));
    } catch {
      /* ignore */
    }
  }, []);

  const group = slug ? MAJOR_BY_SLUG.get(slug) : undefined;
  if (!group) return null;

  return (
    <Link
      href={`/majors/${group.slug}`}
      className="group mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-2.5 pr-3.5 text-sm text-fg-muted shadow-[var(--elev-1)] transition-colors hover:border-line-strong hover:text-fg"
    >
      <span className="size-1.5 rounded-full bg-ok" aria-hidden />
      Welcome back — <span className="font-medium text-fg">{group.name}</span>
      <ArrowRight className="size-3.5 text-accent transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
