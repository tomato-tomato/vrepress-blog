---
title: Webpack 打包
date: 2021-03-05
sidebar: 'auto'
categories:
 - JavaScript
tags:
 - JavaScript
 - Webpack
publish: true
isShowComments: true
---


模块打包工具解决的问题

- 新特性代码编译
- 模块化 Javascript 打包
- 支持不同类型的资源模块



Webpack核心特性

- 模块打包器（module bundler) —— 解决模块化JavaScript打包
- 模块加载器 （loader)  —— 编译转换解决兼容问题
- 代码拆分（code splitting）—— 按照需要拆分打包
- 资源模块（asset module) —— 以模块化的方式载入任意类型的资源文件





## entry 与 output 属性

```js
// 单入口
module.exports = {
    entry: './index.js',
    output: {
		filename: 'bundle.js'.
        path: __dirname + '/dist'
    }
}

// 多入口
module.exports = {
    entry: {
		app: './index.js',
        adminApp: './main.js'
    },
    output: {
		filename: '[name].js'.
        path: __dirname + '/dist'
    }
}
```



## mode属性

设置打包之后相应模块的内置优化

有三种值： development、production 和 none

默认值为：production



## module属性 -- 导入Loader

loader 专注实现资源模块加载

webpack 主要功能是打包 JavaScript 文件，如果要打包其他文件需要下载相应的 loader,需要如下设置

```js
 module.exports = {
     ...
     module: {
         rules: [
             {
                 test: /.css$/,
                 use: ['style-loader', 'css-loader']
             }
         ]
     }
 }
```

当需要运用多个 loader 时，在 use 属性中设置，loader 会从后往前运用

各种 loader：

- CSS ——  css-loader, style-loader

- 图片文件字体等 —— file-loader, url-loader

  - 小文件通过 url-loader 转换为 dataURLs, 减少请求次数

  - 大文件单独提取存放，提高应用加载速度

    ```js
    module.exports = {
        ...
        module:{
            rules: [
                {
                    test: /.png$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024 // 10 KB
                        }	
                    }
                }
            ]
        }
    }
    ```
    

以上选项表示为：
    
- 小于10KB的文件将直接运用url-loader转换为 dataURL的方式
  
- 大于10KB的会单独提取
    - **注意**这样处理还是得下载 file-loader，用来处理大于10KB的文件

## 常用加载器（Loader）

1. 编译转换类型加载器
   - css-loader
   - style-loader
   - babel-loader
2. 文件操作类型加载器
   - file-loader
   - url-loader
3. 代码检查类加载器
   - eslint-loader



## 处理 ES 2015

利用`babel-loader`

```js
module.exports = {
    ....
    module: { 
		rules: [
    		...
    		{
    			test: /.js$/,
    			use: {
    				loader: 'babel-loader',
    				options: {
    					persets: ['@babel/preset-env']
					}
				}
			}
    	]
	}
}
```



- webpack 只是打包工具
- 加载器可以用来编译转换代码



## 模块加载方式

- 遵循 ES Module 标准的 import 声明

- 遵循 CommonJS 标准的 require 函数

- 遵循 AMD 标准的 define 函数 和 require 函数

- 样式代码中的 @import 指令 和 url函数

- HTML代码中图片标签的 src 属性， a 标签的 href 属性

  ```js
  module.exports = {
      ....
      module: { 
  		rules: [
      		...
      		{
      			test: /.html$/,
      			use: {
      				loader: 'html-loader',
      				options: {
      					attrs: ['img:src', 'a:href']
  					}
  				}
  			}
      	]
  	}
  }
  ```

  



## 插件机制 （Plugin）

plugin 用来解决除了 loader负责的资源加载以外 其他的自动化工作

- 清除输出目录
- 拷贝静态文件到输出目录
- 压缩输出代码



### 常用插件

删除输出目录 —— clean-webpack-plugin

通过webpack输出 HTML 文件 —— html-webpack-plugin

将静态文件直接复制到输出目录 —— copy-webpack-plugin



### 开发一个插件

plugin 通过钩子机制实现

通过在webpack 生命周期中的钩子函数挂载任务实现拓展

插件必须为一个函数或者一个包含 apply 方法的对象

```js
//webpack.config.js

class MyPlugin{
    apply(compiler){
        compiler.hooks.emit.tap('MyPlugin', compilation => {
            for(const name in compilation.assets){
                if(name.endsWith('.js')){
                    const contents = compilation.assets[name].source()
                    const withoutComment = contents.replace(/\/\*+\*\//g, '')
                    compilation.assets[name] = {
                        source: () => withoutComment,
                        size: () => withoutComment.length
                    }
                }
            }
        })
    }
}
```



