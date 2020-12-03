---
date: 2020-10-10
sidebar: 'auto'
categories: 
    - Others
tags: 
    - Others
publish: true
isShowComments: true
---

# 该博客是怎样搭建的

<div style="text-align:center">
    <img src="./imgs/friendship.png" alt="秋天哦" style="width: 550px">
</div>
做前端有几年了，技术更新也挺快，不停的有新东西出来，或者又发现自己哪个方面有所遗忘。学习笔记倒记的蛮多的，可是都是自己学自己记，也不知道自己理解的对不对。就想有个大家都能看到的地方，写写笔记啥的。虽然也不知道会不会有人看到。希望有人看到然后来交流交流！
切入正题，来说说我是怎么搭建这个博客的。

## 1.选定框架及主题
本博客使用的是 [VuePress](https://vuepress.vuejs.org/zh/)（额~ hexo 没找到喜欢的主题，React只知道皮毛所以没用 Gastby），使用的主题是 [reco](https://vuepress-theme-reco.recoluan.com/)。就喜欢它的简单。

## 2.初始化及确认文件夹结构
reco 提供了脚手架的功能，可以直接 npm 安装使用。（PS: 打开reco主题网站后不要被它旋转的方块迷惑了，往下滑才能看到）可以直接使用自动生成的文件夹结构。

本博客根据官方推荐的目录结构有所改变，如下：

![catlog](./imgs/catlog.png)

reco 官方提供的目录结构为 `.vuepress`作为主题文件夹， `blogs`和 `docs`两个文件夹为博客文件夹，三个文件夹规划成同等级文件夹。

## 3.首页配置及configjs的配置
与`.vuepress` 同级的有一个 `README.md`的文件。该文件为首页对应的md文件，类似于每个网站的首页页面。该文件可以使用`YAML`的方式进行简单的设置，其他设置须在`config.js`中设置。reco官方对于首页配置有详细介绍[reco文档链接](https://vuepress-theme-reco.recoluan.com/views/1.x/home.html)。

在`.vuepress`文件夹下有个`config.js`的配置文件。该文件主要用于配置首页。[reco文档对应链接](https://vuepress-theme-reco.recoluan.com/views/1.x/configJs.html)[vuepress官方文档配置](https://vuepress.vuejs.org/zh/config/)

其中需要注意的属性：

- `theme` 需要指明使用的主题
- `head` 以数组的形式，设置生成的 HTML 页面里面 `<head></head>` 标签内的内容
- `dest` 指定 build 之后的输出目录
- `themeConfig` 属性参数比较多，用于配置首页以及博客页面相关。例如 首页顶部导航条、博客文章中的侧边栏等

## 4.博客文件
按理说只要你新建的文件放在整个博客的文件夹里面的任何位置就都可以。但是为了归类方便，一般`.vuepress`文件夹就专门为主题文件夹，新建跟该文件夹同级的作为专门存放博客文章的文件夹都可以。

文章页为markdown文件，[支持的markdown语法](https://vuepress-theme-reco.recoluan.com/views/1.x/syntax.html)，头部依然可以使用`YAML`做设置。[reco官网对应文档](https://vuepress-theme-reco.recoluan.com/views/1.x/frontMatter.html)

博客文章文件中`categories` 和 `tags` 属性一定要设置，vuepress根据这两个属性自动生成分类并归类。

> 支持emoji :grin: [所有可以使用的emoji](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)

## 5.将博客部署及自动化部署
这一步reco官方有相应的很详细的介绍，需要注意的地方：
- 自动化部署需要的workflow文件里面，由于GitHub的修改，新建立的仓库，主分支的名称为 `main` 而不是以前的 `master`
- 注意路径

> [reco官方Pages部署](https://vuepress-theme-reco.recoluan.com/views/other/deploy.html)
> [reco官方使用GitHub Actions自动部署博客](https://vuepress-theme-reco.recoluan.com/views/other/github-actions.html)
## 结尾
搭建这个博客花了点时间，一开始被reco官方首页的旋转小方块迷惑 :sweat_smile:,没发现下面的东西走了很多弯路。最开始直接从vuepress 官方文档开始慢慢看慢慢学怎么出来的页面都有问题。到后来慢慢的页面出现在面前，设置的地方也都出来的时候，还是蛮开心的。后面就是慢慢的写点内容了，好好加油 :tada: :rose: