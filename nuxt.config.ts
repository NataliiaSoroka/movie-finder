// https://nuxt.com/docs/api/configuration/nuxt-config

console.log(process.env.NUXT_PUBLIC_BASE_URL);

export default defineNuxtConfig({
  ssr: process.env.NODE_ENV !== "production",
  app: {
    baseURL: process.env.NODE_ENV === "production" ? "/movie-finder/" : "/",
    head: {
      title: "Movie Finder",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Movie Finder",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      apiKey: process.env.NUXT_PUBLIC_API_KEY,
    },
  },
  css: ["~/assets/styles/main.css"],
  typescript: {
    strict: true,
    shim: false,
  },
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  colorMode: {
    classSuffix: "",
  },
  elementPlus: {
    icon: "ElIcon",
    importStyle: "scss",
    themes: ["dark"],
  },
  modules: ["@pinia/nuxt", "@element-plus/nuxt", "@nuxtjs/color-mode"],
});
