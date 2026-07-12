"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MAJOR_BY_SLUG } from "@/lib/majors";
import { ArrowUpRight } from "@/components/icons";

/** Shows a "pick up where you left off" chip once a major has been visited. */
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
      className="group mt-5 inline-flex items-center gap-2 border border-line-strong bg-paper-2 px-3.5 py-2 text-sm text-ink-soft transition-colors hover:border-cardinal hover:text-ink"
    >
      <span className="size-1.5 rounded-full bg-moss" aria-hidden />
      Pick up where you left off — <span className="font-medium text-ink">{group.name}</span>
      <ArrowUpRight className="size-3.5 text-cardinal" />
    </Link>
  );
}
