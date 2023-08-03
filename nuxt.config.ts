// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  // @ts-ignore
  runtimeConfig: {
    public: {
      SITE_NAME: process.env.NUXT_PUBLIC_SITE_NAME || '',
      API_URL: process.env.NUXT_PUBLIC_API_URL || '',
      SITE_URL: process.env.NUXT_PUBLIC_SITE_URL || '',
      NO_HTTP_URL: process.env.NUXT_PUBLIC_NO_HTTP_SITE_URL || '',
    }
  },
  experimental: {
    inlineSSRStyles: false,
  },
  css:[
      '~/assets/css/style.css',
  ],
  plugins: [

  ],
  app: {
    head: {
        title: '网站名称',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ],
       script: [
         {
           innerHTML: `
          统计代码放这里
        `,
           type: 'text/javascript',
           charset: 'utf-8',
           tagPosition: 'bodyClose',
         },
       ]
    },
  },
  modules: [
    '@nuxt/devtools',
    '@element-plus/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/robots',
    'nuxt-simple-sitemap',
  ],
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage',
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/', 'sitemap.xml'],
    },
  },
  devtools: { enabled: true },
})
