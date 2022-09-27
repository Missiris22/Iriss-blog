---
title: vue源码
date: '2022-09-27'
categories:
    - vue
tags:
    - vue
    - 源码
---

***
## 尤大演讲

`
相关源码文件（结合视频参考用）
视频笔记https://vue-course-doc.vercel.app/#_2-%E5%93%8D%E5%BA%94%E6%80%A7

订阅者模式 src/core/observer/index.js


### dependency tracking 依赖跟踪

- `Dep` class with two methods:  `depend` and `notify`
    - `depend`: the current code that is executing depends on this dependency.
    - `notify`: means this dependency has changed. So any previous expressions, computations, functions that have previously depended on this step should be re-executed, they should be notified.

    - We need to find a way to associate a pieces of a funcition or a piece of expression or computation, I would call this associated computation to dependency(这种计算关系叫做依赖). And this computation should probably be considered something like a subscriber(订阅者模式) of this dependency. That is how the dependency class words.

- `autorun` function that takes an **updater function**. Inside the updater function, you can depend on an instance of `Dep` by calling `dep.depend()`. Later, you can trigger the updater funciton to run again by calling `dep.notify()`

```js
// 2020/vue/dependency-tracking.html

const dep = new Dep()

autorun(() => {
    dep.depend() // 将这个函数和依赖（Dep）绑定在一起，只要调用 dep.notify()，dep.depend() 也会相应被调用
    console.log('update');
})

dep.notify();

```

### plugins 插件

> 编写插件

```js
function (Vue, options) {
    // ... plugin code
}

Vue.mixin(options) // 本质上是可以复用的代码片段

$options
```

***


## 过滤器
https://cn.vuejs.org/v2/guide/filters.html
【saber】/Users/bilibili/Desktop/bilibili/saber/src/page/comments/pgc/manage.vue

## 插槽
将 slot 作为承载分发内容的出口


## 插件
> 通常用来为 Vue 添加全局功能

> 在 `new Vue()` 启动之前，通过全局方法 `Vue.use()` 使用插件

> 可以传入一个可选的选项对象

### Vue.use做了什么
https://segmentfault.com/a/1190000016256277
注入 Vue.js 插件

如果插件是一个对象，必须提供 `install` 方法。如果插件是一个函数，会被作为 `install` 方法。`install` 方法调用时，会将 `Vue` 作为参数传入

使用 `vue.use()` 注册插件之后可以全局使用


```js
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router); // 可以在所有的vue文件中使用路由
```

**源码**

```js
/* @flow 

flow（js代码的静态类型检查工具）在编译期对js代码做类型检查，缩短调试时间，减少因类型错误引起的bug

js是解释执行语言，运行时才检查变量的类型，flow可以提前类型检查的时间

*/ 


import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {

    // 判断插件是否为 函数 或者 对象
    Vue.use = function (plugin: Function | Object) {
        const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
        // 判断 Vue 是否已经注册过这个插件，已经注册则 跳出方法
        if (installedPlugins.indexOf(plugin) > -1) {
            return this
        }

        // 获取 其他 参数 additional parameters
        const args = toArray(arguments, 1)
        args.unshift(this)
        // 判断插件是否有install方法，如果有就执行install方法，没有就把plugin当作install执行
        if (typeof plugin.install === 'function') {
            plugin.install.apply(plugin, args) // install方法内的this指向plugin
        }
        else if (typeof plugin === 'function') {
            plugin.apply(null, args) // plugin内的this指向null
        }

        // 告知 vue 已经注册过 该插件，保证每个插件只注册一次
        installedPlugins.push(plugin)
        return this
    }
}
```

```js
// toArray
export function toArray (list: any, start?: number): Array<any> { // list.length: 3: [1,2,4]
    start = start || 0 // start 1
    let i = list.length - start // i: 2
    const ret: Array<any> = new Array(i) // ret: []
    while (i--) { // i: 2 // 1
        ret[i] = list[i + start] // ret[1] = list[2] = 4 // ret[0] = list[1] = 2
    }
    return ret // [2,4]
}
```


## 4. 渲染函数 Render Function

> A function that returns Virtual DOM

```js
// HTML
<script type="text/x-template" id="anchored-heading-template">
    <h1 v-if="level === 1">
        <slot></slot>
    </h1>
    <h2 v-else-if="level === 2">
        <slot></slot>
    </h2>
    <h3 v-else-if="level === 3">
        <slot></slot>
    </h3>
    <h4 v-else-if="level === 4">
        <slot></slot>
    </h4>
