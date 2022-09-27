---
title: Vuepress
date: '2022-09-27'
tags:
    - vuepress
---

## 配置

[默认主题配置](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E9%A6%96)

### 导航栏

```js
// .vuepress/config.js
module.exports = {
    themeConfig: {
        // 导航栏logo
        logo: '/assets/img/logo.png',
        // 导航栏链接
        nav: [
            { text: 'Home', link: '/' }, // link - 简单链接
            { text: 'External', link: 'https://google.com', target:'_self', rel:'' }, // link + target - 外部链接
            { 
                text: 'External',
                items: [
                    { text: 'Chinese', link: '/language/chinese/' },
                    { text: 'Japanese', link: '/language/japanese/' }
                ] 
            }, // items - 下拉列表
            {
                text: 'Languages',
                items: [
                    { text: 'Group1', items: [/*  */] },
                    { text: 'Group2', items: [/*  */] }
                ]
            } // items - 下拉列表嵌套分组
        ]
    }
}
```

### 侧边栏

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // 侧边栏配置、
    displayAllHeaders: true, // 默认false，显示所有页面的标题链接 / headers链接 
    sidebar: 'auto', // false 
    sidebar: [
        '/', //  / 结尾的路径将会被视为 */README.md
        '/page-a',
        ['/link', 'link text'], // 指定链接的文字
        {
            title: 'Group 2',
            path: '/foo/',  // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: false, // 可选的, 默认值是 true
            children: [ /* ... */ ],
            initialOpenGroupIndex: -1 // 可选的, 默认值是 0
        } // 分组
    ]
  }
}
```

### 自定义页面样式

```html
/* .vuepress/styles/index.styl */

.theme-container.custom-page-class {
  /* 特定页面的 CSS */
}
```

## Front Formatter

[Front Formatter](https://vuepress.vuejs.org/zh/guide/frontmatter.html)

```js
// **YAML**
---
title: 当前页面的标题
description: 当前页面的描述
navbar: Boolean // 是否展示 navbar
sidebar: auto // 自动生成
prev: ./some-other-page
next: false  // 配置上一页 / 下一页
search: false // 禁用页面搜索框
tags: // 优化搜索结果
  - 配置
  - 主题
  - 索引

// 不常用
lang: 当前页面的语言
layout: 设置当前页面的布局组件
pageClass: custom-page-class // .vuepress/styles/index.styl
---
```

## 路由配置

[默认页面路由配置](https://vuepress.vuejs.org/zh/guide/directory-structure.html#%E9%BB%98%E8%AE%A4%E7%9A%84%E9%A1%B5%E9%9D%A2%E8%B7%AF%E7%94%B1)

此处我们把 `docs` 目录作为 `targetDir` ，所有文件路径相对 `docs`

文件夹|vuePress|算法|面试特辑
-|-|-|-|
路由|vuePress/...|算法/...|面试特辑/...

## markdown语法

[markdown扩展](https://vuepress.vuejs.org/zh/guide/markdown.html#header-anchors)


[emoji表情集合](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)

```js
:tada: :100:
```

## 部署项目

[Github部署项目](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages)
