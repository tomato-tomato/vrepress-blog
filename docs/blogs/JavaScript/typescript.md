---
title: TypeScript 语言
date: 2021-01-26
sidebar: 'auto'
categories:
 - JavaScript
tags:
 - JavaScript
 - TypeScript
publish: true
isShowComments: true
---

## 语言类型

- 强类型与弱类型 （类型安全）
- 静态类型与动态类型 （类型检查）

### 类型安全方面

强类型： 语言层面限制函数的实参类型必须与形参类型相同，不允许隐式类型转换

弱类型： 语言层面不会限制实参的类型



### 类型检查方面

静态类型： 变量声明时，类型确定，声明过后类型不允许被修改

动态类型：运行阶段才可以确定变量类型，变量类型可以随时改变。变量没有类型，变量存放的值是有类型的



## JavaScript 弱类型产生的问题

- 调用对象中不存在的方法，因为没有编译过程，只有在运行时才能发现问题
- 对于函数中传入的参数，没有确定的类型，最后出现的结果会跟期待的有差异
- 给对象添加属性，没确定是否为字符串，传入任何类型会隐式转变成字符串



## 强类型优势 

- 错误会更早的暴露
- 代码更智能，编码更准确
- 重构更牢靠
- 减少不必要的类型判断



## Flow -- JavaScript的类型检查器

代码中添加**类型注解**的方式，确定变量类型

```js
// @flow
function(a: number, b){
    return a + b;
}

function(a, b): number{
    return a + b;
}


const a: string = 'foo';

const b: number = Infinity;

const c: boolean = true;

const d: null = null;

const e: void = undefined;

const f: symbol = Symbol();

// 数组
const arr1: Array<number> = [1,2,3,4];

const arr2: number[] = [1,2,3]

// 元组
const foo:[string, number] = ['foo', 100];

// 对象
const obj1: {foo: string, bar: number} = {foo: 'hello', bar: 123}

const obj2: {foo?: string, bar: number} = {bar: 123}

const obj3: {[string]: string} ={};
obj3.key1 = 'value1'
obj3.key2 = 'value2'

// 函数
function foo(callback:(string, number) => void){
    callback('string', 100)
}

foo(function(str, n){
    // str ==> string
    // n ==> number
    // 不能有返回值
})


// 特殊类型
// 字面量类型
const a: 'foo' = 'foo';

const type: 'success' | 'warning' | 'danger' = 'success'

type StringOrNumber = string | number;

const b: StringOrNumber = 'string';

const gender:? number = undefined;
const gender: number | undefined | null = null;

// mixed any

// mixed 强类型
function p(value:mixed){
    if(typeof value === 'string'){
        value.substr(1)
    }
}
p('string')
p(100)

// any 是弱类型
function passAny(value: any){
    
}
passAny('string')
passAny(100)
```



## TypeScript 是 JavaScript 的超集

### 安装 TypeScript

- `npm i typescript -D `  (--dev--save)
- `package.json` 中修改  `"scripts": {  "tsc": "tsc" }`
- 初始化 ts 的配置文件 `npm run tsc -- --init`



### 语法

有些部分与上述语法类似，一下列举不同的部分



#### 元组(tuple)

```ts
const tuple: [number, string] = [123, 'hello']

//const age = tuple[0]
const [age, name] = tuple;
```



#### 枚举

若不是常量枚举，则编译为双向的键值对对象。

```ts
// const PostStatus = {
//     Draft: 0,
//     Unpublished: 1,
//     Publiseh: 2
// }

// enum PostStatus {
//     Draft = 0,
//     Unpublished = 1,
//     Publisehed = 2
// }

// enum PostStatus { // 自增
//     Draft = 1,
//     Unpublished,
//     Publisehed
// }

// enum PostStatus {
//     Draft = 'aaa',
//     Unpublished = 'bbb',
//     Publisehed = 'ccc'
// }

// 常量枚举
const enum PostStatus {
    Draft = 'aaa',
    Unpublished = 'bbb',
    Publisehed = 'ccc'
}

const post = {
    title: 'Hello world',
    content: 'today is friday',
    status: PostStatus.Draft //3 //2 //1
}
```



#### 函数类型约束

```js
function func1(a:number, b?: number, ...rest: number[]): string {
    return 'func1'
}

func1(100, 200);

func1(300)

func1(100, 200, 200)



const func2: (a: number, b: number) => string = function(a:number, b:number): string {
    return 'func2'
}
```



#### 隐式类型推断

```js
let age = 18; // 该处 age 被推断为 number 类型，下列语句报错

age = 'string'

let foo; // 该处foo 为 any
```



#### 类型断言

```js
const nums = [12,4,5,6,7];

const res = num.find(i => i > 0);

// 断言方式1
const nums1 = res as number;

// 断言方式2
const nums2 = <number>res;
```



#### 接口（Interfaces）

约定一个对象当中具体应该有哪些成员，有哪些类型

```js
interface Post{
    first: string;
    last: number;
    subtitle?: string; // 可选成员
    readonly summary: string; // 只读成员
}

function f(post: Post){
    console.log(post.first);
    console.log(post.last);  
}

f({ first: 'hello world',last: 1234, summary: 'friday'});


// 动态成员
interface Cache{
    [key: string]: number
}

const cache: Cache = {};

cache['hello'] = 123
```



#### 类

描述一类具体事物的抽象特征

```js
class Person{
    public name: string // = 'init'
    private age: number  // 私有属性
    protected readonly gender: boolean // 只允许在子类中访问的成员

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
        this.gender = true;
    }

    sayHi(msg: string):void{
        console.log(`I am ${this.name}, ${msg}`)
    }
}

class Student extends Person{
    private constructor(name: string, age: number){
        super(name, age);
        console.log(this.gender);
    }

    static create(name: string, age: number){
        return new Student(name, age);
    }
}

const tom = new Person('tom', 18);
console.log(tom.name);
// console.log(tom.age);
// console.log(tom.gender);

const jack = Student.create('jack', 20);
```



#### 类 和 接口

```js
interface Eat{
    eat(food: string): void
}

interface Run{
    run(distance: number): void
}

class Person implements Eat, Run {
    eat(food: string):void {
        console.log(`优雅的进餐：${food}`);
        
    }

    run(distance: number): void {
        console.log(`直立行走 ${distance}`);
        
    }
}

class Animal implements Eat, Run {
    eat(food: string):void {
        console.log(`呼噜的吃 ${food}`);
        
    }

    run(distance: number): void {
        console.log(`爬行 ${distance}`);
        
    }
}
```



#### 抽象类

```js
abstract class Animal {
    eat(food: string):void {
        console.log(`呼噜的吃 ${food}`); 
    }

    abstract run(distance: number) : void
}

class Dog extends Animal{
    run(distance: number): void {
        throw new Error(`四脚爬行 ${distance}`);
    }
    
}

const d = new Dog();
d.eat('fruit')
d.run(199)
```



#### 泛型

在声明这个函数时，不去指定具体类型。等到调用时，再去指定。

```js
function creatArray <T> (length: number, value: T): T[] {
    const arr = Array<T>(length).fill(value);
    return arr;
}

const res = creatArray<string>(3, 'hello')
```



#### 类型声明

在使用其他模块的时候，有些模块并没有类型声明文件。需要使用类型声明

如有对应的类型声明模块，直接安装即可

```js
import {camelCase} from 'lodash'

declare function camelCase (input: string): string

const res = camelCase('hello typed')
```










