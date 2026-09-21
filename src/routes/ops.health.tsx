import {
  createFileRoute,
} from "@tanstack/react-router";

import {
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Activity,
  Database,
  Clock,
  Users,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  supabase,
} from "@/integrations/supabase/client";

import {
  useAuth,
} from "@/hooks/useAuth";

export const Route =
  createFileRoute(
    "/ops/health",
  )({
    component:
      OpsHealthPage,
  });

type ProviderHealth = {
  provider_id?: string;
  provider_name?: string;
  health_state?: string;
  active_rows?: number;
  latest_rows?: number;
  previous_rows?: number;
  volume_ratio?: number;
  pending_removals?: number;
  latest_success_at?: string | null;
};

type SystemHealth = {
  checked_at: string;
  overall_status: string;

  last_full_refresh_at: string | null;
  last_incremental_refresh_at: string | null;
  refresh_state_updated_at: string | null;
  last_refresh_success: boolean | null;
  last_refresh_fixtures: number | null;
  last_refresh_competitions: number | null;

  fixture_rows: number;
  visible_fixture_rows: number;
  configured_active_providers: number;
  latest_fixture_refresh: string | null;

  catalog_rows: number;
  latest_catalog_refresh: string | null;

  open_identity_reviews: number;
  resolved_identity_reviews: number;

  running_schedule_runs: number;
  failed_schedule_runs_24h: number;

  providers: ProviderHealth[];
};

