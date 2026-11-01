import type { ReactNode } from "react";
import { ui } from "@/lib/ui";

export function PageHeader({
  kicker,
  title,
  lede,
  children,
}: {
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-line bg-subtle">
      <div className={`${ui.container} py-12 sm:py-16`}>
        <p className={ui.kicker}>{kicker}</p>
        <h1 className={`mt-2 ${ui.h1}`}>{title}</h1>
        {lede ? <p className={ui.lede}>{lede}</p> : null}
        {children}
      </div>
    </div>
  );
}
