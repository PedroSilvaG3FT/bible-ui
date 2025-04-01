import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const confgPWA: Partial<VitePWAOptions> = {
  injectRegister: "auto",
  registerType: "autoUpdate",
  workbox: {
    skipWaiting: true,
    clientsClaim: true,
  },
  manifest: {
    name: "iBiblia",
    short_name: "iBiblia",
    description: "Flight search engine",

    scope: "/",
    lang: "pt-BR",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",

    theme_color: "#0a0a0a",
    background_color: "#0a0a0a",

    icons: [
      {
        src: "/icons/180x180.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },

      {
        src: "/icons/512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  },
};

export default defineConfig({
  define: { "process.env": process.env },
  plugins: [react(), VitePWA(confgPWA)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
