---
title: Grid 布局
date: 2020-11-19
sidebar: 'auto'
categories:
 - CSS
tags:
 - CSS
 - Grid
---

:::tip
学习CSS grid的小游戏：https://cssgridgarden.com/
:::

## grid-column、grid-row
> grid-column 和 grid-row 类似

```css
#poison{
    /* column 总数为5 */
    /* 
        [start, end）
        对于负数
        (start, end]
     */
    /* [1, 3) */
    grid-column-start: 1;
    grid-column-end: 3;

    /* [2,5) */
    grid-column-start: 5;
    grid-column-end: 2;

    /* [1,5) */
    grid-column-start: 1;
    grid-column-end: -2;

    /* [4] */
    grid-column-start: -3;

    /* [2,4) */
    grid-column-start: 2;
    grid-column-end: span 2; /* span后的数值为 占用的实际数值 */

    /* [3,6) */
    grid-column-start: span 3;
    grid-column-end: 6;

    /* [2,4) */
    grid-column: 2 / 4;

    /* grid-area: grid-row-start / grid-column-start / grid-row-end / grid-column-end; */
}
```

## order

```css

```