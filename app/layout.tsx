import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter, Merriweather } from "next/font/google";

import "./globals.css";

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "Kisan-Saathi - AI-Driven Smart Agriculture System",
  description:
    "Predict crop yields and detect crop diseases using AI-powered tools. Advisory support for farmers.",
};

export const viewport: Viewport = {
  themeColor: "#1B7A2D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
