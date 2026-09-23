import { createFileRoute } from "@tanstack/react-router";
import { PublicPage } from "@/components/PublicInfoPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | SeasonCaddy" },
      { name: "description", content: "SeasonCaddy terms of service." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PublicPage eyebrow="LEGAL" title="Terms of Service" intro="Effective September 23, 2026.">
      <section className="panel p-6 sm:p-8">
        <div className="space-y-8 text-[15px] leading-7 text-muted-foreground">
          <PolicySection title="1. About SeasonCaddy">
            <p>SeasonCaddy is a sports discovery platform that provides information about upcoming sporting events and, where available, viewing or streaming information.</p>
          </PolicySection>
          <PolicySection title="2. Use of the service">
            <p>You may use SeasonCaddy for lawful personal and informational purposes.</p>
            <p>You agree not to use the service for unlawful purposes, attempt unauthorized access, interfere with operation or security, introduce malicious code, circumvent security controls, or systematically extract information in violation of applicable law or these Terms.</p>
          </PolicySection>
          <PolicySection title="3. Sports and viewing information">
            <p>SeasonCaddy provides sports schedule and viewing information for informational and discovery purposes.</p>
            <p>Schedules, times, broadcasting rights, availability, and providers can change. SeasonCaddy does not guarantee that an event will be available through a particular provider at a particular time. Confirm important details with the relevant provider before purchasing a subscription or relying on viewing information.</p>
          </PolicySection>
          <PolicySection title="4. Third-party providers">
            <p>SeasonCaddy may display information about or link to third-party services, broadcasters, streaming platforms, websites, and other providers. These third parties operate independently from SeasonCaddy.</p>
            <p>SeasonCaddy does not control third-party pricing, subscription terms, availability, content, broadcast rights, geographic restrictions, service interruptions, or privacy practices.</p>
          </PolicySection>
          <PolicySection title="5. Affiliate relationships">
            <p>SeasonCaddy may participate in affiliate and referral programs. This means SeasonCaddy may receive compensation when users follow certain links or complete qualifying actions with participating providers.</p>
          </PolicySection>
          <PolicySection title="6. Intellectual property">
            <p>The SeasonCaddy website, software, design, branding, original written content, and other original materials are owned by or licensed to SeasonCaddy unless otherwise stated. Third-party names, trademarks, logos, and other intellectual property remain the property of their respective owners.</p>
          </PolicySection>
          <PolicySection title="7. Availability">
            <p>We may modify, suspend, or discontinue portions of SeasonCaddy at any time. We do not guarantee that the service will always be available, uninterrupted, or error-free.</p>
          </PolicySection>
          <PolicySection title="8. Disclaimer">
            <p>SeasonCaddy is provided on an “as is” and “as available” basis to the extent permitted by applicable law. We make no guarantee regarding the completeness, accuracy, timeliness, availability, or suitability of sports or viewing information for any particular purpose.</p>
          </PolicySection>
          <PolicySection title="9. Limitation of liability">
            <p>To the maximum extent permitted by applicable law, SeasonCaddy will not be liable for losses arising from reliance on third-party sports schedules, broadcasting information, provider availability, pricing, subscriptions, or services.</p>
          </PolicySection>
          <PolicySection title="10. Changes">
            <p>We may update these Terms from time to time. The updated version will be identified by its effective date.</p>
          </PolicySection>
          <PolicySection title="11. Contact">
            <p>Questions regarding these Terms can be submitted through the SeasonCaddy Contact page.</p>
          </PolicySection>
        </div>
      </section>
    </PublicPage>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-bold text-foreground">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
