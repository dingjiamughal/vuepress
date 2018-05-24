# CSS3 box-shadow

```
box-shadow: offsetX offsetY blur spread color position;
```
它们分别为: x轴偏移(向右) y轴偏移(向下) 模糊半径 大小 颜色 位置。

<!-- more -->

### offsetX：向右偏移 offsetY：向下偏移
```
box-shadow: 20px 0 10px 0 lightblue;
```
![offset](http://louiszhai.github.io/docImages/box-shadow01.png)

### blur：设置阴影的模糊半径, 值越大时, 阴影就越模糊。
```
box-shadow: 20px 0 50px 0 lightblue;
```
![blur](http://louiszhai.github.io/docImages/box-shadow05.png)
似乎没有办法去衡量blur值，所以看下面的例子帮助理解
```
.shadow {
  width:100px;height:100px;
  .border(1px);
  .fl();
  margin:30px;
  box-shadow: 200px 0 0px 0 lightblue;  //  左图
  box-shadow: 200px 0 20px 0 lightblue; // 中图
  box-shadow: 200px 0 90px 0 lightblue; // 右图
}
```
![blur](/img/boxshadow1.png)
![blur](/img/boxshadow2.png)
![blur](/img/boxshadow3.png)
非常神奇的是，box-shadow阴影，然而当偏离过大时就可以发现，其实box-shadow是个填充色，而改变模糊程度完全由blur控制。

### spread：相当于盒子的画布，有一种outerborder的感觉
```
box-shadow: 0 0 0 10px lightblue;
```
![spread](http://louiszhai.github.io/docImages/box-shadow19.png)
它的值为（+），则扩展，值为（-），则缩小

### position
position为最后一个参数，最有意思的一个参数，让阴影充满了变数
默认是外阴影，可选insert内阴影
```
box-shadow: 0 0 20px 10px lightblue inset;
```
![position](http://louiszhai.github.io/docImages/box-shadow11.png)
内阴影就相当于外阴影的映像，position还可以内外阴影组合
```
box-shadow: 0 0 20px 10px lightblue , 0 0 20px 10px lightblue inset;
```
![position](http://louiszhai.github.io/docImages/box-shadow12.png)
```
box-shadow: 10px 10px 0px 10px #d0268c,
            -10px -10px 0px 10px rgba(95, 167, 44, 0.56),
            0px 0px 0px 20px lightgrey; /*多重阴影效果*/
```
![position](http://louiszhai.github.io/docImages/box-shadow13.png)

### 实例
![position](http://louiszhai.github.io/docImages/box-shadow18.gif)
```
<style>
  .rose {
    position: relative;
    width: 80px;
    height: 120px;
    background: rgba(0,0,0,0.2);
    transition: transform 1s;
  }
  .rose::after {
    content: "";
    position: absolute;
    bottom: -30px;
    left: 50%;
    height: 8px;
    width: 100%;
    border-radius: 50%;
    background-color: rgba(0,0,0,0.2);
    transform: translate(-50%, 0);
    transition: transform 1s;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.2);
  }
</style>
<div class="rose"></div>
```
添加动画
```
.rose:hover {
    transform: translateY(-40px);
    transition: transform 1s;
}
.rose:hover::after {
  transform: translate(-50%, 40px) scale(0.75);
  transition: transform 1s;
}
```
巧妙运用伪元素来完成动画或者旋转情况下的box-shadow。

本文参考自louis：http://louiszhai.github.io
