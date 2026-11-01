import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Check } from "@/components/icons";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Jam has no accounts, no ads and no tracking cookies. Here's exactly what is and isn't stored.",
};

const POINTS = [
  {
    title: "No accounts, ever",
    copy: "There's nothing to sign up for and no profile about you anywhere.",
  },
  {
    title: "Saved listings stay on your device",
    copy: "Bookmarks, your last-viewed major and your light/dark preference live in your browser's local storage. They never leave your device, and clearing your browser data removes them.",
  },
  {
    title: "The email composer is local",
    copy: "When you draft an intro to a professor, everything you type stays in your browser. Jam never sees, stores or sends it — you copy the text into your own email.",
  },
  {
    title: "No ads, no tracking cookies, no data sales",
    copy: "Jam doesn't sell or share data about students — there's nothing to sell. If visit counting is enabled, it's aggregate and cookie-free (page totals only, never individual people).",
  },
  {
    title: "Links go straight to the source",
    copy: "Applying happens on the employer's or university's own site, under their privacy policy. Jam only links there.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        kicker="Privacy"
        title="Nothing to hide, because nothing is collected"
        lede="Plain-language and short, because there isn't much to say."
      />
      <div className={`${ui.container} py-12`}>
        <ul className="grid max-w-3xl gap-4">
          {POINTS.map((p) => (
            <li key={p.title} className={`flex gap-4 p-5 ${ui.card}`}>
              <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-ok-wash text-ok">
                <Check className="size-4" />
              </span>
              <div>
                <p className="font-semibold">{p.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-fg-muted">{p.copy}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