function OpsHealthPage() {
  const {
    user,
    loading: authLoading,
  } = useAuth();

  const [
    health,
    setHealth,
  ] =
    useState<SystemHealth | null>(
      null,
    );

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null,
    );

  async function loadHealth() {
    setLoading(true);
    setError(null);

    try {
      const {
        data,
        error: queryError,
      } =
        await supabase
          .from(
            "seasoncaddy_system_health_v",
          )
          .select("*")
          .maybeSingle();

      if (queryError) {
        throw queryError;
      }

      if (!data) {
        throw new Error(
          "You are not authorized to view system health.",
        );
      }

      setHealth(
        data as SystemHealth,
      );
    } catch (err) {
      console.error(
        "Failed to load SeasonCaddy system health:",
        err,
      );

      setHealth(null);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load system health.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (
      !authLoading &&
      user
    ) {
      loadHealth();
    }
  }, [
    authLoading,
    user,
  ]);

  if (authLoading) {
    return (
      <PageShell>
        <StatusMessage>
          Checking authorization...
        </StatusMessage>
      </PageShell>
    );
  }

  if (!user) {
    return (
      <PageShell>
        <StatusCard
          icon={
            <XCircle size={22} />
          }
          title="Sign-in required"
          message="You must be signed in to access system health."
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div
        style={{
          display:
            "flex",

          alignItems:
            "flex-start",

          justifyContent:
            "space-between",

          gap:
            20,

          marginBottom:
            24,
        }}
      >
        <div>
          <h1
            style={{
              margin:
                0,

              fontSize:
                34,

              lineHeight:
                1.15,

              fontWeight:
                800,
            }}
          >
            System Health
          </h1>

          <p
            style={{
              margin:
                "8px 0 0",

              color:
                "var(--muted-foreground)",

              fontSize:
                15,
            }}
          >
            Internal SeasonCaddy
            operational status.
          </p>
        </div>

        <button
          type="button"
          onClick={
            loadHealth
          }
          disabled={
            loading
          }
          style={{
            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              8,

            border:
              "1px solid var(--border)",

            borderRadius:
              10,

            padding:
              "10px 14px",

            background:
              "var(--surface-1)",

            color:
              "var(--text)",

            fontWeight:
              700,

            cursor:
              loading
                ? "default"
                : "pointer",

            opacity:
              loading
                ? 0.6
                : 1,
          }}
        >
          <RefreshCw
            size={16}
          />

          {loading
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </div>

      {error && (
        <StatusCard
          icon={
            <XCircle size={22} />
          }
          title="Health check unavailable"
          message={
            error
          }
        />
      )}

      {health && (
        <>
          <OverallStatus
            health={
              health
            }
          />

          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(190px, 1fr))",

              gap:
                14,

              marginTop:
                18,
            }}
          >
            <MetricCard
              icon={
                <Activity size={19} />
              }
              label="Visible fixtures"
              value={
                formatNumber(
                  health.visible_fixture_rows,
                )
              }
            />

            <MetricCard
              icon={
                <Database size={19} />
              }
              label="Competitions"
              value={
                formatNumber(
                  health.catalog_rows,
                )
              }
            />

            <MetricCard
              icon={
                <Users size={19} />
              }
              label="Open identity reviews"
              value={
                formatNumber(
                  health.open_identity_reviews,
                )
              }
            />

            <MetricCard
              icon={
                <Activity size={19} />
              }
              label="Running schedules"
              value={
                formatNumber(
                  health.running_schedule_runs,
                )
              }
            />
          </div>

          <section
            style={{
              ...panelStyle,

              marginTop:
                20,
            }}
          >
            <SectionHeader
              title="Frontend publication"
              description="Latest successful publication and cache state."
            />

            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",

                gap:
                  16,

                padding:
                  22,
              }}
            >
              <InfoItem
                label="Last full refresh"
                value={
                  formatDate(
                    health.last_full_refresh_at,
                  )
                }
              />

              <InfoItem
                label="Last incremental refresh"
                value={
                  formatDate(
                    health.last_incremental_refresh_at,
                  )
                }
              />

              <InfoItem
                label="Last refresh result"
                value={
                  health.last_refresh_success
                    ? "Success"
                    : "Failed"
                }
              />

              <InfoItem
                label="Fixtures published"
                value={
                  formatNumber(
                    health.last_refresh_fixtures,
                  )
                }
              />
            </div>
          </section>

          <section
            style={{
              ...panelStyle,

              marginTop:
                20,
            }}
          >
            <SectionHeader
              title="Provider health"
              description="Current provider ingestion status."
            />

            <div
              style={{
                overflowX:
                  "auto",
              }}
            >
              <table
                style={{
                  width:
                    "100%",

                  borderCollapse:
                    "collapse",
                }}
              >
                <thead>
                  <tr>
                    <TableHeading>
                      Provider
                    </TableHeading>

                    <TableHeading>
                      Status
                    </TableHeading>

                    <TableHeading>
                      Active
                    </TableHeading>

                    <TableHeading>
                      Previous
                    </TableHeading>

                    <TableHeading>
                      Pending removal
                    </TableHeading>

                    <TableHeading>
                      Last success
                    </TableHeading>
                  </tr>
                </thead>

                <tbody>
                  {(
                    health.providers ??
                    []
                  ).map(
                    (
                      provider,
                      index,
                    ) => (
                      <tr
                        key={
                          provider.provider_id ??
                          provider.provider_name ??
                          index
                        }
                        style={{
                          borderTop:
                            "1px solid var(--border)",
                        }}
                      >
                        <TableCell>
                          {
                            provider.provider_name ??
                            provider.provider_id ??
                            "Unknown"
                          }
                        </TableCell>

                        <TableCell>
                          <ProviderStatus
                            status={
                              provider.health_state
                            }
                          />
                        </TableCell>

                        <TableCell>
                          {
                            formatNumber(
                              provider.active_rows,
                            )
                          }
                        </TableCell>

                        <TableCell>
                          {
                            formatNumber(
                              provider.previous_rows,
                            )
                          }
                        </TableCell>

                        <TableCell>
                          {
                            formatNumber(
                              provider.pending_removals,
                            )
                          }
                        </TableCell>

                        <TableCell>
                          {
                            formatDate(
                              provider.latest_success_at,
                            )
                          }
                        </TableCell>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section
            style={{
              ...panelStyle,

              marginTop:
                20,
            }}
          >
            <SectionHeader
              title="Data and schedule health"
              description="Operational signals from existing SeasonCaddy telemetry."
            />

            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",

                gap:
                  16,

                padding:
                  22,
              }}
            >
              <InfoItem
                label="Total fixture rows"
                value={
                  formatNumber(
                    health.fixture_rows,
                  )
                }
              />

              <InfoItem
                label="Configured providers"
                value={
                  formatNumber(
                    health.configured_active_providers,
                  )
                }
              />

              <InfoItem
                label="Failed schedules (24h)"
                value={
                  formatNumber(
                    health.failed_schedule_runs_24h,
                  )
                }
              />

              <InfoItem
                label="Resolved identity reviews"
                value={
                  formatNumber(
                    health.resolved_identity_reviews,
                  )
                }
              />

              <InfoItem
                label="Latest fixture refresh"
                value={
                  formatDate(
                    health.latest_fixture_refresh,
                  )
                }
              />

              <InfoItem
                label="Latest catalog refresh"
                value={
                  formatDate(
                    health.latest_catalog_refresh,
                  )
                }
              />
            </div>
          </section>

          <div
            style={{
              display:
                "flex",

              alignItems:
                "center",

              gap:
                8,

              marginTop:
                18,

              color:
                "var(--muted-foreground)",

              fontSize:
                13,
            }}
          >
            <Clock
              size={15}
            />

            Last checked:{" "}
            {formatDate(
              health.checked_at,
            )}
          </div>
        </>
      )}
    </PageShell>
  );
}

/* ====================================================== */
/* COMPONENTS                                             */
/* ====================================================== */

function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        maxWidth:
          1200,

        margin:
          "0 auto",

        padding:
          "32px 22px 60px",
      }}
    >
      {children}
    </div>
  );
}

