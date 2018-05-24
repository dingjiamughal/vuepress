# CSS居中解决方案
### 前言

44年前我们把人送上月球，但在CSS中我们仍然不能很好实现垂直居中——James Anderson。
不同场景下的垂直居中折磨了我那么久，今天决定系统的整理一下CSS水平居中和垂直居中，参考文章 [路易斯的博客](http://louiszhai.github.io/2016/03/12/css-center/) 和 [w3cplus大漠](http://www.w3cplus.com/css3/css-secrets/vertical-centering.html)


### 一、元素固定宽高
```
<main>
    <h1>Am I centered yet?</h1>
    <p>Center me, please!</p>
</main>

main {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -3em; /* 6/2 = 3 */
  margin-left: -9em; /* 18/2 = 9 */
  width: 18em;
  height: 6em;
}
```

### 二、大小不固定，多行文字的垂直居中
#### 1.单行文字
将line-height值与外部标签盒子的高度值设置成一致

``` css
height:3em;
line-height:3em;
```

### 2.多行文字
``` css
div{
  display:table-cell;
  width:550px;
  height:1.14em;
  vertical-align:middle;
}
span{
  display:inline-block;
  font-size:0.1em;
  vertical-align:middle;
}
```

>1.外部div不能使用浮动；
2.外部div高度和文字大小比例1.14为宜；
3.内部标签的vertical-align:middle可以省略，但是外部div高度和文字大小比例要修改，高度比字体1.5左右的样子
### 三、大小不固定，图片的水平垂直居中
```
div {
  display:table-cell;
  width:144px;
  height:144px;
  font-size:118px;
  text-align:center;
  vertical-align:middle;
}
img{
  max-height:100%;
  max-width:100%;
  vertical-align:middle;
}
```
### 四、大小固定，图片的水平垂直居中
```
div {
  width:400px;
  height:400px;
  display:flex;
  align-items:center;
  justify-content: center;
}
img{
  max-height:100%;
  max-width:100%;
}
```
