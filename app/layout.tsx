import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abjad Kids",
  description: "Kids learn the Arabic alphabet through play with ABJAD Kids, a safe and ad-free learning app for children.",
  other: {
    "theme-color": "#FDF9F1",
  },
  appleWebApp: {
    capable: true,
    title: "ABJAD Kids",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
