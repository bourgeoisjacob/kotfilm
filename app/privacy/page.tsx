import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy — Kotfilm",
  description:
    "What Kotfilm collects, how it is used, and the choices you have. Kotfilm is a non-commercial project with no advertising or tracking.",
};

const LAST_UPDATED = "28 June 2026";
const CONTACT = "bourgeoisjacob@gmail.com";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-semibold uppercase tracking-[0.14em] text-kot-red">
        {title}
      </h2>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-kot-char">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-wide text-kot-red">
          Privacy policy
        </h1>
        <p className="mt-2 leading-relaxed text-kot-char">
          Kotfilm is a curated, non-commercial guide to Soviet cinema. We collect as
          little as possible, show no advertising, and use no third-party analytics or
          tracking. This page explains what we do collect and the choices you have.
        </p>
        <p className="mt-2 text-xs uppercase tracking-wider text-kot-char/70">
          Last updated {LAST_UPDATED}
        </p>
      </header>

      <Section title="What we collect">
        <p>
          <strong className="text-kot-ink">Browsing.</strong> You can browse and search
          the entire catalogue without an account. We do not require you to sign in to
          read film pages or follow watch links.
        </p>
        <p>
          <strong className="text-kot-ink">Account details.</strong> If you create an
          account, we store your email address and an optional display name. Passwords
          are never stored in plain text — only a salted one-way hash. If you choose to
          sign in with GitHub instead, we receive the basic profile information GitHub
          provides to complete sign-in.
        </p>
        <p>
          <strong className="text-kot-ink">Your activity.</strong> When signed in, we
          store the films you add to your watchlist, mark as watched, favourite, or
          rate, so we can show them back to you. This information is linked to your
          account.
        </p>
        <p>
          <strong className="text-kot-ink">Watchlist when signed out.</strong> If you
          add films to a watchlist without an account, that list is saved only in your
          own browser (local storage) and is not sent to us. It is merged into your
          account only if you later sign in.
        </p>
        <p>
          <strong className="text-kot-ink">Cookies.</strong> We use a sign-in session
          cookie (only when you are logged in) and a small preference cookie that
          remembers your viewing region so we can offer the correct watch links. We do
          not use advertising or cross-site tracking cookies.
        </p>
        <p>
          <strong className="text-kot-ink">Technical and security data.</strong> Like
          any website, our hosting briefly processes your IP address to deliver pages,
          to guard sign-in and registration against abuse (rate limiting), and to
          estimate your country so watch links point to a copy available in your
          region. We do not build an advertising or tracking profile from this.
        </p>
      </Section>

      <Section title="What we do not do">
        <p>
          We do not show ads, we do not use analytics suites, and we do not sell, rent,
          or share your personal information with anyone for marketing. Kotfilm is a
          non-commercial project.
        </p>
      </Section>

      <Section title="Services we rely on">
        <p>
          We use a small number of providers purely to run the site:{" "}
          <strong className="text-kot-ink">Vercel</strong> (hosting),{" "}
          <strong className="text-kot-ink">Supabase</strong> (database), and{" "}
          <strong className="text-kot-ink">Upstash</strong> (abuse-prevention store).
          They process data only on our behalf to operate Kotfilm.
        </p>
        <p>
          <strong className="text-kot-ink">Watching films.</strong> Films play through
          embeds from their rights holders — official studio uploads on YouTube (loaded
          in privacy-enhanced &ldquo;no-cookie&rdquo; mode) and public-domain copies on
          the Internet Archive. When you play a film, those services receive the
          request and apply their own privacy policies. We never host video ourselves.
        </p>
      </Section>

      <Section title="Your choices">
        <p>
          You can browse without an account, sign out at any time, and clear a
          signed-out watchlist by clearing your browser&rsquo;s site data. You may
          request access to, or deletion of, your account and its data by contacting us
          at the address below, and we will act on reasonable requests.
        </p>
      </Section>

      <Section title="Children">
        <p>
          Kotfilm is intended for a general audience and is not directed at children
          under 13. We do not knowingly collect personal information from children.
        </p>
      </Section>

      <Section title="Changes">
        <p>
          We may update this policy as the project evolves. Material changes will be
          reflected by the &ldquo;last updated&rdquo; date above.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions or requests about your data:{" "}
          <a
            href={`mailto:${CONTACT}`}
            className="font-semibold text-kot-red underline-offset-4 hover:underline"
          >
            {CONTACT}
          </a>
          .
        </p>
      </Section>
    </main>
  );
}
