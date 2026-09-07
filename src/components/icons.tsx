import type { SVGProps } from "react";

/**
 * Minimal hand-rolled icon set (no icon-library dependency, per the
 * "avoid unnecessary dependencies" principle). Each icon is a plain
 * 24x24 stroke SVG.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconHome(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

export function IconPortfolio(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M7 15l3.5-4 3 2.5L18 8" />
    </svg>
  );
}

export function IconTarget(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.5" />
    </svg>
  );
}

export function IconPiggyBank(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="11" cy="13" rx="6.5" ry="4.75" />
      <path d="M17 11.5 19.5 10v3.5" />
      <path d="M9 8.5V7a1 1 0 0 1 1-1h1.5" />
      <path d="M8 17.5V19M14 17.5V19" />
      <circle cx="8" cy="12.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconSparkle(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M12 3c.3 2.3 1 4 2.1 5.1S16.7 9.7 19 10c-2.3.3-4 1-5.1 2.1S12 14.7 12 17c-.3-2.3-1-4-2.1-5.1S7.3 10.3 5 10c2.3-.3 4-1 5.1-2.1S11.7 5.3 12 3Z" />
      <path d="M18.5 15.2c.15 1 .5 1.7.9 2.1.4.4 1.1.75 2.1.9-1 .15-1.7.5-2.1.9-.4.4-.75 1.1-.9 2.1-.15-1-.5-1.7-.9-2.1-.4-.4-1.1-.75-2.1-.9 1-.15 1.7-.5 2.1-.9.4-.4.75-1.1.9-2.1Z" />
    </svg>
  );
}

export function IconSettings(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V19.6a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H4.4a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.56-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H10a1.7 1.7 0 0 0 1-1.55V4.4a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V10c.14.42.42.78.79 1H19.6a2 2 0 1 1 0 4h-.09c-.42 0-.79.24-1 .5Z" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
    </svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconLink(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11 6.5 12.6 5A3.5 3.5 0 1 1 17.6 10l-1.6 1.6" />
      <path d="M13 17.5 11.4 19A3.5 3.5 0 1 1 6.4 14l1.6-1.6" />
    </svg>
  );
}

export function IconUser(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8.5" r="3.25" />
      <path d="M5 19.5a7 7 0 0 1 14 0" />
    </svg>
  );
}

export function IconTrendingDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7l6 6 4-4 6 6" />
      <path d="M20 10v5h-5" />
    </svg>
  );
}

export function IconWallet(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 8A2.5 2.5 0 0 1 6 5.5h11A1.5 1.5 0 0 1 18.5 7v1" />
      <rect x="3.5" y="8" width="17" height="11" rx="2" />
      <path d="M16 13.5h2" />
    </svg>
  );
}

export function IconInfo(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5" />
      <path d="M12 8h.01" />
    </svg>
  );
}
