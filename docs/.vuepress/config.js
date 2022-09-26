module.exports = {
    title: 'Iriss的个人技术博客',
    description: '办法总比问题多',
    locales: {
        "/": {
            lang: "zh-CN",
        },
    },
    dest: 'public',
    base: '/Iriss-blog/',
    // theme: "reco",
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { 
                text: 'Iriss的博客', 
                items: [
                    { text: 'Github', link: 'https://github.com/Iriss-jzn' },
                    { text: 'CSDN', link: 'https://blog.csdn.net/zn740395858?spm=1010.2135.3001.5343' },
                    { text: '掘金', link: 'https://juejin.cn/user/2524134425764375' }
                ]
            }
        ],
        sidebar:[
            {
                title: "博客搭建",
                path: "/construction/Blog1",
                collapsable: false, // 不折叠
                children: [
                    { title: "博客 01", path: "/construction/Blog1" },
                ],
            }
        ]
    }
}