function OverallStatus({
  health,
}: {
  health: SystemHealth;
}) {
  const status =
    health.overall_status;

  const isHealthy =
    status ===
    "healthy";

  const isCritical =
    status ===
    "critical";

  return (
    <div
      style={{
        display:
          "flex",

        alignItems:
          "center",

        gap:
          14,

        padding:
          "18px 20px",

        border:
          "1px solid var(--border)",

        borderRadius:
          14,

        background:
          "var(--surface-1)",
      }}
    >
      <div
        style={{
          display:
            "grid",

          placeItems:
            "center",

          width:
            44,

          height:
            44,

          flexShrink:
            0,

          borderRadius:
            12,

          background:
            "var(--surface-2)",

          color:
            "var(--text)",
        }}
      >
        {isHealthy ? (
          <ShieldCheck
            size={23}
          />
        ) : isCritical ? (
          <XCircle
            size={23}
          />
        ) : (
          <AlertTriangle
            size={23}
          />
        )}
      </div>

      <div>
        <div
          style={{
            fontSize:
              18,

            fontWeight:
              800,

            textTransform:
              "capitalize",
          }}
        >
          {status}
        </div>

        <div
          style={{
            marginTop:
              3,

            color:
              "var(--muted-foreground)",

            fontSize:
              14,
          }}
        >
          {isHealthy
            ? "Core system health checks are currently passing."
            : isCritical
              ? "A critical system health condition requires attention."
              : "One or more system health signals require attention."}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        ...panelStyle,

        padding:
          18,
      }}
    >
      <div
        style={{
          display:
            "flex",

          alignItems:
            "center",

          gap:
            9,

          color:
            "var(--muted-foreground)",

          fontSize:
            13,

          fontWeight:
            700,
        }}
      >
        {icon}

        {label}
      </div>

      <div
        style={{
          marginTop:
            10,

          fontSize:
            28,

          fontWeight:
            800,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        padding:
          "20px 22px",

        borderBottom:
          "1px solid var(--border)",
      }}
    >
      <h2
        style={{
          margin:
            0,

          fontSize:
            19,

          fontWeight:
            800,
        }}
      >
        {title}
      </h2>

      <p
        style={{
          margin:
            "5px 0 0",

          color:
            "var(--muted-foreground)",

          fontSize:
            13,
        }}
      >
        {description}
      </p>
    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div
        style={{
          color:
            "var(--muted-foreground)",

          fontSize:
            12,

          fontWeight:
            700,
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop:
            5,

          fontSize:
            15,

          fontWeight:
            700,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ProviderStatus({
  status,
}: {
  status?: string;
}) {
  const value =
    status ??
    "unknown";

  return (
    <span
      style={{
        display:
          "inline-flex",

        alignItems:
          "center",

        border:
          "1px solid var(--border)",

        borderRadius:
          999,

        padding:
          "4px 9px",

        fontSize:
          12,

        fontWeight:
          800,

        textTransform:
          "capitalize",
      }}
    >
      {value.replace(
        /_/g,
        " ",
      )}
    </span>
  );
}

function StatusCard({
  icon,
  title,
  message,
}: {
  icon: React.ReactNode;
  title: string;
  message: string;
}) {
  return (
    <div
      style={{
        ...panelStyle,

        display:
          "flex",

        alignItems:
          "flex-start",

        gap:
          14,

        padding:
          20,
      }}
    >
      {icon}

      <div>
        <div
          style={{
            fontWeight:
              800,
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop:
              5,

            color:
              "var(--muted-foreground)",

            fontSize:
              14,
          }}
        >
          {message}
        </div>
      </div>
    </div>
  );
}

function StatusMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        color:
          "var(--muted-foreground)",

        fontSize:
          15,
      }}
    >
      {children}
    </div>
  );
}

function TableHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th
      style={{
        padding:
          "13px 16px",

        textAlign:
          "left",

        color:
          "var(--muted-foreground)",

        fontSize:
          12,

        fontWeight:
          800,

        whiteSpace:
          "nowrap",
      }}
    >
      {children}
    </th>
  );
}

function TableCell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <td
      style={{
        padding:
          "13px 16px",

        fontSize:
          14,

        whiteSpace:
          "nowrap",
      }}
    >
      {children}
    </td>
  );
}

/* ====================================================== */
/* HELPERS                                                */
/* ====================================================== */

const panelStyle:
  React.CSSProperties =
{
  overflow:
    "hidden",

  border:
    "1px solid var(--border)",

  borderRadius:
    14,

  background:
    "var(--surface-1)",
};

function formatNumber(
  value:
    number | null | undefined,
) {
  if (
    value ===
      null ||
    value ===
      undefined
  ) {
    return "—";
  }

  return value.toLocaleString();
}

function formatDate(
  value:
    string | null | undefined,
) {
  if (!value) {
    return "—";
  }

  const date =
    new Date(
      value,
    );

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "—";
  }

  return date.toLocaleString();
}
