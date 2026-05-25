import { Geist_Mono, Urbanist } from "next/font/google";

export const uiSans = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ui-sans",
});

export const uiMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ui-mono",
});
