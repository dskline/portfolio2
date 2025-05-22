import { NextDevtoolsProvider } from "@next-devtools/core";
import type { Metadata } from "next";
import { Anton, Geist } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ThemeProvider } from "next-themes";
import { Navbar } from "../features/layout/Navbar";

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
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(fontBody.variable, fontHeading.variable)}>
        <ThemeProvider attribute="class">
          <div className="min-h-screen bg-gray-50 text-neutral-800 antialiased dark:bg-gray-900 dark:text-gray-50">
            <Navbar />
            <NextDevtoolsProvider>{children}</NextDevtoolsProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
