import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ExternalLink, Handshake, Info } from "lucide-react";
import { PublicPage, InfoCard } from "@/components/PublicInfoPage";

export const Route = createFileRoute("/affiliate-disclosure")({
  head: () => ({
    meta: [
      { title: "Affiliate Disclosure | SeasonCaddy" },
      { name: "description", content: "SeasonCaddy's affiliate and referral disclosure." },
    ],
  }),
  component: AffiliateDisclosurePage,
});

function AffiliateDisclosurePage() {
  return (
    <PublicPage
      eyebrow="TRANSPARENCY"
      title="Affiliate Disclosure"
      intro="SeasonCaddy may participate in affiliate and referral programs with relevant service providers."
    >
      <InfoCard icon={<Handshake className="h-5 w-5" />} title="How affiliate links work">
        <p>Some links displayed through SeasonCaddy may be affiliate links. If you click a qualifying affiliate link and subsequently complete a qualifying action, SeasonCaddy may receive compensation from the provider or affiliate network.</p>
        <p>Using an affiliate link does not generally result in an additional cost to you. Affiliate relationships help support the operation, maintenance, and development of SeasonCaddy.</p>
      </InfoCard>

      <InfoCard icon={<Info className="h-5 w-5" />} title="Our approach">
        <p>SeasonCaddy's goal is to help users discover where sporting events are available to watch. We aim to provide useful viewing information regardless of whether a particular provider offers an affiliate relationship with SeasonCaddy.</p>
        <p>Provider availability, pricing, subscriptions, geographic restrictions, schedules, and broadcast rights are controlled by the relevant provider and may change.</p>
      </InfoCard>

      <InfoCard icon={<ExternalLink className="h-5 w-5" />} title="Third-party providers">
        <p>SeasonCaddy is an independent platform. Unless explicitly stated otherwise, the appearance of a provider, broadcaster, league, team, or other organization on SeasonCaddy does not mean that the organization sponsors, operates, or endorses SeasonCaddy.</p>
        <p>Third-party names, trademarks, and logos remain the property of their respective owners.</p>
      </InfoCard>

      <div className="panel p-6 text-sm leading-7 text-muted-foreground">
        Questions about our affiliate relationships? <Link className="font-semibold text-brand hover:underline" to="/contact">Contact SeasonCaddy</Link>.
      </div>
    </PublicPage>
  );
}
