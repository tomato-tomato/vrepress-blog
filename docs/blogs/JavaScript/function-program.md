---
title: 函数式编程
date: 2021-01-07
sidebar: 'auto'
categories:
 - JavaScript
tags:
 - JavaScript
 - 函数式编程
publish: true
isShowComments: true
---

## 什么是函数式编程（FP， Functional Programming）？

函数式编程是编程范式之一，常见的编程范式有 面向过程编程、面向对象编程。

- 面向对象编程： 把现实世界中的事物抽象成类与对象，通过封装、继承和多态来演示事物事件之间的联系
- 函数式编程： 把现实世界的事物和事物之间的**联系**抽象到程序中（对运算过程进行抽象）



## 高阶函数（Higher-order function)

定义：

- 函数作为参数传递
  - 函数作为参数可以让函数更灵活
  - 不需要考虑内部如何实现的
- 函数作为另一个函数的返回结果

```js
 // 函数作为参数
 function filter(arr, fn){
     let res = [];
     for(let i = 0; i < arr.length; i++){
         if(fn(arr[i])){
             res.push(arr[i]);
         }
     }
     return res;
 }
 let arr = [1,2,3,4,6];
 let res = filter(arr, function(item){
     return item % 2 === 0;
 });
 console.log(res);


 //函数作为返回值
 function once(fn){
     let flag = false;
     return function(){
         if(!flag){
             flag = true;
             return fn.apply(this, arguments);
         }
     }
     //错误写法,以下闭包中没有调用参数 flag 导致每次调用都会有单独的 flag 出现
     /*if(!flag){
         flag = true;
         return function(){
             return fn.apply(this, arguments);
         }
     }*/
 }
 
 let res2 = once(function(n){
     console.log(`你好 ${n}`);
 })
 
 res2('luke')
 res2('tome')
```



## 高阶函数的意义

- 抽象可以屏蔽细节，只需要关注与我们的目标
- 高阶函数可以用来抽象通用问题





# 闭包

- 闭包： 函数和其周围的状态（词法环境）的引用捆绑在一起形成闭包
- 作用： 延长了外部函数内部变量的作用范围
  - 可以在另一个作用域中调用一个函数的内部函数并访问到该函数作用域中的成员
- 闭包的本质： 函数在执行时会放到一个执行栈上当函数执行完毕之后会从执行栈上移除。但是执行堆上的作用域成员因为被外部引用不能被释放，因此内部函数依然可以访问外部函数的成员。





# 纯函数

## 纯函数概念

- 相同的输入永远会得到相同的输出，而且没有任何可以观察的副作用
- 函数式编程不会保留计算的中间结果，所以变量时不可变的



## 纯函数的好处

- 相同的输入始终有相同输出，可以将纯函数进行缓存

  ```js
  //利用 lodash缓存
  const _ = require('lodash');
  
  function getArea(r){
      console.log(r);
      return Math.PI * r * r;
  }
  
  const mArea = _.memoize(getArea);
  
  console.log(mArea(3))
  console.log(mArea(3))
  console.log(mArea(3))
  ```

  ```js
  // 自行模拟 memoize 函数
  
  function memoize(f){
      let cache = {};
      return function(){
          const key = JSON.stringify(arguments);
          cache[k] = cache[k] || f.apply(f, arguments);
          return cache[k];
      }
  }
  ```

  

- 可测试

  - 纯函数让测试更方便

- 并行处理

  - 多线程环境下并行操作共享的内存数据很可能会出现意外情况
  - 纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数



## 纯函数的副作用

- **如果该函数依赖于外部状态就无法保证输出相同，就会带来副作用**
- 副作用来源
  - 配置文件
  - 数据库
  - 获取用户的输入
- 所有外部交互都可能产生副作用，副作用可以使得方法通用性下降不适合扩展和可重用，同时副作用可能给程序中带来安全隐患和不确定性。但副作用不可能完全禁止，尽可能控制它们在可控范围之内。



# 函数柯里化

```js
// 普通纯函数
function check(min, age){
    return age >= min;
}

// 函数柯里化
function check(min){
    return function(age){
        return age >= min;
    }
}
let check = min => (age => age >= min);


```

