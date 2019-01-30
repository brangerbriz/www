module.exports = {
  mode: 'universal',

  head: {
    title: 'Branger_Briz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'we are a full­service digital agency+lab made up of artists, strategists, educators && programmers bent on articulating contemporary culture. we produce award winning work for brands, agencies, and cultural institutions around the world.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '~assets/css/normalize.css',
    '~node_modules/BBElements/css/bb-fonts.css',
    '~node_modules/BBElements/css/bb-styles.css',
    '~node_modules/BBElements/css/bb-responsive.css',
    '~node_modules/BBElements/css/bb-code-colors.css',
    '~node_modules/BBElements/css/bb-animations.css'
  ]

}
