/** @type {import('next').NextConfig} */
const nextConfig = {
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
