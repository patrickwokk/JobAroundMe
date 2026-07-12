import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { ArrowUpRight, Check, Mail, Signal } from "@/components/icons";
import { DISCORD_INVITE_URL, DISCUSSIONS_URL, REPO_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Connect & Referrals",
  description:
    "The Razorback Referral Board — a dedicated home where U of A students, interns and alumni trade intros, referrals and straight answers.",
};

const RITUALS = [
  {
    title: "Give first",
    copy: "Interning somewhere? Post an intro: where you work, what you'd tell a sophomore, whether you can refer. Ten minutes of your senior year changes someone's junior year.",
  },
  {
    title: "Ask specifically",
    copy: "\"Can anyone refer me to J.B. Hunt's tech internship? Here's my resume and why I fit\" gets answers. \"Anyone hiring?\" doesn't. Specific asks are answerable asks.",
  },
  {
    title: "Close the loop",
    copy: "Got the interview? The offer? Post the win and pay the referral forward next cycle. The board runs on visible reciprocity.",
  },
];

const CHANNELS = [
  { name: "#intros", desc: "who you are, where you've worked, what you can help with" },
  { name: "#referral-asks", desc: "specific requests: company + role + why you fit" },
  { name: "#referral-offers", desc: "insiders posting capacity: “2 referrals this cycle”" },
  { name: "#wins", desc: "interviews landed, offers signed, loops closed" },
  { name: "#this-week", desc: "the freshest listings from the board, auto-posted" },
];

export default function ConnectPage() {
  const boardOpen = DISCORD_INVITE_URL.length > 0;
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="kicker">Connect · The Referral Board</p>
      <h1 className="font-display mt-2 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
        Referrals beat resumes<span className="text-cardinal">.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
        Most NWA internships are won the way jobs everywhere are won: someone inside said a name.
        The Referral Board is a dedicated home — its own place, not a feed bolted onto someone
        else&apos;s platform — where U of A students, interns and alumni trade intros, referrals
        and straight answers. Free, forever.
      </p>

      {/* ————— The dedicated home ————— */}
      <div className="mt-10 grid gap-px overflow-hidden border-2 border-ink bg-line lg:grid-cols-[1.2fr_1fr]">
        <div className="bg-ink p-7 text-paper sm:p-9">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-paper/70">
            <Signal className="size-4 text-cardinal" /> The board lives on Discord
          </p>
          <h2 className="font-display mt-3 text-3xl font-black tracking-tight">
            {boardOpen ? "The board is open." : "Opening soon."}
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/70">
            Discord is where students already are: real-time, works on every phone, no resume-farm
            vibes, and your handle doesn&apos;t have to be your transcript. One server, five
            channels, zero noise.
          </p>
          {boardOpen ? (
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-cardinal px-5 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-colors hover:bg-cardinal-deep"
            >
              Join the Referral Board <ArrowUpRight className="size-4" />
            </a>
          ) : (
            <p className="mt-6 inline-flex items-center gap-2 border border-paper/30 px-5 py-3 font-mono text-xs uppercase tracking-wider text-paper/80">
              Invite link drops here — check back this week
            </p>
          )}
          <p className="mt-4 text-xs text-paper/50">
            Until then, the{" "}
            <a href={DISCUSSIONS_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-paper">
              public archive
            </a>{" "}
            takes asks today.
          </p>
        </div>
        <div className="bg-paper p-7 sm:p-9">
          <p className="kicker">The channel map</p>
          <ul className="mt-4 space-y-3">
            {CHANNELS.map((c) => (
              <li key={c.name} className="flex gap-3 text-sm">
                <span className="shrink-0 font-mono text-[12px] font-medium text-cardinal">{c.name}</span>
                <span className="leading-relaxed text-ink-soft">{c.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-14">
        <SectionHeading kicker="House rules" title="Three rituals keep it useful" />
        <div className="grid gap-4 lg:grid-cols-3">
          {RITUALS.map((r, i) => (
            <div key={r.title} className="border border-line bg-paper p-6">
              <p className="font-display text-3xl font-black text-cardinal">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="font-display mt-2 text-xl font-bold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-2">
        <div className="border border-line bg-paper p-7">
          <p className="kicker">Why not just LinkedIn / a group chat?</p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
            {[
              "A dedicated place with one purpose — referrals — instead of an algorithmic feed with ads.",
              "Identity-light: you're a Razorback with a handle, not a headshot with a follower count.",
              "Public asks create accountability; hand-offs move to DMs when they get real.",
              "The archive channel keeps answers searchable, so next year's students inherit this year's intel.",
            ].map((line) => (
              <li key={line} className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-moss" />
                {line}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-2 border-ink bg-paper-2 p-7">
          <p className="kicker">Where this goes · v2</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            When the board outgrows a server, the{" "}
            <a href={`${REPO_URL}/blob/main/docs/CONNECT.md`} target="_blank" rel="noreferrer" className="font-medium text-cardinal underline-offset-2 hover:underline">
              v2 blueprint
            </a>{" "}
            describes a purpose-built network — still $0 at student scale:
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-cardinal" />
              <span>
                <strong className="text-ink">@uark.edu-verified profiles</strong> — magic-link
                sign-in restricted to campus emails, so every member is provably Razorback.
              </span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-cardinal" />
              <span>
                <strong className="text-ink">An opt-in insider directory</strong> — filter by
                company and major: &ldquo;who&apos;s at Walmart Tech from EECS?&rdquo;
              </span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-cardinal" />
              <span>
                <strong className="text-ink">Karma that means something</strong> — completed
                referrals counted publicly. Blind&apos;s candor, minus the anonymity that breeds
                its toxicity.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
