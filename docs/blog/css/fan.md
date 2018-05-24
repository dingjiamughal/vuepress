# HTML5 折扇

代码地址：https://github.com/dingjiamughal/h5-group/tree/master/fan
效果演示：http://www.xhrsama.com/h5-group/fan/index.html

### css3
transform-origin:50% 50%;       旋转中心（x,y）
transition: all 300ms linear;   
transform: rotate(0deg);
backface-visibility: hidden;    锯齿效果
background-clip:text;           背景把text的背景包住
background: linear-gradient(135deg, #dddddd 0%, #58535e 48%, #889396 100%);  渐变

### js
var state = pagecont.dataset.state;
标记状态，等同于setAttribute("data-state",1)但是不兼容IE10，可以换个方式
``` js
window.onload = function() {
  var pagecont = document.getElementById("pagecont");
  var page = pagecont.getElementsByTagName("div");
  var deg = 0;

  for (var i = 0; i < page.length; i++) {
    page[i].index = i;
    page[i].onclick = function() {
      var state = pagecont.dataset.state;
      var len = page.length - 1;
			 //判断是不是点击的最后一个元素
      for (var i = 0; i <= len; i++) {
        if (this.index == len) {
          if (!state) {
            pagecont.dataset.state = 1;
            deg = i * 15 - Math.ceil(len / 2 * 15);
          } else {
            delete pagecont.dataset.state;
            deg = 0;
          }
        } else {
          pagecont.dataset.state = 1;
          if (i < this.index) {
            //如果循环的值i < 当前点击元素的索引this.index
            deg = -(this.index - i) * 15;
          } else if (i == this.index) {
            deg = 0;
          } else if (i > this.index) {
            deg = (i - this.index) * 15 + 20;
          }
        }
        page[i].style.cssText = '-webkit-transform:rotate(' + deg + 'deg); -moz-transform:rotate(' + deg + 'deg); -o-transform:rotate(' + deg + 'deg); -ms-transform:rotate(' + deg + 'deg); transform:rotate(' + deg + 'deg);';
      }
    }
  }
};

```
