# Tween算法解析

当在使用animate动画时，思考着如何能够实现不均匀运动，tween.js这个第三方动画库就是个非常棒的选择，tween.js实则一个算法库，接口返回的全是不规则数字，所以我们只能利用tweenjs做数字生成，当然这样也足够了，它提供了非常多的曲线运动轨迹。当我们使用它做一些运动特效时，只需要控制速度变量以及递归就可以达到目的。

先来看一下tweenjs中提供了哪些运动方法：
``` text
Linear：线性匀速运动效果；
Quadratic：二次方的缓动（t^2）；
Cubic：三次方的缓动（t^3）；
Quartic：四次方的缓动（t^4）；
Quintic：五次方的缓动（t^5）；
Sinusoidal：正弦曲线的缓动（sin(t)）；
Exponential：指数曲线的缓动（2^t）；
Circular：圆形曲线的缓动（sqrt(1-t^2)）；
Elastic：指数衰减的正弦曲线缓动；
Back：超过范围的三次方缓动（(s+1)*t^3 – s*t^2）；
Bounce：指数衰减的反弹缓动。
```

每个效果都分三个缓动方式，分别是：
``` text
easeIn：从0开始加速的缓动，也就是先慢后快；
easeOut：减速到0的缓动，也就是先快后慢；
easeInOut：前半段从0开始加速，后半段减速到0的缓动。
```
easeIn和easeOut的记忆理解，在之前的transition过渡中有所介绍。这里就不再开车了
当知道了这些方法之后，接下来就是如何运用了，所有的缓冲运动都有4个参数：
``` text
t: current time（当前时间）
b: beginning value（初始值）
c: change in value（变化量）
d: duration（持续时间）
```
t和d放一块理解（时间概念），t是起始时间，d是持续时间。运动过程中的时间变化
d和c放一块理解（长度概念），b是起始位置，c是最终位置。运动过程中的距离变化
当然tweenjs中没有时间空间的概念，他返回的是一个数字，一个将四个参数（number)传递进去返回的数字，因此要理解成运动轨迹，具体操作时就需要加上定时器来控制。
``` js
var t:0,b:0,c:700,d:100
var timer=setInterval(function(){
  var dis=Tween.Linear(t,b,c,d);
  var dis=Tween.Bounce.easeIn(t, b, c, d);
  if(t>d){
    clearInterval(timer)
  }
  $('selector').animate('left':dis+'px');
  },10);
```
做了个demo，不知道为什么用jQuery的animate运行卡顿
``` html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
  <script src="./js/tween.js"></script>

  <title>Tweenjs</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    .container {
      margin: 30px auto;
      perspective: 500;
      width: 150px;
      height: 150px;
      position: relative;
      border-radius: 6px;
      font-size: 28px;
      line-height: 150px;
      vertical-align: middle;
      cursor: pointer;
    }
    .container>div{
      position: absolute;
      width:150px;
      height:150px;
    }
    .box-front,
    .box-back {
      /* Enable 3D transforms */
      transform-style: preserve-3d;
      backface-visibility: hidden;
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: #0090d9;
      transition: 0.8s;
      text-align: center;
      color: #FFF;
      border-radius: 6px;
    }

    .box-back {
      transform: rotateY(180deg);
      background-color: #f35958;
    }

    .container:hover .box-front {
      transform: rotateY(180deg);
    }

    .container:hover .box-back {
      transform: rotateY(360deg);
    }
  </style>
</head>

<body>
  <button class="btn">click</button>
  <div class="container">

    <div class="box-group">
      <div class="box-front">Front :)</div>
      <div class="box-back">Back :D </div>
    </div>

  </div>
  <script>
    $(function() {
      var html = '';
      var flag = 0;
      $('.btn').click(function() {
        var width = 170
        for (var i = 1; i < 10; i++) {
          html = '<div class="box-group-' + i + '">' +
            '<div class="box-front">Front :)</div>' +
            '<div class="box-back">Back :D </div>' +
            '</div>';
          $('.container').append(html);
        }
        var t = 0;
        var b = 0;
        var c = 300;
        var d = 100;

        var tim=setInterval(function(){
          flag++;
          console.log(flag);

          var timer = setInterval(function() {

            var c=300+width*flag;
            var dis = Tween.Linear(t, b, c, d);
            if (t > d) {
              clearInterval(timer);
              t = 0;
            }
            $('.box-group-' + flag)[0].style.left=dis+'px';
            t++;
          }, 10);
          if(flag>8){
            clearInterval(tim)
          }
        },1000)
      });
    })
  </script>
</body>

</html>
```
