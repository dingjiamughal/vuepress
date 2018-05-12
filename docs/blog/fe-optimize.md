# 前端性能优化

## 资源合并压缩
前端代码是BS架构，通过将静态资源打包发布到远程服务器，然后浏览器对服务器进行http请求加载资源。我们可以通过减少浏览器请求的时间(发送到返回的时间)来进行优化，首先要了解这个请求过程浏览器经历了什么<br>
![mvc](https://sfault-image.b0.upaiyun.com/449/079/449079530-591a88cbddb93)
用webpack对资源进行打包

### 资源压缩
#### 对html压缩minify
```js
// 对html压缩
const HtmlWebpackPlugin = require("html-webpack-plugin")
plugins:[
  new HtmlWebpackPlugin({
    filename:"index.html",
    template:"./index.html",
    inject:false, //剔除生产版本引人的css和js
    chunks:["app"],//指定chunks，进行文件分割
    minify:{
      collapseWhitespace:true//html不留间隙
    }
  })
]
```
#### 对css压缩
```js
{
  loader:"css-loader",
  options:{
     minimize:true,
     modules:true
  }
}
```

#### 对js压缩
```js
plugins:[
    new webpack.optimize.UglifyJsPlugin()
]
```

### 资源合并
将所有js文件合并成一个js文件，可以减少请求。这样做的好处减少请求，坏处就是页面渲染如果是通过js完成的话，会降低页面首屏的渲染速度，尤其是vue，react这种mvvm框架渲染会在js文件中完成。<br>
发现问题，我们就来解决它。现在的问题是，我们并不能将所有js合并成一起，我们就对不同js做个区分。业务代码频繁改动所以打包在一起，而第三方类库不会去更改打包在一块，打包第三方类库实现方法使用`CommonsChunkPlugin`。<br>
业务代码中，将不用页面的业务代码分开打包，我们做单页应用时，不会把所有业务代码放一起，处理方法是监听到路由变化，然后去加载。完成这些可以使用任一构建工具。<br>
例如在vue中实现按需加载的方法非常简单，在配置路由中使用`es6`中的`ensure`即可完成路由组件间的代码切割。
```js
import component1 from '@dir/xxx'

const  component1 = item => require.ensure( [], () => item(require('@dir/xxx')))
```
