# CSS3 gradient

以前用过gradient渐变属性，但只是用来让按钮看上去更加立体。上周看到w3cfuns出的一部css3实现loading滚动条视频后，原来渐变还真不小，所以今天花了点学习了一下大漠写的http://www.w3cplus.com/content/css3-gradient /http://www.w3cplus.com/css3/do-you-really-understand-css-linear-gradients.html

CSS3 gradient分为linear-gradient(线性渐变)和radial-gradient(径向渐变)
>线性渐变（Linear Gradients）- 向下/向上/向左/向右/对角方向
径向渐变（Radial Gradients）- 由它们的中心定义

### Linear Gradients
### 基本样式
创建一个线性渐变，至少定义两种颜色结点，然后可以设置起点，方向和角度
一个最普通的渐变效果：
>1.线性渐变默认是从上至下
>background: linear-gradient(red, blue)

>2.第一个参数给了方向，从左向右red to blue
>background: linear-gradient(to right, red , blue)

>3.从左上角向右下角
> background: linear-gradient(to bottom right, red , blue)

>4.角度呈顺时针旋转，0deg是自下而上
>background: linear-gradient(60deg, red, blue);

### 复杂情况
1.定义位置
>background: linear-gradient(90deg,red 60%, green 85%, blue 90%);
>background: linear-gradient(90deg,red 50px, green 50px, blue 50px);

颜色后跟百分比或者长度，表示从百分比处开始发生渐变，之前的部分不发生渐变，这个百分比属性我试了一下，以下标为分界，如果小于中点，渐变起始点在起点一侧指向终点，如果大于中点，渐变起点在终点一侧指向起点。

2.渐变颜色加透明度
>linear-gradient(right, rgba(255,255,255,0), rgba(255,255,255,1))
