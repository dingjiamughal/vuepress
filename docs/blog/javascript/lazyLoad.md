# 懒加载与节流函数
js性能优化之懒加载，应用场景为页面图片过多，为了减少对后台的请求，只在页面中出现图片的情况对图片进行加载，而未出现的图片不加载。
所谓加载就是赋予正确的图片src属性。

实现懒加载的核心原理就是，图片位置出现在可视区域，给图片加上正确的src
出现图片的场景有两种：页面加载、滚轮往下滚
``` js
var n=0;
function load(){
  var seeHeight=document.documentElement.clientHeight;
  var top=document.documentElement.scrollTop||document.body.scrollTop;
  for(var i=n;i<Imgs.length;i++){
    if(Imgs[i].offsetTop<seeHeight+top){
      if(Imgs[i].getAttribute("src")=="images/loading.gif"){
        Imgs[i].src=Imgs[i].getAttribute("data-src");
      }
      n=i+1;
    }
  }
}
window.onscroll=load;
```
在滚轮往下滚和页面刚刷新的时候运行load函数，load函数中判断了每一张图片位置，再n++表示，按顺序加载完成的图片就不进行再一次检查。
但是并没有到这结束，虽然达到了懒加载效果，如果用户操作失误，当滚轮过快时，页面图片就会毫无停留的加载，因此需要定义加载状态，即延迟n秒加载，当滚轮滚动时，限制加载的时间间隔，于是用到节流函数概念。

### 节流函数 throttle
节流函数作用是自定义控制函数调用的频率，这很符合懒加载的情景，我们希望load函数在滚轮滚动的时候有频率的被调用，而不是没滚1px就会被调用一次，所以需要用闭包来定义函数，并计算内外函数调用时间差。
``` js
function throttle(load,delay,time){
  var startTime=new Date();
  var timer=null;
  return function(){
    var curTime=new Date();
    clearInterval(timer)
    if(curTime-startTime>=time){
      load();
      startTime=curTime;
    }else{
      timer=setTimeout(function(){
        load();
      },delay);
    }
  }
}
window.addEventListener("scroll",throttle(load,500,500),false);
```
函数中传入三个参数，事件函数，延时时间和时间差。最重要的是最后一个参数时间差，我们希望每次onscroll时，触发节流函数，判断在达到time毫秒后再调用load函数，这样会剩下非常多的计算dom的内存。
最后为什么需要延时器呢？
假如我们滚动的很慢，依旧保持着500ms的速率执行load函数，当我们在最后时刻比如在499ms的节点下一张图出现在可视区域，那么感觉一瞬间执行了load函数一样，导致加载不整齐，用户体验会很差。所以当不到500ms，比如在400ms需要立即触发load函数，就需要添加一个延时器，延迟500ms运行load函数，能达到加载的整齐化。
