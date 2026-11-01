import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { PageHeader } from "@/components/page-header";
import { Rings } from "@/components/rings";
import { ArrowUpRight, Check } from "@/components/icons";
import { CONTACT_EMAIL, DISCORD_INVITE_URL } from "@/lib/site";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Referral Board",
  description:
    "The Jam Referral Board — a dedicated place where U of A students, interns and alumni trade intros, referrals and straight answers.",
};

const RITUALS = [
  {
    title: "Give first",
    copy: "Interning somewhere? Post an intro: where you work, what you'd tell a sophomore, whether you can refer. Ten minutes of your senior year can change someone's junior year.",
  },
  {
    title: "Ask specifically",
    copy: "“Could anyone refer me to J.B. Hunt's tech internship? Here's my resume and why I fit” gets answers. “Anyone hiring?” doesn't.",
  },
  {
    title: "Close the loop",
    copy: "Landed the interview? The offer? Post the win and pay the referral forward next cycle. The board runs on visible reciprocity.",
  },
];

const CHANNELS = [
  { name: "#intros", desc: "Who you are, where you've worked, what you can help with" },
  { name: "#referral-asks", desc: "Specific requests: company + role + why you fit" },
  { name: "#referral-offers", desc: "Insiders posting capacity — “2 referrals this cycle”" },
  { name: "#wins", desc: "Interviews landed, offers signed, loops closed" },
  { name: "#this-week", desc: "The freshest listings from Jam" },
];

export default function ConnectPage() {
  const open = DISCORD_INVITE_URL.length > 0;
  return (
    <>
      <PageHeader
        kicker="Referral Board"
        title="Referrals beat resumes"
        lede="Most internships are won the way jobs everywhere are won: someone inside said a name. The Jam Referral Board is a dedicated place where U of A students, interns and alumni trade intros, referrals and straight answers. Free, always."
      />

      <div className={`${ui.container} py-12`}>
        <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <div className="relative overflow-hidden rounded-2xl bg-night p-7 text-night-fg sm:p-9">
            <Rings className="pointer-events-none absolute -right-48 -top-48 size-[30rem] text-night-line [mask-image:radial-gradient(circle,black_30%,transparent_70%)]" />
            <div className="relative">
              <p className="inline-flex items-center gap-2 text-xs font-semibold text-night-muted">
                <span className={`size-1.5 rounded-full ${open ? "pulse-dot bg-ok" : "bg-warn"}`} aria-hidden />
                {open ? "Open now" : "Opening soon"}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                {open ? "Join the Referral Board" : "The board opens soon"}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-night-muted">
                It lives on Discord — where students already are. Real-time, works on any phone, and your handle doesn&apos;t
                have to be your transcript. One server, five channels, zero noise.
              </p>
              {open ? (
                <a href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer" className={`${ui.btnPrimary} mt-7 h-11 px-5`}>
                  Join on Discord <ArrowUpRight className="size-4" />
                </a>
              ) : CONTACT_EMAIL ? (
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Referral Board — count me in")}`}
                  className={`${ui.btnNight} mt-7 h-11 px-5`}
                >
                  Get notified when it opens
                </a>
              ) : (
                <p className="mt-7 inline-flex rounded-lg border border-night-line px-4 py-2.5 text-sm text-night-muted">
                  The invite link will appear right here.
                </p>
              )}
            </div>
          </div>

          <div className={`p-7 sm:p-9 ${ui.card}`}>
            <p className={ui.kicker}>Inside the board</p>
            <ul className="mt-4 space-y-3.5">
              {CHANNELS.map((c) => (
                <li key={c.name} className="text-sm">
                  <span className="font-mono text-[13px] font-medium text-accent">{c.name}</span>
                  <p className="mt-0.5 leading-relaxed text-fg-muted">{c.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-16">
          <SectionHeading kicker="House rules" title="Three habits keep it useful" />
          <div className="grid gap-4 lg:grid-cols-3">
            {RITUALS.map((r, i) => (
              <div key={r.title} className={`p-6 ${ui.card}`}>
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-brand-wash text-sm font-semibold text-accent">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{r.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`mt-16 p-7 sm:p-9 ${ui.card}`}>
          <p className={ui.kicker}>Why a dedicated board</p>
          <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-fg-muted sm:grid-cols-2">
            {[
              "One purpose — referrals — instead of an algorithmic feed full of ads.",
              "A handle, not a headshot: ask questions without performing for recruiters.",
              "Public asks create accountability; hand-offs move to DMs when they get real.",
              "Moderated for students: recruiters posing as students are removed, permanently.",
            ].map((line) => (
              <li key={line} className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-ok" />
                {line}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
