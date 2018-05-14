/**
 * @Author: Dingjia
 * @Date:   2018-04-27T20:56:02+08:00
 * @Last modified by:   Dingjia
 * @Last modified time: 2018-05-02T22:30:39+08:00
 */



module.exports = {
  dest: 'vuepress',
  base:'/vuepress/',
  port:9090,
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Mughal Ding',
      description: "你知道的 你微笑时好美"
    },
    // '/en/': {
    //   lang: 'en-US',
    //   title: 'Mughal Ding',
    //   description: "It’s been kind of tough, But tough people last."
    // }
  },
  description:"丁佳，丁佳的个人博客",
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  serviceWorker: true,
  theme: 'vue',
  themeConfig: {
    repo: 'dingjiamughal/vuepress',
    editLinks: true,
    docsDir: 'docs',
    // sidebarDepth: 2,
    locales: {
      '/en/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        nav: [
          {
            text: 'Webpack',
            link: '/en/webpack/'
          },
          {
            text: 'Blog',
            link: '/en/blog/'
          },
          {
            text: 'About me',
            link: '/en/aboutme/'
          },
        ],
        sidebar: {
          '/en/blog/': genSidebarBlogConfig(),
          '/en/webpack/':genSidebarWebpackConfig()
        }

      },
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        nav: [
          {
            text: 'Webpack',
            link: '/webpack/'
          },
          {
            text: 'Blog',
            link: '/blog/'
          },
          {
            text: '关于我',
            link: '/aboutme/'
          }
        ],
        sidebar: {
          '/blog/': genSidebarBlogConfig(),
          '/webpack/':genSidebarWebpackConfig()
        }
      }
    }
  }
}

function genSidebarConfig (title) {
  return [
  {
    title: 'Group 1',
    collapsable: true,
    children: [
      '/',
      'aaa/aaa',
      'basic-config',
      'assets',
      'markdown',
      'using-vue',
      'custom-themes',
      'i18n',
      'deploy'
    ]
  }, {
    title: 'Group 2',
    collapsable: true,
    children: [
      '/',
      'getting-started',
      'basic-config',
      'assets',
      'markdown',
      'using-vue',
      'custom-themes',
      'i18n',
      'deploy'
    ]
  }, {
    title: 'Group 3',
    collapsable: true,
    children: [
      '/',
      'getting-started',
      'basic-config',
      'assets',
      'markdown',
      'using-vue',
      'custom-themes',
      'i18n',
      'deploy'
    ]
  }
]
}

function genSidebarBlogConfig() {
  return [

    'fontendBuild',
    'interview',
    'fe-optimize',
    {
      title: 'javascript',
      collapsable: true,
      children: ['javascript/es6类']
    }, {
      title: 'nginx',
      collapsable: true,
      children: ['nginx/nginxtest1']
    },{
        title: 'css',
        collapsable: true,
        children: [
          'css/box-model'
        ]
      }
  ]
}

function genSidebarWebpackConfig() {
  return [
    {
      title:'Webpack',
      collapsable: false,
      children:[
        '',
        '模块化及babel',
        '打包css',
        '提取公共代码',
        '打包图片',
        '打包HTML',
        '搭建本地开发环境',
        '开发环境和生产环境',
        '使用middleware搭建开发环境',
        '打包结果分析',
        '优化打包速度',
        '多页应用打包',
        'webpack&&vue'
      ]
    }
  ]
}
