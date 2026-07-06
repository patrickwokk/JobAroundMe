import Link from "next/link";
import { META } from "@/lib/data";
import { fmtDate } from "@/lib/format";
import { REPO_URL, suggestListingUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-ink bg-paper-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-display text-xl font-black">
            Job<span className="italic text-cardinal">Around</span>Me
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            Meaningful student work at the University of Arkansas — campus jobs,
            professor-led labs, and Northwest Arkansas internships, sorted by major.
          </p>
        </div>
        <div className="text-sm">
          <p className="kicker">Explore</p>
          <ul className="mt-3 space-y-2">
            <li><Link className="link-sweep" href="/jobs">All listings</Link></li>
            <li><Link className="link-sweep" href="/labs">Research lab directory</Link></li>
            <li><Link className="link-sweep" href="/clubs">Clubs worth joining</Link></li>
            <li><Link className="link-sweep" href="/tracks">Career tracks</Link></li>
            <li><Link className="link-sweep" href="/connect">Connect &amp; referrals</Link></li>
            <li><Link className="link-sweep" href="/how-it-works">How listings stay fresh</Link></li>
            <li>
              <a className="link-sweep" href={suggestListingUrl()} target="_blank" rel="noreferrer">
                Suggest a listing
              </a>
            </li>
            <li>
              <a className="link-sweep" href={REPO_URL} target="_blank" rel="noreferrer">
                Source on GitHub
              </a>
            </li>
          </ul>
        </div>
        <div className="text-sm text-ink-soft">
          <p className="kicker">Colophon</p>
          <p className="mt-3 leading-relaxed">
            An independent project from inside the U of A community, built to help
            students thrive — not an official university site. Listings link to
            their original sources; always apply there.
          </p>
          <p className="mt-3 font-mono text-[11px] tracking-wide">
            Set in Fraunces &amp; Schibsted Grotesk · Data refreshed {fmtDate(META.lastRefreshed)}
          </p>
        </div>
      </div>
    </footer>
  );
}
