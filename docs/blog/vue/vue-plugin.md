# vue组件库开发

## 全局注册组件
step1：新建一个.vue文件叫`plugin.vue`。通过一个js文中注册组件，就叫`index.js`
```js
import Plugin from "./plugin.vue"
export default (Vue) => {
  Vue.component(Plugin.name,Plugin)
}
```
step2：在入口js文件中引用

```js
import Plugin from "./components/plugin" // 引入注册整个文件夹，会自动识别index.js 为入口文件

Vue.use(Plugin)
```

## 扩展组件功能
e.g生成一个简单的div组件<br>
step1：新建`func-plugin.js`来声明扩展组件，作为继承组件，可以覆盖.vue文件中的数据
```js
import Plugin from "./plugin.vue"

export default {
  extends: Plugin,
  computed:{
    style() {
      return {
        position:"fixed",
        right:"20px",
        bottom:`${this.verticalOffset}px`
      }
    }
  },
  data() {
    return {
      verticalOffset: 0
    }
  },
  methods:{
    m1() {},
    m2() {}
  }
}
```

step2：新建`Function.js`编写方法
```js
import Vue from "vue"
import Component from "./func-plugin.js"

//也可以通过new Vue新建实例来创建组件
const PluginConstructor = Vue.extend(Component)

// 通过seed 给组件加id，为了之后的组件销毁
let seed = 1

const plugin = (options) => {
  //服务端渲染没有dom操作，排除这种情况
  if(Vue.prototype.$isServer) {
    return
  }

  // 分离参数类型
  const {
    autoClose,
    ...rest
  } = options

  // 存放实例对象
  const instances = []

  // 定义instance 在Vue实例下写外部扩展的配置项
  // 相当于原生js插件中的Object.assgin()
  // instance 相当于组件内部的this
  const instance = new PluginConstructor({
    propsData: { ...rest },
    data: {
      autoClose
    }
  })

  // 主体逻辑-------------------------------------
  //定义id，为了删除实例 选到指定的组件
  const id = `PluginConstructor_${seed++}`
  instance.id = id
  instance.vm = instance.$mount() //生成html节点
  document.body.appendChild(instance.vm.$el)

  // 对内部的data、props进行操作
  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 10
  })
  verticalOffset += 10
  instance.verticalOffset = verticalOffset
  instances.push(instance)

  // 监听组件内部$emit事件
  instance.vm.$on('destroyVm',() =>
    removeInstance(instance)// 删除instance实例
    document.body.removeChild(instance.vm.$el) // 删除dom节点
    instance.vm.$destroy() // 销毁实例
  })

  return instance.vm
}

//  写一个方法，删除指定的instance
const removeInstance = (instance) => {
  if(!instance) return
  const index = instances.findIndex(item => item.id === instance.id)
  instances.splice(index,1)
}

export default plugin
```

ste3：在`index.js`中引入方法函数js
```js
import Plugin from "./plugin.vue"
import pluginFunc from "./Function"

export default (Vue) => {
  Vue.component(Plugin.name,Plugin)
  Vue.prototype.$pluginFunc = pluginFunc
}
```

在别的组件中就可调用Plugin组件
```js
methods: {
  showPlugin() {
    this.$pluginFunc({
      data1: 'xxx',
      data2: 'zzz'
    })
  }
}

```
以上搞定了，对组件内部配置项的assign + 事件监听
