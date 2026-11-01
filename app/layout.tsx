import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@/components/analytics";
import { FreshnessBanner } from "@/components/freshness-banner";
import { SITE_URL } from "@/lib/site";
import { THEME_INIT_SCRIPT } from "@/lib/theme-script";

const sans = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

// Serif italic is reserved for a single accent word per page — loaded italic-only.
const serif = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic"],
  axes: ["opsz"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const DESCRIPTION =
  "Campus jobs, professor-led research labs, clubs and Northwest Arkansas internships that build a real resume — verified daily and sorted by major, for University of Arkansas students.";

export const metadata: Metadata = {
  // Trailing slash so relative asset URLs resolve under the GitHub Pages base path.
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: "Jam — Job Around Me · Student work at the University of Arkansas",
    template: "%s · Jam",
  },
  description: DESCRIPTION,
  applicationName: "Jam",
  openGraph: {
    title: "Jam — Job Around Me",
    description: DESCRIPTION,
    siteName: "Jam",
    type: "website",
    images: [{ url: "og.png", width: 1200, height: 630, alt: "Jam — Job Around Me" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jam — Job Around Me",
    description: DESCRIPTION,
    images: ["og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className={`${sans.variable} ${serif.variable} ${mono.variable} antialiased`}>
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <FreshnessBanner />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
