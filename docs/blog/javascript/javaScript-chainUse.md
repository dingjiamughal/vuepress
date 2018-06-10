# 简述链式调用
链式调用的关键是`return this`，但是不是封装一个函数在里面写上`return this`就可以链式调用了呢？当然不行，其实链式调用并不是因为`return this` 看个例子

```js
var fn1 = function () {
        console.log("fn1:"+this);
        return this;
    }
var fn2 = function () {
        console.log("fn2:"+this);
        return this;
    }
var fn3 = function () {
        console.log("fn3:" + this);
        return this;
    }
var fn4 = function () {
        console.log("fn4:" + this);
        return this;
    };
var a = {
    fn1: fn1,
    fn2: fn2
};
var b = {
    fn3: fn3,
    fn4: fn4
};
fn1().fn2();//fn1:window fn2:window
a.fn1().fn2();//fn1:a fn2:a
b.fn3().fn4();//fn3:b fn3:b
a.fn1().fn2().fn3().fn4();//fn1:a fn2:a 报错a.fn1(...).fn2(...).fn3 is not a function
```

调用f1,f2,f3,f4时，此时他们都是构造函数，this指向window 当定义一个空对象，将函数作为方法放进对象中，this的指向就会改变，但是由于a中只有f1和f2，所以在进行到f3时this指向window，就不被a执行发生报错。其实链式调用的原理，就是返回下一个要被调用函数的父级，由此可见并不是return this那么简单 为了理解`返回下一个要被调用函数的父级`：

```js
var c = {
    fn5: function () {
        console.log("fn5:" + this);
        return d;
    }
},
d = {
    fn6: function () {
        console.log("fn6" + this);
        return c;
    }
};
c.fn5().fn6().fn5().fn6();//fn5:c fn6:d fn5:c fn6:d
d.fn6().fn5().fn6().fn5();//fn6:d fn5:c fn6:d fn5:c
d.fn5().fn6().fn5().fn6();//d.fn5 is not a function(…)
```

并没有return this，只要调用的方法指向父级即可

> 那么jquery又是如何实现链式调用的呢

```js
//声明一个空的构造函数
function Factory() {};
//构造函数的原型
Factory.prototype = {
    fn7: function () {
        console.log("fn7:" + this);
        return this;
    },
    fn8: function () {
        console.log("fn8:" + this);
        return this;
    },
    fn9: function () {
        console.log("fn9:" + this);
        return this;
    }
};
//构造函数的实例
var fac = new Factory();
fac.fn7().fn8().fn9();//fn7:fac fn8:fac fn9:fac
```
