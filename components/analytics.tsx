import Script from "next/script";

/**
 * Privacy-friendly, $0 traffic logging via GoatCounter (free for
 * non-commercial use; no cookies, GDPR-friendly, ~3 KB script).
 *
 * Off by default. To enable:
 *   1. Create a site at https://www.goatcounter.com (pick a code, e.g. "jobaroundme")
 *   2. Set NEXT_PUBLIC_GOATCOUNTER=<code> at build time
 *      (locally in .env.local, or as the GOATCOUNTER_CODE repository variable
 *       consumed by .github/workflows/deploy.yml)
 */
export function Analytics() {
  const code = process.env.NEXT_PUBLIC_GOATCOUNTER;
  if (!code) return null;
  return (
    <Script
      data-goatcounter={`https://${code}.goatcounter.com/count`}
      src="https://gc.zgo.at/count.js"
      strategy="afterInteractive"
    />
  );
}
