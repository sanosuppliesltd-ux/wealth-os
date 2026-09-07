import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const headingFont = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wealth OS — Demo",
  description:
    "Wealth OS: a personal wealth-management and retirement-planning application. Phase 0 production foundation — demo data only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${headingFont.variable} min-h-screen bg-cream font-sans text-forest-700 antialiased`}
      >
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col pb-20 md:pb-0">
          <NavBar />
          <main className="flex-1 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
