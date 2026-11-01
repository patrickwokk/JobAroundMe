import Link from "next/link";
import { JamLogo } from "@/components/logo";
import { ThemeSelect } from "@/components/theme-toggle";
import { META } from "@/lib/data";
import { fmtDate } from "@/lib/format";
import { REPO_URL, suggestHref } from "@/lib/site";
import { ui } from "@/lib/ui";

const EXPLORE = [
  { href: "/jobs", label: "Jobs" },
  { href: "/labs", label: "Research labs" },
  { href: "/clubs", label: "Clubs" },
  { href: "/tracks", label: "Career tracks" },
  { href: "/connect", label: "Referral Board" },
];

export function Footer() {
  const suggest = suggestHref();
  const linkClass = "text-fg-muted transition-colors hover:text-fg";
  return (
    <footer className="mt-24 border-t border-line bg-subtle">
      <div className={`${ui.container} grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]`}>
        <div>
          <JamLogo markClassName="size-7" />
          <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.14em] text-fg-subtle">Job Around Me</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
            The campus jobs, research labs, clubs and Northwest Arkansas internships that build a real
            resume — for University of Arkansas students.
          </p>
        </div>

        <div className="text-sm">
          <p className="font-semibold">Explore</p>
          <ul className="mt-3 space-y-2">
            {EXPLORE.map((l) => (
              <li key={l.href}>
                <Link className={linkClass} href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-semibold">Jam</p>
          <ul className="mt-3 space-y-2">
            <li><Link className={linkClass} href="/how-it-works">How it works</Link></li>
            <li><Link className={linkClass} href="/saved">Saved listings</Link></li>
            <li><Link className={linkClass} href="/privacy">Privacy</Link></li>
            {suggest ? (
              <li>
                <a className={linkClass} href={suggest} target="_blank" rel="noreferrer">
                  Suggest a listing
                </a>
              </li>
            ) : null}
            {REPO_URL ? (
              <li>
                <a className={linkClass} href={REPO_URL} target="_blank" rel="noreferrer">
                  Open source
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-semibold">Appearance</p>
          <div className="mt-3">
            <ThemeSelect />
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-fg-subtle">
            <span className="size-1.5 rounded-full bg-ok" aria-hidden />
            Listings refreshed {fmtDate(META.lastRefreshed)}
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className={`${ui.container} flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5 text-xs text-fg-subtle`}>
          <p>
            © {new Date(META.lastRefreshed).getFullYear()} Jam · An independent project, not affiliated with or
            endorsed by the University of Arkansas.
          </p>
          <p>Free for students. Always.</p>
        </div>
      </div>
    </footer>
  );
}
