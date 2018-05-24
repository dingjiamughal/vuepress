# CSS3 transition transform animation
CSS3动画效果transition transform animation
transition:过渡效果，需要通过事件触发
transform：变换效果，旋转，缩放，偏移等等
animation：动画效果，和transition很接近，但可以自定义动画帧


### transition
从transition说起，是因为transition是我最早接触的css3动画属性。对transition：all 1s;牢记在心。
首先transition一定是触发需要事件支持，hover,active,visited。
transition: background-color 0.3s ease;接受三个值[过渡属性，时间，运动曲线]，前两个没什么花头，所以整理了一下第三个参数linear | ease-in | ease-out | ease-in-out | cubic-bezier），默认为`linear`线性匀速运动，`ease-in`先慢后快，`ease-out`先快后慢，`ease-in-out`先慢后快再慢，`cubic-bezier`内塞尔曲线，这个复杂的东西没什么应用场景。针对`ease-in | ease-out | ease-in-out`，可以联想XXOO，ease-in进入的时候要找对洞口所以进入开始很慢，等瞄准之后就开始快了，ease-out出来的时候快，但是接近洞口的时候会放慢免得滑出来，所以是先快后慢，ease-in-out概述了整个流程为先慢后快再慢。如此联想，老司机对这个属性应该能够秒记了，字母最长的最猛的transition属性拥有的ease属性。
```
transition:all 3s ease-in;
width:200px;
background:red;
transform:rotateY(30deg)
```

### animation
animation和transition进行区分对比能够更好的理解两者的异同，首先animation的功能更加强大，通过'@keyframes eventName'对动画按帧进行：
```
#dialog {
  animation: mymove 1s;
}
@keyframes mymove {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```
animation也是一种动画过渡效果，但是他不需要事件支持，如果没有定义事件，那就是页面刷新时，开始计时，其次`@keyframes`中可以用from···to的方式线性执行动画，也可以分布执行如：0%···10%···45%···80%···100%。所以说，通过transition可以做到的animation都可以做到。
那么什么时候应该用transition，什么时候用animation呢？凭感觉是，复杂的用animation，简易的用transition。

### transform
将transform放在最后，首先它不是动画，它只能算是在原有的图形上进行图形样式变化，如果要让目标动起来，还是需要借助animation和transition来实现。其次transform的属性值比较多，记忆成本较高。
transform分为2D和3D，如：
2D转换：transform：translate(x,y)
3D转换：transform：translate3d(x,y,z)

>transform接受的属性有，transform: rotate | scale | skew | translate |matrix;rotate(旋转)、skew(扭曲)、scale(缩放)、translate(移动)、matrix(矩阵变形)


transform ： none | transform-function [ transform-function ]——none表示可以接受多个属性，但是以空格分隔，而不是逗号。如：
>transform:rotate(30deg) scale(2,2);

接下来看一下具体属性的用法和效果：
transform:rotate(30deg) 顺时针旋转角度
transform:translate(100px,30px) 移动距离，x:向右平移，y:向下平移
transform:scale(2.5,1.5) //缩放比例
transform:skew(30deg,10deg) //旋转角度，x:逆时针，y:顺时针
所有的变换都是以中点，设置transform-origin属性改变动画的中心点，transform-origin:(x,y) x,y自左上角向右向下
