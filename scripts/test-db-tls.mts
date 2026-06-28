// Determines whether the DB endpoint's TLS cert verifies against Node's built-in
// CA store (i.e. is publicly trusted) — in which case strict verification needs
// NO downloaded cert. Reads DATABASE_URL from .env; prints nothing sensitive.
//   npx tsx scripts/test-db-tls.mts
import fs from "node:fs";
import path from "node:path";
import { Client } from "pg";

// Minimal .env loader (only DATABASE_URL).
const envPath = path.join(process.cwd(), ".env");
const line = fs.readFileSync(envPath, "utf8").split(/\r?\n/).find((l) => l.startsWith("DATABASE_URL="));
if (!line) { console.error("DATABASE_URL not found in .env"); process.exit(1); }
let conn = line.slice("DATABASE_URL=".length).trim().replace(/^["']|["']$/g, "");

// Strip sslmode so pg uses our explicit ssl options (matches lib/prisma.ts).
if (/[?&]sslmode=/.test(conn)) {
  const u = new URL(conn);
  u.searchParams.delete("sslmode");
  conn = u.toString();
}
console.log("host:", new URL(conn).host, "(testing TLS verification — no password shown)\n");

async function tryConnect(label: string, ssl: object): Promise<boolean> {
  const c = new Client({ connectionString: conn, ssl: ssl as never });
  try {
    await c.connect();
    await c.query("select 1");
    await c.end();
    console.log(`✅ ${label}: connected`);
    return true;
  } catch (e) {
    console.log(`❌ ${label}: ${e instanceof Error ? e.message : e}`);
    try { await c.end(); } catch { /* ignore */ }
    return false;
  }
}

// If a CA is configured (env or .env), test strict verification WITH it — this
// is the real check that your DATABASE_CA_CERT is correct.
const caEnv = process.env.DATABASE_CA_CERT
  ?? fs.readFileSync(envPath, "utf8").match(/DATABASE_CA_CERT="([\s\S]*?)"/)?.[1];

if (caEnv?.includes("BEGIN CERTIFICATE")) {
  const ok = await tryConnect("STRICT + DATABASE_CA_CERT", { rejectUnauthorized: true, ca: caEnv });
  console.log(
    ok
      ? "\n=> ✅ Your DATABASE_CA_CERT verifies the server. Set the same value in Vercel."
      : "\n=> ❌ CA present but verification failed — wrong/garbled cert. Re-download it.",
  );
} else {
  const strict = await tryConnect("STRICT (rejectUnauthorized: true, no custom CA)", { rejectUnauthorized: true });
  if (!strict) await tryConnect("RELAXED (rejectUnauthorized: false)", { rejectUnauthorized: false });
  console.log(
    strict
      ? "\n=> Publicly-trusted cert. Set rejectUnauthorized:true WITHOUT a CA file."
      : "\n=> Not publicly trusted. Download the Supabase CA cert into DATABASE_CA_CERT, then re-run this.",
  );
}
