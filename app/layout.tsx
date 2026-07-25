import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FDF9F1] dark:bg-slate-950 transition-colors">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline-none">
    Skip to content
  </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster richColors position="top-center" expand={true} />
        </ThemeProvider>
      </body>
    </html>
  );
}
