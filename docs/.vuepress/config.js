/**
 * @Author: Dingjia
 * @Date:   2018-04-27T20:56:02+08:00
 * @Last modified by:   Dingjia
 * @Last modified time: 2018-05-02T22:30:39+08:00
 */

module.exports = {
    dest: 'vuepress',
    base: '/',
    port: 9090,
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'Mughal Ding',
            description: '咦！钱去哪啦？'
        }
        // '/en/': {
        //   lang: 'en-US',
        //   title: 'Mughal Ding',
        //   description: "It’s been kind of tough, But tough people last."
        // }
    },
    description: '丁佳，丁佳的个人博客',
    head: [
        [
            'link',
            {
                rel: 'icon',
                href: `/logo.png`
            }
        ],
        [
            'link',
            {
                rel: 'manifest',
                href: '/manifest.json'
            }
        ],
        [
            'meta',
            {
                name: 'theme-color',
                content: '#3eaf7c'
            }
        ],
        [
            'meta',
            {
                name: 'apple-mobile-web-app-capable',
                content: 'yes'
            }
        ],
        [
            'meta',
            {
                name: 'apple-mobile-web-app-status-bar-style',
                content: 'black'
            }
        ],
        [
            'link',
            {
                rel: 'apple-touch-icon',
                href: `/icons/apple-touch-icon-152x152.png`
            }
        ],
        [
            'link',
            {
                rel: 'mask-icon',
                href: '/icons/safari-pinned-tab.svg',
                color: '#3eaf7c'
            }
        ],
        [
            'meta',
            {
                name: 'msapplication-TileImage',
                content: '/icons/msapplication-icon-144x144.png'
            }
        ],
        [
            'meta',
            {
                name: 'msapplication-TileColor',
                content: '#000000'
            }
        ]
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
                    }
                ],
                sidebar: {
                    '/en/blog/': genSidebarBlogConfig(),
                    '/en/webpack/': genSidebarWebpackConfig(),
                    '/construe/': genSidebarconstrueConfig()
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
                        text: 'Resume',
                        link: 'https://www.xhrsama.com/resume/'
                    },
                    {
                        text: 'About me',
                        link: '/aboutme/'
                    },
                    {
                        text: ' ',
                        link: '/NM$L6324UpUp/'
                    }
                ],
                sidebar: {
                    '/blog/': genSidebarBlogConfig(),
                    '/webpack/': genSidebarWebpackConfig(),
                    '/construe/': genSidebarconstrueConfig()
                }
            }
        }
    }
};


function genSidebarBlogConfig() {
    return [
        {
            title: 'dingjia',
            collapsable: true,
            children: [
                'fontendBuild',
                'interview-1',
                'interview-2',
                'interview-3',
                'fe-optimize',
                'san'
            ]
        },
        {
            title: 'html',
            collapsable: true,
            children: ['html/canvas-1', 'html/canvas-2', 'html/canvas-3']
        },
        {
            title: 'css',
            collapsable: true,
            children: [
                'css/box-model',
                'css/box-shadow',
                'css/css-center',
                'css/css3-loading',
                'css/fan',
                'css/gradient',
                'css/less',
                'css/transform-transition-animation'
                // 'css/word-wrap',
            ]
        },
        {
            title: 'javascript',
            collapsable: true,
            children: [
                // 'javascript/BOM',
                'javascript/requireJs',
                'javascript/mianshi',
                'javascript/ES5ArrayApi',
                'javascript/es6类',
                'javascript/javaScript-1',
                'javascript/javaScript-2',
                'javascript/javaScript-3',
                'javascript/js-scope',
                'javascript/javaScript-chainUse',
                'javascript/jsMath',
                'javascript/lazyLoad',
                'javascript/tween',
                'javascript/regularExpression'
            ]
        },
        {
            title: 'http',
            collapsable: true,
            children: ['http/http']
        },
        {
            title: 'es6',
            collapsable: true,
            children: [
                // 'es6/es6-1',
                // 'es6/es6-2',
                // 'es6/es6-3',
                // 'es6/es6-4',
                // 'es6/es6-5'
                'es6/es6'
            ]
        },
        {
            title: 'nginx',
            collapsable: true,
            children: ['nginx/nginxtest1']
        },
        {
            title: 'vue',
            collapsable: true,
            children: [
                'vue/template',
                'vue/vue-animation',
                'vue/vue-plugin',
                'vue/webpackLink',
                'vue/jsxInVue'
            ]
        },
        {
            title: 'node',
            collapsable: true,
            children: [
                'node/blog'
            ]
        },
        {
            title: 'daily',
            collapsable: true,
            children: [
                'daily/防抖节流',
                'daily/发布订阅'
            ]
        }
    ];
}

function genSidebarWebpackConfig() {
    return [
        {
            title: 'Webpack',
            collapsable: false,
            children: [
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
    ];
}

function genSidebarconstrueConfig() {
    return [
        {
            title: 'construe',
            collapsable: false,
            children: [
                'proiect-desc',
                'list-tree',
                'tech-stack',
                'data-request'
            ]
        }
    ];
}
