// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  vite: {
    resolve: {
      alias: {
        "@": "/src",
        "@components": "/src/components",
      },
    },
  },
  output: "static",
  build: {
    inlineStylesheets: "auto",
    assets: "./", // Ensure relative asset paths for GitHub Pages
  },
  server: {
    host: true,
    port: 4321,
  },
  site: 'https://mehdi-teisseire.github.io',
  base: '/portfolioastro/',
});
