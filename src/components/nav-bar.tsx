"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/my-plan", label: "My Plan" },
  { href: "/retirement", label: "Retirement" },
  { href: "/what-if", label: "What If?" },
  { href: "/settings", label: "Settings" },
] as const;

export function NavBar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop / tablet top navigation */}
      <header className="hidden border-b border-forest-100 md:block">
        <div className="flex items-center justify-between px-6 py-4 lg:px-8">
          <span className="font-serif text-xl font-semibold tracking-tight text-forest-700">
            Wealth OS
          </span>
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-forest-700 text-cream"
                      : "text-forest-600 hover:bg-forest-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile top bar */}
      <header className="flex items-center justify-between border-b border-forest-100 px-4 py-4 md:hidden">
        <span className="font-serif text-lg font-semibold tracking-tight text-forest-700">
          Wealth OS
        </span>
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-10 flex justify-around border-t border-forest-100 bg-cream/95 py-2 backdrop-blur md:hidden">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 rounded-xl py-1.5 text-center text-[11px] font-medium transition-colors ${
                active ? "text-forest-700" : "text-forest-400"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
