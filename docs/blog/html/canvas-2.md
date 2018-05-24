# canvas学习(2) bezierCurve
>什么是贝塞尔曲线

http://myst729.github.io/bezier-curve/
这是个n阶贝塞尔曲线的模拟。

首先分析一下贝塞尔曲线的运动轨迹
![三阶](/img/canvas-2-1.png)
三阶的情况，`DF:DE = AD:AB = BE:BC` 比例永远保持不变
![四阶](/img/canvas-2-2.png)
`AE:AB = BF:BC = CG:CD = EH:EF = FI:FG = HJ:HI`
结论是n-2根连线，相邻变为一根，如此递减到1根，上的点的变化就是曲线的运动轨迹。

所以显而易见，贝塞尔曲线能做到绘制不规则曲线，canvas中的贝塞尔曲线公式如下：
```
quadraticCurveTo(x1, y1, x2, y2, x3, y3, ···)
```
我们在使用贝塞尔曲线绘制图形时，可以用一组一组三点配合，每次三点曲线生成完毕(x2,y2)就是新的起始点，例如：
```
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.moveTo(75, 25);
ctx.quadraticCurveTo(25, 25, 25, 62.5);
ctx.quadraticCurveTo(25, 100, 50, 100);
ctx.quadraticCurveTo(50, 120, 30, 125);
ctx.quadraticCurveTo(60, 120, 65, 100);
ctx.quadraticCurveTo(125, 100, 125, 62.5);
ctx.quadraticCurveTo(125, 25, 75, 25);
ctx.stroke();
```
二阶变三阶，可以发现当有落笔点（x0,y0）开始就有了三个点，而公式中的点可以理解成练成直线的路径。因此`quadraticCurveTo`就是点点相连再绘制曲线。上面运用了多组二阶贝塞尔曲线，三个节点，首尾两个代表起始和结束节点。

也可以运用多阶到项目中，n阶最多可以有n-1个驼峰，带着这个特性，运用多阶可以给我们带来很高的开发效率。比如可以用三阶公式水波图案
```
ctx.moveTo(100, 250);
ctx.bezierCurveTo(260, 360, 260, 127, 400, 250);
```
