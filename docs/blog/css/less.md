# less

Less 语法以及常用内置函数。
为什么会选择LESS，因为比sass简单，但是既然LESS不能用if语句而sass中可以，那些返回boolen的内置函数的作用何在？待我搞清楚这问题后续再补吧。

### 语法规范
1.变量声明@xxx:10px;
2.混合mixin
```
.border(@box_border:5px){//混合mixin
  border:@box_border solid green;
}
```
3.运算
```
@single:5%;
@double:@single*2+3;
@thrible:@single+@double;
```
4.嵌套
```
.box {
  .box-text {  //嵌套
    font-size: 26px;
    color:red;
  }
    //  &相当于字符串拼接
  &_item {
    padding:10px;
  }  
  &:after{
    content:'box-after';
  }
}
```
5.scope
```
@var: 0;
.class1 {
  @var: 1;
  .class {
    @var: 2;
    three: @var;
    @var: 3;
  }
  one: @var;
}
```
6.extend
```
.box {
  &:extend(.father);//extend  
}
.father {
  color:#ccc;
}
```
7.selectors
```
@selector:.box;
{@selector}{
  ...
}
```
8.方法封装
```
.reset(){
  *{padding:0;margin:0;}
  a{outline:none;}
  ul{list-style:none}
}
//调用
.reset();
```
### 内置函数
### 一、杂项函数
color：解析颜色，string类型
```
color("#ccc");
输出#cccccc
```

convert：将数字从一种单位转换到另一种单位。
转换目标为：
>长度： m, cm, mm, in, pt and pc,
时间： s and ms,
角度： rad, deg, grad and turn.

```
convert(9s, "ms")
convert(14cm, mm)
convert(8, mm) // incompatible unit types
输出
9000ms
140mm
8
```

### 二、列表函数
length：参数由逗号或空格分隔的元素列表，返回值为代表元素个数的数字。
```
@list: "banana", "tomato", "potato", "peach";
n: length(@list);
输出
n:4
```

extract：返回列表中指定位置的元素。
```
@list: apple, pear, coconut, orange;
value: extract(@list, 3);
输出：
value:cocunut
```
### 三、数学函数
ceil floor percentage round sqrt abs
sin asin cos acos tan atan pi
pow mod min max
### 四、类型函数
返回布尔值
isnumber isstring iscolor iskeyword isurl ispixel isem ispercentage isunit
isunit("12px","px");true
isunit("12px","rem");false
### 五、颜色函数
rgb rgba argb hsl hsla hsv hsva
hsl(90,50%,90%)：色相 (hue)、饱和度 (saturation)、亮度 (lightness)
hsv(90,50%,90%)：色相 (hue)、饱和度 (saturation)、色调 (value)
### 六、颜色通道函数
参数：颜色color
hue saturation lightness hsvhue hsvvalue red green blue alpha luma
色相 (hue)、饱和度 (saturation)、亮度 (lightness)、色调 (value)
### 七、颜色操作函数
saturate desaturate lighten darken fadein fadeout fade：参数（color,amount）
spin mix greyscale contrast
```
saturate(hsl(90, 80%, 50%), 20%)
#80ff00 // hsl(90, 100%, 50%)
```
```
desaturate(hsl(90, 80%, 50%), 20%)
#80ff00 // hsl(90, 30%, 50%)
```
```
lighten(hsl(90, 80%, 50%), 20%)
#80ff00 // hsl(90, 50%, 70%)
```
```
darken(hsl(90, 80%, 50%), 20%)
#80ff00 // hsl(90, 30%, 30%)
```
```
fadein(hsla(90, 80%, 50%,0.5), 20%)
// hsla(90, 80%, 50%,0.7)
```
```
fadeout(hsl(90, 80%, 50%,0.5), 20%)
//hsla(90, 30%, 50%,0.3)
```
```
fade(hsl(90, 80%, 50%), 20%)
#80ff00 // hsl(90, 80%, 50%,0.2)
```
