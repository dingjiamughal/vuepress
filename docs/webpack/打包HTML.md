# 打包HTML

生成html自动自动识别引入css和js文件
`html-webpack-plugin`
>cnpm install html-webpack-plugin --save-dev

```js
const HtmlWebpackPlugin = require("html-webpack-plugin")
plugins:[
  new HtmlWebpackPlugin({
    filename:"index.html",// 输出的dist路劲
    template:"./index.html",//需要打包的src路径
    inject:false, //剔除生产版本引人的css和js
    chunks:["app","base",...],//指定chunks，进行文件分割
    minify:{
      collapseWhitespace:true//html不留间隙
    }
  })
]
```

## HTML中引入图片

* 方法一 `html-loader`
```js
module:{
  rules:[{
    test:/\.html$/,
    use:[{
      loader:"html-loader",
      options:{
        pngquant:{
          quality:80
        }
      }
    }]
  }]
}
```
* 方法二 `require`
```html
  <img src="${require('./assets/xxx.png')}" alt="">
```

## 清除打包文件
每次打包时候清除上一次的文件
>cnpm install clean-webpack-plugin --save-dev

```js
const CleanWebpackPlugin = require("clean-webpack-plugin")
plugins:[
  new CleanWebpackPlugin(["dist"])
]
```

## webpack优化
提前载入webpack加载代码（将webpack生成的manifest文件作为script标签提前生成在html中[生产环境]） `html-webpack-inline-chunk-plugin`
>cnpm install html-webpack-inline-chunk-plugin --save-dev

```js
const HtmlInlineChunkPlugin = require("html-webpack-inline-chunk-plugin")
module:{
  rules:[{
    test:/\.js$/,
    use:[{
      loader:"babel-loader",
      options:{
        presets:["env"]
      }
    }]
  }]
},
plugins:[
  new webpack.optimize.CommonsChunkPlugin({
    name:"manifest"

  }),
  new HtmlInlineChunkPlugin({
    inlineChunks:["manifest"]
  })
]
```
