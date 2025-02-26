import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "rareco-company-ltd",
    project: "mchango-app"
  })],

  server: {
    proxy: {
      "/send-sms": {
        target: "https://api.africastalking.com/version1/messaging",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/send-sms/, ""),
      },
      "/dummy-sms": {
        target: "https://api.sandbox.africastalking.com/version1/messaging",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dummy-sms/, ""),
      },
      "/delivery-sms": {
        target: "https://vreogldrrtaobqvmttzp.supabase.co/functions/v1/delivery-reports",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/delivery-sms/, ""),
      },
    },
  },

  build: {
    sourcemap: true
  }
});