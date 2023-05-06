const API_URL = 'http://localhost:8000'

export default defineNuxtConfig({
    css: [
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
        'primeflex/primeflex.css',
        'primevue/resources/themes/tailwind-light/theme.css',
    ],
    build: {
        transpile: ['primevue']
    },
    vite: {
        define: {
            "process.env.DEBUG": false,
        },
    },
    ssr:false,
    runtimeConfig: {
        public:{
            APIURL: API_URL,
        }
    },
})
