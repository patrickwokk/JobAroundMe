"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { META } from "@/lib/data";
import { fmtDate } from "@/lib/format";

const NAV = [
  { href: "/jobs", label: "The Listings" },
  { href: "/labs", label: "The Labs" },
  { href: "/#majors", label: "By Major" },
  { href: "/how-it-works", label: "How It Works" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b border-line bg-paper">
      <div className="hidden border-b border-line sm:block">
        <div className="mx-auto flex max-w-6xl items-baseline justify-between px-4 py-1.5 font-mono text-[11px] tracking-wide text-ink-soft sm:px-6">
          <span>Fayetteville, Arkansas — for U of A students</span>
          <span>Listings refreshed {fmtDate(META.lastRefreshed)}</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-4 py-4 sm:px-6">
        <Link href="/" className="font-display text-2xl font-black tracking-tight sm:text-[1.7rem]">
          Job<span className="italic text-cardinal">Around</span>Me
        </Link>
        <nav aria-label="Main" className="-mx-1 flex items-center gap-5 overflow-x-auto pb-0.5 text-sm sm:gap-7">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`link-sweep whitespace-nowrap font-medium ${
                  active ? "text-cardinal" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
