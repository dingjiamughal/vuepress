# 前端自动化构建

随着web应用的不断复杂化，前端自动化构建已成为当今前端开发中必不可少的一部分。
<<<<<<< HEAD
写这类博文的时候就很难受，构建这个词可写的范围实在太大，写用法api不如去查阅文档，写业务场景自己所了解的业务也不太复杂不具有说服力，不如就从`what&how`聊聊前端自动化构建吧。
=======
每当写这类博文的时候就很难受，构建这个词可写的范围实在太大，写用法api太多了还不如去读文档，写业务场景自己所了解的业务也不太复杂不具有说服力，不如就从`what&how`聊聊前端自动化构建吧。
>>>>>>> e86ba6b45535b28f78cb6447e54c224e7bed198e
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
<<<<<<< HEAD
我个人理解，构建就是页面中的一个个模块：html代码片段，js代码片段，css函数式编程甚至一张图片都可成一模块，我们在开发过程中（开发环境）对这些模块进行组装，最终生成静态文件，这个组装的过程就是自动化构建。<br>
=======
我个人理解，构建就是页面中的一个个模块：html代码片段，js代码片段，css函数式编程甚至一张图片都可成一模块，我们在开发过程中（开发环境）对这些模块进行组装，最终生成静态文件，这个组装的过程就是自动化构建。
>>>>>>> e86ba6b45535b28f78cb6447e54c224e7bed198e
自动化构建的优势在于，可以完美解决以上的所有问题。随着前端业务量的不断增加，同时会用到各种第三方类库，自动化构建就能很好的帮助我们进行维护和管理，提高代码性能。

## 如何进行自动化构建
<!-- 这里先介绍一款入门级的构建工具`browsify` -->
### JavaScript的构建
<<<<<<< HEAD
传统的做法是引入script标签，如果文件多就难以管理，对js进行构建，我们只需要一个js文件就可以包含所有的js代码，同时也可使别的语言编译成js，例如`ts`,`cs`、`es6/7`，当然本文的重点是解决问题，所以抛出了第一个问题，以angularjs为例<br>
我们要实现一个基础的添加数据、删除数据、页面渲染，最粗暴的方式就是写在一块，但是会很乱，我们想到的方法可以用全局变量定义`controller`
```js
var a = ['$scope',function($scope){...}]
var b = ['$scope',function($scope){...}]
var c = ['$scope',function($scope){...}]
=======
传统的做法是引入script标签，如果文件多就难以管理，对js进行构建，我们只需要一个js文件就可以包含所有的js代码，同时也可使别的语言编译成js，例如`ts`,`cs`、`es6/7`，当然本文的重点是解决问题，所以抛出了第一个问题，以angularjs为例
我们要实现一个基础的添加数据、删除数据、页面渲染，最粗暴的方式就是写在一块，但是会很乱，我们想到的方法可以用全局变量定义`controller`
```js
var a=['$scope',function($scope){...}]
var b=['$scope',function($scope){...}]
var c=['$scope',function($scope){...}]
>>>>>>> e86ba6b45535b28f78cb6447e54c224e7bed198e
  angular.module('app',[])
        .controller('Controller',a)
        .controller('Controller',b)
        .controller('Controller',c)
```
<<<<<<< HEAD
这样做法的问题是全局变量的污染，当一个大型项目出现N个全局变量的时候，就真心无力调试了，但凡给我们开发或者维护带来不便那就都是bug，为解决此类问题，这里引出一款入门级的构建工具`Browserify`来实现js的模块化加载。

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
提到自动化构建，最具有代表性的一定是`gulp`，因为这很js。附上演示代码
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
综上，我们实现了一个自动化构建的demo，每次只需要启动gulp，就可以完成自动化的编译打包
=======
这样做法的问题是全局变量的污染，当我们大型项目出现N个全局变量的时候，真的无力调试了，凡事给我们开发或者维护带来不便那就都是bug，为解决此类问题，这里引出一款入门级的构建工具`Browserify`来实现js的模块化加载。

`Browserify`中支持`commonJS`模块规范，使用`module.exports`定义js模块，`require`来加载js模块
>>>>>>> e86ba6b45535b28f78cb6447e54c224e7bed198e
