import path from "node:path";
import { defineConfig } from "prisma/config";

// With a Prisma config file present, Prisma no longer auto-loads `.env`, so we
// load it ourselves. The local MVP keeps DATABASE_URL there (see .env.example).
// No-op if the file is absent (e.g. CI sets DATABASE_URL directly).
try {
  process.loadEnvFile(path.join(process.cwd(), ".env"));
} catch {
  // .env is optional — ignore when missing.
}

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    // Replaces the deprecated package.json#prisma.seed entry.
    seed: "tsx prisma/seed.ts",
  },
});
