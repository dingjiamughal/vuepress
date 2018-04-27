# 模块化及babel

## webpack支持的三种模块化模式
```javascript
//es module
import util from 'util'
export default () => {}

//commonjs
const util = require('util')
module.exports = () => {};

// amd
require(['util'],(util)={})
```

webpack使用commonjs规范如下

```javascript
module.exports = {
  entry:{
    app:"./app.js"
  },
  output:{
    filename:"[name].[hash:5].js"
  }
}
```

## babel编译js

::: tip 下载依赖
npm i babel-loader babel-core --save-dev npm i babel-preset-env --save-dev // es2015 es2016 es2017 env <br> babel-preset-react babel-preset-state 0-3
:::

```javascript
module:{
  rules:[
    {
    test:/\.js$/,
    use:{
      loader:"babel-loader",
      options:{
        presets:["@babel/preset-env",{
          targets:{
            browers:[">1%","last 2 versions"]
          }
        }]
      }
    },
    exclude:"/node_modules"
  }
 ]
}
```

## babel polyfill
babel polyfill //垫片 babel runtime transform 编译es6

::: tip 下载依赖
cnpm i babel-plugin-transform-runtime --save-dev cnpm i babel-runtime babel-polyfill --save
:::

在页面中`import "babel-polyfill"`，但是推荐使用在`.babelrc`文件中单独配置垫片库

```javascript
// .babelrc
{
  "presets":[
    ["@babel/preset-env",{
      "targets":{
        "browers":["last 2 versions"]
      }
    }]
  ]
}
```

## 编译typescript

::: tip 下载依赖
npm i typescript ts-loader awesome-typescript-loader --save-dev
:::

```json
//tsconfig.json
{
  "compilerOptions":{
    "module":"commonjs",
    "target":"es5",
    "allowJs":true
  },
  "include":[
    "./src/*"
  ],
  "exclude":[
    "./node_modules"
  ]
}
```

```js
  // webpack.conf.js
module:{
  rules:[
    {
      test:/\.tsx?$/,
      use:{
        loader:"ts-loader"
      }
    }
  ]
}
```