</script>

// Javascript
Vue.component('anchored-heading', {
    template: '#anchored-heading-template',
    props: {
        level: {
            type: Number,
            required: true
        }
    }
})
```

```js
// 使用render函数
// HTML
Vue.component('anchored-heading', {
    render: function (createElement) {
        return createElement(
            'h' + this.level,   // tag name 标签名称
            this.$slots.default // 子组件中的阵列
        )
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
})
```
```js
// HTML
<script type="text/x-template" id="anchored-heading-template">
    <h1 v-if="level === 1">
        <slot></slot>
    </h1>
    <h2 v-else-if="level === 2">
        <slot></slot>
    </h2>
    <h3 v-else-if="level === 3">
        <slot></slot>
    </h3>
    <h4 v-else-if="level === 4">
        <slot></slot>
    </h4>
</script>

// Javascript
Vue.component('anchored-heading', {
    template: '#anchored-heading-template',
    props: {
        level: {
            type: Number,
            required: true
        }
    }
})
```

```js
// 使用render函数
// HTML
Vue.component('anchored-heading', {
    render: function (createElement) {
        return createElement(
            'h' + this.level,   // tag name 标签名称
            this.$slots.default // 子组件中的阵列
        )
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
})
```

**Initial Render**

Template

- (compiled into) Render Function

- (returns) Virtual DOM

- (generates) Actual DOM

Template -> [ Compiler ] -> Render Function

**Subsequent Updates**

Render Function

- (returns) new Virtual DOM

- (diffed against Old Virtual DOM) DOM Updates

- (applied to) Actual DOM


## Actual DOM & Virtual DOM

|     |Actual DOM|Virtual DOM
|:---:|:---|:---:|
|创建DOM|`document.createElement('div')`|`vm.$createElement('div')`
|控制台打印|"[object HTMLDivElement]"|{ tag: 'div', data: { attrs: {}, ... }, children: [] }
|性能能耗|Browser Native Object (expensive)|Plain JavaScript Object (cheap)
|实质|通过浏览器引擎创建真实DOM。浏览器打印包含很多节点|虚拟DOM是轻量的js数据，用来表示真实DOM在特定时间的外观，返回一个虚拟节点
|差异|
|资源消耗问题|非常消耗资源|纯js对象
|执行效率|修改时一般调用`innerHTML`方法，浏览器会把旧的节点移除再创建新节点|修改一个对象属性再把虚拟dom渲染到真实dom上|

> 很多人误解虚拟DOM比真实DOM速度快，其实虚拟DOM只是把DOM变更的逻辑提取出来，使用js计算差异，减少了实际操作DOM的次数，只在最后一次操作真实DOM，所以如果有复杂的DOM变更操作，虚拟DOM会更快一些。


**Advantage of using Virtual DOM**

> (Essentially) A lightweight JavaScript data format to represent what the actual DOM should look like at a given point in time 虚拟DOM是轻量的js数据，用来表示真实DOM在特定时间的外观

> Decouples rendering logic from the actual DOM - enables rendering capabilities in non-browser environments, e.g. server-side and native mobile rendering. 把渲染逻辑从真实DOM中分离 - 渲染不再需要触碰真实dom，无浏览器环境的渲染得以实现


[Vue原理之虚拟DOM和render函数]https://juejin.cn/post/6844903843206004743

## 前情提要

### DOM节点树

每一个元素就是一个节点。在vue中，可以通过修改模版或者渲染函数自动更新节点。

```html
<h1>{{blogTitle}}</h1>

<script type="javascript">
render: function (createElement) {
    return createElement('h1', this.blogTitle)
}
</script>
```

## 虚拟DOM

Vue编译器在编译模版之后，会把模版编译成一个渲染函数。调用函数时渲染并返回一个虚拟DOM树。


![](https://raw.githubusercontent.com/Missiris22/PictureHouse/master/%E8%99%9A%E6%8B%9Fdom%E6%B8%B2%E6%9F%93%E5%8E%9F%E7%90%86.png)


### <font color="F56C6C">Vue的响应式</font>

Vue支持我们通过data参数传递一个js对象作为组件数据，然后Vue将遍历此对象属性，使用 `Object.defineProperty` 设置对象，通过存取器函数（getter & setter）追踪属性变更。创建 `watcher` 层，在组件渲染的过程中，把属性记录为依赖，之后当依赖项的 `setter` 被调用时，会通知 `watcher` 重新计算，从而更新关联组件。


### <font color="F56C6C">虚拟DOM如何转成真实DOM？</font>

[Vue原理解析之Virtual DOM](https://segmentfault.com/a/1190000008291645)
![](https://raw.githubusercontent.com/Missiris22/PictureHouse/master/%E6%A8%A1%E7%89%88%E6%B8%B2%E6%9F%93%E7%9C%9F%E5%AE%9EDOM.png)


### <font color="F56C6C">数据发生变化时，虚拟DOM（VDOM）发生什么变化？</font>

我们有了VDOM之后，会交给一个Patch函数，负责把VDOM施加到真实DOM上。在VDOM第一次渲染成功DOM树之后，数据发生变化，Vue的响应式系统侦测到依赖的数据来源有变动，这时需要根据数据重新渲染VDOM。当重新进行渲染之后，会生成一个新的树，将新的树与旧的树进行对比，就可以最终得出应施加到真实DOM上的改动。最后通过Patch函数施加改动。

**简单来说，在Vue的底层实现上，Vue将模版编译成DOM渲染函数，结合Vue自带的响应系统，在应该改变的时候，Vue能够只能的计算出需要重新渲染的组件，以最小代价实现到真实DOM上。**

## 2.1 Simple Plugin

**总结：**
1. 插件中封装的代码实际上是想将其作为 vue实例的一个属性的，但是由于非Vue提供的api，所以在获得的时候需要使用 `this.$option.xx` 比较麻烦。
2. 使用插件封装全局的mixin，将安装一个 `created` 的钩子到组件中，钩子中将做一系列操作（获得自定义属性）。所有的 Vue实例都可以获得这个自定义属性。
3. 该自定义属性封装在插件的install函数中，当我们调用 `Vue.use()` 时，install会被执行，实际上是调用了这个 `install` 函数


Expected usage:

> 1. how to apply global funcitonality via a plugin
> 2. Inside a plugin, you basically can do everything by APIs which to use to achieve the end result
> 3. how to design yourself plugin: start with this desired API, which means how to use it, thinking from what results you want to achieve and how to design that it would be a good experience if we want other use it.

```js
// methods2: put rules in myMixin, so it can be used globally, every Vue instance can get this custom rules option
// Vue.mixin = {
//     created() {
//         if (this.$options.rules) {
//             // we can do something
//         }
//     }
// }

// method3: put mixin inside a plugin
// this install funcition will be invoked when we use Vue.use(RulesPlugin)
const myPlugin = {
    install() {
        Vue.mixin = {
            created() {
                if (this.$options.rules) {
                    // we can do something
                    Object.keys(this.$options.rules).forEach(key => {
                        const rule = this.$options.rules[key]
                        this.$watch(key, newValue => {
                            const result = rule.validate(newValue)
                            if (!result) {
                                console.log(rule.message)
                            }
                        })
                    })
                }
            }
        }
    }
}

Vue.use(myPlugin)

const vm = new Vue({
    data: { foo: 10 },

    // methods1: get rules!
    // created() {
    //     this.$options.rules
    // },

    // is not vue's api, so will not compile
    rules: {
        foo: {
            // validator function will be run every time foo changes, and if this validor failed, we'll log this message to console
            validate: value => value > 1,
            messsage: 'foo must be greater than one'
        }
    },
});

vm.foo = 0; // should log: 'foo must be greater than one'
```
