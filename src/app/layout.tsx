import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
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
      <body className="min-h-screen bg-white text-zinc-950">
        <Header />
        <div className="flex min-h-screen flex-col">
          <div className="flex-1 pt-16 md:pt-20 lg:pt-18">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
