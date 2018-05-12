# 百度金融SSG的面试经历

2018.5.11 pm就很莫名的接到了百度金融大佬给我的电话面试(很懵逼但内心激动)，整个面试时长40分钟，可能是初级的，所以个人觉得难度不是很大，偏大前和业务，没有问很深层的原理。<br>
彩蛋，当面试到40多分钟的时候，大佬手机没电了(就很难受)！<br>
![interview](/vuepress/interview.png)<br>
不多废话了，分享一波面试题(只记住了大半)

::: tip Q1
Vue父子组件通信
:::
这个很简单，子组件通过`props`接受父组件参数，子组件用`$emit`方式暴露事件和参数给父组件。

::: tip Q2
vuex 流程和应用场景
:::
这个能扯的真的特别多，范围也很大<br>
总结一下，首先`vuex`是资源状态管理，解决组件之间或者路由传参的问题。如果n个不想干组件的值有交互那肯定要使用vuex了，否则子组件之间的通信使用eventbus即可。<br>
vuex中的核心数据存储器state中存储所有数据，getter来做计算属性，mutations-type定义方法名称，mutation定义state参数方法，actions来执行mutations回调。

::: tip Q3
谈谈 vue-router 钩子
:::
vue-router的生命周期，当时的反应只有`beforeEnter`和`beforeLeave`，还少了个`beforeUpdate`，这个问题的关键点不在于用法，在于考全局的生命周期和组件内。

::: tip Q4
如何解决未登录状态，添加购物车
:::
如果是在有网络的状态下，并且用户没登录，也允许进行商品购物车的添加，有哪些解决方法？<br>
这个问题考本地存储我回答的是用`localstorage`进行存储。

::: tip Q5
存储的几种形式
:::
存储的三种形式：`cookie` `sessionStorage` `localStorage`<br>
cookie: `cookie`本身用于客户端和服务器端之间的通信，存储量小只有4K，并且所有http请求都会带着cookie影响获取资源效率。<br>
web storage: `sessionStorage`和`localstorage`都属于web storage。区别在于： <br>
`localStorage`生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除`localStorage`信息，否则这些信息将永远存在。<br> `sessionStorage`生命周期为当前窗口或标签页，一旦窗口或标签页被永久关闭了，那么所有通过`sessionStorage`存储的数据也就被清空。<br>
这个问题，我还以前专门写到github上，然而...

::: tip Q6
b端、c端的概念
:::
以前只听说过这个概念，看我有点懵，大佬就介绍了下他们的业务：<br>
项目是百度金融游戏的莱茨狗，所以面向的用户会非常大，涉及的面非常广，有hybird的app内嵌h5，有大型的pc站，涵盖的业务复杂，几乎所能想到的都会有，有相关的后台系统。简单来说就是双端pc + webapp和后台系统。

::: tip Q7
简述 vdom
:::
这个开放式问题，可以回答vdom、mvvm的双向绑定原理、diff算法···<br>
我主要讲述了一下mvvm框架如何动态监听到值的变化和获取的通过`defineProperty`，以及`render`函数，通过递归节点监听到值的变化，动态的改变变化值。

::: tip Q8
css加前缀的方法
:::
我回答的是自动化构建，配置`postCSS`完成自动前缀，webpack中在样式rules中添加`postcss-loader`，gulp中使用`gulp-postcss`，也可构建工具根目录下单独创建`.postcssrc`文件进行规则定义。<br>
目前最便捷的方法也肯定是在构建工具中配置，配合预编译语言。

::: tip Q9
pc和webapp双端适配的方法，flexible.js的原理
:::
当被问到`flexible.js`的时候，我差点没笑出来，原来百度团队也是阿里粉啊~瞬间气氛缓和了许多。<br>
pc端做C端页面通常按需分多个媒体查询，然后对不同分辨率下核心路由容器固定宽度，webapp端就使用flexible.js进行适配。<br>
flexiblejs原理，pad以下尺寸给不同分辨率的设配动态计算html几点上的字体属性，实际开发只需要用iphone6plus的版本，全部使用rem开发即可。

::: tip Q10
ajax和fetch的区别
:::
首先我没有在实际项目中使用过fetch，但是自己写的demo几乎都是用`fetch-mock`和node中间件来模拟接口，所以多少也唬住了。<br>
至于ajax和fetch的区别在哪，我觉得没什么区别，应该说fetch可以代替ajax吧，fetch可通过promise进行封装，解决了ajax回调地狱问题。

::: tip Q11
有没有写过jQuery插件或者vue的插件
:::
这个问题是当时面试官突然想得到的，原问题是问写没写过vue组件，但是我当时一声：啊？是插件还是组件，于是一个问题就这样被自己搞复杂了。不过这种问题吃枣要在`es6`中被问。<br>
于是，我先回答了组件的设计，讲了讲公共样式以及slot插槽的概念。<br>
插件这块主要阐述了下类继承和原型方法的使用，以`es6`规则为主，因为es5-的规则太复杂了没记住。以弹层插件和进度条这些功能简易的插件做例子，讲了下`jssdk`的开发模式，以事件模块、render模块和初始化暴露实例对象模块，来阐述(目的也是把面试官往webpack上带，然并不吃这套)，promise这块我那之前写过的upload控件提了下`await/ayasc`异步处理回调地狱的方法。<br>

::: tip Q12
js模块化的理解
:::
这个是接着上个问题问下来，我介绍了三种模块化模式(require、amd、esmodule)，阐述了esmodule模块化规范`export`和`import`，因为有点小紧张没有讲`commonjs`规范。讲道理，`commmonjs`是自己平时用的最多的，webpack就是使用的commonjs规范，最后举了个调用工具函数的例子。

::: tip Q13
熟悉node吗，有没有用过node做过中间件
:::
这个问题比较失败，没有过应用场景，勉强说了些`fetch-mock`的内容和webpack环境下的模拟数据，以及一些基础模块，最后提了下`http-server`。嗯，就是全程划水。

::: tip Q14
webpack的优点在哪，并介绍几种webpack/gulp的插件
:::
例如模块热更新、babel预编译+兼容、各种css-loader、打包静态js文件减少请求、提取公共代码便于管理、启动本地`devServer`······<br>
插件的话，说了几种基本的，`HtmlWebpackPlugin`、`cheap-source-map`、`babel`系列、`JsUglify`······<br>
总之这个问题还是挺爽，回到了本命问题(也许是面试官看过我的[github](https://github.com/dingjiamughal/webpack3.0-note))

::: tip Q15
css水平和垂直居中的解决方案
:::
可以使用定位+负mairgin、flex、table来解决。

::: tip Q16
css权重
:::
class< class嵌套 < class(>|~|+) < id < style < !important

::: tip Q17
- 如何重构jQuery旧项目
- 工作中碰到的问题
- 个人优缺点
:::
emmmmm

### 总结
总之，面试的难度适中，电话面试问的问题偏业务和解决方案。没有被问及底层的，以vue为主，vue全家桶 + webpack占了大半江山，挺对自己胃口的(卡壳的问题多是偏解决方案)。也没有想象中大厂必问的`nginx`和`unitTest`。
