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

## webpack.config.js

commonjs规范

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

>npm i babel-loader babel-core --save-dev npm i babel-preset-env --save-dev // es2015 es2016 es2017 env babel-preset-react babel-preset-state 0-3

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

babel polyfill //垫片 babel runtime transform 编译es6

>cnpm i babel-plugin-transform-runtime --save-dev cnpm i babel-runtime babel-polyfill --save

import "babel-polyfill"

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

npm i typescript ts-loader awesome-typescript-loader --save-dev

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