## 自动刷新浏览器更新页面

### 方法一：

```bash
// 运行webpack, 监听文件变化, 自动打包
npm run webpack --watch

// 利用 browserSync 启动 http服务
browser-sync --file dist "**/*"
```

### 方法二： 利用 webpack-dev-server 

集成 自动编译 和 自动刷新浏览器的功能

不会直接输出到目标目录，保存在内存中

```bash
// 有更改自动打包并打开浏览器
npm run webpack-dev-server --open
```

有其他配置选项需要在 webpack 配置文件中设置

```js
{
	....
    devServre: {
        // 额外指定静态资源目录
		contentBase: './public',
        //添加代理服务配置
        proxy: {
            '/api': {
                // http://localhost:8080/api/users -> https://api.github.com/api/usrs
                target: 'https://api.github.com',
                // http://localhost:8080/api/users -> https://api.github.com/usrs
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            }
        }
    }
}
```



## webpack 配置使用 SourceMap

### Source Map -- 源代码地图

映射源代码与转换之后代码中间的关系，方便调试

```js
引用source Map 的注释

//#sourceMapingURL=jquery-3.4.1.min.map
```



### webpack中配置

```js
{
    ...
    devtool: 'source-map'
}
```



### 选择合适的 source-map

- eval —— 是否使用 eval 执行模块代码
- cheap —— Source Map  是否包含行信息
- module —— 是否能够得到 Loader 处理之前的源代码



开发阶段：

- eval-cheap-module-source-map

发布阶段：

- none
- nosources-source-map





## 页面不刷新及时更新模块

自动刷新会导致页面状态丢失

### 如何使用 HMR 

HMR 已经集成在 webpack-dev-server 模块中

在启动命令中 添加 --hot ,或者在配置文件中开启“hot: true”

```js
// 配置文件中

const webpack = require('webpack')

module.exports = {
    ...
    devServer: {
		hot: true
    },
    ...
    plugins: [
		new webpack.HotModuleReplacementPlugin()
    ]
}
```



> webpack 中对于 JavaScript 文件的 HMR 需要手动处理模块热替换逻辑

```js
module.hot.accept('./xxx.js', () => {
    ...
})
```





### HMR注意事项

1. 处理 HMR 的代码报错会导致自动刷新

   “hotOnly: true"

2. 没启用 HMR 的情况下， HMR API 报错

3. 代码中多了很多于业务无关的代码



## 生产环境优化

启动热更新和 source-map，跟生产环境无关，需优化



### 配置文件根据环境不同导出不同配置

```js
// webpack.config.js
module.exports = (evn, argv) => {
   const config = {
        mode: 'none',
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.join(__dirname, 'dist'),
            // publicPath: 'dist/'
        },
        devtool: 'source-map',
        devServer: {
            hotOnly: true,
            // contentBase: './public',
            // proxy: {
            //     '/api': {
            //         // http://localhost:8080/api/users -> https://api.github.com/api/usrs
            //         target: 'https://api.github.com',
            //         // http://localhost:8080/api/users -> https://api.github.com/usrs
            //         pathRewrite: {
            //             '^/api': ''
            //         },
            //         changeOrigin: true
            //     }
            // }
        },
        module:{
            rules:[
                {
                    test: /.css$/,
                    use: ['style-loader','css-loader']
                },
                // {
                //     test: /.js$/,
                //     use: {
                //         loader: 'babel-loader',
                //         options: {
                //             presets: ['@babel/preset-env']
                //         }  
                //     },
                //     exclude: '/node_modules/'
                // },
                {
                    test: /.png$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024 // 10 KB
                        }
                    }
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'Webpack Plugin Sample',
                template: './src/index.html'
            }),
            new HtmlWebpackPlugin({
                title: 'Webpack Plugin Sample Two',
                template: './src/index.html',
                filename: 'about.html'
            }),
            // 一般上线前使用，开发过程中一般不使用
            // new CopyPlugin([
            //     'public'
            // ]),
            new MyPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ]
   }

   if(env === 'production'){
       config.mode = 'production'
       config.devtool = false
       config.plugins = [
           ...config.plugins,
           new CleanWebpackPlugin(),
           new CopyPlugin(['public'])
       ]
   }

   return config;
    
}
```

> 使用打包命令时，添加参数 `npm run webpack --env production` 才能以 production的方式打包



### 利用 webpack-merge 配置不同环境

首选需要一个公共的配置文件，然后对于不同的情况利用 webpack-merge 进行修改对应的配置

下列代码在存在 `webpack.common.js` 的前提下，以下代码为 `webpack.prod.js `

