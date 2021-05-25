require("dotenv").config();

export default {
  srcDir: "src/",
  target: "static",
  loading: {
    color: "#6EB5CB",
    height: "4px"
  },

  // Global page headers
  head: {
    title: "Coachsome",
    titleTemplate: "%s - Coachsome",
    htmlAttrs: {
      lang: "en"
    },

    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      // Fonts
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap"
      },

      // Leaflet
      {
        rel: "stylesheet",
        href: "https://unpkg.com/leaflet@1.6.0/dist/leaflet.css",
        integrity:
          "sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==",
        crossorigin: ""
      }
    ],
    script: [
      // Leaflet
      {
        src: "https://unpkg.com/leaflet@1.6.0/dist/leaflet.js",
        body: true,
        integrity:
          "sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==",
        crossorigin: ""
      },

      // Google map
      {
        src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API_KEY}&libraries=places`,
        body: true
      }
    ]
  },

  css: [
    // Icons
    "@mdi/font/css/materialdesignicons.min.css",
    "material-design-icons-iconfont/dist/material-design-icons.css"
  ],

  // Plugins to run before rendering page
  plugins: [
    { src: "~/plugins/axios", ssr: true },
    { src: "~/plugins/vue-flag-icon", mode: "client" },
    { src: "~/plugins/vue-awesome-swiper", mode: "client" },
    { src: "~/plugins/vue-infinite-loading", mode: "client" },
    { src: "~/plugins/vue-scroll", mode: "client" },
    { src: "~/plugins/vue2-transitions", mode: "client" },
    { src: "~/plugins/vue-silentbox", mode: "client" },
    { src: "~/plugins/vue-read-more", mode: "client" },
    { src: "~/plugins/vue-easy-lightbox", mode: "client" },
    { src: "~/plugins/country-flag", mode: "client" },
    { src: "~/plugins/ant-design-vue", mode: "client" },
    { src: "~/plugins/vue-phone-number-input", mode: "client" },
    { src: "~/plugins/tiptap-vuetify", mode: "client" },
    { src: "~/plugins/vue-js-toggle-button", mode: "client" },
    { src: "~/plugins/vue-image-upload-resize", mode: "client" },
    { src: "~/plugins/vue-tribute.js", mode: "client" },
    { src: "~/plugins/vuelidate" }
  ],

  // Auto import components
  components: true,

  // Modules for dev and build
  buildModules: [
    ["@nuxtjs/dotenv", { path: "./" }],
    [
      "@nuxtjs/vuetify",
      {
        customVariables: ["~/assets/styles/main.scss"],
        optionsPath: "~/plugins/vuetify.js",
        treeShake: true
      }
    ],
    [
      "@aceforth/nuxt-optimized-images",
      {
        optimizeImages: true
      }
    ]
  ],

  // Modules
  modules: [
    [
      "nuxt-i18n",
      {
        seo: false,
        baseUrl: process.env.CLIENT_BASE_URL,
        vueI18n: {
          fallbackLocale: "en",
          messages: {
            en: require("./src/app/locales/en.json")
          }
        },
        locales: [
          {
            name: "English",
            tKey: "lang_english",
            icon: "gb",
            countryCode: "GB",
            code: "en",
            file: "en-UK.js",
            iso: "en-UK"
          },
          {
            name: "dansk",
            tKey: "lang_danish",
            icon: "dk",
            countryCode: "DK",
            code: "da",
            file: "da-DK.js",
            iso: "da-DK"
          },
          {
            name: "svenska",
            tKey: "lang_swedish",
            icon: "se",
            countryCode: "SE",
            code: "sv",
            file: "sv-SE.js",
            iso: "sv-SE"
          }
        ],
        lazy: true,
        langDir: "lang/",
        defaultLocale: "en"
      }
    ],
    [
      "@nuxtjs/axios",
      {
        baseURL: process.env.API_BASE_URL
      }
    ],
    [
      "@nuxtjs/toast",
      {
        position: "top-center",
        iconPack: "material",
        theme: "toasted-primary",
        duration: 7000,
        icon: "info_outline"
      }
    ],
    [
      "@nuxtjs/auth-next",
      {
        redirect: false,
        plugins: ["~/plugins/auth.js"],
        strategies: {
          local: {
            token: {
              property: "access_token"
            },
            user: {
              property: "user"
            },
            endpoints: {
              login: {
                url: "/auth/login",
                method: "post"
              },
              logout: { url: "/auth/logout", method: "post" },
              user: { url: "/authUserInformation", method: "get" }
            }
          }
        }
      }
    ],

    // Sitemap Always end of the array
    [
      "@nuxtjs/sitemap",
      {
        hostname: process.env.CLIENT_BASE_URL,
        exclude: [
          "**/reviews/success",
          "**/chat",
          "**/email-verification",
          "**/after-mail-confirmation",
          "**/after-register",
          "**/email-verificatio",
          "**/password-forget",
          "**/password-reset",
          "**/admin/**",
          "**/coach/**",
          "**/athlete/**"
        ]
      }
    ]
  ],

  // Build Configuration
  build: {
    transpile: ["vuetify/lib", "tiptap-vuetify"]
  }
};
