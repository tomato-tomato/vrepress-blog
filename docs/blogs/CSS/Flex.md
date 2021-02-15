---
title: Flex 布局
date: 2021-02-15
sidebar: 'auto'
categories:
 - CSS
tags:
 - CSS
 - Flex
isShowComments: true
---

## 1. 基本概念

采用 Flex 布局的元素，称为 Flex 容器（flex container)。 它的所有子元素自动称为容器成员， 称为 Flex 元素（flex item）

> 注： 使用 Flex 布局之后，子元素的 `float` `clear` `vertical-align` 属性将失效

容器默认存在两根轴，水平的主轴，垂直的交叉轴。(当设置`flex-direction`方向改变时, 俩轴会跟着改变)

整个Flex容器中的所有元素默认按照主轴排列。



## 2. 属性

跟 Grid 布局类似， Flex布局也有两种属性，容器属性与元素属性。

::: details
|容器属性|元素属性|
|:------|:------|
|display|order|
|flex-direction|flex-grow|
|flex-wrap|flex-shrink|
|flex-flow|flex-basis|
|justify-content|flex|
|align-items|align-self|
|align-content||
:::

## 3. 容器属性

### 3.1 flex-direction
`flex-direction` 属性决定主轴的方向(即内部元素的排列方向)

```css
#container{
    flex-direction: row | row-reverse | column | column-reverse;
}
```

### 3.2 flex-wrap

`flex-wrap` 属性决定内部元素是否换行，默认不换行

```css
#container{
    flex-wrap: nowrap | wrap | wrap-reverse;
}
```

### 3.3 flex-flow

`flex-flow` 属性是 `flex-direction` 和 `flex-wrap` 属性的简写形式，默认为 `row nowrap`

```css
#container{
    flex-flow: <flex-direction> <flex-wrap>;
}
```



### 3.4 justify-content

`justify-content` 属性决定了内部元素在主轴方向上的对齐方式，也可理解为在主轴上除了内部元素所占用的空间对于剩余空间的分配方式

```css
#container{
    justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

- flex-start(默认值)： 左对齐
- flex-end: 右对齐
- center： 居中
- space-between: 两端对齐，内部元素之前的空间间隔都相等
- space-around: 内部元素之间的间隔相等，且两端距离容器边缘距离为元素之间距离的一半



### 3.5 align-items

`align-items` 属性定义内部元素在交叉轴上的对齐方式

```css
#container{
	align-items: flex-start | flex-end | center | baseline | stretch;
}
```

- flex-start： 交叉轴的起点对齐
- flex-end：交叉轴的终点对齐
- center： 交叉轴的中心点对齐
- baseline：内部元素第一行文字的基准线对齐
- stretch(默认值)：如果内部元素的高度没有设置或者设为auto，将占满整个交叉轴的高度。



### 3.6 align-content

`align-content` 属性定义了当有多行内部元素时，这些内部元素在交叉轴上的对齐方式。该属性对于只有一行内部元素的情况不起作用。

```css
#container{
    align-content: flex-start | flex-end | center | stretch | space-between | space-around;
}
```



## 4. 元素属性

### 4.1 order

`order` 属性定义内部元素的排列顺序。数字越小，越靠前，默认为0。

```css
.item{
    order: <number>
}
```

### 4.2 flex-grow

`flex-grow` 属性定义了内部元素在必要时的扩展的能力。默认为0，它接收一个没有单位的数值作为比例，规定了该元素在容器中应该占用的可用空间。负值无效

```css
.item{
    flex-grow: <number>
}
```

### 4.3 flex-shrink

`flex-shrink` 属性定义了内部元素在必要时缩小的比例，默认为1。

```css
.item{
    flex-shrink: <number>
}
```

### 4.4 flex-basis

`flex-basis` 属性定义了在分配多余空间之前，元素占据主轴空间。默认值是 auto ，即元素本来的大小

```css
.item{
	flex-basis: <length> | auto;
}
```

### 4.5 flex 

`flex` 属性为 `flex-grow` `flex-shrink` `flex-basis` 的简写，默认值为 `0 1 auto`

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

### 4.6 align-self

`align-self` 属性允许单个内部元素在交叉轴上有自己的对齐方式，可以覆盖容器属性`align-items`的值。默认为 auto，表示继承自容器元素的 `align-items` 属性值。

```css
.item{
    align-self: auto | flex-start | flex-end | center | baseline |  stretch;
}
```



> 参考页面：
>
>  http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html<br>
>
> https://css-tricks.com/snippets/css/a-guide-to-flexbox/