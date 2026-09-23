import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, CalendarDays, Database, Tv, ShieldCheck } from "lucide-react";
import { Shell } from "@/components/gamehub/Shell";

export function PublicPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <Shell>
      <main className="mx-auto w-full max-w-[1100px] px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-10 max-w-3xl">
          {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">{title}</h1>
          {intro ? <p className="mt-5 text-lg leading-8 text-muted-foreground">{intro}</p> : null}
        </div>
        <div className="space-y-8">{children}</div>
      </main>
    </Shell>
  );
}

export function InfoCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="panel p-6 sm:p-8">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
          {icon}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="space-y-4 text-[15px] leading-7 text-muted-foreground">{children}</div>
    </section>
  );
}

export function PublicCta() {
  return (
    <section className="panel bg-surface-2/60 p-6 sm:p-8">
      <p className="eyebrow mb-2">Ready to explore?</p>
      <h2 className="text-2xl font-black">Find your next game.</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Browse upcoming sports and see available viewing information in the United States.
      </p>
      <Link
        to="/"
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-bold text-brand-foreground transition-opacity hover:opacity-90"
      >
        Explore SeasonCaddy <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}

export const icons = {
  calendar: <CalendarDays className="h-5 w-5" />,
  database: <Database className="h-5 w-5" />,
  tv: <Tv className="h-5 w-5" />,
  shield: <ShieldCheck className="h-5 w-5" />,
};
