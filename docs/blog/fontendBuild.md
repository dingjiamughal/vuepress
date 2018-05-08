# 前端自动化构建

随着web应用的不断复杂化，前端自动化构建已成为当今前端开发中必不可少的一部分。
<!-- 写这类博文的时候就很难受，构建这个词可写的范围实在太大，写用法api不如去查阅文档，写业务场景自己所了解的业务也不太复杂不具有说服力，不如就从`what&how`聊聊前端自动化构建吧。 -->

* 什么是自动化构建、自动化构建的好处是什么
* 如何进行自动化构建
::: tip
  Simple Usage、Efficient Builds、Quality Ecosystem
:::
这是gulp对其构建工具的优点介绍，通俗的说就是让简单的任务简单，复杂的任务可管理

<!-- ## 简单的任务简单
这里拿gulp作为一个例子，gulp能帮助我们实现最基本的分离开发版本和生产版本，前端代码文件的拷贝编译压缩迁移，模块热更新，启动本地服务等等。比如编译`sass`，编译`es6/7`，js文件的uglify等等。最简单基础的也是需要人工操作的很多东西都可以使用gulp此类构建工具进行构建打包，至于gulp到底是什么，能解决什么，如何使用这些下文会进行详细的介绍。

## 复杂的任务可管理
这是gulp最大的优点，意味着浮夸的说假使一个web多页应用有100张页面，页面中需要引用100个js和css，复杂的业务代码一次次的更迭之后变得难以维护，自动化构建能够完美解决复杂业务逻辑。例如一个页面n个区域，我们可以设计以html代码片段或者脚本或是样式甚至是图片作为模块，然后进行多次复用而并不用担心是否会变量或是面对复杂的一匹的函数嵌套后期无法维护，我们只需要搭建一个自动化构建的轮子。 -->

### 一些问题
翻开n年前的老项目的前端代码，总结出几点：
* 前后端不分离，页面上会出现后台逻辑，也许是为了高性能高seo，不过现在的mvvm框架都可实现服务端渲染。
* 代码量巨大，各种文件引入，不易维护。
* 工具函数复杂 + 满天飞的第三方类库，不易维护。
* 无法做到模块的动态复用，不易维护
* 无法进行自动化的对css预处理语言以及es6/7语法进行编译以及模块的热更新，影响开发效率

现在看来，以上的任何一点都极大的影响了工作效率，如果是这样，那是时候对项目进行自动化构建了。

## 什么是自动化构建，好处是什么

我个人理解，构建就是页面中的一个个模块：html代码片段，js代码片段，css函数式编程甚至一张图片都可成一模块，我们在开发过程中（开发环境）对这些模块进行组装，最终生成静态文件，这个组装的过程就是自动化构建。<br>
自动化构建的优势在于，可以完美解决以上的所有问题。随着前端业务量的不断增加，同时会用到各种第三方类库，自动化构建就能很好的帮助我们进行维护和管理，提高代码性能。

## 如何进行自动化构建
<!-- 这里先介绍一款入门级的构建工具`browsify` -->
### JavaScript的构建

传统的做法是引入script标签，如果文件多就难以管理，对js进行构建，我们只需要一个js文件就可以包含所有的js代码，同时也可使别的语言编译成js，例如`ts`,`cs`、`es6/7`，当然本文的重点是解决问题，所以抛出了第一个问题，以angularjs为例<br>
我们要实现一个基础的添加数据、删除数据、页面渲染，最粗暴的方式就是写在一块，但是会很乱，我们想到的方法可以用全局变量定义`controller`

