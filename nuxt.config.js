require("dotenv").config();

export default {
  telemetry: false,
  srcDir: "src/",
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
      { name: "apple-mobile-web-app-status-bar-style", content: "#F7FAFC" },
      { name: "theme-color",  content: "#F7FAFC" },
      {
        name: "facebook-domain-verification",
        content: "7ilgh3d5ukfpfwwspw4chai9zokx7u"
      },
      { hid: "description", name: "description", content: "" }
    ],
    noscript: [
      {
        innerHTML:
          '<img height="1" width="1" style="display:none"src="https://www.facebook.com/tr?id=387225812473389&ev=PageView&noscript=1"/>'
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },

      // Icon Fonts
      // {
      //   rel: "stylesheet",
      //   href:
      //     "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"
      // },
      // {
      //   rel: "stylesheet",
      //   href: "https://fonts.googleapis.com/icon?family=Material+Icons"
      // },

      // Text Fonts
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Pacifico:wght@400&display=swap"
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
      },
      {
        src: `/tawk.js`,
        body: true
      }
    ]
  },

  css: [
    '~/assets/css/global.css',
    "@mdi/font/css/materialdesignicons.css",
    "material-design-icons-iconfont/dist/material-design-icons.css",
  ],

  // Plugins to run before rendering page
  plugins: [
    { src: "~/plugins/axios", ssr: true },
    { src: "~/plugins/vue-flag-icon", mode: "client" },
    { src: "~/plugins/vue-awesome-swiper", mode: "client" },
    { src: "~/plugins/vue-infinite-loading", mode: "client" },
    { src: "~/plugins/vue-scroll", mode: "client" },
    { src: "~/plugins/vue2-transitions", mode: "client" },
    { src: "~/plugins/vue-read-more", mode: "client" },
    { src: "~/plugins/vue-easy-lightbox", mode: "client" },
    { src: "~/plugins/country-flag", mode: "client" },
    { src: "~/plugins/ant-design-vue", mode: "client" },
    { src: "~/plugins/vue-phone-number-input", mode: "client" },
    { src: "~/plugins/tiptap-vuetify", mode: "client" },
    { src: "~/plugins/vue-js-toggle-button", mode: "client" },
    { src: "~/plugins/vue-tribute", mode: "client" },
    { src: "~/plugins/socket", mode: "client" },
    { src: "~/plugins/v-emoji-picker", mode: "client" },
    { src: "~/plugins/vue-social-share", mode: "client" },
    { src: "~/plugins/v-video-embed", mode: "client" },
    { src: "~/plugins/vue-file-agent", mode: "client" },
    { src: "~/plugins/vue-video-player", mode: "client" },
    { src: "~/plugins/vuelidate" },
    { src: "~/plugins/vue-debounce", mode: "client" },
    { src: "~/plugins/globalPlugins" },
  ],

  /**
   * Auto import components
   */
  components: false,

  // Modules for dev and build
  buildModules: [
    ["@nuxtjs/dotenv", { path: "./" }],
    [
      "@nuxtjs/vuetify",
      {
        customVariables: ["~/assets/scss/main.scss"],
        optionsPath: "~/plugins/vuetify.js",
        treeShake: true
      }
    ]
  ],

  /**
   * Modules
   */
  modules: [
    [
      "nuxt-i18n",
      {
        seo: false,
        strategy: "prefix_and_default",
        vueI18n: {
          fallbackLocale: "en"
        },
        locales: [
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
          },
          {
            name: "English",
            tKey: "lang_english",
            icon: "gb",
            countryCode: "GB",
            code: "en",
            file: "en-UK.js",
            iso: "en-UK"
          }
        ],
        lazy: true,
        langDir: "lang/",
        defaultLocale: "en",
        parsePages: false,
        pages: {
          "marketplace/index": {
            en: "/" + encodeURIComponent("coaches"),
            da: "/" + encodeURIComponent("trænere"),
            sv: "/" + encodeURIComponent("tränare")
          },
          "marketplace/_": {
            en: "/" + encodeURIComponent("coaches") + "/*",
            da: "/" + encodeURIComponent("trænere") + "/*",
            sv: "/" + encodeURIComponent("tränare") + "/*"
          }
        },
        detectBrowserLanguage: {
          useCookie: false,
          cookieKey: "i18n_redirected",
          onlyOnRoot: true
        }
      }
    ],
    [
      "@nuxtjs/axios",
      {
        baseURL: process.env.API_BASE_URL
      }
    ],
    [
      "vue-toastification/nuxt",
      {
        draggable: false,
        position: "top-center"
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

    // Robots
    [
      "@nuxtjs/robots",
      [
        {
          UserAgent: "*",
          Disallow: "/admin"
        },
        {
          UserAgent: "*",
          Disallow: "/coach"
        },
        {
          UserAgent: "*",
          Disallow: "/athlete"
        }
      ]
    ],

    // Google Analytics
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-147188178-2"
      }
    ],

    // Facebook pixel
    ['nuxt-facebook-pixel-module', {
      /* module options */
      track: 'PageView',
      pixelId: '387225812473389',
      autoPageView: true,
      disabled: false
    }],

    // Sitemap
    // Always end of the array
    [
      "@nuxtjs/sitemap",
      {
        hostname: process.env.CLIENT_BASE_URL,
        exclude: [
          "**/reviews/success",
          "**/chat",
          "**/redirect",
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
    ],
    [
      '@nuxtjs/pwa',
      {
        meta: {
          title: 'Coachsome',
          author: 'Coachsome',
        },
        manifest: {
          "name":"Coachsome",
          "short_name":"Coachsome",
          "description": "Coachsome",
          "display": "standalone",
          "background_color": "#E5E5E5",
          "capture_links": "existing_client_event",
          "url_handlers" : [
            {
              "origin": "https://test.coachsome.com/"
            },
            {
              "origin": "https://coachsome.com/"
            },
            {
              "origin": "https://*.coachsome.com/"
            }
          ],
          "manifest_package": "org.chromium.webapk.test",
          "scope": "/",
          "intent_filters": {
            "scope_url_scheme": "https",
            "scope_url_host": "coachsome.com",
            "scope_url_path": "/"
          },
          "start_url": "/",
          "display_mode": "standalone",
          "orientation": "portrait",
          "version_code": "1",
          "version_name": "1.0",
          "bound_webapk": {
            "runtime_host": "org.chromium.chrome",
            "runtime_host_application_name": "Chromium"
          },
          "icons": [
            {
              "src": "/msapplication-icon-144x144.png",
              "size": "144x144",
              "type": "image/png"
            },
            {
              "src": "/apple-touch-icon-120x120.png",
              "size": "120x120",
              "type": "image/png"
            },
            {
              "src": "/apple-touch-icon-152x152.png",
              "size": "152x152",
              "type": "image/png"
            },
            {
              "src": "/android-chrome-maskable-192x192.png",
              "size": "192x192",
              "type": "image/png"
            },
            {
              "src": "/android-chrome-512x512.png",
              "size": "512x512",
              "type": "image/png"
            },
            {
              "src": "/apple-touch-icon-60x60.png",
              "sizes": "60x60",
              "type": "image/png",
              "purpose": "any maskable"
            },
            {
              "src": "/apple-touch-icon-120x120.png",
              "sizes": "120x120",
              "type": "image/png",
              "purpose": "any maskable"
            },
            {
              "src": "/msapplication-icon-144x144.png",
              "sizes": "144x144",
              "type": "image/png",
              "purpose": "any maskable"
            },
            {
              "src": "/apple-touch-icon-152x152.png",
              "sizes": "152x152",
              "type": "image/png",
              "purpose": "any maskable"
            },
            {
              "src": "/android-chrome-maskable-192x192.png",
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "any maskable"
            },
            {
              "src": "/android-chrome-maskable-512x512.png",
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "any maskable"
            }
          ],
        },
        
      }
    ],
    'vue-social-sharing/nuxt',
    'nuxt-user-agent',
  ],

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
      manifest: {
        "name":"Coachsome",
        icon:{
          source: '/icon.png',
          fileName: 'icon.png'
        },
        "short_name":"Coachsome",
        "description": "Coachsome",
        "display": "standalone",
        "background_color": "#E5E5E5",
        "capture_links": "existing_client_event",
        "url_handlers" : [
          {
            "origin": "https://test.coachsome.com/"
          },
          {
            "origin": "https://coachsome.com/"
          },
          {
            "origin": "https://*.coachsome.com/"
          }
        ],
        "manifest_package": "org.chromium.webapk.test",
        "scope": "/",
        "intent_filters": {
          "scope_url_scheme": "https",
          "scope_url_host": "coachsome.com",
          "scope_url_path": "/"
        },
        "start_url": "/",
        "display_mode": "standalone",
        "orientation": "portrait",
        "version_code": "1",
        "version_name": "1.0",
        "bound_webapk": {
          "runtime_host": "org.chromium.chrome",
          "runtime_host_application_name": "Chromium"
        },
        "icons": [
          {
            "src": "/msapplication-icon-144x144.png",
            "size": "144x144",
            "type": "image/png"
          },
          {
            "src": "/apple-touch-icon-120x120.png",
            "size": "120x120",
            "type": "image/png"
          },
          {
            "src": "/apple-touch-icon-152x152.png",
            "size": "152x152",
            "type": "image/png"
          },
          {
            "src": "/android-chrome-maskable-192x192.png",
            "size": "192x192",
            "type": "image/png"
          },
          {
            "src": "/android-chrome-512x512.png",
            "size": "512x512",
            "type": "image/png"
          },
          {
            "src": "/apple-touch-icon-60x60.png",
            "sizes": "60x60",
            "type": "image/png",
            "purpose": "any maskable"
          },
          {
            "src": "/apple-touch-icon-120x120.png",
            "sizes": "120x120",
            "type": "image/png",
            "purpose": "any maskable"
          },
          {
            "src": "/msapplication-icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png",
            "purpose": "any maskable"
          },
          {
            "src": "/apple-touch-icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png",
            "purpose": "any maskable"
          },
          {
            "src": "/android-chrome-maskable-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any maskable"
          },
          {
            "src": "/android-chrome-maskable-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
          }
        ],
      }
    },
  // Build Configuration
  build: {
    transpile: ["vuetify/lib", "tiptap-vuetify"]
  }
};
