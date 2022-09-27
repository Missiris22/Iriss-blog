---
title: JavaScript
date: '2022-09-27'
categories:
    - 面试特辑
tags:
  - javascript
---

## 声明提升

https://juejin.cn/post/6844903794082316296

### 规则

1. 函数声明和变量声明都会被提升，函数优先

2. 函数声明被提升，但函数表达式（或其他赋值操作）不被提升

### 补充说明

1. 函数声明

```js
function foo() {}
```

2. 函数表达式

```js
const foo = function() {}
```

3. 一些题目

```js

foo();
function foo() {
  console.log(1);
}
var foo = function() {
  console.log(2);
};
function foo() {
  console.log(3);
}
```

## 箭头函数

https://zh.javascript.info/arrow-functions

1. 箭头函数没有 `this`，如果访问this，会从外部获取

2. 箭头函数没有 `arguments`

3. 不能对箭头函数进行 new 操作

4. 箭头函数没有 `super`

## this

https://segmentfault.com/a/1190000011194676

1. js关键字之一，是对象自动生成的内部对象，只能在对象内部使用。随着函数的调用，值会有所不同

2. this指向什么取决于他在哪里调用，而不是在哪里声明

3. 绑定规则：
 
  - 默认绑定：
     严格模式 =》 this可以是任意值 =》 默认绑定undefined
     非严格模式 =》 this一定指向一个对象 =》默认绑定window / globalThis

  - 隐式绑定：
     取决于函数被调用的方式，取直接上下级

  - 显式绑定：
     call apply bind
     - call从第二个参数开始所有的参数都是 原函数的参数 `foo.call(obj); // 10 call =》 绑定this，并执行foo函数`
     - apply只接受两个参数，且第二个参数必须是数组，这个数组代表原函数的参数列表
     - bind只有一个函数，且不会立刻执行，只是将一个值绑定到函数的this上,并将绑定好的函数返回
     
  - new 绑定：
 
 ```
     new
         1. 创建一个新对象
         2. 把这个新对象的__proto__属性指向 原函数的prototype属性（继承原函数的原型）
         3. 把新对象绑定到这个函数的this上
         4. 如果这个函数没有返回其他对象，则返回新对象
 ```

 ** this 绑定 优先级 **
 
 ** new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定 **


### 箭头函数的this绑定

1. 箭头函数不使用上面的四种绑定，而是完全根据外部作用域来决定this。(它的父级是使用我们的规则的哦)

2. 箭头函数的this绑定无法被修改
