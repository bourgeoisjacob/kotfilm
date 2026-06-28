import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { clientIp, rateLimit } from "@/lib/rateLimit";

// Credentials sign-in must use JWT sessions (the Prisma adapter's database
// sessions only apply to OAuth/email providers). The adapter + User model are
// still wired so OAuth (below) works without a schema change.
// Secrets (AUTH_SECRET, AUTH_GITHUB_ID/SECRET) are read from the environment
// by Auth.js — never hard-coded.

export const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

// GitHub OAuth is enabled only when its credentials are present, so local dev
// works with email/password alone. Auth.js reads AUTH_GITHUB_ID / AUTH_GITHUB_SECRET.
export const githubEnabled = Boolean(
  process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET,
);

const providers: NextAuthConfig["providers"] = [
  Credentials({
    credentials: { email: {}, password: {} },
    authorize: async (raw, request) => {
      // Throttle sign-in attempts per client IP.
      const ip = clientIp(request.headers);
      if (!(await rateLimit(`signin:${ip}`, 10, 10 * 60 * 1000)).ok) return null;

      const parsed = credentialsSchema.safeParse(raw);
      if (!parsed.success) return null;

      const { email, password } = parsed.data;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user?.passwordHash) return null;

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) return null;

      return { id: user.id, email: user.email, name: user.name };
    },
  }),
];
if (githubEnabled) providers.push(GitHub);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  trustHost: true,
  pages: { signIn: "/signin" },
  providers,
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user && typeof token.id === "string") {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
