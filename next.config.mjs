// Content-Security-Policy. Pragmatic (not nonce-based): Next's App Router injects
// inline bootstrap/hydration scripts and styles, so 'unsafe-inline' is required
// without per-request nonces (which would need middleware). We still lock down
// frame-ancestors (anti-clickjacking), restrict embeds to the rights holders we
// actually use (YouTube-nocookie, Internet Archive), and pin image hosts.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://upload.wikimedia.org https://commons.wikimedia.org https://i.ytimg.com https://img.youtube.com",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com https://archive.org",
  "media-src 'self' https://archive.org",
  "worker-src 'self'",
  "manifest-src 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Keep the DB driver / engine packages out of the server bundle (Prisma loads
  // its WASM engine at runtime; pg manages its own connections).
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "pg"],
  // engineType="client" ships a WASM query compiler in the generated client.
  // Vercel's function tracer misses it, so force it into every serverless
  // function — otherwise DB queries 500 at runtime in production.
  outputFileTracingIncludes: {
    "/**": ["./node_modules/.prisma/client/**/*"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "commons.wikimedia.org" },
      // Official studio YouTube upload thumbnails (used as a last-resort preview
      // for films with no freely-licensed Commons image).
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;
