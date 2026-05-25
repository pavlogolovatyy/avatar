import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avatar.pavlo.sh"),
  title: {
    default: "Avatar — Gradient avatars by URL",
    template: "%s — Avatar",
  },
  description:
    "Free gradient avatar generator. Turn any name, email, or string into a unique, deterministic avatar — PNG or SVG, with size and rounded options. No editor, no signup.",
  keywords: [
    "avatar",
    "avatar API",
    "gradient avatar",
    "avatar generator",
    "deterministic avatar",
    "avatar URL",
    "PNG avatar",
    "SVG avatar",
    "open source avatar",
  ],
  authors: [{ name: "Pavlo Golovatyy" }],
  openGraph: {
    type: "website",
    siteName: "Avatar",
    title: "Avatar — Gradient avatars by URL",
    description:
      "Drop any name or email into the URL, get back a unique gradient avatar. PNG or SVG. Free and open source.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avatar — Gradient avatars by URL",
    description:
      "Drop any name or email into the URL, get back a unique gradient avatar. PNG or SVG.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
