import type { NextConfig } from "next";

// Deliberately minimal and host-agnostic: no platform-specific runtime
// flags, no Edge runtime, no Vercel/Railway-only configuration. This
// must run unmodified on a plain Node 20+ host, Vercel, Railway, Render,
// or a self-managed VPS.
const nextConfig: NextConfig = {};

export default nextConfig;
