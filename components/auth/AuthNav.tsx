"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";

export default function AuthNav() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="h-5 w-16" aria-hidden />;
  }

  if (session?.user) {
    return (
      <span className="flex items-center gap-3">
        <Link
          href="/me"
          className="hidden max-w-[12rem] truncate text-xs normal-case tracking-normal text-kot-char/80 transition-colors hover:text-kot-red sm:inline"
        >
          {session.user.email}
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="inline-flex items-center gap-1 text-kot-ink/80 transition-colors hover:text-kot-red"
        >
          <LogOut aria-hidden className="h-4 w-4" />
          Sign out
        </button>
      </span>
    );
  }

  return (
    <Link
      href="/signin"
      className="inline-flex items-center gap-1 text-kot-ink/80 transition-colors hover:text-kot-red"
    >
      <LogIn aria-hidden className="h-4 w-4" />
      Sign in
    </Link>
  );
}
