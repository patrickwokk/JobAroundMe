import Link from "next/link";
import { JamMark } from "@/components/logo";
import { ArrowRight } from "@/components/icons";
import { ui } from "@/lib/ui";

export default function NotFound() {
  return (
    <div className={`${ui.container} flex flex-col items-center py-28 text-center`}>
      <JamMark className="size-12" />
      <p className="mt-6 font-mono text-sm text-fg-subtle">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">This page walked off the board.</h1>
      <p className="mt-3 max-w-md text-fg-muted">
        Whatever was here is gone or never existed — which, for a job board, means the lifecycle is working.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={ui.btnPrimary}>
          Back home
        </Link>
        <Link href="/jobs" className={ui.btnSecondary}>
          Browse jobs <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
