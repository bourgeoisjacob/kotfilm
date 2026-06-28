"use server";

import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { clientIp, rateLimit } from "@/lib/rateLimit";

const registerSchema = z.object({
  name: z.string().trim().max(100).optional(),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export type RegisterResult = { ok: true } | { ok: false; error: string };

export async function registerUser(input: {
  name?: string;
  email: string;
  password: string;
}): Promise<RegisterResult> {
  // Throttle account creation per client IP.
  const ip = clientIp(await headers());
  const limit = await rateLimit(`register:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return {
      ok: false,
      error: `Too many attempts. Try again in ${limit.retryAfterSec}s.`,
    };
  }

  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { name, email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, error: "An account with that email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { email, name: name || null, passwordHash },
  });
  return { ok: true };
}
