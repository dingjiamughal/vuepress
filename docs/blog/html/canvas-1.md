# canvas学习(1) 基础api
自己对于canvas并不陌生，早在去年十月就接触过，因为只是一堂公开课，大致了解了canvas是用来做什么的而没有深入了解并作过项目。现在我准备写一个canvas学习历程系列，深入发掘html5之美。

### canvas准备工作
>什么是canvas?

canvas就是html5的一个扩展标签，canvas能做到html+css所不能完成的效果，样式也好特效也罢。它提供了许多api绘图接口，所有的绘图都在`<canvas></canvas>`标签中展示，和普通的标签一样，我们可以对canvas元素进行样式编写，脚本控制：
```
<canvas id="canvas" width="1024" height="768"></canvas>
```
这是个初始化的canvas标签，自带width和height标签属性，控制宽高，也可通过js控制
```
canvas.width=1024;
canvas.height=768;
```
可以通过在canvas标签中添加字段开检测浏览器是否兼容canvas，不兼容则会出现该字段：
```
<canvas>您的浏览器不兼容canvas</canvas>
```

### 获得2D环境
在使用canvas作图时，除了要先获取canvas对象，还要获取2D环境，才可以操作它。2D环境顾名思义就是制作2D效果，所以操作过程在x和y轴进行，除了2D当然也有3D，先从2D开始起步。
2D环境的获取方法：
```
var context=document.getElementById("canvas").getContext("2d");
```
在定义完成之后，我们就可以利用html5 canvas中的api进行操作了。

### 介绍API
1.canvas路径
`beginPath()` `moveTo(x,y)` `lineTo(x,y)` `closePath()` `lineWidth` `strokeStyle` `fillStyle` `fill()`
首先最基础的从绘制线段开始：
```
context.beginPath();
context.moveTo(100,100);
context.lineTo(700,700);
context.lineTo(100,700);
context.lineTo(100,100);
context.closePath()
```
canvas坐标系原点从左上角开始，向右正x轴向下正y轴
beginPath()表示开启新的路径绘画
closePath()可理解为用来表示结束，做图形闭合处理（从最后的状态点自动lineTo回归起始点封口）
在beginPath和closePath中进行绘画，
moveTo()笔尖开始处，lineTo()笔尖落笔结束处，lineTo()后面可以一只跟lineTo()，它表示笔尖位置的变化，并且路径用1px黑线渲染。而一次path中只能moveTo一次。
```
context.lineWidth=2;
context.strokeStyle="green"
```
strokeStyle:笔尖滑过路径（线段）颜色
lineWidth：笔尖滑过路径（线段）粗细
```
context.fillStyle="black"
context.fill();
```
fillStyle：填充色
fill()：进行填充
```
context.stroke();
```
stroke()：收线，函数执行语句（执行的上方部分）有了stroke()才能执行上面函数，否则不生效。
以上全部利用线段拼接制作了一个简单的三角图形。

`arc(a,b,radius,start,end,boolen)`
arc(圆心x轴坐标，圆心y轴坐标，半径，起始弧度，结束弧度，boolen)
最后一个参数是个boolen：默认为false，绘图方向为顺时针，true为逆时针
弧度的0-2*Math.PI，从（1,0）坐标方向为0弧度开始，顺时针计算
利用arc()可以绘制圆，和moveTo()-lineTo()用法一致，在beginPath()和closePath()中进行。
重点是，如果一个canvas画布中有很多图，则一定要在画完图下面收线stroke()否则会出现样式覆盖的情况。

