import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ReviewCash",
  description: "Monetize your attention. Complete micro-tasks. Get paid instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable}`}>
      <body className="min-h-full flex flex-col font-sans tracking-tight bg-[#0A0A0A] text-[#EDEDED] selection:bg-[#00E5FF]/30">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