```js
var a=['$scope',function($scope){...}]
var b=['$scope',function($scope){...}]
var c=['$scope',function($scope){...}]
  angular.module('app',[])
        .controller('Controller',a)
        .controller('Controller',b)
        .controller('Controller',c)
```
这样做法的问题是全局变量的污染，当一个大型项目出现N个全局变量的时候，就真心无力调试了，但凡给我们开发或者维护带来不便那就都是bug，为解决此类问题，这里引出一款入门级的构建工具`Browserify`来实现js的模块化加载，[browserify api](https://github.com/browserify/browserify#usage)。

>npm install browserify -g

`Browserify`中支持`commonJS`模块规范，使用`module.exports`定义js模块，`require`来加载js模块
```js
//定义
module.exports = ['$scope',function($scope){...}]
//使用
angular.module('app',[])
      .controller('Controller',require('./xxx.js'))
```
这样我们就完成了模块化的第一步，然后就可以启动命令，模块就会被打包成一个js文件
>browserify xxx.js -o main.js

为了避免每次修改要运行一次命令，我们需要自动化构建，来配置文件模拟打包过程，从而使得每次开发只需要编写开发代码即可。

### gulp
提到自动化构建，最具有代表性的一定是`gulp`，因为这很js，流式结构也可以深刻理解构建过程，如果有一定自动化构建基础想了解webpack的可以跳转至我的[webpack教程](http://www.xhrsama.com/vuepress/webpack)。附上演示代码
```js
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const open = require('open');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-clean-css');

// src：source文件、build：开发文件、dist：上线文件
const app = {
  srcPath: 'src/',
  devPath: 'build/',
  prdPath: 'dist/'
};

gulp.task('font', function() {
  gulp.src(app.srcPath + 'font/**/*')
    .pipe(gulp.dest(app.devPath + 'font'))
    .pipe(gulp.dest(app.prdPath + 'font'))
    .pipe($.connect.reload());
});

gulp.task('html', function() {
  gulp.src(app.srcPath + 'views/**/*.html') //拷贝html
    .pipe(gulp.dest(app.devPath + "views"))
    .pipe($.useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest(app.prdPath + "views"))
    .pipe($.connect.reload());
})

gulp.task('less', function() {
  gulp.src(app.srcPath + 'style/less/**/*.less') //编译less文件
    .pipe($.plumber())
    .pipe($.less()) //less编译为css
    .pipe(gulp.dest(app.devPath + 'style'))
    .pipe(gulp.dest(app.srcPath + 'style'))
    .pipe($.cssmin()) //css压缩
    .pipe(gulp.dest(app.prdPath + 'style'))
    .pipe($.connect.reload());
});

gulp.task('js', function() {
  gulp.src(app.srcPath + 'js/**/*.js')
    .pipe($.plumber())
    .pipe($.concat('index.js'))
    .pipe(gulp.dest(app.devPath + 'js'))
    .pipe($.uglify()) //js压缩
    .pipe(gulp.dest(app.prdPath + 'js'))
    .pipe($.connect.reload());
});

gulp.task('image', function() {
  gulp.src(app.srcPath + 'images/*.{png,jpg,gif,ico}')
    .pipe($.plumber())
    .pipe(gulp.dest(app.devPath + 'images'))
    .pipe($.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(app.prdPath + 'images'))
    .pipe($.connect.reload());
});

gulp.task('build', ['font', 'image', 'less', 'html' ,'js']); //build运行全部

gulp.task('clean', function() {
  gulp.src([app.devPath, app.prdPath])
    .pipe($.clean());
});

gulp.task('serve', ['build'], function() { //server task运行build集合
  $.connect.server({
    root: [app.devPath],
    livereload: true, //热更新
    port: 8080
  });

  open('http://localhost:3001/views/clarins-login.html');

  gulp.watch(app.srcPath + 'views/**/*.html', ['html']);
  gulp.watch(app.srcPath + 'style/less/**/*.less', ['less']);
  gulp.watch(app.srcPath + 'js/**/*.js', ['js']);
  gulp.watch(app.srcPath + 'images/**/*', ['image']);
});
//输入gulp 即可自动运行 serve任务
gulp.task('default', ['serve']);
```
gulp通过流的方式，一步步的传递下去直到业务代码结束。一个任务的整个过程大致分为：检索文件、拷贝、业务处理（编译、压缩），最后再启动本地服务。<br>
言归正传先不细说gulp，回到browsrify，之前的问题是我们完成了用模块化的方式定义js并完成了一个简单构建。<br>
现在需要对其进行自动化构建，browerify是办不到的必须借助gulp来完成。
方法一：在node中执行shell脚本来运行browserify。首先得下载`shell`模块`npm install shelljs --save-dev`
```js
const gulp = require('gulp')
const shelljs = require('shelljs')
gulp.task('default',() => {
  shelljs.exec('browserify xxx.js -o main.js')
})
```
方法二：browserify内置方法
>npm install browserify

```js
const gulp = require('gulp')
const browserify = require('browserify')
const fs = require('fs')
gulp.tast('default',() => {
  browserify().add('xxx.js').bundle().pipe(fs.createWriteStream('js/main.js'))
})
```
于是我们就完成了最基本的文件打包（将n个模块打包成一份js文件），在解决模块化引用之后，接下来就是顺应gulp流规范来解决更多的问题了，我们要对前端所有静态资源进行自动化的构建。
gulp使用中会经常用到`pipe`，这是gulp语法糖，可以理解成进程和进程间的连接。<br>
具体的api可以参考[ gulp中文网 ](https://www.gulpjs.com.cn/docs/api/) <br>
gulp中，`default`为唯一输出任务，gulp最终执行的是default任务下的回调，意思就是我们必须把构建配置写在default的回调下，多任务就以数组形式['taskname1','taskname2','taskname3'···]，数组中的task可以配置多种功能。
```js
gulp.task('build', ['font', 'image', 'less', 'html' ,'js'])
```
也可借助外部模块`run-sequence`来帮助管理任务之间的相互调用，和数组功能一样
``` js{4,10,14}
const gulp = require('gulp')
const browserify = require('browserify')
const fs = require('fs')
const requence = require('run-sequence')
gulp.task('js',() => {
  browserify().add('xxx.js').bundle().pipe(fs.createWriteStream('js/main.js'))
})
gulp.task('watch',() => {
    gulp.watch(['xxx.js'],() => {
      sequence('js')
    })
})
gulp.task('default',() => {
  sequence('js','watch')
})
```
综上，我们实现了一个自动化构建的demo，每次只需要启动gulp，就可以完成自动化的编译打包。现在我们对代码进行下优化，用`watchify`代替，使用 watchify 加速 browserify 编译，[文档](https://www.gulpjs.com.cn/docs/recipes/fast-browserify-builds-with-watchify/)<br>
对上面的代码进行改造

```js
const gulp = require('gulp')
const browserify = require('browserify')
const fs = require('fs')
const requence = require('run-sequence')
const watchify = require('watchify')
gulp.task('js',() => {
  let b = browserify({
    entries: ['xxx.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  })
  b.bundle().pipe(fs.createWriteStream('js/main.js'))
  b.on('update',() => {
    b.bundle().pipe(fs.createWriteStream('js/main.js'))
  })
})

gulp.task('default',() => {
  sequence('js')
})
```

### browserify 构建第三方类库
例如jQuery、lodash、angularjs，通常是公共的，我们就可以使用browserify将这些文件打包成一个js文件，既方便我们管理，又能够减少请求。<br>
接下来就开启第三方类库的任务：
```js
const gulp = require('gulp')
const browserify = require('browserify')
const fs = require('fs')
const requence = require('run-sequence')
const watchify = require('watchify')

gulp.task('js',() => {
  let b = browserify({
    entries: ['xxx.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  }).external('angular').external('lodash')
  b.bundle().pipe(fs.createWriteStream('js/main.js'))
  b.on('update',() => {
    b.bundle().pipe(fs.createWriteStream('js/main.js'))
  })
})

gulp.task('vendor',() => {
  let b = browserify().require('./bower_components/angular.js',{
    expose:'angular'
  }).require('./bower_components/lodash.js',{
    expose:'lodash'
  }).bundle().pipe(fs.createWriteStream('js/vendor.js'))
})

gulp.task('default',() => {
  sequence('js','vendor')
})

```
这样在`vendor.js`中就集成了angular和lodash，完成了对第三方类库的打包，但是我们必须在页面中`require`模块，由于是按照browserify规则的进行打包，引入文件要用commonjs规范，否则浏览器会报错。但是就算是我们完成了上述的所有，对于angular来讲也是不行的，因为angularjs不能使用commonjs规范，依旧会报错。<br>
为了解决这个问题，我们需要借助[browserify-shim](https://github.com/thlorenz/browserify-shim)，官网对其定义： Makes CommonJS incompatible files browserifyable，解决在browserify中使用commonjs规范，接下来配置一发
>npm install browserify-shim -save-dev

```js
// package.json
"browserify": {
  "transform": ["browserify-shim"]
},
"browserify-shim": {
  "angular": "angular",
  "lodash": "_"
},
//我们还需要定义别名 use aliases
"browser": {
  "angular": "bower_components/angular.js",
  "lodash": "bower_components/lodash.js"
}
```
有了browserif-shim，我们就不需要进行`vendor`任务了，构建代码又回到之前的样子
```js
const gulp = require('gulp')
const browserify = require('browserify')
const fs = require('fs')
const requence = require('run-sequence')
const watchify = require('watchify')

gulp.task('js',() => {
  let b = browserify({
    entries: ['xxx.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  })
  b.bundle().pipe(fs.createWriteStream('js/main.js'))
  b.on('update',() => {
    b.bundle().pipe(fs.createWriteStream('js/main.js'))
  })
})

gulp.task('default',() => {
  sequence('js')
})
```

### JsUglify
JsUglify的作用就是处理简化js文件，gulp中叫做[gulp-uglify](https://github.com/terinjokes/gulp-uglify)，它依赖于uglify.js
>npm install gulp-uglify --save-dev <br>
npm insall vinyl-source-stream --save-dev <br>
npm install vinyl-buffer --save-dev <br>

```js
const uglify = require('gulp-uglify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')

b.bundle()
 .pipe(source('main.js'))
 .pipe(buffer())
 .pipe(uglify())
 .pipe(gulp.dest('js/'))
```

### gulp-if 给gulp加入判断
了解webpack的同学可能了解`node_env`环境变量的概念，在gulp中可以使用`gulp-if`来区分开发版本和生产版本，例如之前的uglify，我们只需要在生产版本运行就行了，开发版本则不需要
>npm install gulp-if --save-dev

```js
const gulpif = require('gulp-if')
//这里解释一下 process.env.ENV
// process为整个进程
// env为进程中的环境变量
// ENV为环境变量中名为ENV的环境变量
需要检测一下是prod还是dev
const isProd = process.env.ENV === 'prod'
b.bundle()
 .pipe(source('main.js'))
 .pipe(buffer())
 .pipe(gulpif(isProd,uglify()))
 .pipe(gulp.dest('js/'))
```
然后再生产版本打包时，命令行中输入`ENV=prod gulp`

### 编译es6
编译es6的工具是`babel`，我们在gulp中配置一下，让所有的js文件中支持es6语法
>npm install gulp-babel --save-dev
npm install babel-preset-es2015

```js
const babel = require('gulp-babel')
gulp.task('babel',() => {
  gulp.src('./assets/js/*.js')
      .pipe(babel({
        presets:["es2015"]
      }))
      .pipe(gulp.dest('./build/js/'))
})

gulp.task('babelWatch',()=> {
  gulp.watch('assets/js/*.js',() => {
    sequence('babel')
  })
})

gulp.task('default',() => {
  sequence('babel','babelWatch','js')
})
```
我们单独把babel配置拉出来，新建`.babelrc`
```js
{
  "presets":["es2015"]
}
```

### 处理css
css是前端开发中重要的部分，因此我们也需要对css文件进行自动化压缩和编译。<br>
#### 代码压缩
>npm install gulp-clean-css --save-dev
npm install gulp-concat --save-dev

```js
const cleanCss = require('gulp-clean-css')
const concat = require('gulp-concat')//合并代码

gulp.task('minifyCss',() => {
  gulp.src('./assets/css/*.css')
      .pipe(concat('main.css'))
      .pipe(cleanCss())
      .pipe(gulp.dest('css/'))
})
gulp.task('minifyCssWatch',() => {
  gulp.watch('./assets/css/*.css',() => {
    sequence('minifyCss')
  })
})
```

#### 编译css预处理语言
>npm install gulp-sass --save-dev

```js
const gulpSass = require('gulp-sass')

gulp.task('sass',() => {
  gulp.src('./assets/css/main.scss')
      .pipe(sass())
      .pipe(gulpif(isProd,cleanCss()))
      .pipe(gulp.dest('css/'))
})
gulp('sassWatch',() => {
  gulp.watch('./assets/css*.scss',() => {
    sequence('sass')
  })
})
```

### 总结
我们完成了一个最基础的前端的自动化构建。构建的好处不用再阐述了，作为前端静态资源，html、css、js我们通过自动话构建，帮我们尽可能的轻松开发和完成业务需求，一方面是为了省力，另一方面也比较有趣。
