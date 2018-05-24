# Vue父组件和子组件的传递

### father To child
父组件传递参数给子组件：father="this's fatheraaaaa"
子组件接收father的值：props:["father"] 通过`双花括号father`来展示数据：this's fatheraaaaa

### child To father
子组件传递参数给父组件：
```js
v-on:click="clickbtn"
methods:{
  clickbtn:function() {
    //do sth
    this.$emit('clickbtn')//别的照旧，这条语句表示传递方法给father
  }
}
```js
父组件接收事件：
```
<hello father="fathera" v-on:clickbtn="incrementTotal"></hello>//事件名称
methods:{
  incrementTotal:function(){
    //do sth
    //doEvent when sonEvent touch
  }
}
```

### 总结
子组件传递给父组件一般为事件方法，如果不传递`$emit`方法名给外层的父组件，那么外层的父组件上用不了此方法。
v-on:click="sonEvent"
v-on:sonEvent="fatherAccept"
父组件传递数据给子组件，以属性名为桥梁，属性值为传递的数据对象。