### 制作2D路径demo
利用线段和圆可以完成一些有意思的图形:
类九宫格
![canvas(1)](/img/canvas-1.png)
```
  var arr = [
      {coordinateArr: [{x: 0, y: 0}, {x: 800, y: 0}, {x: 400, y: 400}], color: '#caff67'},
      {coordinateArr: [{x: 0, y: 0}, {x: 400, y: 400}, {x: 0, y: 800}], color: '#67becf'},
      {coordinateArr: [{x: 800, y: 0}, {x: 800, y: 400}, {x: 600, y: 600}, {x: 600, y: 200}], color: '#ef3d61'},
      {coordinateArr: [{x: 600, y: 200}, {x: 600, y: 600}, {x: 400, y: 400}], color: '#f9f51a'},
      {coordinateArr: [{x: 400, y: 400}, {x: 600, y: 600}, {x: 400, y: 800}, {x: 200, y: 600}], color: '#a594c0'},
      {coordinateArr: [{x: 200, y: 600}, {x: 400, y: 800}, {x: 0, y: 800}], color: '#fa8ecc'},
      {coordinateArr: [{x: 800, y: 400}, {x: 800, y: 800}, {x: 400, y: 800}], color: '#caff67'},
  ];
  window.onload = function () {
      var canvas = document.getElementById('canvas');
      canvas.width = 800;
      canvas.height = 800;
      var ctx = canvas.getContext('2d');
      arr.forEach(function (item, index) {
          draw(item, ctx);
      });
  };
  function draw(item, ctx) {
      var coordinateArr = item.coordinateArr;
      var color = item.color;
      ctx.beginPath();
      ctx.moveTo(coordinateArr[0].x, coordinateArr[0].y);
      for (var i = 1; i < coordinateArr.length; i++) {
          ctx.lineTo(coordinateArr[i].x, coordinateArr[i].y);
      }
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.fill();

      ctx.lineWidth = 5;
      ctx.strokeStyle = '#000';
      ctx.stroke();
  }
```

弹性球：
```
var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');

var ball={x:512,y:100,r:20,g:2,vx:-4,vy:0,color:"#058"}
var ww=1024;
var wh=768;

canvas.width=ww;
canvas.height=wh;

var timer=setInterval(function(){
  render(context);
  update();
},50);
//动画效果
function update(){
  ball.x+=ball.vx;
  ball.y+=ball.vy;
  ball.vy+=ball.g;
  if(ball.y>=768-ball.r){
    ball.y=768-ball.r;
    ball.vy=-ball.vy;
  }
  if(ball.x<ball.r){
    ball.x=ball.r;
    ball.vx=-ball.vx
  }
  if(ball.y<ball.r){
    ball.y=ball.r;
    ball.vy=0;
  }
  if(ball.x>=1024-ball.r){
    ball.x=1024-ball.r;
    ball.vx=-ball.vx
  }
}

//绘制canvas画布
function render(context){
  //上来先刷新图像
  context.clearRect(0,0,context.canvas.width,context.canvas.height);
  context.fillStyle=ball.color;
  // context.fill();
  context.beginPath();
  context.arc(ball.x,ball.y,ball.r,0,2*Math.PI);
  context.closePath();
  context.fill();
}
```

### Canvas - text
没什么提别的就3个api之间也没相互关联记住就ok
`font` - 定义字体
`fillText(text,x,y)` - 实心文本
`strokeText(text,x,y)` - 空心文本
```
context.font="30px Arial"
context.fillText("Hello World",10,50);
context.strokeText("Hello World",10,50);
```

### Canvas - 渐变
和css3 gradient类似，分为线性渐变和径向渐变
createLinearGradient(x,y,x1,y1) - 线性渐变
createRadialGradient(x,y,r,x1,y1,r1) - 径向/圆渐变
具体用法有些特别,当我们使用渐变，必须使用两种或两种以上的停止颜色。
```
// 创建渐变
var grd=ctx.createLinearGradient(0,0,200,0);
grd.addColorStop(0,"red");
grd.addColorStop(0.3,"green");
grd.addColorStop(1,"white");
// 填充渐变
ctx.fillStyle=grd;
ctx.fillRect(10,10,150,80);
```
createLinearGradient()四个参数为设置渐变的区域
