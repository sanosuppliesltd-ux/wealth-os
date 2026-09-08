import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Sidebar, MobileTopBar, MobileBottomNav } from "@/components/sidebar";
import { getProfile } from "@/domain/profile";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfile();

  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${headingFont.variable} min-h-screen bg-cream font-sans text-forest-700 antialiased`}
      >
        <div className="flex min-h-screen w-full">
          <Sidebar isDemoData={profile.isDemoData} />
          <div className="flex min-h-screen flex-1 flex-col">
            <MobileTopBar />
            <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 md:px-10 md:py-10 lg:px-14">
              <div className="mx-auto w-full max-w-4xl">{children}</div>
            </main>
            <MobileBottomNav />
          </div>
        </div>
      </body>
    </html>
  );
}
