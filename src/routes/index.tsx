import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Quote,
  Search,
  Database,
  MessageSquare,
  Upload,
  ShieldCheck,
  Layers,
  RefreshCw,
  Users,
  Lock,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingFooter } from "@/components/landing/landing-footer";
import { HeroMock } from "@/components/landing/hero-mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vault — Your company's knowledge, finally searchable" },
      {
        name: "description",
        content:
          "Vault turns your docs, wikis, and PDFs into an AI assistant your whole team can ask. Cited answers, never hallucinated.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--brand-soft),_transparent_60%)] opacity-60"
        />
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-[12px] text-muted-foreground animate-fade-up">
            <Sparkles className="h-3 w-3 text-brand" />
            Now with multi-document reasoning
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl animate-fade-up">
            Your company's knowledge,
            <br />
            <span className="text-muted-foreground">finally searchable.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15.5px] leading-relaxed text-muted-foreground animate-fade-up">
            Vault turns your docs, wikis, and PDFs into an AI assistant your whole team
            can ask. Instant answers. Always cited. Never hallucinated.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-up">
            <Link to="/chat">
              <Button size="lg" className="h-11 gap-2 px-5 text-[14px]">
                Start free trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="h-11 px-5 text-[14px]">
              See it in action →
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Trusted by
            </span>
            {["Acme", "Lumen", "Northwind", "Vertex", "Helio"].map((c) => (
              <span key={c} className="text-[15px] font-semibold tracking-tight text-muted-foreground">
                {c}
              </span>
            ))}
          </div>
        </div>

        <HeroMock />
      </section>

      {/* WHY RAG */}
      <section className="border-t border-border bg-surface px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Eyebrow>Why RAG</Eyebrow>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            ChatGPT is smart. But it doesn't know your company.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground">
            Retrieval-Augmented Generation grounds every answer in your real documents —
            so your team gets accurate, source-backed responses instead of plausible-sounding guesses.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Quote,
                tag: "Problem",
                title: "Generic AI doesn't know your context.",
                body: "Foundation models have no idea about your internal docs, policies, or product specs.",
              },
              {
                icon: Database,
                tag: "Solution",
                title: "RAG retrieves the exact passages.",
                body: "Vault searches your knowledge base and feeds relevant chunks to the model before answering.",
              },
              {
                icon: ShieldCheck,
                tag: "Result",
                title: "Every answer is grounded.",
                body: "Responses link directly to the source documents — verifiable in one click.",
              },
            ].map((c) => (
              <div key={c.tag} className="rounded-2xl border border-border bg-background p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <c.icon className="h-4 w-4 text-foreground" />
                </div>
                <div className="mt-5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {c.tag}
                </div>
                <h3 className="mt-1 text-[17px] font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-border px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Three steps to a knowledge base that talks back.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { n: "01", icon: Upload, t: "Upload", d: "Drag PDFs, Notion exports, Google Docs, and Markdown." },
              { n: "02", icon: Layers, t: "Index", d: "Vault chunks, embeds, and stores them securely." },
              { n: "03", icon: MessageSquare, t: "Ask", d: "Your team chats naturally and gets cited answers." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-muted-foreground">{s.n}</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                    <s.icon className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="mt-6 text-[18px] font-semibold tracking-tight">{s.t}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-border bg-surface px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <Eyebrow>Features</Eyebrow>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Everything your team needs. Nothing they don't.
          </h2>
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {[
              { icon: Quote, t: "Cited answers", d: "Every response shows source documents." },
              { icon: Layers, t: "Multi-doc reasoning", d: "Synthesizes across many sources at once." },
              { icon: Lock, t: "Permission-aware", d: "Respects who can see what." },
              { icon: RefreshCw, t: "Always fresh", d: "Re-index automatically on document changes." },
              { icon: Users, t: "Workspace-wide", d: "Shared chats and saved answers for the team." },
              { icon: ShieldCheck, t: "Private by default", d: "Your data is never used to train models." },
            ].map((f) => (
              <div key={f.t} className="rounded-xl border border-border bg-background p-5">
                <f.icon className="h-4 w-4 text-foreground" />
                <h3 className="mt-4 text-[14.5px] font-semibold">{f.t}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="border-t border-border px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>Security</Eyebrow>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Built for the enterprise.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] text-muted-foreground">
            End-to-end encryption, isolated data per workspace, and SSO out of the box.
            Self-hosted deployment available for regulated teams.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {["SOC 2 Type II", "GDPR", "ISO 27001", "HIPAA", "EU Data Residency"].map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-[12.5px] text-muted-foreground"
              >
                <Check className="h-3 w-3 text-brand" /> {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-surface px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Stop searching. Start asking.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-muted-foreground">
            Set up Vault in under 5 minutes. Free for up to 100 documents.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/chat">
              <Button size="lg" className="h-11 gap-2 px-5 text-[14px]">
                Start free trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-11 px-5 text-[14px]">
              Book a demo
            </Button>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
      <span className="h-px w-6 bg-border" />
      {children}
    </div>
  );
}
