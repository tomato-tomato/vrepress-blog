---
title: Yeoman & Plop
date: 2021-02-01
sidebar: 'auto'
categories:
 - JavaScript
tags:
 - JavaScript
 - 前端工程化
publish: true
isShowComments: true
---

前端工程化指：遵循一定的标准和规范，通过工具去提高效率降低成本的手段。



## 面临的问题：

- ES6 新特性兼容问题 —— 传统语言或语法的弊端
- 利用Less/Sass 增强 CSS 的编程性无法直接支持 
- 模块化提高项目的可维护性 —— 无法模块化、组件化
- 手动的重复性工作： 部署上线...等 —— 重复的机械式工作
- 多人协同开发，无法保证代码风格。 从仓库pull 回来的代码质量无法保证 —— 代码风格统一、质量保证
- 部分开发需要等待后端服务接口提前完成 —— 依赖后端服务接口的支持 —— 整体依赖后端项目



## 工程化表现

一切以提高效率，降低成本，质量保证为目的的手段都属于工程化

工程化指对项目的一种规划和架构



- 创建项目 —— 创建项目结构，创建特定类型文件
- 编码 —— 格式化代码，校验代码风格，编译/构建/打包
- 预览/测试 —— Web Server， Live Reloading， Source Map
- 提交 —— git hooks检查
- 部署 —— 自动发布

  

## 脚手架工具

脚手架的本质作用：创建项目基础结构、提供项目规范和约定

- 相同的组织结构
- 相同的开发范式
- 相同的模块依赖
- 相同的工具配置
- 相同的基础代码



## 基于 Yeoman创建自定义generator模块

Generator 模块的本质就是一个 NPM 模块，yeoman 的 generator 必须命名为 generator-\<name> 的方式 

### 安装

- 全局安装 yeoman
  - `npm install yo -g ` or `yarn global add yo`
- 创建一个存放generator的文件夹
- 初始化
  - 使用 `npm init` 进行初始化
  - 在初始化生成的 `package.json` 文件中的设置
    - `name` 属性必须命名为 generator-\<name> 的方式
    - `keywords` 属性必须包含 `"yeoman-generator"`
- 安装对应的 yeoman-generator
  - `npm install yeoman-generator --save`

### 基本结构

- generators	—— 生成器目录
  - app	—— 默认生成器目录
    - templates —— 模板文件夹
      - 模板文件
    - index.js	—— 默认生成器实现
  - component —— 其他生成器目录
    - index.js —— 其他生成器实现
- package.json     ——  模块包配置文件



### 编辑 Generator 的核心入口文件

核心入口文件位置为 `generator/app/index.js`

该文件需要导出一个继承自 yeoman generator 的类型，yeoman generator在工作时会自动调用在此类型中定义的一些生命周期的方法。我们在这些方法中可以通过父类提供的一些工具方法实现一些功能



```js
const Generator = require('yeoman-generator')

module.exports = class extends Generator{
    prompting () {
        // yeoman 在询问用户缓解会自动调用此方法
        // 在此方法中可以调用父类的 prompt() 方法发出对用户的命令行询问
        return this.prompt([
            {
                type: 'input', // 用户的操作方式
                name: 'name',   // 设置结果的键值即名称
                message: 'enter the name of your project', // 界面显示的给用户的提示
                default: this.appname // appname 为项目生成目录文件夹的名字
            }
        ])
        .then(answers => {
            // 用户输入的结果的处理 该处得到一个对象 {name: <input>}
            this.answers = answers;
        })
    }
	
    // 文件写入
    writing () {

    //     // // 该处尝试往项目目录中写入文件
    //	   // 该处的fs方法是经过封装的跟原生的不同	
    //     // this.fs.write(
    //     //     this.destinationPath('hello.txt'),
    //     //     'hello' + Math.random() * 100
    //     // )
        

        // 通过模板方式写入文件到目标目录

        // 模板文件路径
        const tmpl = this.templatePath('foo.html')
        // 输出路径
        const output = this.destinationPath('foo.html')
        // 模板数据上下文，应用到模板中的数据
        const context = this.answers

        this.fs.copyTpl(tmpl, output, context)
    }
}
```



### 运行 generator

- 在generator文件夹的root位置，命令行中输入`npm link`

- 在其他项目文件夹中可使用 yo \<name> (name为定义generator时的名称)命令来使用创建的 yeoman generator。



> 参考链接：https://yeoman.io/authoring/index.html



## Plop 小而美的脚手架工具

主要用于项目中创建特定文件的小工具。不会独立使用，通常用于项目当中用于去创建同类型的项目文件



### 安装

- 作为 npm 的模块安装到开发依赖中
  - `npm i plop -D`
- 在项目的根目录下创建 `plopfile.js` 文件
  - 该文件为plop入口文件，需要导出一个函数
  - 此函数接收一个 plop 对象，用于创建生成器的任务
- 项目根目录下创建 `plop-templates` 文件夹作为模板文件夹
  - 模板文件利用 handlebars 作为模板语法

### 编辑 plopfile.js 文件

```js
module.exports = plop => {
    // 第一个参数为生成器的名字，第二个为配置选项
    plop.setGenerator('component', {
        description: 'create a component',
        // generator 工作时发出的命令行问题
        prompts: [
            {
                type: 'input',
                name: 'name', // 问题返回值的键值
                message: 'conponent name', // 给出的提示
                default: 'myComponent' // 默认值

            }
        ],
        // 该生成器完成命令交互之后需要完成的动作，数组中每个对象就是一个动作对象
        actions: [
            {
                type: 'add',
                path: 'src/components/{{name}}/{{name}}.js', 
                templateFile: 'plop-templates/component.hbs'
            }
        ]
    })
}
```



### 使用

- 在根目录下的 `package.json`文件中设置

  ```json
  "scripts": {
      "plop": "plop"
    }
  ```

- 运行 plop： `npm run plop <name>` name为 plopfile.js文件中 `plop.setGenerator`的第一个参数