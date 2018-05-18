# 百度金融SSG的面试经历(2面)

2018.5.16[接上回](./interview-1.html)电面之后的第二波电话。相比第一次的兴奋，这次我第一反应是打开电话录音(期待难题，尽可能的记录)，这次的问题业务场景没怎么问，很大众的问题，主要是在技术层面：底层js和vue，通话时长16分钟。
::: tip Q1
都会哪些技术、什么时候接触前端的、讲讲大学学的东西
:::
`html`，`css`，`js` ¿¿¿ emmmm

::: tip Q2
原生js掌握的如何，作用域
:::
这个范围比较宽泛，我的第一反应是变量提升：变量类型是函数时会变量提升，如果是值类型`var`、`let`、`const`时，声明在调用后就找不到了。<br>
然后面试官让我讲了下`this`指向，this指向看函数的调用方式
```js
//demo1
var obj={
  x:10,
  fn:function(){
    console.log(this);  //object{x:10,fn:undefined}
    console.log(this.x);  //10
  }
}
obj.fn();

//demo2
var obj={
  x:10,
  fn:function(){
    console.log(this);  //window
    console.log(this.x);  //undefined
  }
}
var a=obj.fn;
a()
```
- demo1 最终被调用的是obj中的fn，因此this指向fn
- demo2 被调用的是fn，而不是obj中的fn了，相当于拷呗了obj的fn函数属性，在全局下调用，那么此时this指向window
- 箭头函数中this指向父作用域（最终考点）

::: tip Q3
原型和原型链了解多少，讲讲原型原型链的继承
:::
自由发挥的题目吧，先从构造函数说起，定义一个类，类中的构造器constructor接收外部参数，原型方法在构造函数上。当对实例对象上寻找方法时，通过实例对象上的隐式原型__proto__到构造函数的原型prototype到构造函数原型上隐式原型再到对象原型一层层的向上寻找。<br>
至于继承，面试官特意说了个原型链的继承，那我就肯定不能用es6忽悠她了。当然我把es6的类继承extends先讲了下。es5中的继承实现通过子类的prototype指向父类的实例对象即可实现原型链继承。

::: tip Q4
setTimeout 0秒的理解
:::
考点在对事件队列以及event loop的理解，js单线程所以同步操作在队列1中先执行，异步操作在队列2。从上至下异步操作在同步之后执行。

::: tip Q5
清除浮动的几种方法
:::
- overflow:hidden
- after clear:both/content:' '

::: tip Q6
flex了解多少
:::
flex解决特定布局，垂直居中、上中下或者左中右结构布局、均匀布局。多用于移动端

::: tip Q7
css3动画
:::
transform,keyframes,transition

::: tip Q8
对rem的了解 flexible.js源码 切图多大尺寸设计稿
:::
详细[1面 Q9](./interview-1.html)

::: tip Q9
事件代理原理
:::
对在js中动态生成的节点绑定事件，作用于其父节点上，是利用事件的冒泡原理来实现的。

::: tip Q10
介绍vue 全家桶
:::
和一面同样的套路，讲一下 vue-cli + vue-router + vuex + axios (构建工具、路由、状态管理、http请求工具)

::: tip Q11
Vue的生命周期，什么时候可以接收数据
:::
生命周期钩子主要这四个：created、mounted、update、destroy<br>
在`created`时候接收数据

::: tip Q12
Vue父子组件通信
:::
详细[1面 Q1](./interview-1.html)

::: tip Q13
说一下Vuex状态管理
:::
详细[1面 Q2](./interview-1.html)

::: tip Q14
一些题外话
- 接触vue至今多久
- github上有写过webpack教程以及个人blog，有什么感受
:::

### 总结
这次主要是问问技术上的问题，所以要对js底层的东西有所了解，至少听到问题在短时间内有内容可说。大框架用的技术栈是vue，vue全家桶，生命周期和父子组件通信这些基本的概念两次面试官都有问到。<br>
再就是比较重要的就是日常积累，也许是大厂的大佬们相信过程，尤其是前端维护github就很关键，这次面试官最后特别提了下我github上写的webpack教程和blog，感觉他们对这方面比较看重。<br>
总之，这次的问题比较基础，比较积累信心的一次面试，面试小姐姐的声音很甜，回放听自己声音被恶心到了（一定是楼道里的10级回音效果，可以试试烟火里的尘埃）。太晚了有点顶不住了，草率的凭感觉写了些问题答案，等有空的时候我再查下资料补充完整吧。三面的问题我也会记录下来，祝自己好运！
