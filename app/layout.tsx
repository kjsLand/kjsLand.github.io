import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Chakra_Petch, JetBrains_Mono, Oxanium } from "next/font/google";
import { site } from "@/content";

/** Boxy, squared-off type throughout: Chakra Petch for text, Oxanium for display, JetBrains Mono for labels. */
const sans = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans-face",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-face" });
/** Display face for the hero name, headings, and accent words. Swap this one import to try a different look. */
const display = Oxanium({ subsets: ["latin"], variable: "--font-display-face" });

export const metadata: Metadata = {
  title: `${site.name} — ${site.roles[0]}`,
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.roles[0]}`,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d12",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <head>
        {/* Without JS, skip the reveal-on-scroll so content is never stuck invisible. */}
        <noscript>
          <style>{`.reveal,.split-char{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
