import { createFileRoute } from "@tanstack/react-router";
import { PublicPage, InfoCard, PublicCta, icons } from "@/components/PublicInfoPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SeasonCaddy" },
      { name: "description", content: "Learn what SeasonCaddy is, how it works, and how we organize sports viewing information for US fans." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PublicPage
      eyebrow="ABOUT SEASONCADDY"
      title="Never miss where your game is streaming."
      intro="SeasonCaddy is a sports discovery platform designed to make it easier to find upcoming sporting events and understand where they are available to watch in the United States."
    >
      <InfoCard icon={icons.calendar} title="How SeasonCaddy works">
        <p>SeasonCaddy organizes upcoming sporting events and connects them with available viewing information.</p>
        <p>Depending on the sport, competition, and event, SeasonCaddy can show the sport, league or competition, teams or participants, date and start time, and available viewing provider information.</p>
        <p>The goal is simple: start with the game you want to watch and quickly find the information you need to watch it.</p>
      </InfoCard>

      <InfoCard icon={icons.database} title="Where our information comes from">
        <p>SeasonCaddy combines sports schedule and viewing-availability information from relevant data sources and providers.</p>
        <p>We aim to present useful viewing information while keeping the underlying data as close to its original source as possible.</p>
        <p>Sports schedules and broadcasting rights can change. Users should confirm important viewing details with the relevant provider before purchasing a subscription or service.</p>
      </InfoCard>

      <InfoCard icon={icons.tv} title="Why we built SeasonCaddy">
        <p>Sports viewing has become increasingly fragmented. A single fan may need to check several services to determine where a game is available.</p>
        <p>SeasonCaddy was built to make that process simpler by bringing sports schedules and viewing information together in one place.</p>
        <p>SeasonCaddy is designed to be a useful consumer product first. Provider and affiliate relationships may support the platform, but the product exists to help fans find and follow their sports.</p>
      </InfoCard>

      <PublicCta />
    </PublicPage>
  );
}
