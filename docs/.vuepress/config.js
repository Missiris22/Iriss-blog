module.exports = {
    base: '/Iriss-blog/',
    title: 'Iriss Blog',
    description: '瞎扯淡',
    locales: {
        "/": {
            lang: "zh-CN",
        },
    },
    dest: 'public',
    theme: "reco",
    themeConfig: {
        type: 'blog',
        lastUpdated: 'Last Updated',
        lastUpdated: true,
        logo: '/author.jpeg',
        authorAvatar: '/author.jpeg',
        // 搜索设置
        search: true,
        searchMaxSuggestions: 10,
        // 自动形成侧边导航及其深度
        subSidebar: 'auto',
        sidebarDepth: 1,
        blogConfig: {
            // tag: {
            //     location: 3,     // 在导航栏菜单中所占的位置，默认3
            //     text: 'Tag'      // 默认文案 “标签”
            // },
            socialLinks: [     // 信息栏展示社交信息
                { icon: 'reco-github', link: 'https://github.com/Missiris22' },
                { icon: 'reco-juejin', link: 'https://juejin.cn/user/1063982988541757' },
            ],
        },
        // 友情链接
        friendLink: [
            {
                title: 'vuepress-theme-reco',
                desc: 'A simple and beautiful vuepress Blog & Doc theme.',
                logo: "https://photo.smallsunnyfox.com/images/blog/friendlink/theme_reco.png",
                link: 'https://vuepress-theme-reco.recoluan.com'
            },
            {
                title: 'vuepress',
                desc: '',
                logo: "https://photo.smallsunnyfox.com/images/blog/friendlink/theme_reco.png",
                link: 'https://www.vuepress.cn/'
            },
            {
                title: '汪图南的blog',
                desc: '',
                link: 'https://wangtunan.github.io/blog/interview/'
            },
            {
                title: '伟伟的blog',
                desc: '',
                link: 'https://cyandong.github.io/-vuepress-/'
            }
        ],
        // markdown: {
        //     importCode: {
        //       handleImportPath: (str) =>
        //           str.replace(/^@src/, path.resolve(__dirname, 'components')),
        //     },
        //     extractTitle: true
        //   },
        nav: [
            { text: '面试特辑', link: '/面试特辑/' },
            { text: '算法', link: '/算法/' },
            { 
                text: 'vue',
                items: [
                    { 
                        text: '源码', 
                        items: [
                            { text: '尤大解析', link: '/vue/尤大讲解vue源码' }
                        ]
                    }
                ]
            },
            { 
                text: '服务',
                items: [
                    { text: 'node', link: '/服务/node' }
                ]
            },
            { text: '单元测试', link: '/单元测试/'},
            { text: 'TimeLine', link: '/timeline/'},
            { text: 'VuePress', link: '/vuePress/'},
            { text: 'Github', link: 'https://github.com/Missiris22' },
        ],
        sidebar: 'auto'
    }
}