import { n as supabase } from "./useAuth-CNmA0ie9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/google-calendar-api-DD50STyh.js
async function seasonCaddyAccessToken() {
	const { data: { session }, error } = await supabase.auth.getSession();
	if (error) throw error;
	if (!session?.access_token) throw new Error("Sign in to connect Google Calendar");
	return session.access_token;
}
async function googleCalendarApiFetch(path, init = {}) {
	const accessToken = await seasonCaddyAccessToken();
	const headers = new Headers(init.headers);
	headers.set("Authorization", `Bearer ${accessToken}`);
	if (init.body != null && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
	return fetch(`undefined${path}`, {
		...init,
		headers
	});
}
async function startGoogleCalendarOAuth(region, returnTo) {
	const response = await googleCalendarApiFetch("/google/oauth/start", {
		method: "POST",
		body: JSON.stringify({
			region,
			returnTo
		})
	});
	const result = await response.json();
	if (!response.ok || !result?.success || !result?.authorizationUrl) throw new Error(result?.error ?? "Could not start Google Calendar connection");
	window.location.assign(result.authorizationUrl);
}
//#endregion
export { startGoogleCalendarOAuth as n, googleCalendarApiFetch as t };
