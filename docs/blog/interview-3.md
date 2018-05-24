# 百度金融SSG的面试经历(最终面)

明人不说暗话，我喜欢你...额呸，直接上面试题<br>
问了一长串，凭着记忆按难度整理了两部分，第一部分热身题和第二部分正题(顺序不分先后)<br>
热身题比较大众，正题比较开放

### 热身题

::: tip html + css
- position 有哪几种+介绍
- display 有哪几种+介绍
- block、inline-block、inline区别
- 通常link标签为什么放head标签内，script放在body最下面
- 垂直居中的几种方式
- 动画效果的n种实现，介绍下动画第三方类库
- vue动画的钩子和实现过程
:::

::: tip js
- amd、commonjs、esmodule区别
- 往数组中插值的n种方案
- 数据类型有哪几种，如何判断类型
- ==和===的区别，function(a={},b=0){ return a==b } 区分的评判标准
- var、let、const区别
- 如何改变this指向(call/apply/bind)
- 箭头函数的好处
- 反转字符串的n种方法
:::

### 正题
纯属个人理解

::: tip Q1
为什么let能缩小作用域，var却不能
:::

```js
if(true) {
  var a = 1;
  let b = 2;
}
console.log(a) // 1
console.log(b) // error
```
这个就是个缩小作用域的例子，当var声明变量时，会形成变量提升相当于在if作用域外层定义了个 var a;

::: tip Q2
js dom操作事件的原理
:::
比如点击事件，在发起事件的时候浏览器会从html标签一层层的向下找到该dom节点，dom节点接受到响应之后再递归反馈给父节点，就是所谓的事件捕获和事件冒泡

::: tip Q3
写一个Promise，并封装一个fetch请求
:::
Promise 方法中有两个参数返回成功resolve和失败reject，将最终的结果then和catch回调
```js
function fetch(url,success,fail){}
const promise = new Promise((resolve,reject) => {
  fetch({
    url:"",
    success() => {
      resolve(res)
    },
    fail() => {
      reject(res)
    }
  })
})

promise(res)
  .then(()=>{})
  .catch(()=>{})
```

::: tip Q4
N个格子随机填满N种`不同`颜色，点击其中一个，其余的`变色`，用复杂度最少的方式完成
:::
考点一：生成随机颜色<br>
Math.random来生成随机数，取小数点后6位，用es6的map[...rest]方法对数组自动去重。<br>
考点二：变色<br>
最简答的方法是后一个给前一个赋值，正规方式就是递归一次es6数组的map方法,然后再和点击的那一项concat

::: tip Q5
写一个快排
:::
面试官也很喜欢玩梗，然而我只记住了阮一峰老师被怼的这套错误版本
```js
var quickSort = function(arr)
　　if (arr.length <= 1) { return arr; }
　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];
　　var left = [];
　　var right = [];
　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
　　return quickSort(left).concat([pivot], quickSort(right));
};
```

::: tip Q6
setTimeout 0 的原理
:::
js单线程，按时间点划分，单线程的优先执行，第二个时间节点会执行setTimeout 0的代码段

::: tip Q7
es6中的class类和其他语言的类有什么不同
:::
es6的class本质是构造函数，class或者是extends都是es6的语法糖。继承的最终是原型链和原型方法的继承。<br>
别的语言的继承相当于一次深拷贝，而es6中则是原型链的继承 不能说是拷贝

::: tip Q8
谈一下vue或者react组件化设计
:::
这种开放题吧，框架设计就是仁者见仁，自己觉得ok就OK。组件定义可以是样式上的，也可是功能上，但最主要的是数据结构的耦合。<br>
就是说，组件是尽量要单独游离在业务之外，需求之内。语义化要强，可扩展性要高，合理利用插槽。vuex也属于一种模块化思想，组件之间的通信以及表单元素v-model的管理，统统可以用vuex进行模块管理，那定义模块的时候就不必过多考虑数据结构的问题，嵌套！就是了~

### 总结
这三连面让自己学会了很多，把以前看过的问题都串联了一遍，题目偏发散(面试官会说的很少，反之会让你继续讲到弹尽粮绝)，问题不难但要求比较苛刻。只要平时多关注底层和设计模式，大部分时间会让你讲，所以知识面得广，所以人闲着要多学习，闲着会上瘾的啦<br>
js整理传送门 [https://github.com/dingjiamughal/jsCleanUp](https://github.com/dingjiamughal/jsCleanUp)<br>
p.s 面试过了，定义为初级T2T3¿¿，圆梦bat反而并没有太多兴奋感，随之而来的是各种担心，压抑感，跟不上拍，自我价值等等。<br>
至于分在哪个TEAM也没确定，坐标上研大厦，后续会在blog下新开个三级路由，分享一下工作心得以及业务场景，前提是我能hold住的话~
