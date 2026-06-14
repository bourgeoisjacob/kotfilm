import { Suspense } from "react";
import type { Metadata } from "next";
import { githubEnabled } from "@/auth";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign in — Kotfilm",
};

// Read the GitHub-enabled flag at request time (not baked at build), so the
// "Continue with GitHub" button reflects current env vars without a rebuild.
export const dynamic = "force-dynamic";

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm githubEnabled={githubEnabled} />
    </Suspense>
  );
}
