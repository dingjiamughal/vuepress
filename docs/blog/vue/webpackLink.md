# vue-cli+webpack引用文件库

在vue-cli中引用bootstrap样式库，借此抛砖引玉。<br>
vue-cli运行环境为node.js，因此必须要下载nodejs环境。

### 一、搭建vue-cli
``` npm
# 全局安装 vue-cli
$ npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project
# 安装依赖，走你
$ cd my-project
$ npm install
$ npm run dev
```

### 二、下载bootstrap所需库，jQuery和bootstrap
``` npm
cnpm install jquery --save-dev
cnpm install bootstrap@3.3.0 --save-dev
```

### 三、配置webpack文件
引入webpack，并在build\webpack.base.conf.js中添加jq插件配置项：
``` js
var webpack = require('webpack')
```
``` js
plugins: [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "windows.jQuery": "jquery"
  })
]
//至于bootstrap字体库，webpack的rules中自带配置完成了
```
### 四、在main.js中引入bootstrap文件
``` js
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
```
### 方法二，手动下载包
上面的方法通过npm bootstrap包，也可以手动下载bootstrap文件并引用，这种方法不用在node_modules中下载bootstrap包。
``` js
将bootstrap包放进项目，引入文件路径
import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min'
```
