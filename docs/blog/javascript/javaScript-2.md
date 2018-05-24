# javaScript —— 原型prototype

每个函数都有一个属性叫做prototype。prototype又是一个对象（属性的集合），默认的只有一个叫做constructor的属性，指向这个函数本身。
> function fn(){}; fn.prototype.constructor=fn

可以在自己自定义的方法的prototype中新增自己的属性

```js
function foo(){};
  fn.prototype.name="dingjia"
  fn.prototype.sayname=function(){
    console.log(this.name)
  }
var f=new foo()
```

> prototype有什么用处呢？

```js
$('div').attr('myName', 'dingjia');
以上代码中，$('div')返回的是一个对象，对象——被函数创建的。假设创建这一对象的函数是 myjQuery。它其实是这样实现的。
myjQuery.prototype.attr = function () {
    //……
};
$('div') = new myjQuery();
```

myjQuery()是一个构造函数，通过实例化，这样能够调用原型上的attr方法。

# __proto__

每个对象都有一个隐藏的属性----"__proto__"，这个属性引用了创建这个对象的函数的prototype。即：f.__proto__ === foo.prototype，这里的"__proto__"成为"隐式原型"。 总结成一句话：每个函数function都有一个prototype，即原型。这里再加一句话----每个对象都有一个__proto__，可成为隐式原型。 ![原型链](/img/js-yuanxing.png) 这里

> f.__proto === foo.prototype foo.prototype.__proto __=== Object.prototype Object.prototype.__proto__===null

代表着原型链的查找，一个构造函数中寻找方法的顺序是从内部--->prototype--->Object.prototype 如果觉得底层方法不好，想要修改：

```js
var obj={"a":"aaa","b":"bbb"}
console.log(obj.toString())      //[Object,Object]
var arr=[1,2,3]
console.log(arr.toString())      //[1,2,3]
```

Object和Array的toString()方法不一样。肯定是Array.prototype.toString()方法做了修改。 同理，我也可以自定义一个函数，并自己去修改prototype.toString()方法。

```js
Object.prototype.toString=function(a){
  return a;
}
```

如果这么改，那所有obj类型的对象上的toString方法都会被改变
