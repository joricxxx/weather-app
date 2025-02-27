// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@vesp/nuxt-fontawesome"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  fontawesome: {
    component: "fa", // Customize the component name
    icons: {
      solid: ["faSearch"], // Add the solid icons you want to use
      brands: [], // Add the brand icons you want to use
      regular: [], // Add the regular icons you want to use
    },
  },
  runtimeConfig: {
    public: {
      apiKey: process.env.OWM_APIKEY,
    },
  },
});
