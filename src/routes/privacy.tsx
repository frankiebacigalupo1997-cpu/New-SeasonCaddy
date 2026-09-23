import { createFileRoute } from "@tanstack/react-router";
import { PublicPage } from "@/components/PublicInfoPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | SeasonCaddy" },
      { name: "description", content: "SeasonCaddy privacy policy." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PublicPage eyebrow="LEGAL" title="Privacy Policy" intro="Effective September 23, 2026.">
      <section className="panel p-6 sm:p-8">
        <div className="space-y-8 text-[15px] leading-7 text-muted-foreground">
          <PolicySection title="1. Information we collect">
            <p>Depending on how you use SeasonCaddy, we may collect information you provide directly, such as information submitted through support requests, feedback, or account features.</p>
            <p>We may also receive technical information automatically when you use SeasonCaddy, including IP address, browser and device information, pages or features accessed, referral information, and technical logs.</p>
          </PolicySection>
          <PolicySection title="2. How we use information">
            <p>Information may be used to provide and operate SeasonCaddy, display sports and viewing information, maintain preferences, respond to support requests, investigate reported data errors, maintain security, analyze performance, improve features, communicate when necessary, and meet legal obligations.</p>
          </PolicySection>
          <PolicySection title="3. Cookies and similar technologies">
            <p>SeasonCaddy and supporting service providers may use cookies, local storage, session storage, or similar technologies to operate the website, remember preferences, maintain sessions, improve functionality, and understand usage.</p>
          </PolicySection>
          <PolicySection title="4. Third-party services">
            <p>SeasonCaddy may use third-party services for hosting, authentication, analytics, data processing, communications, integrations, and other website functionality. Those providers may process information according to their own terms and privacy policies.</p>
            <p>SeasonCaddy may also link to external websites. Once you leave SeasonCaddy, the destination provider's privacy practices apply.</p>
          </PolicySection>
          <PolicySection title="5. Sports and provider information">
            <p>SeasonCaddy displays sports schedule and viewing-availability information obtained from relevant data sources. Third-party providers control their own services, pricing, availability, subscriptions, and privacy practices.</p>
          </PolicySection>
          <PolicySection title="6. Affiliate relationships">
            <p>Some links displayed by SeasonCaddy may be affiliate links. Where an affiliate relationship exists, SeasonCaddy may receive compensation if a user follows a qualifying link or completes a qualifying action. See the Affiliate Disclosure for more information.</p>
          </PolicySection>
          <PolicySection title="7. Data security">
            <p>We use reasonable administrative, technical, and organizational measures intended to protect information handled through SeasonCaddy. No internet transmission or electronic storage system can be guaranteed completely secure.</p>
          </PolicySection>
          <PolicySection title="8. Data retention">
            <p>We retain information for as long as reasonably necessary for the purposes described in this policy, including providing services, maintaining records, resolving disputes, enforcing agreements, and meeting legal obligations.</p>
          </PolicySection>
          <PolicySection title="9. Your choices">
            <p>Depending on your location and applicable law, you may have rights concerning personal information, including rights to access, correct, delete, or restrict certain uses. Privacy requests can be submitted through the Contact page.</p>
          </PolicySection>
          <PolicySection title="10. Children's privacy">
            <p>SeasonCaddy is not intended to knowingly collect personal information from children in circumstances where such collection is prohibited by applicable law.</p>
          </PolicySection>
          <PolicySection title="11. Changes">
            <p>We may update this Privacy Policy from time to time. The effective date will be updated when material changes are made.</p>
          </PolicySection>
          <PolicySection title="12. Contact">
            <p>Privacy questions or requests can be submitted through the SeasonCaddy Contact page.</p>
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
