import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundPattern from "@/components/UiComponent/BackgroundPattern";
import { OfflineBanner } from "@/components/UiComponent/OfflineBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Talking File",
  description: "Read documents with voice",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="hydrated">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen text-white overflow-x-hidden`}
      >
        <BackgroundPattern />
        <OfflineBanner/>
        {children}
      </body>
    </html>
  );
}
