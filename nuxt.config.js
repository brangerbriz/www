const NAME = 'Branger_Briz'
const BRAND = 'https://brangerbriz.com/splash.jpg'
const INFO = 'we are a full­service digital agency+lab made up of artists, strategists, educators && programmers bent on articulating contemporary culture. we produce award winning work for brands, agencies, and cultural institutions around the world.'

module.exports = {
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: INFO },
      { hid: 'og:title', prefix: 'og: http://ogp.me/ns#', property: 'og:title', content: NAME },
      { hid: 'og:description', prefix: 'og: http://ogp.me/ns#', property: 'og:description', content: INFO },
      { hid: 'og:image', prefix: 'og: http://ogp.me/ns#', property: 'og:image', content: BRAND },
      { hid: 'og:url', prefix: 'og: http://ogp.me/ns#', property: 'og:url', content: 'https://brangerbriz.com' },
      { property: 'twitter:card', content: 'summary_large_image' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  modules: [
    [ '@nuxtjs/google-analytics', { id: 'UA-6098550-23' } ]
  ],

  css: [
    '~assets/css/normalize.css',
    '~node_modules/BBElements/css/bb-fonts.css',
    '~node_modules/BBElements/css/bb-styles.css',
    '~node_modules/BBElements/css/bb-responsive.css',
    '~node_modules/BBElements/css/bb-code-colors.css',
    '~node_modules/BBElements/css/bb-animations.css'
  ]

}
