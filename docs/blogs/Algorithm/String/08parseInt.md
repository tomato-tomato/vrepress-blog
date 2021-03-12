---
title: 08 - 字符串转换整数
date: 2021-03-12
sidebar: 'auto'
categories: 
    - Algorithm
tags: 
    - Algorithm
isShowComments: true
publish: true
---


## 题目：
<i class="far fa-keyboard"></i>[原题链接](https://leetcode-cn.com/problems/string-to-integer-atoi/)

该题需要实现一个函数，使其能将字符串转换成一个 32 位有符号整数（类似 C/C++ 中的 atoi 函数）。
读题之后主要有以下几点
  - 传入的字符串前导空格需丢弃
  - 符号位应该保留，特别是对负号的保留
  - 从左往右提取数字部分，遇到非数字则丢弃
  - 转换成的数值范围应该在 [-2^31, 2^31 - 1],超过换个范围返回对应边界值即可
  - 如果是非数值，则返回0

## 解法一：
JavaScript 中有相关方法 —— `parseInt`, 只需要处理边界条件即可    
```js
var myAtoi = function(s) {
    let res = parseInt(s, 10);

    if(isNaN(res)){
        return 0;
    }else if(res < Math.pow(-2, 31) || res > Math.pow(2, 31) - 1){
        return res < Math.pow(-2, 31) ? Math.pow(-2, 31) : Math.pow(2, 31) - 1;
    }else{
        return res;
    }
};
```

## 解法二： 利用状态机

定义四种状态：START, SIGN, IS_NUMBER, END

同时也会遇到始终不同的值：空格，符号，数值，其他

他们的状态改变的对应关系如下:

|           | space | sign(+, -) | number    | others |
| --------- | ----- | ---------- | --------- | ------ |
| START     | START | SIGN       | IS_NUMBER | END    |
| SIGN      | END   | END        | IS_NUMBER | END    |
| IS_NUMBER | END   | END        | IS_NUMBER | END    |
| END       | END   | END        | END       | END    |

> 以上表格可以理解为：左侧为当前的状态，在该状态下遇到对应的数据会更改其状态，从而进行处理。

声明类做状态处理

```js
class stringParse{
    constructor(){
        // 定义各种状态
        this.START = 0;
        this.SIGNED = 1;
        this.IS_NUMBER = 2;
        this.END = 3;
        // 注1： 该处定义结果的长度，结果字符串，和是否完成
        this.length = 0;
        this.res = "";
        this.isFinish = false;
        // 定义初始状态
        this.cur = this.START;
    }

    receive(s){
        // 对初始值处理前后空格
        s = s.trim();
        // 读取每个字符然后，传入 receiveParse 方法处理
        for(let i = 0; i < s.length; i++){
            this.length++;
            // 依次将字符传入逐一处理
            this.receiveParse(s.charAt(i));
            if(this.cur === this.END || this.length === s.length){
                this.isFinish = true;
                break;
            }
        }
    }
	// 字符处理
    receiveParse(char){
        // 注2 中间空格处理
        if(char === " "){
            this.cur = this.END;
        }
        // 状态处理
        if(this.cur === this.START){
            if(char === '+' || char === '-'){
                this.cur = this.SIGNED;
                this.res += char;
            }else if(typeof Number(char) && !isNaN(char)){
                this.cur = this.IS_NUMBER;
                this.res += char;
            }else{
                this.cur = this.END;
            }
        }else if(this.cur === this.SIGNED){
            if(typeof Number(char) && !isNaN(char)){
                this.cur = this.IS_NUMBER;
                this.res += char;
            }else{
                this.cur = this.END;
            }
        }else if(this.cur === this.IS_NUMBER){
            if(typeof Number(char) && !isNaN(char)){
                this.res += char;
                this.cur = this.IS_NUMBER;
            }else{
                this.cur = this.END;
            }
        }else {
            this.cur = this.END;
        }
    }
    
    get result(){
        if(this.isFinish){
            // 边界处理
            this.res = isNaN(this.res) ? 0 : +this.res
            if(this.res < Math.pow(-2, 31) || this.res > Math.pow(2, 31) - 1){
                this.res = this.res < Math.pow(-2, 31) ? Math.pow(-2, 31) : Math.pow(2, 31) - 1;
            }
        }
        return this.res;
    }
}
```

对上述注解进行说明(额。。。其实都是注意的点以及小坑 :joy:)

**注1：** 为啥要设置length

设置 length 的目的主要是为了对于纯数值的状态的转换。当对于一个纯数字符串例如"235455"，直到结束对于这个参数的状态任然会停留在 IS_NUMBER 的状态。无法到达END 的状态，所以就无法进行边界处理。对于超过边界的纯数值形成的字符串没办法按题目要求处理。

**注2：** 为啥要处理空格

首先明确，对于字符串首尾两端的空格不会影响状态，所以在 receive 方法中，第一步就会利用字符串的 trim 方法进行处理。

其次，对于字符串中间部分的空格，面对条件 `typeof Number(char) && !isNaN(char)` 它是完全符合的 :joy: , 以至于遇到中间空格他不会转换到 END 状态。所以需要在状态处理的开头就直接处理空格。



最后在题目要求的函数中调用即可

```js
var myAtoi = function(s) {
    let parse = new stringParse();
    parse.receive(s);
    return parse.result;
};
```













