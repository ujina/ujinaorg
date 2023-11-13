const { description } = require('../../package')

module.exports = {
  locales: {
    '/': {
      lang: 'ja',
    },  
  },
   /* Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'ひろしま海トレ日記',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: '能動的に代謝しよう',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */

  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: '最終更新日',
    nav: [
      {
        text: 'Intro',
        link: '/intro/',
      },
      {
        text: 'Tackle',
        link: '/tackle/',
      },
      {
        text: 'Spot',
        link: '/spot/',
      },
      {
        text: 'Blog',
        link: '/blog/',
      }
    ],    
    sidebar: {
      '/intro/': [
        {
          title: '',
          collapsable: false,
          children: [
            '',
            '/blog/',
          ]
        }
      ],
      '/tackle/': [
        {
          title: 'Tackle',
          collapsable: false,
          children: [
            '',
            'spike-tabi',
          ]
          }
      ],
      '/spot/': [
        {
          title: 'Spot',
          collapsable: false,
          children: [
            '',
          ]
          }
      ],
       '/blog/': [
        {
          title: '',
          collapsable: false,
          children: [
          '',
           '20231113',
           '20231104',
           '20231029',
           '20231028',
           '20231022',  
          ] 
          }
      ]
    

    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
  
}
