# javaScript 原型和闭包
过去一直犹犹豫豫，今天下定决心终于撸完了一遍王福朋的JavaScript的原型系列
总结几点JavaScript中函数作用域，this，闭包等概念

## 执行上下文
首先一个简单例子：
```js
console.log(a);//undefined
var a=10;
console.log(a);//10
```
因此，在JavaScript中声明一个变量，在声明之前是没法获取值的。
同样声明函数，和调用函数，也可以做个对比：
```js
console.log(f);//undefined
var f=function(){}
```
```js
console.log(f)//function f(){}
function f(){}
```
在声明函数和函数表达式输出的又是不一样的内容。所以可以得出结论：函数每被调用一次，都会产生一个新的执行上下文环境。因为不同的调用可能就会有不同的参数。也就是说，函数调用，在全局（不论声明之前还是之后调用）都可以运行。
```js
var a=10;
function f1(){
  console.log(a)
}
function f2(fn){
  var a=20;
  fn()
}
f2(f1)
```
这个例子输出的会是什么呢，答案是10。得出第二点：函数在定义的时候（不是调用的时候），就已经确定了函数体内部自由变量的作用域。
f1在声明的时候作用域中的a=10，那么调用的时候a=20对她不起作用，因为a=20是f2作用域下的，而f1在声明的时候就已经确定了作用域，即f1作用域是f1本身和全局。说以说，函数创建时就有一个作用域，而作用域中变量的值根据执行过程中产生而确定的。确定变量值的依据就是先找自身作用域，再一层层向上级作用域中查找，而不是函数父级。函数父级不等于上级作用域，或者理解为`创建`时的作用域而不是`调用`这也是上面例子所解释的。
所以再看一个例子，很容易就能得出答案：
```js
var a=10;
function f1(){
  var b=20;
  function f2(){
    console.log(a+b)
  }
  return f2
}
var x=f1();
var b=200;
x();      //30
```
抛出了个新问题，当f1多次调用的时候，如何才能改变作用域呢？
详细：http://www.cnblogs.com/wangfupeng1988/p/3989357.html

### 闭包
王老师对闭包总结了两种情况：
1.函数作为返回值
2.函数作为参数传递

### 函数作为返回值
```js
  function f1(){
    var a=10;
    return function f2(b){
      if(b>a){
        console.log(b);
      }
    }
  }
  var a=100;
  var fn=f1();
  fn(15);   //15
```
### 函数作为参数被传递
```js
  var max=10;
  var f3=function(x){
    if(x>max){
      console.log(x)
    }
  }
  (function(y){
    var max=100;
    f(15);
  })(f3)      //15
```
又一次的用到了上文的知识点，作用域，此时的f3在声明时作用域是自己和全局，因此在接下来的自运行函数调用的时候，变量max的值为10。
这是两种形式的闭包函数，我们提到当一个函数被调用完成之后，其执行上下文环境将被销毁，其中的变量也会被同时销毁。
但在有些情况下，函数调用完成之后，其执行上下文环境不会被销毁，这就是闭包。
>什么意思呢？

由于闭包特性为函数嵌套，因此在执行外部函数时，本应该销毁上下文环境，然而内部函数又创建一个独立作用域，内部函数的变量的作用域是外部函数，因此外部函数在执行完成后上下文环境不会被销毁，一旦销毁内部函数中的变量就会undefined。只有在内部函数读完后，上下文环境才会销毁。
下面看一下闭包的应用场景，最常见的就是关于for循环+事件问题：
```js
  var box=document.getElementsByTagName("div");
  for(var i=0;i<box.length;i++){
    box[i].onclick=(function(j){
      return function(){
        console.log(j)
        console.log(this)
      }
    })(i)
  }
```
如果用顺思维的方式去取索引值，会在每次for循环中调用事件，但是事件执行的问题就在声明后需要触发才能调用，然而此时for循环已经在window onload时就执行完成，因此这么写会输出全是length-1。那么闭包就很好的解决这个问题，在创建内部函数时，上下文环境没被销毁，所以一次循环中立即自运行函数，就能将每次的i保存下来，最终返回内部函数，在内部函数执行操作，外部函数只负责接收所有的参数i。

### this
this和之前讨论的上下文环境相反，this的指向确定于函数调用而不是函数声明时，构造函数就是个很好的例子：
```js
function Foo(){
  this.name="dj";
  this.year=1994;
  console.log(this)
}
var f=new Foo();//Foo
Foo();//window
```
this指向的是Foo这个对象，当调用完成时，函数Foo被实例化后this才有指向——new出来的对象。而普通调用时，this指向window，所以函数定义一致this指向完全看调用的方式。
>那么什么情况下this指向有哪些不同呢?

### 对象中函数属性
```js
var obj={
  x:10,
  fn:function(){
    console.log(this);  //object{x:10,fn:undefined}
    console.log(this.x);  //10
  }
}
obj.fn();
```
之前说了，this指向是看函数调用方式，此时，fn函数在obj内部调用，因此this指向obj对象。
```js
var obj={
  x:10,
  fn:function(){
    console.log(this);  //window
    console.log(this.x);  //undefined
  }
}
var a=obj.fn;
a()
```
这种情况是调用的a函数，而a函数就是全局下的fn函数，相当于拷呗了obj的fn函数属性，在全局下调用，那么此时this指向window。

### 函数用call或者apply调用
当一个函数被call和apply调用时，this的值就取传入的对象的值。
```js
var obj={
  x:100
}
var fn=function(){
  console.log(this);//object{x:100}
  console.log(this.x);//100
}
fn.call(obj)
```

既然提到call和apply那就延伸一下这两者的用处和异同点。
call()和apply()都是为了改变函数运行时上下文而存在的，也就是为了改变函数体内部 this 的指向。
```js
function Fn() {}

Fn.prototype = {
    color:'red',
    say:function (a,b,c) {
        alert(this.color,a,b,c);

    }
};

var fn = new Fn();
fn.say();       //red
```
```js
var Fn1 = {
   color:'yellow'
};

var fn = new Fn();
fn.say.call(Fn1);    //yellow
fn.say.apply(Fn1);   //使用apply()方法返回
```
当一个对象(Object)没有这个方法，但是其他的Fn原型里面有这个方法，我们可以借助call或apply用其它对象的方法来操作。

### call和apply的区别
虽然call和apply方法都可以改变this指向，将前面的属性或方法传递给括号中的对象。但是他们可传递参数不同。call只能传递字符串，apply可以传递数组。
```js
fn.say.call(Fn1,1,2,3)
fn.say.apply(Fn1,[1,2,3])
```

### 普通调用
在全局下的this===window，在普通调用时函数内部的this也是指向window(因为在全局调用)，如一开始的例子：
```js
function Foo(){
  console.log(this);
}
Foo();
```
```js
var obj={
  x:10,
  fn:function(){
    function f(){
      console.log(this)//window
      console.log(this.x)//undefined
    };
    f();
  }
}
obj.fn();
```
这个例子很特殊，很容易产生误解，认为f函数调用的时候实在obj内部因此this指向obj。但结果this===window，但是仔细发现，在f调用时内部函数并没有生效，当外部fn调用时才生效，因此依旧是全局下fn调用时this指向才生效，是window。
