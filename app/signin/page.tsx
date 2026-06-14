import { Suspense } from "react";
import type { Metadata } from "next";
import { githubEnabled } from "@/auth";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign in — Kotfilm",
};

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm githubEnabled={githubEnabled} />
    </Suspense>
  );
}
