/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the DB driver / engine packages out of the server bundle (Prisma loads
  // its WASM engine at runtime; pg manages its own connections).
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "pg"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "commons.wikimedia.org" },
    ],
  },
};

export default nextConfig;
