# javaScript —— 对象

变量的两种数据类型：`基本类型`和`引用类型`。基本类型值指的是简单的数据段，而引用类型值指那些可能由多个值构成的对象。

>什么意思呢

undefined, number, string, boolean属于简单的值类型，不是对象。剩下的几种情况 ———— 函数、数组、对象、null、new Number(10)都是对象，是引用类型。
判断一个变量是不是对象，值类型的类型判断用typeof，引用类型的类型判断用instanceof。
```js
console.log(typeof x);    // undefined
console.log(typeof 10);   // number
console.log(typeof 'abc'); // string
console.log(typeof true);  // boolean
console.log(typeof function () {});  //function
console.log(typeof [1, 'a', true]);  //object
console.log(typeof { a: 10, b: 20 });  //object
console.log(typeof null);  //object
console.log(typeof new Number(10));  //object
```
typeof的能力只能检查是否是基本类型，如果是对象都会返回object，不管是Array，object，new string()等等。
所以对象的判断要用instanceof
```js
[1,2,3] instanceof Array     //true
[1,2,3] instanceof object    //true
在控制台输出的结果，实例化之后的基本类型，变成了对象
new String("haha")
String {0: "h", 1: "a", 2: "h", 3: "a", length: 4, [[PrimitiveValue]]: "haha"}
String("haha")
"haha"
```
接下来谈谈对象：凡是typeof返回object的都是对象，对象是对象，函数是对象，数组也是对象。对象里面的一切都是属性，只有属性，没有方法。它的属性表示为键值对的形式。
```js
var obj={
  a:10,
  b:function(m){
    alert(this.a+m)
  },
  c:{
    name:"dingjia",
    sex:"男"
  }
}
```
以上代码中，obj是一个自定义的对象，其中a、b、c就是它的属性，而且在c的属性值还是一个对象，它又有name、year两个属性。
至于函数，给函数添加属性用“.”的方式：
```js
var fn=function(){
  alert(100)
}
fn.a=function(a){
  alert(a)
}
fn.b="2"
fn.c={
  name:"dingjia",
  age:22
}
fn.a("haha")  //haha
```
有种似曾相识感，$(selector).show(1000,callback)，typeof $ //function

### 函数和对象
首先，函数是对象
>var fn = function () { };
console.log(fn instanceof Object);  // true

但是，对象都是通过函数创建的
```js
function Fn() {
    this.name = "dingjia";
    this.year = 1994;
}
var fn1 = new Fn();
```
::: tip
至于var obj = { a: 10, b: 20 };
    var arr = [5, 'x', true];
这个是“语法糖”。
var obj = new Object();
        obj.a = 10;
        obj.b = 20;
var arr = new Array();
        arr[0] = 5;
        arr[1] = 'x';
        arr[2] = true;
因此也就验证了上文说的new String()为函数，而string为字符串，因此对象都是由函数创建的
:::
