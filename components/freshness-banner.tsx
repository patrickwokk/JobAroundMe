"use client";

import { useEffect, useState } from "react";
import { META } from "@/lib/data";

const STALE_AFTER_DAYS = 3;

/**
 * The site is static, so if the daily refresh ever stops, students would see
 * old listings without knowing. This says so honestly, after the fact.
 */
export function FreshnessBanner() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    setDays(Math.floor((Date.now() - Date.parse(META.lastRefreshed)) / 86_400_000));
  }, []);

  if (days < STALE_AFTER_DAYS) return null;

  return (
    <div role="status" className="border-b border-line bg-warn-wash">
      <p className="mx-auto max-w-6xl px-4 py-2 text-center text-sm text-warn sm:px-6">
        Listings were last refreshed {days} days ago — some may have closed. Check the original posting before applying.
      </p>
    </div>
  );
}
