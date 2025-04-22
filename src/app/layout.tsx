import { NextDevtoolsProvider } from "@next-devtools/core";
import type { Metadata } from "next";
import { Anton, Geist } from "next/font/google";
import "./globals.css";

const fontHeading = Anton({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "400",
});

const fontBody = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spencer Kline (Developer)",
  description:
    "Web portfolio of Spencer Kline, an engineer specializing in full stack web development, UX, and design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontBody.variable} ${fontHeading.variable} antialiased`}
      >
        <NextDevtoolsProvider>{children}</NextDevtoolsProvider>
      </body>
    </html>
  );
}
