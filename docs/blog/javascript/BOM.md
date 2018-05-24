# BOM

BOM（浏览器对象模型），BOM 的核心对象是window，它表示浏览器的一个实例。
### 一、window对象
### 关于window，使用下列代码可以跨浏览器取得窗口左边和上边的位置。
```js
var leftPos = (typeof window.screenLeft == "number") ?
window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == "number") ?
window.screenTop : window.screenY;
```
确定screenLeft 和screenTop 属性是否存在，如果是（在IE、Safari、Opera 和Chrome 中），则取得这两个属性的值。如果不存在（在Firefox中），则取得screenX和screenY 的值。

### 窗口位置的移动
```
//将窗口移动到屏幕左上角
window.moveTo(0,0);
//将窗向下移动100 像素
window.moveBy(0,100);
//将窗口移动到(200,300)
window.moveTo(200,300);
//将窗口向左移动50 像素
window.moveBy(-50,0);
```
### 窗口大小
分别使用`document.documentElement.clientWidth`和`document.documentElement.clientHeight`的值来确定窗口大小。
窗口大小调整
```
//调整到100×100
window.resizeTo(100, 100);
//调整到200×150
window.resizeBy(100, 50);
//调整到 300×300
window.resizeTo(300, 300);
```
### 导航和打开窗口
```
var mywindow=window.open("http://www.wrox.com/","wroxWindow","height=400,width=400,top=10,left=10,resizable=yes");
mywindow.close();
```
如果有第二个参数，则根据第二个参数的特性，否则按照第三个参数
第三个参数配置项：
```
fullscreen yes或no 表示浏览器窗口是否最大化。仅限IE
height 数值 表示新窗口的高度。不能小于100
left 数值 表示新窗口的左坐标。不能是负值
location yes或no 表示是否在浏览器窗口中显示地址栏。不同浏览器的默认值不同。如果设置为no，地址栏可能会隐藏，也可能会被禁用（取决于浏览器）
menubar yes或no 表示是否在浏览器窗口中显示菜单栏。默认值为no
resizable yes或no 表示是否可以通过拖动浏览器窗口的边框改变其大小。默认值为no
scrollbars yes或no 表示如果内容在视口中显示不下，是否允许滚动。默认值为no
status yes或no 表示是否在浏览器窗口中显示状态栏。默认值为no
toolbar yes或no 表示是否在浏览器窗口中显示工具栏。默认值为no
top 数值 表示新窗口的上坐标。不能是负值
width 数值 表示新窗口的宽度。不能小于100
```
### setInterval和setTimeout
setInterval和setTimeout也属于BOM对象，因为它们都是在window全局下调用。
```
var num = 0;
var max = 10;
var intervalId = null;
function incrementNumber() {
  num++;
//如果执行次数达到了max 设定的值，则取消后续尚未执行的调用
if (num == max) {
  clearInterval(intervalId);
  alert("Done");
  }
}
intervalId = setInterval(incrementNumber, 500);
```
等同
```
var num = 0;
var max = 10;
function incrementNumber() {
  num++;
//如果执行次数达到了max 设定的值，则取消后续尚未执行的调用
if (num < max) {
  setTimeout(incrementNumber, 500);
  }else{
    alert('done')
  }
}
setTimeout(incrementNumber, 500);
```
### 系统对话框alert、confirm和prompt
confirm("are you sure")返回布尔值，确定为true取消为false
prompt("What's your name?","Michael")有个输入框点击ok返回prompt输入框中的值，点击cancel返回null。

## 二、location 对象
