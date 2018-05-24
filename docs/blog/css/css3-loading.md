# CSS3 loading

最近在整理UI元素，顺带将一些常用的效果记录下来。

### wifi特效
![wifi特效](http://images0.cnblogs.com/blog/694143/201507/051338215948426.gif)
```html
<div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
</div>
```
```css
.loading{
            width: 80px;
            height: 40px;
            margin: 0 auto;
            margin-top:100px;
        }
        .loading span{
            display: inline-block;
            width: 8px;
            height: 100%;
            border-radius: 4px;
            background: lightgreen;
            -webkit-animation: load 1s ease infinite;
        }
        @-webkit-keyframes load{
            0%{
                height: 40px;
                background: lightgreen;
            }
            50%{
                height: 70px;
                margin: -15px 0;
                background: lightblue;
            }
            100%{
              height: 40px;
              background: lightgreen;
            }
        }
        .loading span:nth-child(2){
            -webkit-animation-delay:0.2s;
        }
        .loading span:nth-child(3){
            -webkit-animation-delay:0.4s;
        }
        .loading span:nth-child(4){
            -webkit-animation-delay:0.6s;
        }
        .loading span:nth-child(5){
            -webkit-animation-delay:0.8s;
        }
```

### Bounce
![Bounce](http://images0.cnblogs.com/blog/694143/201507/051338247171409.gif)
```html
<div class="spinner">
  <div class="bounce1"></div>
  <div class="bounce2"></div>
  <div class="bounce3"></div>
</div>
```
```css
.spinner {
  margin: 100px auto 0;
  width: 70px;
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: #333;
  border-radius: 100%;
  display: inline-block;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
}
```

### sk-circle
![sk-circle](http://images0.cnblogs.com/blog/694143/201507/051338306571390.gif)
```html
<div class="sk-circle">
  <div class="sk-circle1 sk-child"></div>
  <div class="sk-circle2 sk-child"></div>
  <div class="sk-circle3 sk-child"></div>
  <div class="sk-circle4 sk-child"></div>
  <div class="sk-circle5 sk-child"></div>
  <div class="sk-circle6 sk-child"></div>
  <div class="sk-circle7 sk-child"></div>
  <div class="sk-circle8 sk-child"></div>
  <div class="sk-circle9 sk-child"></div>
  <div class="sk-circle10 sk-child"></div>
  <div class="sk-circle11 sk-child"></div>
  <div class="sk-circle12 sk-child"></div>
</div>
```
```css
.sk-circle {
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
}
.sk-circle .sk-child {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.sk-circle .sk-child:before {
  content: '';
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: #333;
  border-radius: 100%;
  animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
}
.sk-circle .sk-circle2 {
          transform: rotate(30deg);
        }
.sk-circle .sk-circle3 {
          transform: rotate(60deg);
        }
.sk-circle .sk-circle4 {
          transform: rotate(90deg);
         }
.sk-circle .sk-circle5 {
          transform: rotate(120deg);
        }
.sk-circle .sk-circle6 {
          transform: rotate(150deg);
         }
.sk-circle .sk-circle7 {
          transform: rotate(180deg);
         }
.sk-circle .sk-circle8 {
          transform: rotate(210deg);
        }
.sk-circle .sk-circle9 {
          transform: rotate(240deg);
         }
.sk-circle .sk-circle10 {
          transform: rotate(270deg);
        }
.sk-circle .sk-circle11 {
          transform: rotate(300deg);
        }
.sk-circle .sk-circle12 {
          transform: rotate(330deg);
        }
.sk-circle .sk-circle2:before {
          animation-delay: -1.1s;
         }
.sk-circle .sk-circle3:before {
          animation-delay: -1s;
        }
.sk-circle .sk-circle4:before {
          animation-delay: -0.9s;
        }
.sk-circle .sk-circle5:before {
          animation-delay: -0.8s;
         }
.sk-circle .sk-circle6:before {
          animation-delay: -0.7s;
        }
.sk-circle .sk-circle7:before {
          animation-delay: -0.6s;
         }
.sk-circle .sk-circle8:before {
          animation-delay: -0.5s;
        }
.sk-circle .sk-circle9:before {
          animation-delay: -0.4s;
        }
.sk-circle .sk-circle10:before {
          animation-delay: -0.3s;
        }
.sk-circle .sk-circle11:before {
          animation-delay: -0.2s;
        }
.sk-circle .sk-circle12:before {
          animation-delay: -0.1s;
        }


@keyframes sk-circleBounceDelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
            transform: scale(0);
  } 40% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
```

### cube
```html
<div class="spinner">
  <div class="cube1"></div>
  <div class="cube2"></div>
</div>
```
```css
.spinner {
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
}

.cube1,.cube2 {
  background-color: #333;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;
  animation: sk-cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  animation-delay: -0.9s;
}

@-webkit-keyframes sk-cubemove {
  25% {
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5)
  }
  50% {
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg)
  }
  75% {
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5)
  }
  100% {
    -webkit-transform: rotate(-360deg)
  }
}

@keyframes sk-cubemove {
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  }
  100% {
    transform: rotate(-360deg);
  }
}
```
