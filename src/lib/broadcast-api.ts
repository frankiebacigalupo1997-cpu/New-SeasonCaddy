import { regions } from "@/lib/gamehub-data";
import type { FrontendFixtureRow, FrontendProviderRow } from "@/lib/supabase-fixtures";

export type BroadcastSourceType =
  | "official-competition"
  | "official-broadcaster"
  | "third-party"
  | string;

export type ProviderProvenance = {
  providerId: string;
  sourceType: BroadcastSourceType;
  sourceName?: string;
  sourceUrl?: string;
  verifiedAt?: string;
};

export type BroadcastProvider = {
  id?: string;
  providerId?: string;
  name?: string;
  sourceUrl?: string | null;
  url?: string | null;
  evidence?: unknown;
  matchMethod?: string;
  matchConfidence?: number;
};

export type BroadcastRecord = {
  fixtureId?: string;
  league?: string;
  competitionId?: string;
  region: string;
  home?: string;
  away?: string;
  providerId?: string;
  providerIds: string[];
  providers?: BroadcastProvider[];
  networkNames?: string[];
  territory?: string | null;
  source?: string;
  sourceType?: BroadcastSourceType;
  providerProvenance?: ProviderProvenance[];
  verifiedAt?: string;
};

function isPlaceholderProviderId(providerId: string) {
  const normalized = providerId.trim().toLowerCase().replace(/[_\s]+/g, "-");

  return (
    normalized === "tbd" ||
    normalized === "pending" ||
    normalized === "provider-pending" ||
    normalized === "broadcast-pending" ||
    normalized === "not-live-uk"
  );
}

function providerToBroadcastProvider(provider: FrontendProviderRow): BroadcastProvider {
  return {
    id: provider.providerId,
    providerId: provider.providerId,
    name: provider.providerName,
    sourceUrl: provider.sourceUrl,
    url: provider.eventUrl,
    evidence: provider.evidence,
    matchMethod: provider.matchMethod,
    matchConfidence: provider.matchConfidence,
  };
}

function providerTargets(provider: FrontendProviderRow): string[] {
  // Region assignments stay exactly as stored in Supabase. A provider event
  // marked Global is NOT automatically copied into United States, United
  // Kingdom, or Canada. The current frontend only renders explicitly supported
  // regional assignments.
  return regions.includes(provider.region) ? [provider.region] : [];
}

/**
 * Builds the existing BroadcastRecord interface from the providers JSON already
 * aggregated by public.frontend_fixtures. Keeping this as a pure transformation
 * lets pages fetch fixtures once and derive both games and broadcasts locally.
 */
export function fixturesToBroadcasts(
  fixtures: FrontendFixtureRow[],
): BroadcastRecord[] {
  const grouped = new Map<string, BroadcastRecord>();

  for (const fixture of fixtures) {
    for (const provider of fixture.providers) {
      if (isPlaceholderProviderId(provider.providerId)) continue;

      for (const region of providerTargets(provider)) {
        const key = `${fixture.id}::${region}`;
        const existing = grouped.get(key);
        const broadcastProvider = providerToBroadcastProvider(provider);

        if (!existing) {
          grouped.set(key, {
            fixtureId: fixture.id,
            league: fixture.competitionName,
            competitionId: fixture.competitionId,
            region,
            home: fixture.home,
            away: fixture.away,
            providerId: provider.providerId,
            providerIds: [provider.providerId],
            providers: [broadcastProvider],
            source: "Supabase frontend_fixtures",
            sourceType: "official-broadcaster",
            providerProvenance: [
              {
                providerId: provider.providerId,
                sourceType: "official-broadcaster",
                sourceName: provider.providerName,
                sourceUrl: provider.sourceUrl,
              },
            ],
          });
          continue;
        }

        if (!existing.providerIds.includes(provider.providerId)) {
          existing.providerIds.push(provider.providerId);
        }

        const providerAlreadyPresent = (existing.providers ?? []).some(
          (item) => (item.providerId ?? item.id) === provider.providerId,
        );

        if (!providerAlreadyPresent) {
          existing.providers = [...(existing.providers ?? []), broadcastProvider];
        }

        const provenanceAlreadyPresent = (existing.providerProvenance ?? []).some(
          (item) => item.providerId === provider.providerId,
        );

        if (!provenanceAlreadyPresent) {
          existing.providerProvenance = [
            ...(existing.providerProvenance ?? []),
            {
              providerId: provider.providerId,
              sourceType: "official-broadcaster",
              sourceName: provider.providerName,
              sourceUrl: provider.sourceUrl,
            },
          ];
        }
      }
    }
  }

  return Array.from(grouped.values());
}
