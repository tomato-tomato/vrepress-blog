---
title: Promise相关异步代码执行顺序
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

## 示例代码
```js
async function f1(){
	console.log(1);
	await f2();
	await f3();
	console.log(2)
	await f4();
}
async function f2(){
	console.log(3)
	await console.log(4);
	console.log('a');
}
function f3(){
	console.log('b');
}
function f4(){
	console.log('f');
}

console.log(5);

setTimeout(function(){
	console.log(6);
}, 0);

f1();

new Promise(function(resolve){
	console.log(7);
	resolve();
}).then(function(){
	console.log(8);
}).then(function(){
	console.log('c')
}).then(function(){
	console.log('d')
})
console.log(9);
```
> 以上代码的最终显示结果：513479a8bc2fd6



