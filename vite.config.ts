import path from "path";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import type { PluginOption } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: ([
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpeg,jpg,webp,woff2}"],
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/flutterwave\.com\/.*/i,
            handler: "NetworkOnly",
          },
          {
            urlPattern: /^https:\/\/checkout\.flutterwave\.com\/.*/i,
            handler: "NetworkOnly",
          },
          {
            urlPattern: /^https:\/\/api\.flutterwave\.com\/.*/i,
            handler: "NetworkOnly",
          },
          {
            urlPattern: /^https:\/\/.+\.googleapis\.com\/.*/i,
            handler: "NetworkOnly",
          },
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: "NetworkOnly",
          },
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: "NetworkOnly",
          },
          {
            urlPattern: /^https:\/\/lh3\.googleusercontent\.com\/.*/i,
            handler: "NetworkOnly",
          },
        ],
      },
    }),
  ]) as unknown as PluginOption[],
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router", "react-router-dom"],
          three: ["three"],
          animation: ["framer-motion", "gsap"],
          ui: [
            "lucide-react",
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
          ],
        },
      },
    },
    minify: "esbuild",
    target: "es2020",
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
