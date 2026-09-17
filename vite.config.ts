import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server-entry" },
  },

  nitro: {
    preset: process.env.VERCEL ? "vercel" : undefined,
  },

  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});