- 当一个函数有多个参数的时候，先传递一部分参数调用它
- 然后返回一个新的接收剩余参数的函数，返回结果
- 将任意多元函数转换为一元函数



## lodash 中的柯里化方法

- `_.curry(func)`
  - 功能：创建一个函数，该函数接收一个或者多个 func 的参数，如果 func 所需要的参数都被提供则执行 func 并返回执行的结果。否则继续返回该函数并等待接收剩余的参数
  - 参数： 需要柯里化的函数
  - 结果： 柯里化后的函数

```js
let abc = function(a, b, c) {
  return [a, b, c];
};
 
let curried = _.curry(abc);
 
 curried(1)(2)(3);
 // => [1, 2, 3]
 
 curried(1, 2)(3);
// => [1, 2, 3]
 
 curried(1, 2, 3);
// => [1, 2, 3]
 
// Curried with placeholders.
 curried(1)(_, 3)(2);
// => [1, 2, 3]
```



### 模拟实现 lodash 中的curry方法

```js
function curry(fnc){
    return function curfnc(...args){
        if(args.length < fnc.length){
            return function(){
                return curfnc(...args.concat(Array.from(arguments)));
            }
        }
        return fnc(...args);
    }
}
```



## 总结柯里化

- 柯里化可以让我们给一个函数传递较少的参数得到一个已经记住了某些固定参数的新函数
- 使用了闭包对函数的参数进行‘缓存’
- 柯里化让函数变得更灵活，让函数的粒度更小
- 可以把多元函数转变为一元函数，可以组合成功能更强大的函数





# 函数组合

- 函数组合（compose）：如果一个函数要经过多个函数处理才能得到最终值，这时可以把中间过程的函数合并成一个函数
  - 函数组合默认是从右到左进行的



```js
 // 模拟 lodash 中的 flow方法
 function compose(...args){
     return function (value){
         return args.reverse().reduce((pre, cur) => cur(pre), value);
     }
 }
```

- 函数组合要满足结合律



## 函数组合应用

```js
 // 通过函数柯里化 和 函数组合 
 // 实现 NEVER SAY DIE ==> never-say-die

 const _ = require('lodash');

 const trace = _.curry((tag, res) => {console.log(tag, res); return  res;})
 
 const split = _.curry((tag, arr) => _split(arr, tag));

 const map = _.curry((fn, arr) => _.map(arr, fn));
 
 const join = _.curry((sign, arr) => _.join(arr, sign));
 
 const f = _.flowRight(join('-'), trace(''), map(_.toLower)  ,trace('split'), split(' '));

 console.log(f("NEVER SAY DIE"))
```



# `lodash`中的 fp 模块

- lodash 中提供了对于函数式编程友好的模块，fp
- 提供了不可变的 自动柯里化 函数方法优先 参数之后 的方法

```js
 // 通过 lodah 中 fp 模块实现 
 // 实现 NEVER SAY DIE ==> never-say-die
 
 const fp = require('lodash/fp');

 const f = fp.flowRight(fp.join('-'), fp.map(fp.toLower), fp.split(' '));

 console.log(f("NEVER SAY DIE"))
```





# Point Free 一种编程风格

- 不需要指明处理的数据
- 只需要合成运算的过程
- 需要一些辅助的基本运算的函数

```js
 // 利用 pointFree 模式
 // Hello World ==> hello_world
 
 const fp = require('lodash/fp');

 const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower);

 console.log(f('HEllo      WOrlD'))

 // world wild web ==> W.W.W
 const firstLetterToUpper = fp.flowRight(fp.join('.'), fp.map(fp.flowRight(fp.toUpper, fp.first)), fp.split(/\s+/g));
```





# 函子 functor

## 什么是函子

- 容器： 包含值 和 值的变形关系

- 函子是一个特殊的容器，通过一个普遍的对象来实现，该对象有 map 方法，map 方法可以运行一个函数对值进行处理

```js
//改造前 
class Container{
     constructor(value){
         this._value = value;
     }
     
     map(fn){
         return new Container(fn(this._value));
     }
 }


 // 改造后
class Container{
    static of(value){
        return new Container(value);
    }
    
     constructor(value){
         this._value = value;
     }
     
     map(fn){
         return Container.of(fn(this._value));
     }
 }
```



