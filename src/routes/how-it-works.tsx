import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, MapPin, Search, Tv } from "lucide-react";
import { PublicPage, InfoCard, PublicCta } from "@/components/PublicInfoPage";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How SeasonCaddy Works" },
      { name: "description", content: "See how SeasonCaddy organizes upcoming US sporting events and viewing information." },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <PublicPage
      eyebrow="HOW IT WORKS"
      title="Find your sport. Find your game. Find where to watch."
      intro="SeasonCaddy brings upcoming sporting events and viewing information together so you can spend less time searching and more time watching."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard icon={<Search className="h-5 w-5" />} title="1. Pick your sport">
          <p>Browse the sports and competitions available through SeasonCaddy and find the leagues and events you're interested in.</p>
        </InfoCard>
        <InfoCard icon={<CalendarDays className="h-5 w-5" />} title="2. Find your game">
          <p>Browse upcoming events and see when they are scheduled to take place.</p>
        </InfoCard>
        <InfoCard icon={<Tv className="h-5 w-5" />} title="3. Find where to watch">
          <p>Where viewing information is available, SeasonCaddy displays the relevant provider information for the United States.</p>
        </InfoCard>
        <InfoCard icon={<MapPin className="h-5 w-5" />} title="4. Watch">
          <p>Use the available provider information to continue to the relevant service and confirm current availability before watching or subscribing.</p>
        </InfoCard>
      </div>

      <InfoCard icon={<CalendarDays className="h-5 w-5" />} title="Our data">
        <p>SeasonCaddy combines sports schedule and viewing-availability information from relevant data sources and providers.</p>
        <p>We aim to keep information current, but broadcasting rights, schedules, providers, and availability can change. Always confirm important details with the provider before relying on a listing.</p>
      </InfoCard>

      <PublicCta />
    </PublicPage>
  );
}
