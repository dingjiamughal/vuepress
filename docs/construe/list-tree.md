# 目录结构

主结构遵循nuxt的结构
```
/*目录结构*/
├─.nuxt # nuxt的默认配置，会动态改变
├─node_modules # npm包和依赖
├─static # 静态资源文件
├─assets # webpack 构建的文件
├─nuxt.config.js # nuxt配置
├─middleware # 路由中间件
├─plugins # 放插件（配置在nuxt.config.js）
    ├─axios.js # 封装ajax
    ├─console.js # baidu AI best AI
    ├─vue-mixin.js # vue高级组件
    ├─vue-swiper.js # 注册vue-awesome-swiper
├─server #
    ├─index.js # 服务 主入口
    ├─mockup.js # 定义mock中间件
├─components # 组件库文件夹
    ├─overview # 首页组件
    │  ├─Slider.vue # 顶部轮播
    │  ├─Module.vue # 三个业务模块
├─layouts # 模板
    ├─overview # 首页组件
    │  ├─error.vue # 报错跳转
    │  ├─default.vue # 母版页
├─css
    ├─main.css # 公共样式
    ├─mixin.less # mixin
    ├─varible.less # var
├─config #
    ├─enum # 枚举字段
    │  ├─...xxx.js #
    ├─nginx nginx运行环境
    ├─pm2 # pm2运行环境
├─mockup # mock
├─package.json # npm配置文件
├─webpack.config.js # webpack的配置文件
├─pages # 主页面
    ├─overview.vue 首页
    │  ├─Slider.vue # 顶部轮播
    │  ├─Module.vue # 三个业务模块
    │  │  ├─ProductCard # 图文组件
    ├─product
    │  ├─index.vue # productItem
    │  │  ├─ProductCard # 图文组件
    │  ├─search.vue # 条件筛选
    │  │  ├─SearchFilter # n级条件筛选
    │  │  ├─Pager # 分页
    │  │  ├─ProductItem #
    │  │  ├─SearchBox #
    │  │  ├─Loading #
    ├─provider # 服务商入驻
    │  ├─index.vue # 百度AI开发平台（产品详情页右上角）
    │  │  ├─ProductCard #
    │  │  ├─Pager # 分页
    │  │  ├─aButton #
    │  │  ├─Dialog # 用于成功案例
    │  │  ├─Loading #
    │  ├─register # 条件筛选
    │  │  ├─index.vue #
    │  │  |  ├─Step.vue #
    │  │  |  ├─Step1.vue #
    │  │  |  ├─Step2.vue #
    │  │  │  │  ├─CustomCheck.vue #
├─util # 工具函数
    ├─clickoutside.js
    ├─enumx.js # 处理数组类，自定义数组方法
    ├─logger.js # log
├─store # vuex
    ├─clickoutside.js
    ├─enumx.js # 处理数组类，自定义数组方法
    ├─logger.js # log

```