## either 函子

- 用来处理异常
- 可以记录下来出错的信息

```js
 class Left{
      static of(value){
        return new Left(value);
    }
    
     constructor(value){
         this._value = value;
     }
     
     map(fn){
         return this;
     }
 }

  class Right{
      static of(value){
        return new Right(value);
    }
    
     constructor(value){
         this._value = value;
     }
     
     map(fn){
         return Right.of(fn(this._value));
     }
 }

 //let r1 = Right.of(12).map(x => x+3);
 //let r2 = Left.of(12).map(x => x+3);
 //console.log(r1, r2);

 function parseJSON(value){
     try{
         return Right.of(JSON.parse(value));
     }catch(e){
         return Left.of({error: e.message})
     }
 }
 
```





## IO 函子

- IO函子中的 _value 是一个函数，这里是吧函数作为值来处理
- IO 函子可以把不纯的动作存储到 _value 中，延迟执行这个不纯的操作，包装当前的纯操作
- 把不纯的操作交给调用者来处理

```js
 const fp = require('lodash/fp');
 class IO{
     static of(value){
         return new IO(function(){
             return value;
         })
     }
     
     constructor(fn){
         this._value = fn;
     }
     
     map(fn){
         return new IO(fp.flowRight(fn, this._value);
     }
 }


 let r = IO.of(process).map(x => x.execPath);
 console.log(r._value());
```



## Task 异步执行

- 异步执行使用 `folktale`中的 task 来实现

- folktale 库中只提供了一些函数式处理的操作，还有一些函子

```js
const { task } = require('folktale/concurrency/task');
const { map, split} = require('lodash/fp')

function readFile(filename){
    return tash(resolver => {
        fs.readFile(filename, 'urf-8', (err, data) => {
            if(err) resolver.reject(err);
            resolver.resolve(data);
        })
    })
}

readFile('package.json')
	.map(split('\n'))
	.map(find(x => x.includes('version')))
	.run()
	.listen({
    	onRejected: err => {
            console.log(err);
        },
    	onResolved: value => {
            console.log(value);
        }
	})
```



## Pointed 函子

- Pointed 函子是实现了 of 静态方法的函子
- of 方法是为了避免使用 new 来创建对象，更深层的含义时 of 方法用来把值放到上下文 Context 中，方便利用 map 来处理





## Monad单子

- 将 嵌套的 Pointed函子 变扁，即取出最后的结果值
- 一个具有 join 和 of 两个方法并遵守一些定律的函子就是 Monad



```js
 
  const fp = require('lodash/fp');

  // IO 单子
  class IO{
     static of(value){
         return new IO(function(){
             return value;
         })
     }
     
     constructor(fn){
         this._value = fn;
     }
     
      //返回值 调用
     map(fn){
         return new IO(fp.flowRight(fn, this._value));
     }
      
     join (){
         return this._value;
     }
     
      //返回函子 调用
     flatMap (fn) {
         return this.map(fn).join();
     }
  }
 let readFile = function (filename) {
    return new IO(function() {
    	return fs.readFileSync(filename, 'utf-8')
   })
  }
 
  let print = function(x) {
    return new IO(function() {
   	 console.log(x)
    	return x
    })
  }
  
  let r = readFile('package.json')
  			.flatMap(print)
 
```

`let r = readFile('package.json').flatMap(print)` 该步骤分析

- `readFile` 函数调用后返回的是 包裹着读文件操作的 IO函子
- `flatMap` 将读文件的操作 跟 `print`的操作合并起来
  - `readFile` 返回的函子调用 `flatMap`
  - `flatMap`操作先调用 map 方法的返回值
    - map 的返回值的形成：首先将 `readFile` 中包裹的读文件操作 传入的函数 `print` 中组成一个新函数，并一起作为一个新的 IO函子返回，返回后又将这个IO函子作为参数包裹成一个IO函子最终称为map操作的返回值，即 `IO(IO(readFile 函数操作传入 print中组成的新函数))`
  - `flatMap` 接着调用 join 方法，即剥开最外层的IO函子，返回内层的 IO函子