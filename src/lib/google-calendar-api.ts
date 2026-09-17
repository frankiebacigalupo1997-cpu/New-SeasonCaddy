import { supabase } from "@/integrations/supabase/client";
import { SEASONCADDY_API_URL } from "@/lib/config";

async function seasonCaddyAccessToken() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  if (!session?.access_token) {
    throw new Error("Sign in to connect Google Calendar");
  }

  return session.access_token;
}

export async function googleCalendarApiFetch(
  path: string,
  init: RequestInit = {},
) {
  const accessToken = await seasonCaddyAccessToken();
  const headers = new Headers(init.headers);

  headers.set("Authorization", `Bearer ${accessToken}`);

  if (init.body != null && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${SEASONCADDY_API_URL}${path}`, {
    ...init,
    headers,
  });
}

export async function startGoogleCalendarOAuth(
  region: string,
  returnTo: string,
) {
  const response = await googleCalendarApiFetch("/google/oauth/start", {
    method: "POST",
    body: JSON.stringify({ region, returnTo }),
  });

  const result = await response.json();

  if (!response.ok || !result?.success || !result?.authorizationUrl) {
    throw new Error(
      result?.error ?? "Could not start Google Calendar connection",
    );
  }

  window.location.assign(result.authorizationUrl);
}
