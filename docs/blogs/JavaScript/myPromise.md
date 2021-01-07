---
title: 手写Promise源码
date: 2021-01-07
sidebar: 'auto'
categories:
 - JavaScript
tags:
 - JavaScript
 - Promise
publish: true
isShowComments: true
---

## Promise的核心实现

1. Promise 就是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行

2. Promise中 有三种状态，分别为 成功 fulfilled 失败 rejected 等待 pending

   - pending  ==> fulfilled

   - pending   ==> rejected

   - 一旦状态确定就不可更改

3. resolve 和 reject 函数就是用来更改状态的
   - resolve: fulfilled
   - rejected: rejected
4. then 方法内部做的事情就是判断状态。状态成功，则调用成功的回调函数，状态时失败，则调用失败的回调函数。then 方法是被定义在原型对象中的
5. then成功回调和失败回调都有对应的值



## Promise加入异步逻辑

- 对于异步调用，因为不会立即执行，当前状态还是为 等待状态 pending

- 在 then 中要处理等待状态
- 所以需要对成功和失败的诡吊进行缓存



## Promise 中 then方法多次调用添加多个处理函数

- 多次调用时，需要缓存成功和失败调用相应的函数

- 缓存回调函数使用  队列结构，对数组 push 和 shift 运用



## promise中 then的链式调用

- then方法可以链式调用，需要返回一个 Promise 对象

- 判断上一个then成功调用的值是 普通值 还是 promise对象
  - 普通值 直接调用 resolve 
  - promise 对象先查看promise对象返回的结果，再根据结果决定调用resolve 还是reject

## then方法链式调用识别 Promise对象自己返回

- then 方法中如果返回的是 此时 then 方法返回的 Promise对象，则会报错
- 所以在 then 方法返回之前，需要判断返回的是否是当前 then方法的Promise对象，进行相应处理 
- 在 当前then方法中没办法取得当前then返回的 Promise对象，则需要利用setTimeout 将相应代码转换成异步代码进行获取



## 捕获错误

- 利用对**执行器** try-catch 操作捕获错误
- 在 then 的回调中发生的错误 也需要用 try-catch 捕获



## then 方法传入的参数有空值时

- 遇到空值则调用 value => value 函数，将值向下传递即可



## 静态方法 all方法的实现

- all方法传入一个数组
- 判断数组中每个元素是 promise对象还是 普通值，声明结果数组
  - 普通值则直接放入结果数组对应的位置
  - promise对象则调用then方法，成功回调则放入数组对应位置，失败回调则调用 reject 方法
- 为解决传入的数组元素是异步操作的promise，则需要声明一个长度变量index，在添入结果数组的操作中，判断index跟传入的数组长度相等时则返回 带有结果数组的 resolve 方法



## 静态方法 resolve 方法

- 判断传入的时普通值还是 promise值
  - 普通值则 返回含有该值的 resolve 方法的 promise 对象
  - promise 对象则直接返回



## finally 方法

- 传入一个回调函数

- 不论当前 promise 对象的状态是成功还是失败，都需要调用该回调函数
- 要获得当前 promise的状态，需要调用 then 方法
- 避免异步调用的失效，返回调用 promise.resove 方法处理回调函数的返回值，并通过 then方法返回



## catch方法

- 返回 promise对象的then方法， 传入的方法作为失败回调即可