"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MAJOR_BY_SLUG, MAJOR_GROUPS } from "@/lib/majors";
import { ui } from "@/lib/ui";
import { ArrowRight } from "@/components/icons";

/** Hero shortcut: pick a major, land on its page. Pre-selects the last one visited. */
export function MajorPicker() {
  const router = useRouter();
  const [slug, setSlug] = useState("");

  useEffect(() => {
    try {
      const last = window.localStorage.getItem("jam.major");
      if (last && MAJOR_BY_SLUG.has(last)) setSlug(last);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // No major picked yet? The button still works — it opens the full board.
        router.push(slug ? `/majors/${slug}/` : "/jobs/");
      }}
      className="mt-8 flex max-w-xl flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="hero-major" className="sr-only">
        What do you study?
      </label>
      <select
        id="hero-major"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className={`${ui.input} h-11 text-[15px] sm:flex-1`}
      >
        <option value="" disabled>
          What do you study?
        </option>
        {MAJOR_GROUPS.map((g) => (
          <option key={g.slug} value={g.slug}>
            {g.name}
          </option>
        ))}
      </select>
      <button type="submit" className={`${ui.btnPrimary} h-11 px-5 text-[15px]`}>
        {slug ? "Show my matches" : "Browse jobs"} <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
