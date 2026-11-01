"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Lab } from "@/lib/types";
import { META } from "@/lib/data";
import { isRecent } from "@/lib/format";
import { ui } from "@/lib/ui";
import { Badge } from "@/components/badge";
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

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard unavailable — the text is still selectable */
        }
      }}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-accent transition-colors hover:bg-brand-wash"
      aria-label={`Copy ${label}`}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function ComposerDialog({ lab, onClose }: { lab: Lab; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("sophomore");
  const [hook, setHook] = useState("");

  // Native modal: focus trap, Escape, and inert background for free.
  // (No close() in cleanup — StrictMode's double effect would close it at once.)
  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);

  const { subject, body } = useMemo(() => draftEmail(lab, name, major, year, hook), [lab, name, major, year, hook]);
  const field = "block text-sm";
  const label = "mb-1 block text-xs font-medium text-fg-muted";

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      aria-label={`Draft an intro email to ${lab.name}`}
      className="m-auto max-h-[92vh] w-[min(42rem,calc(100%-1.5rem))] overflow-y-auto rounded-2xl border border-line bg-surface p-0 text-fg shadow-[var(--elev-2)]"
    >
      <div className="p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={ui.kicker}>Draft an intro email</p>
            <h3 className="mt-1 text-xl font-bold tracking-tight">{lab.name}</h3>
            <p className="mt-0.5 text-sm text-fg-muted">
              {lab.pi ? `PI: ${lab.pi} · ` : ""}
              {lab.department}
            </p>
          </div>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Close"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-muted hover:text-fg"
          >
            <XMark className="size-4" />
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <label className={field}>
            <span className={label}>Your name</span>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={ui.input}
              placeholder="Jordan Lee"
            />
          </label>
          <label className={field}>
            <span className={label}>Your major</span>
            <input
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className={ui.input}
              placeholder="Computer Engineering"
            />
          </label>
          <label className={field}>
            <span className={label}>Year</span>
            <select value={year} onChange={(e) => setYear(e.target.value)} className={ui.input}>
              {["freshman", "sophomore", "junior", "senior", "master's student"].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
          <label className={`${field} sm:col-span-3`}>
            <span className={label}>Why you? One sentence — a course, project, or skill</span>
            <input
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              className={ui.input}
              placeholder="I earned an A in Signals & Systems and build audio DSP projects in Python."
            />
          </label>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-xl border border-line bg-subtle p-3.5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-fg-subtle">Subject</p>
              <CopyButton text={subject} label="subject" />
            </div>
            <p className="mt-1 text-sm font-medium">{subject}</p>
          </div>
          <div className="rounded-xl border border-line bg-subtle p-3.5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-fg-subtle">Body</p>
              <CopyButton text={body} label="email body" />
            </div>
            <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed">{body}</pre>
          </div>
        </div>

        <ul className="mt-5 space-y-1.5 text-xs leading-relaxed text-fg-muted">
          <li>· Find the professor&apos;s email on the lab site or the U of A directory — one professor at a time, never a mass email.</li>
          <li>· Mention one specific paper or project; it&apos;s the difference between deleted and answered.</li>
          <li>· Attach a one-page resume. No reply in a week? One polite follow-up is normal.</li>
          <li>· Nothing you type here leaves your device.</li>
        </ul>
      </div>
    </dialog>
  );
}

export function LabCard({ lab }: { lab: Lab }) {
  const [open, setOpen] = useState(false);
  const updatedRecently = isRecent(lab.activity?.lastPostAt, REF);
  return (
    <article className={`flex h-full flex-col p-5 ${ui.card} ${ui.cardHover}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium text-fg-subtle">{lab.department}</p>
        {lab.activity?.hiringSignal ? (
          <Badge tone="ok" className="shrink-0">
            <Signal className="size-3" /> Recruiting
          </Badge>
        ) : null}
      </div>
      <h3 className="mt-2 text-base font-semibold leading-snug tracking-[-0.01em]">{lab.name}</h3>
      {lab.pi ? <p className="mt-0.5 text-sm text-fg-muted">{lab.pi}</p> : null}
      <p className="mt-3 flex flex-wrap gap-1.5">
        {lab.areas.map((a) => (
          <span key={a} className={ui.chip}>
            {a}
          </span>
        ))}
      </p>
      {lab.contactHint ? <p className="mt-3 text-sm leading-relaxed text-fg-muted">{lab.contactHint}</p> : null}
      <p className="mt-auto pt-4 text-xs text-fg-subtle">
        {updatedRecently && lab.activity?.lastPostAt
          ? `Site active · last post ${new Date(lab.activity.lastPostAt).getFullYear()}`
          : "Site verified reachable"}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-4">
        <a href={lab.url} target="_blank" rel="noreferrer" className={`${ui.btnSecondary} px-3 py-2 text-xs`}>
          Visit site <ArrowUpRight className="size-3.5" />
        </a>
        <button type="button" onClick={() => setOpen(true)} className={`${ui.btnPrimary} px-3 py-2 text-xs`}>
          <Mail className="size-3.5" /> Draft intro
        </button>
      </div>
      {open ? <ComposerDialog lab={lab} onClose={() => setOpen(false)} /> : null}
    </article>
  );
}
