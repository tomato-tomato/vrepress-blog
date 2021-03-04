---
title: 模块化
date: 2021-03-05
sidebar: 'auto'
categories:
 - JavaScript
tags:
 - JavaScript
 - 模块化
publish: true
isShowComments: true
---

通过把复杂代码按照功能的不同划分为不同模块的方式，提高开发效率，降低维护成本。



## 早期模块化

### 文件划分

 所有的模块都在全局工作

造成的问题：

- 污染全局作用域
- 命名冲突问题
- 无法管理模块之间依赖关系

文件划分方式完全依靠约定



### 命名空间方式

每个模块只暴露一个全局的对象，没有私有空间，依然无法解决问题



### IIFE（立即执行函数）

提供私有空间，需要使用的成员挂载到全局对象的方式进行实现



## 模块化规范

### CommonJS规范

以同步模式加载模块，对于浏览器

- 一个文件就是一个模块
- 每个模块都是由单独的作用域
- 通过 module.exports 导出成员
- 通过 require 函数载入模块



### AMD（Asynchronous Module Definition)异步模块规范

- AMD使用起来相对复杂
- 模块JS 文件请求频繁



## 模块化标准规范

在Node环境中，遵循 CommonJS。在浏览器环境中使用 ES Modules规范。



## ES Modules

### 基本特性

通过给script 标签中添加`type = "module"`的属性，就可以以 ES Module 的标准执行其中的 JS 代码

1. ES Module 自动采用严格模式，忽略 'use strict'
2. 每个 ES Module 都是运行在单独的私有作用域中
3. ES Module 通过 CORS ("跨域资源共享" Cross-origin resource sharing)的方式请求外部的 JS 模块
4. ES Module 的 script 标签会延迟执行脚本(等待网页渲染完成后再执行脚本，类似于 defer)



### ES Module 导入和导出

```js
// ./module.js
const foo = 'hello'
export {foo}

// ./app.js
import {foo} from './module.js'
console.log(foo)
```

注意事项：

- 导出成员 写成 `export {name, age}`的形式，并不是导出的是个字面量对象，这只是固定用法
- 导出的成员不是导出的值，是导出的成员的引用
- 导出的成员的引用是只读的，不能在引用的文件改变该值



### import 用法

#### 注意事项

- `import {name} from './module' ` from 后的参数是个字符串，必须要输入完整的路径名称，不能省略 .js 的扩展名
-  对于index.js 文件也需要完整的路径名称
- 不能省略路径中的 `./`
- 可以使用绝对路径，或者 使用完整的 url 加载模块

#### 执行模块

只需要执行某个模块可以如下调用

```js
import {} from './module.js'
or
import './module.js'
```

#### 导出多个成员都需要使用

```js
import * as mod form './module.js'
console.log(mod.age)
```

#### 动态导入模块

```js
import('./module.js').then(function(module) {
    console.log(module)
})
```

#### 导入默认成员和其他成员

```js
import {name, age, default as title} from './module.js'
or
// 以下默认成员为 title
import title, {name, age} from './module.js'
```

### 导出整合

```js
// button.js
export var Button = 'Button component'

// gallary.js
var Gal = 'Gallary component'
export default Gal

// index.js
export {Button} from './button.js'
export {default as Gal} from './gallary.js'

// 需要导入的文件
import {Button, Gal} from './index.js'
```



## 兼容性

### 开发阶段使用

`browser-es-module-loader` 模块，让低版本的浏览器可以支持ES Module的代码。（利用unpkg网站获取相应模块的CDN地址）另外通过在`script` 标签中添加 `nomodule` 属性，让代码只在不支持 ES Module的浏览器中运行。



### node 对于 ES Module已有支持

> node 版本 >8.5 可以直接运行 

node 中使用ES Module：

- 将拓展名修改为 .mjs
- 启动node 时需要 使用 `node --experimental-modules <file>`



### Node原生 ES Module 中运行 CommonJS

- ES Module 中可以导入 CommonJS 模块
- CommonJS 模块始终只会导出一个默认成员
- 在 CommonJS 模块中不能通过 require 载入 ES Module
- ES Module 中没有 CommonJS 中的那些模块全局成员

```js
// CommonJS 中
console.log(require)
console.log(module)
console.log(exports)
console.log(__filename)
console.log(__dirname)

// ES Module中
import {fileURLToPath} from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
console.log(__filename)
const __dirname = dirname(__filename)
console.log(__dirname)
```

