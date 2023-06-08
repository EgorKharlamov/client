export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  ssr: true,
  modules: [
    ["@nuxtjs/eslint-module", {}],
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-lodash",
    "@nuxtjs/i18n",
  ],
  i18n: {
    vueI18n: "./i18n.config.ts", // if you are using custom path, default
  },
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL || "http://localhost:2310/",
    },
  },
  build: {
    transpile: ["vue-toastification"],
  },
});
