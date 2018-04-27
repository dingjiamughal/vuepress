# 深入理解盒模型

## padding

### padding对元素尺寸的影响

```css
.box{
  width:50px;
  padding:0 15px;
}
```
此时box尺寸为 80px
所以padding会影响元素尺寸，but···

```css
.box{
  width:8cm;
  box-sizing:border-box;
  padding:0 8cm;
}
```
padding加起来>宽度了，那么这里的宽度就是16cm

总结：
padding影响的是元素尺寸宽，元素尺寸的高度，不受影响。
padding虽然不影响top和bottom，但是会影响背景色background
width：auto时，box-sizing:border-box 同时padding值很小，不影响尺寸。

### 利用以上特性 实现高度可控的分隔线
注册|退出登录
如果用字体，那么高度统一了，现在要达到竖线高度短一些的效果
``` css
注册<span></span>退出登录
span {
  padding:16px 6px 1px;
  margin-left:12px;
  border-left:2px solid;
  font-size:0;
}
```

### padding负值和百分比值
>padding不支持负值
>padding百分比相对于box宽度计算

运用场景：正方形背景图片
不给宽高，直接padding：50%，利用padding会改变背景尺寸的特性
``` css
.container {
  padding:50%;
  background:url('xxx');
  background-size:100%;
  position:relative;
}
.pic {
  positon:absolute;
  top:0;left:0;bottom:0;right:0;
}
```

padding：50%的情况适用于block元素，inline元素如果要达到同样的目的，则需要font-size:0;

### 纯padding完成图形绘制
1.黑白眼
``` css
<div class="eye"></div>
.eye {
  width:150px;
  height:150px;
  border-radius: 50%;
  border:10px solid;
  padding:10px;
  background-color: currentColor;
  background-clip: content-box;
}
```
2.三条杠
``` css
.line {
  width:150px;
  height:30px;
  padding:15px 0;
  border-top:30px solid;
  border-bottom: 30px solid;
  background-color: currentColor;
  background-clip: content-box;
}
```
background-clip可以让背景颜色只在内容区显示，而不会显示让padding显示背景颜色。

### padding的布局
图文，图片+div的形式布局，可以不需要div浮动，只需要图片浮动，给div加padding-left/right即可

## border

### border-width不支持百分比
border-width不支持百分比的原因可能是，应用场景，一些现实中的产品在边框的设计中为了考虑美感会设计的很窄，不能因为宽度很大而让边框也自适应变宽，这样不符合实际，因此border不支持百分比也是出于对美感的考虑。
border-width只能够支持三种，thin:1px medium:3px think:5px

### border-style类型
border-style:solid(实线)|dashed(虚线)|dotted(点线)|double（双线）|inset（内凹）|outset（外凸）
border style:inset/outset/groove/ridge 内凹，外凸,沟槽，山脊，大眼瞪小眼，没啥用。不符合现在审美（间隔相框的既视感），兼容性很差。
主要研究的是double属性，double的计算规则，随着border宽度的变大，
边框大小：上边框+中缝+下边框 <br>
1px:1+0+1 <br>
2px:1+0+1 <br>
3px:1+1+1 <br>
4px:1+2+1 <br>
5px:2+1+2 <br>
6px:2+2+2 <br>
7px:2+3+2 <br>
由此可见，边框double=上边框（+-1）下边框。
利用这个特性可以完成padding三条杠同样的效果：
``` css
div {
  width:120px;
  height:20px;
  border-top:60px double;
  border-bottom:20px solid;
}
```
### border-color
没什么多说的，border-color继承父级color，所以应用场景可以是，hover元素之后border和父级一起变色，就可以不给border加border-color，在transition中一起操作即可。

### 透明边框transparent
1.构建三角形
border构建图形最重要的一点就是构建三角图形
``` css
div {
  border-width:12px 20px;
  border-color:red red transparent transparent
}
```
颜色分布：上、右、下、左

border模拟圆角
由上下梯形中间矩形拼成
2.固定定位
固定在距离右侧50px背景图
``` css
div{
  background-position:100% 40px;
  border-right:50px solid transparent;
}
```
3.增加响应区域大小
``` css
.ckbox {
  color:#d0d0d5;
  background: #fff;
  background-clip:content-box;
  border:20px solid transparent;
  box-shadow:inset 0 1px,inset 1px 0,inset -1px 0,inset 0 -1px;
}
```
4.增加可视渲染区域
``` css
.icon{
position:relative;left:-20px;
border-right:20px solid transparent;
filter:drop-shadow(20px 0);
}
```
### border的布局
1.两列等高布局
``` html
<div class="box">
  <nav class="left">
    <h3>导航1</h3>
  </nav>
  <section>
    <div class="module">模块1</div>
  </section>
</div>
```

``` css
.box {
  border-left:300px solid #ccc;
  height: 100px;
}
.left {
  width:300px;
  margin-left: -300px;
  float: left;
}
```
不支持百分比宽度

## margin

### margin与容器尺寸
margin-left/right 可以改变水平方向的尺寸
margin-top/bottom 改变不了垂直方向尺寸，只能发生位置改变
利用这一特性，可以解决图文混排的效果是，图片和文字各占一列

### margin百分比单位
普通元素的百分比margin都是相对于容器`宽度`计算的
如果position：absolute，则根据定位祖先的`宽度`来计算
