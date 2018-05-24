# canvas学习(3) 线型

前两章中分别学习了绘制[canvas 2D线段路径](http://www.xhrsama.com/html/canvas-1)，和[贝塞尔曲线](http://www.xhrsama.com/html/canvas-2)

虽然利用这些我们已经可以轻松绘制出直线线段和曲线，但canvas提供了非常多的api绘制线型图案。

### 线段端点（线冒）
CanvasRenderingContext2D.lineCap有三个值：`butt`、`round`和`square`，其中默认的值是`butt`。
![线段端点](https://www.w3cplus.com/sites/default/files/blogs/2017/1703/canvas-5-2.png)
用法：
```JavaScript
ctx.lineCap = 'round';
```
demo：
```JavaScript
ctx.lineWidth = 30;
ctx.lineCap = 'round';

ctx.beginPath();
ctx.strokeStyle = '#000';
ctx.moveTo(81, 80);
ctx.lineTo(520, 80);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = 'red';
ctx.moveTo(81, 160);
ctx.lineTo(520, 160);
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle = 'blue';
ctx.moveTo(81, 240);
ctx.lineTo(520, 240);
ctx.stroke();

ctx.closePath();
```
这边再次强调一下closePath()和stroke()这两个方法，closePath功能是闭合回路，为了限制lineTo的范围，限制绘制line代码区域。stroke是闭合画笔，就是对颜色，宽度等等操作进行限制，防止后面的状态覆盖前面。

## 线段连接点
CanvasRenderingContext2D.lineJoin同样有三个值：`round`、`bevel`和`miter`，其中`miter`是其默认值。
![线段连接点](https://www.w3cplus.com/sites/default/files/blogs/2017/1703/canvas-5-3.png)
用法：
```JavaScript
ctx.lineJoin = 'miter';
```
demo：
```JavaScript
ctx.lineWidth = 20;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.moveTo(50, 50);
    ctx.lineTo(100, 120);
    ctx.lineTo(150, 30);
    ctx.lineTo(200, 140);
    ctx.lineTo(300, 140);
    ctx.lineTo(350, 40);
    ctx.lineTo(400, 110);
    ctx.lineTo(450, 50);
    ctx.lineTo(500, 160);
    ctx.lineTo(550, 20);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(40, 100);
    ctx.lineTo(80, 190);
    ctx.lineTo(160, 140);
    ctx.lineTo(180, 220);
    ctx.lineTo(320, 220);
    ctx.lineTo(360, 140);
    ctx.lineTo(400, 220);
    ctx.lineTo(440, 130);
    ctx.lineTo(500, 230);
    ctx.lineTo(570, 100);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.moveTo(20, 180);
    ctx.lineTo(60, 250);
    ctx.lineTo(120, 220);
    ctx.lineTo(160, 280);
    ctx.lineTo(320, 280);
    ctx.lineTo(360, 240);
    ctx.lineTo(420, 270);
    ctx.lineTo(450, 210);
    ctx.lineTo(480, 280);
    ctx.lineTo(540, 280);
    ctx.lineTo(560, 200);
    ctx.stroke();
    ctx.closePath();
```
