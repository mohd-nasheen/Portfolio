import type { Metadata } from "next";
import { Geist, Sora } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Mohamed Nasheen's Portfolio",
  description:
    "Single-page portfolio for a technical support and implementation engineer focused on SaaS, APIs, automation, and AI-enabled product delivery.",
  icons: {
    icon: "/nasheen-profile.jpg",
    shortcut: "/nasheen-profile.jpg",
    apple: "/nasheen-profile.jpg"
  },
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Nash Portfolio",
    description:
      "Engineering + customer outcomes + product thinking in one cinematic portfolio experience.",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${sora.variable}`}>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <a href="#home" className="skip-link">
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
