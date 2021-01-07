---
title: JavaScript异步编程
date: 2021-01-07
sidebar: 'auto'
categories:
 - JavaScript
tags:
 - JavaScript
 - 异步编程
publish: true
isShowComments: true
---

JavaScript 采用**单线程模式**工作，是因为JavaScript 是用来在实现页面上的动态交互，即进行DOM操作，这也就决定了必须要使用单线程模型，否则就会有很多线程同步问题 。单线程模式指的是，在JS执行环境当中，负责执行代码的线程只有一个。



## 同步模式

任务依次执行，必须等前一个任务执行完成才能继续执行后续代码



## 异步模式

不会等待这个任务的结束才开始下一个任务，开启过后立即开始下一个任务，后续逻辑一般会通过回调函数的方式定义。



> 同步和异步并不是指我们写代码的方式，而是运行环境提供的 API 是以同步或异步模式的方式工作



## 回调函数

- 所有异步编程方案的根基

- 由调用者定义，交给执行者执行的函数



## Promise

```js
 function ajax(url){
     return new Promise(function(resolve, reject){
         let xhr = new XMLHTTPRequest();
         xhr.open('GET', url);
         xhr.responseType = 'json';
         xhr.onload = function(){
             if(this.status === 200){
                 resolve(this.response)
             }else {
                 rejuct(new Error(this.statusText))
             }
         }
         xhr.send();
     })
 }
```



- 嵌套的使用方式是使用 Promise 最常见的错误
- 应该使用 Promise 中 then方法的链式调用的特点，保证异步任务的扁平化



- Promise 对象的 then 方法会返回一个新的 Promise 对象
- 后面的 then方法就是在为上一个 then 返回的 Promise 注册回调
- 前面 then 方法噶中回调函数的返回值会作为后面 then 方法回调的参数
- 如果回调中返回的是 Promise，那后面 then方法的回调会等待它的结束



##  宏任务  & 微任务

回调队列中排队的任务可以理解为一个个宏任务

在宏任务执行过程中，临时加上的一些额外的需求可以作为当前任务的微任务，在当前任务结束后立即执行



- 宏任务： setTimeout，大部分异步调用的API
- 微任务： Promise 、MutationObserver、Node中的 process.nextTick





## Generator

```js
function * main(){
	try{
        const users = yield ajax('/api/user.json')
        console.log(users);

        const posts = yield ajax('/api/posts.json')
        console.log(posts);
    }catch (e){
        console.log(e);
    }
}

function co(generator){
    const g = generator();

    function handleResult (result){
        if(result.done) return;
        retult.value.then(data => {
            hanleResult(g.next(data));
        }, err => {
            g.throw(err)
        })
    }
    
    handleResult(g.next());
}

co(main);

/*
const result = g.next();
result.value.then(data => {
    const result2 = g.next(data);
    
    if(result2.done) return;
    result2.value.then(data => {
        g.next(data);
        
    })
})*/
```



## Async &  Await

```js
async function main(){
    try{
        const users = await ajax('/api/user.json')
        console.log(users);

        const posts = await ajax('/api/posts.json')
        console.log(posts);
    }catch (e){
        console.log(e);
    }
}

const promise = main();
promise.then(() => {
    console.log('all completed')
})
```

