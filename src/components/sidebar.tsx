"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import {
  IconHome,
  IconPortfolio,
  IconTarget,
  IconPiggyBank,
  IconSparkle,
  IconSettings,
} from "./icons";

const NAV_ITEMS: Array<{
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}> = [
  { href: "/", label: "Home", icon: IconHome },
  { href: "/portfolio", label: "Portfolio", icon: IconPortfolio },
  { href: "/my-plan", label: "My Plan", icon: IconTarget },
  { href: "/retirement", label: "Retirement", icon: IconPiggyBank },
  { href: "/what-if", label: "What If?", icon: IconSparkle },
  { href: "/settings", label: "Settings", icon: IconSettings },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-700 text-cream">
        <IconSparkle className="h-5 w-5" />
      </div>
      <div>
        <p className="font-serif text-lg font-semibold leading-tight text-forest-700">
          Wealth OS
        </p>
        <p className="text-xs text-forest-400">Private wealth</p>
      </div>
    </div>
  );
}

function DemoNotice() {
  return (
    <div>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        Demo · Prototype
      </span>
      <p className="mt-2 text-xs text-forest-400">
        Demo data only. Not financial advice.
      </p>
    </div>
  );
}

export function Sidebar({ isDemoData }: { isDemoData: boolean }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-forest-100 bg-white px-5 py-6 md:flex">
      <div>
        <Logo />
        <nav className="mt-8 flex flex-col gap-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "border border-forest-100 bg-forest-50 text-forest-700"
                    : "border border-transparent text-forest-400 hover:bg-forest-50/60 hover:text-forest-600"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
      {isDemoData ? <DemoNotice /> : null}
    </aside>
  );
}

export function MobileTopBar() {
  return (
    <header className="flex items-center justify-between border-b border-forest-100 bg-white px-4 py-3 md:hidden">
      <Logo />
    </header>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 flex justify-around border-t border-forest-100 bg-white/95 py-1.5 backdrop-blur md:hidden">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-center text-[10px] font-medium transition-colors ${
              active ? "text-forest-700" : "text-forest-400"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
