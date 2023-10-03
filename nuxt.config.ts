// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "~/assets/scss/main.scss"],
  modules: ["@pinia/nuxt", "@nuxt/ui", "@pinia-plugin-persistedstate/nuxt",],
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  ssr: true,
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  vue: {
    defineModel: true,
    propsDestructure: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_colors.scss" as *;',
        },
      },
    },
  },
});