```js
const common = require('webpack.common')
const merge = require('webpack-merge')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin(['public'])
    ]
})

```

运行打包命令由于没有默认配置文件，需要添加参数 `npm run webpack --config webpack-prod.js`



## Tree-Shaking

在生产模式下，webpack 打包时会自动消除掉那些没有被引用的代码。

在其他模式下需要该功能时需要设置：

```js
module.exports = {
  mode: 'none',
  .....
  optimization: {
    // 模块只导出被使用的成员
    usedExports: true,
    // 尽可能合并每一个模块到一个函数中
    concatenateModules: true,
    // 压缩输出结果
    minimize: true
  }
}
```



- Tree-Shaking 的前提时 必须要使用 ES Module 来组织代码

  最新的 babel 会根据环境自动选择，转换的模式，若是要强制设置

  ```js
  module.exports = {
      ...
      module: {
          rules: [
              {
                  test: /\.js$/,
                  use: {
                      loader: 'babel-loader',
                      options: {
                          presets: [
                              ["@babel/preset-env", {modules: false}]
                          ]
                      }
                  }
              }
          ]
      }
  }
  ```

  

## sideEffects -- 副作用

允许我们通过配置的方式标识代码是否有副作用，从而为 TreeShaking 提供更多压缩空间

副作用指，模块执行时除了导出成员之外所作的所有事情

```js
module.exports = {
  mode: 'none',
  .....
  optimization: {
    // 开启 sideEffects 功能
    sideEffects: true,
    // 模块只导出被使用的成员
    usedExports: true,
    // 尽可能合并每一个模块到一个函数中
    concatenateModules: true,
    // 压缩输出结果
    minimize: true
  }
}
```

另外在 `package.json`配置中

```js
{
    .....
    "sideEffects": false, // 标识标识没有副作用 可以不被打包
}
```



> **注：**使用 sideEffects 前提是要确定代码没有副作用

如果有副作用，要在 `package.json`文件中标识

```js
{
	...
    "sideEffects": [
        "./src/extend.js",
        "*.css"
    ]
}
```



## 代码分包

### 多入口打包

适用于多页应用程序，一个页面打包一个结果，提取公共部分

在 webpack.config.js 文件中要设置

```js
module.exports = {
    entry: {
        index: './src/index.js',
        album: './src/album.js'
    },
    output: '[name].bundle.js',
    .....
    plugins: [
    	new HtmlWebpackPlugin({
          title: 'Multi Entry',
          template: './src/index.html',
          filename: 'index.html',
          chunks: ['index']
        }),
        new HtmlWebpackPlugin({
          title: 'Multi Entry',
          template: './src/album.html',
          filename: 'album.html',
          chunks: ['album']
        })
    ]
}
```



### 提取公共模块

在 webpack.config.js 中配置

```js
module.exports = {
    .....
    optimization: {
		splitChunks: {
    		// 自动提取所有公共模块到单独的 bundle.js 中
    		chunks: 'all'
		}
	}
}
```



### 动态导入，按需加载模块

入口文件配置：

```js
const render = () => {
  const hash = window.location.hash || '#posts'

  const mainElement = document.querySelector('.main')

  mainElement.innerHTML = ''

  if (hash === '#posts') {
    // mainElement.appendChild(posts())
     // 魔法注释
    import(/* webpackChunkName: 'components' */'./posts/posts').then(({ default: posts }) => {
      mainElement.appendChild(posts())
    })
  } else if (hash === '#album') {
    // mainElement.appendChild(album())
    import(/* webpackChunkName: 'components' */'./album/album').then(({ default: album }) => {
      mainElement.appendChild(album())
    })
  }
}

render()

window.addEventListener('hashchange', render)
```



## 实现css 模块的按需加载 

`mini-css-extract-plugin` 插件使用时就不需要使用  style-loader 加载器，直接使用 `MiniCssExtractPlugin.loader` 加载器即可

建议在 css 模块大于 150KB 再使用

`optimize-css-assets-webpack-plugin` 生产模式下打包时压缩 CSS 文件

可以直接放在插件属性 plugins 数组中，但每次运行都会进行该操作，一般放在`optimization` 属性的中, 由于设置了 minimizer 属性，这webpack认为需要自定义压缩故 JS 压缩也需要自行设置了

```js
module.exports = {
    .....
    optimization: {
    	minimizer: [
    		new TerserWebpackPlugin(), // JS 压缩
            new OptimizeCssAssetsWebpackPlugin() // CSS 压缩
    	]
	}
}
```





## 输出文件名 Hash

生产模式下，文件名使用 Hash

- [hash:8]
- [chunkhash:8]
- [contenthash:8] -- 最佳选择

