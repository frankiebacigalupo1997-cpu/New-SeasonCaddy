const seasonCaddyApiUrl =
  import.meta.env
    .VITE_SEASONCADDY_API_URL;

if (!seasonCaddyApiUrl) {
  throw new Error(
    "VITE_SEASONCADDY_API_URL is missing.",
  );
}

export const SEASONCADDY_API_URL =
  seasonCaddyApiUrl;