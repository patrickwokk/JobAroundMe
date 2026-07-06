"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Lab } from "@/lib/types";
import { META } from "@/lib/data";
import { isRecent } from "@/lib/format";
import { ArrowUpRight, Check, Copy, Mail, Signal, XMark } from "@/components/icons";

const REF = Date.parse(META.lastRefreshed);

function semesterAfter(ms: number): string {
  const d = new Date(ms);
  const month = d.getUTCMonth(); // 0-11
  const year = d.getUTCFullYear();
  // Through August, aim for the fall semester; after that, next spring.
  if (month <= 7) return `Fall ${year}`;
  return `Spring ${year + 1}`;
}

function draftEmail(lab: Lab, name: string, major: string, year: string, hook: string) {
  const pi = lab.pi.trim();
  const lastName = pi.split(" ").at(-1);
  const greeting = pi ? `Dear Dr. ${lastName},` : "Dear Professor [last name],";
  const area = lab.areas[0]?.toLowerCase() ?? "your research";
  const yearMajor = [year && `a ${year}`, major && `studying ${major}`].filter(Boolean).join(" ");
  const who = [name || "[your name]", yearMajor].filter(Boolean).join(", ");
  const subject = `Undergraduate interested in ${area} — ${semesterAfter(REF)} availability`;
  const body = `${greeting}

I'm ${who} at the University of Arkansas. I came across the ${lab.name} and was drawn to your work on ${area}.

${hook || "[One sentence: a course, project, or skill that makes you useful to this lab.]"}

I'd love to contribute as an undergraduate research assistant — for course credit, hourly, or as a volunteer to start. Would you have 15 minutes in the coming weeks to talk about whether there's a fit?

My resume is attached. Thank you for your time.

Best regards,
${name || "[your name]"}
${major || "[major]"} · University of Arkansas`;
  return { subject, body };
}

function ComposerDialog({ lab, onClose }: { lab: Lab; onClose: () => void }) {
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("sophomore");
  const [hook, setHook] = useState("");
  const [copied, setCopied] = useState<"subject" | "body" | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const { subject, body } = useMemo(() => draftEmail(lab, name, major, year, hook), [lab, name, major, year, hook]);

  async function copy(text: string, which: "subject" | "body") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      /* clipboard unavailable — user can select manually */
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Draft an intro email to ${lab.name}`}
    >
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto border-t-4 border-cardinal bg-paper p-5 shadow-2xl sm:border-4 sm:border-ink sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="kicker">Draft an intro email</p>
            <h3 className="font-display mt-1 text-2xl font-black tracking-tight">{lab.name}</h3>
            <p className="mt-0.5 text-sm text-ink-soft">
              {lab.pi ? `PI: ${lab.pi} · ` : ""}
              {lab.department}
            </p>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="border border-line-strong p-1.5 text-ink-soft hover:border-ink hover:text-ink"
          >
            <XMark className="size-4" />
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">Your name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-line-strong bg-paper px-3 py-2 text-sm focus:border-ink"
              placeholder="Alex Razorback"
            />
          </label>
          <label className="text-sm">
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">Your major</span>
            <input
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="mt-1 w-full border border-line-strong bg-paper px-3 py-2 text-sm focus:border-ink"
              placeholder="Computer Engineering"
            />
          </label>
          <label className="text-sm">
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">Year</span>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 w-full border border-line-strong bg-paper px-3 py-2 text-sm focus:border-ink"
            >
              {["freshman", "sophomore", "junior", "senior", "master's student"].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm sm:col-span-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">
              Why you? (one sentence — a course, project, or skill)
            </span>
            <input
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              className="mt-1 w-full border border-line-strong bg-paper px-3 py-2 text-sm focus:border-ink"
              placeholder="I earned an A in Signals & Systems and build audio DSP projects in Python."
            />
          </label>
        </div>

        <div className="mt-5 space-y-3">
          <div className="border border-line bg-paper-2 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs text-ink-soft">Subject</p>
              <button
                onClick={() => copy(subject, "subject")}
                className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-cardinal hover:underline"
              >
                {copied === "subject" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copied === "subject" ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="mt-1 text-sm font-medium">{subject}</p>
          </div>
          <div className="border border-line bg-paper-2 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs text-ink-soft">Body</p>
              <button
                onClick={() => copy(body, "body")}
                className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-cardinal hover:underline"
              >
                {copied === "body" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copied === "body" ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink">{body}</pre>
          </div>
        </div>

        <ul className="mt-5 space-y-1.5 text-xs leading-relaxed text-ink-soft">
          <li>· Find the professor&apos;s email on the lab site or the U of A directory — never mass-email.</li>
          <li>· Reference one specific paper or project; it&apos;s the difference between deleted and answered.</li>
          <li>· Attach a one-page resume. No response in a week? One polite follow-up is normal.</li>
        </ul>
      </div>
    </div>
  );
}

export function LabCard({ lab }: { lab: Lab }) {
  const [open, setOpen] = useState(false);
  const updatedRecently = isRecent(lab.activity?.lastPostAt, REF);
  return (
    <article className="lift flex flex-col border border-line bg-paper p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">{lab.department}</p>
        {lab.activity?.hiringSignal ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-moss-wash px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-moss">
            <Signal className="size-3" /> Recruiting signal
          </span>
        ) : null}
      </div>
      <h3 className="font-display mt-2 text-lg font-bold leading-snug tracking-tight">{lab.name}</h3>
      {lab.pi ? <p className="mt-0.5 text-sm text-ink-soft">PI: {lab.pi}</p> : null}
      <p className="mt-2 flex flex-wrap gap-x-2.5 gap-y-1 text-xs text-ink-soft">
        {lab.areas.map((a) => (
          <span key={a} className="border border-line px-1.5 py-0.5">
            {a}
          </span>
        ))}
      </p>
      {lab.contactHint ? <p className="mt-3 text-xs italic leading-relaxed text-ink-soft">{lab.contactHint}</p> : null}
      <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
        {updatedRecently && lab.activity?.lastPostAt
          ? `Site updated ${new Date(lab.activity.lastPostAt).getFullYear()}`
          : "Site verified reachable"}
      </div>
      <div className="mt-4 flex gap-2 border-t border-line pt-4">
        <a
          href={lab.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-1.5 border border-ink px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors hover:bg-ink hover:text-paper"
        >
          Visit site <ArrowUpRight className="size-3.5" />
        </a>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex flex-1 items-center justify-center gap-1.5 bg-cardinal px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-paper transition-colors hover:bg-cardinal-deep"
        >
          <Mail className="size-3.5" /> Draft intro
        </button>
      </div>
      {open ? <ComposerDialog lab={lab} onClose={() => setOpen(false)} /> : null}
    </article>
  );
}
