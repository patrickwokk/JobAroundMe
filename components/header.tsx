"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JamLogo } from "@/components/logo";
import { SavedLink } from "@/components/saved-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, XMark } from "@/components/icons";
import { ui } from "@/lib/ui";

const NAV = [
  { href: "/jobs", label: "Jobs" },
  { href: "/labs", label: "Labs" },
  { href: "/clubs", label: "Clubs" },
  { href: "/tracks", label: "Career tracks" },
  { href: "/connect", label: "Connect" },
  { href: "/how-it-works", label: "How it works" },
];

export function Header() {
  const pathname = usePathname().replace(/\/+$/, "") || "/";
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/80 backdrop-blur-md">
      <div className={`${ui.container} flex h-16 items-center gap-8`}>
        <Link href="/" aria-label="Jam — Job Around Me, home" className="shrink-0 rounded-lg">
          <JamLogo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive(item.href) ? "bg-muted text-fg" : "text-fg-muted hover:bg-muted hover:text-fg"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <SavedLink />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-muted hover:text-fg lg:hidden"
          >
            {open ? <XMark className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line bg-canvas lg:hidden">
          <ul className={`${ui.container} grid gap-0.5 py-3`}>
            {[...NAV, { href: "/saved", label: "Saved" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2.5 text-base font-medium ${
                    isActive(item.href) ? "bg-muted text-fg" : "text-fg-muted hover:bg-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
