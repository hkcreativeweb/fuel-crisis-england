import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/*
 * Content Security Policy without nonces (nonces would force every page to
 * render dynamically). Next.js needs 'unsafe-inline' for its inline
 * bootstrap scripts. All data fetching (GOV.UK, Upstash, Resend) happens on
 * the server, so the browser only ever talks to this site. vercel.live is
 * allowed so Vercel's preview-deployment toolbar keeps working.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data: https://vercel.live https://vercel.com",
  "font-src 'self' data: https://vercel.live",
  `connect-src 'self' https://vercel.live wss://ws-us3.pusher.com${isDev ? " ws:" : ""}`,
  "frame-src https://vercel.live",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/save-money",
        destination: "/save-fuel-money",
        permanent: true,
      },
      {
        source: "/impact",
        destination: "/cost-of-living",
        permanent: true,
      },
      {
        source: "/mp",
        destination: "/ask-your-mp",
        permanent: true,
      },
      {
        source: "/take-action",
        destination: "/make-a-change",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
