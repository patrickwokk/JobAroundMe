import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
      <p className="kicker">404</p>
      <h1 className="font-display mt-3 text-5xl font-black tracking-tight">
        This listing walked off the board<span className="text-cardinal">.</span>
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
        Whatever was here is gone or never existed — which, for a job board, is working as intended.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 bg-cardinal px-5 py-3 font-mono text-xs uppercase tracking-wider text-paper hover:bg-cardinal-deep"
      >
        Back to the front page
      </Link>
    </div>
  );
}
