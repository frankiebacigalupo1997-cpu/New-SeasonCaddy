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
        <h2 className="text-2xl font-bold">Contact form</h2>
        <p className="mt-2 text-muted-foreground">Use the form below to prepare your message. Submission delivery will be connected to SeasonCaddy's support inbox.</p>
        <form className="mt-6 grid gap-5">
          <label className="grid gap-2 text-sm font-semibold">
            Name
            <input className="gh-select" name="name" autoComplete="name" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Email
            <input className="gh-select" name="email" type="email" autoComplete="email" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Subject
            <input className="gh-select" name="subject" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Message
            <textarea className="gh-select min-h-40 resize-y" name="message" />
          </label>
          <button type="button" disabled className="w-fit cursor-not-allowed rounded-lg bg-brand/50 px-5 py-3 text-sm font-bold text-brand-foreground">
            Email us at frankie@seasoncaddy.com
          </button>
        </form>
      </section>
    </PublicPage>
  );
}
