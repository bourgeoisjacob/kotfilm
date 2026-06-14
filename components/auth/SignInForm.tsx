"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Github } from "lucide-react";
import { registerUser } from "@/lib/actions/auth";

export default function SignInForm({ githubEnabled }: { githubEnabled: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      if (mode === "register") {
        const result = await registerUser({ name, email, password });
        if (!result.ok) {
          setError(result.error);
          return;
        }
      }
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError(
          mode === "register"
            ? "Account created, but sign-in failed. Try signing in."
            : "Incorrect email or password.",
        );
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold tracking-wide text-kot-red">
        {mode === "signin" ? "Sign in" : "Create your account"}
      </h1>
      <p className="mt-1 text-sm text-kot-char">
        Save a cloud watchlist, favourites, ratings, and watched history.
      </p>

      {githubEnabled && (
        <>
          <button
            type="button"
            onClick={() => signIn("github", { callbackUrl })}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-kot-ink/30 bg-kot-creamHi px-5 py-2.5 font-display text-sm uppercase tracking-wider text-kot-ink transition-colors hover:border-kot-red hover:text-kot-red"
          >
            <Github aria-hidden className="h-4 w-4" />
            Continue with GitHub
          </button>
          <div className="my-4 flex items-center gap-3 text-xs uppercase tracking-wider text-kot-char/60">
            <span className="h-px flex-1 bg-kot-line" />
            or
            <span className="h-px flex-1 bg-kot-line" />
          </div>
        </>
      )}

      <form onSubmit={submit} className={`flex flex-col gap-4 ${githubEnabled ? "" : "mt-6"}`}>
        {mode === "register" && (
          <label className="flex flex-col gap-1 text-sm text-kot-ink">
            Name <span className="text-kot-char/60">(optional)</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="rounded-md border border-kot-line bg-kot-creamHi px-3 py-2 focus:border-kot-red focus:outline-none focus:ring-2 focus:ring-kot-red/30"
            />
          </label>
        )}

        <label className="flex flex-col gap-1 text-sm text-kot-ink">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="rounded-md border border-kot-line bg-kot-creamHi px-3 py-2 focus:border-kot-red focus:outline-none focus:ring-2 focus:ring-kot-red/30"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-kot-ink">
          Password <span className="text-kot-char/60">(min 8 characters)</span>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "register" ? "new-password" : "current-password"}
            className="rounded-md border border-kot-line bg-kot-creamHi px-3 py-2 focus:border-kot-red focus:outline-none focus:ring-2 focus:ring-kot-red/30"
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-kot-red">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-kot-red px-5 py-2.5 font-display text-sm uppercase tracking-wider text-kot-creamHi transition-colors hover:bg-kot-redDeep disabled:opacity-60"
        >
          {pending
            ? "Please wait…"
            : mode === "signin"
              ? "Sign in"
              : "Create account"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "signin" ? "register" : "signin");
          setError(null);
        }}
        className="mt-4 text-sm text-kot-char underline-offset-4 hover:text-kot-red hover:underline"
      >
        {mode === "signin"
          ? "Need an account? Create one"
          : "Already have an account? Sign in"}
      </button>
    </main>
  );
}
