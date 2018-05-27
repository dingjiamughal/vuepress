# san study
3js是一款百度开源的mvvm框架，对比vue学习san

### loader
`module.rules`中
```js
// vue-loader
{
  test: /\.vue$/,
  loader: 'vue-loader'
}
// san-loader
{
  test: /\.san$/,
  loader: 'san-loader'
}
```

### 注册
入口js文件中
```js
// vue
import Vue from 'vue'
import App from './App'
new Vue({
  el: '#root',
  router,
  store,
  components: { App },
  render() {
    return(
      <div>
        <App></App>
      </div>
    )
  }
})
// san
import san from 'san'
import App from '../app.san'
var myApp = new App()
myApp.attach(document.querySelector("#root"))
```

### router
san的路由很难受，文档的demo不是很好(有待研究)
```js
// vue
import Router from 'vue-router'

import One from "../template/one.vue"
import Two from "../template/two.vue"
import Three from "../template/three.vue"

Vue.use(Router)

new Router(
  routes:[
    {path: '/', Component: App, name: App},
    {path: '/one', Component: One, name: One},
    {path: '/two', Component: Two, name: Two},
    {path: '/three', Component: Three, name: Three}
  ]
)

// san
import {router} from 'san-router'

import One from "../template/one.san"
import Two from "../template/two.san"
import Three from "../template/three.san"

router.add({rule: '/', Component: App, target: '#root'})
router.add({rule: '/one', Component: One, target: '#root'})
router.add({rule: '/two', Component: Two, target: '#root'})
router.add({rule: '/three', Component: Three, target: '#root'})
router.start()
```

### 声明周期
- `compiled` - 组件视图模板编译完成
- `inited` - 组件实例初始化完成
- `created` - 组件元素创建完成(created)
- `attached` - 组件已被附加到页面中(mounted)
- `detached` - 组件从页面中移除
- `disposed` - 组件卸载完成

### UI库
vue `element-ui`<br>
san `san-mui`

### 双向绑定
```html
<!-- vue -->
<input type="text" v-model="val"/>
<!-- san -->
<input type="text" value="{= val =}">
```

### style && class
```html
<!-- vue -->
<div :class="[{ active: isActive }, errorClass]"></div>
<!-- san -->
<div class="{{isActive ? 'active' : ''}} errorClass"></div>
```
