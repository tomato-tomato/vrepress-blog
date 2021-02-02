---
title: Gulp
date: 2021-02-01
sidebar: 'auto'
categories:
 - JavaScript
tags:
 - JavaScript
 - 自动化构建
publish: true
isShowComments: true
---

## Gulpfile

`gulpfile.js` 文件为gulp的入口文件，在运行 gulp 命令时会被自动加载。<br>

该文件可以使用需要转译的编程语言，例如 Typescript。通过修改 gulpfil.js 的扩展名来表明所用的编程语言，并安装对应的转移模块

- 对于 TypeScript，重命名为 `gulpfile.ts` 并安装 [ts-node](https://www.npmjs.com/package/ts-node) 模块。
- 对于 Babel，重命名为 `gulpfile.babel.js` 并安装 [@babel/register](https://www.npmjs.com/package/@babel/register) 模块。



## 组合任务

每个 gulp 任务都是一个异步的 JavaScript 函数，接收一个 函数作为参数。<br>

gulp 提供了两个组合方法：`series()` 和 `parallel()`， 允许将多个独立的任务组合成一个更强大的操作。

> 当使用 `series()` 组合多个任务（task）时，任何一个任务（task）的错误将导致整个任务组合结束，并且不会进一步执行其他任务。当使用 `parallel()` 组合多个任务（task）时，一个任务的错误将结束整个任务组合的结束，但是其他并行的任务（task）可能会执行完，也可能没有执行完。



```js
const { series, parallel } = require('gulp')

const task1 = done => {
  setTimeout(() => {
    console.log('task1 working~')
    done()
  }, 1000)
}

const task2 = done => {
  setTimeout(() => {
    console.log('task2 working~')
    done()
  }, 1000)  
}

const task3 = done => {
  setTimeout(() => {
    console.log('task3 working~')
    done()
  }, 1000)  
}

// 让多个任务按照顺序依次执行
exports.foo = series(task1, task2, task3)

// 让多个任务同时执行
exports.bar = parallel(task1, task2, task3)
```



`series()` 和 `parallel()` 可以被嵌套到任意深度。两者也允许相互嵌套。

```js
const { series, parallel } = require('gulp');

function clean(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

function javascript(cb) {
  // body omitted
  cb();
}

exports.build = series(clean, parallel(css, javascript));
```



## 异步任务

- 返回 stream

  ```js
  const fs = require('fs')
  exports.stream = () => {
    const read = fs.createReadStream('yarn.lock')
    const write = fs.createWriteStream('a.txt')
    read.pipe(write)
    return read
  }
  ```

- 使用 async/await

  ```js
  const timeout = time => {
    return new Promise(resolve => {
      setTimeout(resolve, time)
    })
  }
  
  exports.async = async () => {
    await timeout(1000)
    console.log('async task')
  }
  ```

- 返回 Promise

  ```js
  exports.promise = () => {
    console.log('promise task')
    return Promise.resolve()
  }
  
  exports.promise_error = () => {
    console.log('promise task')
    return Promise.reject(new Error('task failed'))
  }
  ```

- 使用 callback

  ```js
  exports.callback = done => {
    console.log('callback task')
    done()
  }
  
  exports.callback_error = done => {
    console.log('callback task')
    done(new Error('task failed'))
  }
  
  ```

## gulp 构建过程核心原理

读取流  =》转换流 =》 写入流

```js
const fs = require('fs')
const { Transform } = require('stream')

exports.default = () => {
  // 文件读取流
  const readStream = fs.createReadStream('normalize.css')

  // 文件写入流
  const writeStream = fs.createWriteStream('normalize.min.css')

  // 文件转换流
  const transformStream = new Transform({
    // 核心转换过程
    transform: (chunk, encoding, callback) => {
      // 核心转换过程实现
      // chunk 指的是读取流中读取到的内容
      const input = chunk.toString()
      const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
      callback(null, output)
    }
  })

  return readStream
    .pipe(transformStream) // 转换
    .pipe(writeStream) // 写入
}

```



## 处理文件

gulp 提供了 `src()` 和 `dest()` 方法用于处理文件<br>

`src()` 接受glob参数，从文件系统中读取文件然后生成一个Node流。他将所有匹配的文件读取到内存中并通过流进行处理。

`dest()` 接受一个输出目录作为参数，并且他会产生一个 Node 流，通常作为终止流。

gulp 中的转换流一般通过插件提供，大多数情况下，利用 `.pipe()` 方法，将插件放置在 `sec()` 和 `dest()` 之间。

```js
const {src, dest} = require('gulp')
const babel = require('gulp-babel')

exports.default = () => {
    return src('src/*.js')
    	.pipe(babel())
    	.pipe(dest('dist'))
}
```

## gulp常用插件
- HTML压缩 -- gulp-htmlmin
- JS 压缩 -- gulp-uglify
- JS 兼容处理 -- gulp-babel、@babel/core、@babel/preset-env
- CSS 压缩 -- gulp-clean-css
- CSS 预编译 -- gulp-sass
- 图片字体压缩 -- gulp-imagemin
- 删除文件 -- del
- 插件自动加载 -- gulp-load-plugins
- 热更新开发服务器 -- browser-sync
- 对文件中依赖项的处理 -- gulp-useref
- 判断 -- gulp-if
