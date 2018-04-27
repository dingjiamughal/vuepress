# 处理css
webpack处理css方式是通过webpack的css-loaderdui css文件进行打包，用js来对css进行加载

需要的加载器
`style-loader` 创建link标签</br>
`css-loader` 能在js引入css文件
>cnpm install css-loader style-loader --save-dev

```js
  //在js中
  import 'xxx.css'

  //webpack.config.js
  const path=require("path")
  module.exports={
    entry:{
      app:"./src/app.js"
    },
    output:{
      path:path.resolve(__dirname,"./dist"),
      publicPath:"./dist/ ",
      filename:"[name].bundle.js"
    },
    module:{
      rules:[{
        test:/\.css$/,
        use:[{//顺序是先让js中支持import css再放到页面中进行加载
          loader:"style-loader",
          options:{
            insertInfo:"#app",// 当做style标签打包在id="app"的dom内
            singleton:true,//合并样式
            transform:"./css.transform.js"
          }
        },{
          loader:"css-loader",
          options:{
             modules:true,//允许在css文件中引入别的css文件中的模块 `compire`
             localIdentName:'[path][name]_[local]_[hash:base64:5]'
          }
        }]
      }]
    }
  }
```
style-loader中的transform参数的作用
单独在根目录下创建文件，`css.transform.js`在此文件中可以进行js对css的逻辑处理，比如获取window对象，判断浏览器版本对所有的css文件进行操作
```js
// css.transform.js
module.exports= res => {
  console.log(css)//能够log出所有的css文件
  if(window.innerWidth >= 768){
    return css.replace("red","green")
  }else {
    return css.replace("red","blue")
  }
}
```

## 配置less/sass
>cnpm install less less-loader sass sass-loader

```js
modules:{
  rules:[{
    test:/\.less$/,
    use:[{
      loader:"less-loader"
    }]
  }]
}
```

## 提取css
>cnpm install extract-text-webpack-plugin --save-dev

```js
const ExtractTextWebpackPluigin = require("extract-text-webpack-plugin")
  module:{
    rules:[{
      test:/\.less$/,
      use:ExtractTextWebpackPluigin.extract({//提取方法
        fallback:{//当不需要提取css的时候页面加载css的方法
          loader:"style-loader",
          options:{
            singleton:true,//合并样式
            transform:"./css.transform.js"
          }
        },
        use:[{  //use:如果要提取css需要用css-loader和less-loader加载到页面
          loader:"css-loader",
          options:{
             minimize:true,
             modules:true,
             localIdentName:'[path][name]_[local]_[hash:base64:5]'
          }
        },{
          loader:"less-loader",
        }]
      })
    }]
  },
  plugins:[
    new ExtractTextWebpackPluigin({
      filename:"[name].min.css",
      allChunks:false
    })
  ]
```

## PostCSS
>cnpm install postcss postcss-loader autoprefixer cssnano postcss-next --save-dev

`Autoprefixer` 加前缀</br>
```js
  div {
    display:flex;
  }

  div {
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
  }
```
`css-nano` 优化和压缩css,css-loader中也使用css-nano进行压缩

`postcss-next` 可以使用未来的css新语法

```js
module:{
  rules:[{
    test:/\.less$/,
    use:ExtractTextWebpackPluigin.extract({//提取方法
      fallback:{
        loader:"style-loader",
        options:{
          singleton:true,
          transform:"./css.transform.js"
        }
      },
      use:[{
        loader:"css-loader",
        options:{
           minimize:true,
           modules:true,
           localIdentName:'[path][name]_[local]_[hash:base64:5]'
        }
      },{
        loader:"less-loader",
      },{
        loader:"postcss-loader",
        options:{
          ident:"postcss",//声明接下来使用的插件是给postcss使用的
          plugins:[
            require("autoprefixer")(),
            // :root {--mainColor:#fff;} div {color:var(--mainColor)}
            require("postcss-cssnext")()

          ]
        }
      }]
    })
  }]
}
```
设置浏览器对postcss兼容性
* 方法1：在`package.json`中配置
* 方法2：新建`.browserslistrc`文件
```json
"browserslist":[
  ">= 1%",,
  "last 2 versions"
]
```

## Tree Shaking
剔除无用的代码（项目中没有用到过的代码），针对css和js文件

### js中的tree shaking
```js
// task:引入lodash，并只使用`chunk`方法
// app.js
// import {chunk} from "lodash"

const Webpack = require("webpack")
plugins:[
  new Webpack.optimize.UglifyJsPlguin()
]
```

### css中的tree shaking
借助`purifycss-webpack`
>cnpm install purifycss-webpack glob-all --save-dev

```js
const PurifyCss = require("purifycss-webpack")
const path = require("path")
const glob = require("glob-all")

plugins:[
  new PurifyCss({ //  一定写在UglifyJsPlguin之前才生效
    paths:glob.sync([
      path.join(__dirname,"./*.html"),
      path.join(__dirname,"./src/*.js")
    ])
  }),
  new webpack.optimize.UglifyJsPlguin()
]
```
