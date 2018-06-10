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
