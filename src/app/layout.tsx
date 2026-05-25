import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { uiMono, uiSans } from "@/app/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Regretify",
  description:
    "Regretify is a regret-first investment calculator for missed opportunities, market movement, and shareable hindsight.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${uiSans.variable} ${uiMono.variable} h-full antialiased`}
    >
      <body className="min-h-full text-zinc-950">
        <Header />
        <div className="min-h-full pt-16 md:pt-20 lg:pt-18">{children}</div>
      </body>
    </html>
  );
}
