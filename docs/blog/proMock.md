# 演讲大纲

## 目录结构
- .nuxt npm dev后自动生成的文件
- assets 存放 less/scss img
- components 自定义组件
- layouts 布局
- middleware 放中间件
- pages 主页面
- plugins js插件
- static 图片、icon
- store 状态管理

### Nuxt

<nuxt-link :to="{name:'index'}"></nuxt-link>

#### 动态路由
`_id` $route.params.id :to="{name:'index'}"

#### 路由动画

全局：
```css
.page-enter-active,.page-leave-active {
  transition: opacity 1s;
}
```

### 默认模板
app.html

### 默认布局
layouts

<!-- ------------------------------------------------ -->
### 项目分析
第一页 overview
数据获取(从上至下)

```
vuex 结构：
state ---> slider
mutations ---> setSliderDate
actions ---> getSlisderDate

```

1：基础数据
2：页面数据
- slider `2` nuxt的fetch阶段获取数据，执行action的commit方法