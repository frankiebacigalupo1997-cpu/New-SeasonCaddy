import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare, AlertCircle } from "lucide-react";
import { PublicPage, InfoCard } from "@/components/PublicInfoPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SeasonCaddy" },
      { name: "description", content: "Contact SeasonCaddy with questions, feedback, data corrections, or business inquiries." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PublicPage
      eyebrow="CONTACT"
      title="We'd like to hear from you."
      intro="Have a question, found incorrect information, or want to discuss SeasonCaddy? Get in touch."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <InfoCard icon={<MessageSquare className="h-5 w-5" />} title="Support">
          <p>Questions about using SeasonCaddy, account features, sports listings, or viewing information.</p>
        </InfoCard>
        <InfoCard icon={<AlertCircle className="h-5 w-5" />} title="Data corrections">
          <p>If you find an incorrect fixture, competition, provider, or viewing listing, please tell us what is wrong and include the event details.</p>
        </InfoCard>
        <InfoCard icon={<Mail className="h-5 w-5" />} title="Business inquiries">
          <p>We welcome inquiries about provider relationships, media opportunities, partnerships, and other business matters.</p><p><a href="mailto:frankie@seasoncaddy.com" className="font-semibold text-brand hover:underline">frankie@seasoncaddy.com</a></p>
        </InfoCard>
      </div>

      <section className="panel p-6 sm:p-8">
        <h2 className="text-2xl font-bold">Email SeasonCaddy</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          For support, corrections, feedback, or business inquiries, email us directly.
        </p>
        <a
          href="mailto:frankie@seasoncaddy.com"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-bold text-brand-foreground transition-opacity hover:opacity-90"
        >
          <Mail className="h-4 w-4" />
          frankie@seasoncaddy.com
        </a>
      </section>
    </PublicPage>
  );
}
