# Vue动画特效

### 动画原理
vue transition标签动画，共有6个状态`v-leave` `v-leave-to` `v-leave-active` `v-enter` `v-enter-to` `v-enter-active`

`v-enter-active` `v-leave-active` 全程都存在
`v-leave` `v-enter` 第一帧存在，第二帧消失
`v-leave-to` `v-enter-to` 第二帧存在，至最后一帧
```html
 <transition name="fade">
  <div v-if="show"></div>
 </transition>
```

```css
  .fade-enter,
  .fade-leave-to {
    opacity:0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition:opacity 1s;
  }
```

### 在vue中使用keyframe

```css
@keyframes bounce-in {
    0% {
      transform:scale(0)
    }
    50% {
      transform:scale(1.5)
    }
    100% {
      transform:scale(1)
    }
}
.fade-enter-active {
  transform-origin:left center;
  animation: bounce-in 1s;
}
.fade-leave-active {
  transform-origin:left center;
  animation: bounce-in 1s reserve;
}
```

### 使用animate.css库
使用animate.css库之前必须先修改默认vue动画的class名
例如：
```html
<transition name="fade"
            enter-active-class="enter"
            leave-active-class="leave">
 <div v-if="show"></div>
</transition>
.fade-enter-active ===> .enter
.fade-leave-active ===> .leave
```

套用animate.css类名即可
```html
<transition name="fade"
            appear
            enter-active-class="animated shaked"
            leave-active-class="animated swing"
            appear-active-class="animated swing">
 <div v-if="show"></div>
</transition>
```

### 过渡和动画
过渡和动画即：`transition`+`animation`

```html
<transition name="fade"
            :duration="{enter:2000, leave:3000}"
            appear
            enter-active-class="animated shaked fade-enter-active"
            leave-active-class="animated swing fade-leave-active"
            appear-active-class="animated swing">
 <div v-if="show"></div>
</transition>
```

```css
.fade-enter,
.fade-leave-to {
  opacity:0;
}
.fade-enter-active,
.fade-leave-active {
  transition:opacity 1s;
}
```

### 通过js实现动画

```html
<transition name="fade"
            @before-enter="handleBeforeEnter"
            @enter="handleEnter"
            @after-enter="handleAfterEnter">
  <div v-if="show"></div>
</transition>
```
```js
methods:{
  handleBeforeEnter:function(el){
    el.style.color="red"
  },
  handleEnter:function(el,done){
    setTimeout(()=>{
      el.style.color="green"
    },2000)
    setTimeout(()=>{
      done()
    },4000)
  },
  handleAfterEnter:function(el){
    el.style.color="black"
  }
}
```

### velocity.js动画库
```js
methods:{
  handleBeforeEnter:function(el){
    el.style.opacity=0
  },
  handleEnter:function(el,done){
    Velocity(el,{
      opacity:1
    },{
      duration:1000,
      complete:done
    })
  },
  handleAfterEnter:function(el){
    console.log("动画结束")
  }
}
```

### 多个元素或组件的过渡
