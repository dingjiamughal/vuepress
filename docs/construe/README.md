# ai-store 串讲
1、mixin.less，variable.less 如何加载的
```
nuxt.config.js 中的 sass-resources-loader
```

2、nuxt的middleware是干嘛的

```
中间件
```

3、server文件夹

4、一个ajax的请求参数依赖其他的ajax请求结果 （爽）
```
不用定义在store中，定义一个局部变量
```

5、nuxt.config.js里面hid的作用
```
vue-meta
```

6、git如何查看某一行代码是谁修改的
```
git blame fileName
```

7、fetch的返回值是什么？
```
返回promise，然后等promise执行完成之后再进行数据渲染
```
8、nuxt用什么编译的
```
vue-server-renderer
```

9、vue的directive
```
自定义指令
```

10、Vue的$bus作用是啥
```
eventbus
```

11、什么情况下用ssr、什么情况下不用ssr？

12、开发一半需要到另外一个分支
```
git branch -b fix1
git commit -m 'fix1'

git branch -b fix2
git add . / git commit -m 'xxx' / git push

git checkout fix1

git merge fix2
```
13、哪些页面是需要登录的，权限是怎么校验的

14、enum怎么用的
```
枚举
```
15、开发到一半，功能不用了，怎么做

## nuxt
>pages

asyncData 组件初始化前，没有this
fetch 返回Promise nuxt会在fetch(...).then这个阶段后渲染组件
head hid：避免子组件中的meta标签不能正确覆盖父组件中相同的标签
validator 动态路由配置

>nuxt.config.js

extend 调用两次（服务器/客户端）打包

