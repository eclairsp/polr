export default {
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    mode: "universal",
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: "server",
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        title: process.env.npm_package_name || "",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "description",
                name: "description",
                content: process.env.npm_package_description || ""
            }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            {
                rel: "stylesheet",
                href:
                    "https://fonts.googleapis.com/css2?family=Comfortaa:wght@500;700&display=swap"
            }
        ]
    },
    /*
     ** Global CSS
     */
    css: ["@/assets/main.css"],
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: ["~/plugins/route"],
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: true,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ["@nuxtjs/color-mode"],

    colorMode: {
        preference: "light" // default value of $colorMode.preference
    },
    /*
     ** Nuxt.js modules
     */
    modules: ["@nuxtjs/apollo"],

    apollo: {
        clientConfigs: {
            default: {
                // required
                httpEndpoint: "http://192.168.1.57:5000/",
                // optional
                // override HTTP endpoint in browser only
                // optional
                // See https://www.apollographql.com/docs/link/links/http.html#options

                // You can use `wss` for secure connection (recommended in production)
                // Use `null` to disable subscriptions
                wsEndpoint: "ws://192.168.1.57:5000/", // optional
                // LocalStorage token
                tokenName: "apollo-token", // optional
                // Enable Automatic Query persisting with Apollo Engine
                persisting: false, // Optional
                // Use websockets for everything (no HTTP)
                // You need to pass a `wsEndpoint` for this to work
                websocketsOnly: false // Optional
            }
        }
    },
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    build: {}
};
