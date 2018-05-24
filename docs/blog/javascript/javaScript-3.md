# javaScript —— 继承

javascript中的继承是通过原型链来体现的

```js
function foo(){};
  foo.prototype.a=100;
  foo.prototype.b=200;
var f1=new foo();
f1.a=10
console.log(f1.a) //10
console.log(f1.b) //200
```

::: tip
以上代码中，f1是Foo函数new出来的对象，f1.a是f1对象的基本属性，f1.b是怎么来的呢？——从Foo.prototype得来，因为f1的__proto__指向的是Foo.prototype访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找，这就是原型链。所以在访问f1.b时，f1的基本属性中没有b，于是沿着__proto__找到了Foo.prototype.b。
:::

>那么我们在实际应用中如何区分一个属性到底是基本的还是从原型中找到的呢？hasOwnProperty

```js
for(var item in f1){
  if(f1.hasOwnProperty(item)){
    console.log(item)       //a
  }
}
```
可以发现只打印出了a，所以说prototype下的属性不是hasOwnProperty。因为hasOwnProperty只存在于Object.prototype，对象的原型链是沿着__proto__这条线走的，因此在查找f1.hasOwnProperty属性时，就会顺着原型链一直查找到Object.prototype。由于所有的对象的原型链都会找到Object.prototype，因此所有的对象都会有Object.prototype的方法。这就是所谓的“继承”。
到此为止，可以体会到js的继承模式，在原型链中查找方法。因此在子类继承父类的情况分为两种：
>1.属性的继承 : 调用父类的构造函数 call
2.方法的继承 : for in :  拷贝继承 (jquery也是采用拷贝继承extend)

#### 属性的继承
```js
function CreatePerson(name,sex){   //父类
	this.name = name;
	this.sex = sex;
}
CreatePerson.prototype.showName = function(){
	alert( this.name );
};
var p1 = new CreatePerson('小明','男');
//p1.showName();

function CreateStar(name,sex,job){  //子类
	CreatePerson.call(this,name,sex);
	this.job = job;
}
```
#### 方法的继承
```js
//CreateStar.prototype = CreatePerson.prototype;

extend( CreateStar.prototype , CreatePerson.prototype );
CreateStar.prototype.showJob = function(){
};
var p2 = new CreateStar('黄晓明','男','演员');
p2.showName();

function extend(obj1,obj2){
	for(var attr in obj2){
		obj1[attr] = obj2[attr];
	}
}
```
值得一提，方法的继承不能够用CreateStar.prototype = CreatePerson.prototype;变量赋值的方式，会影响到父类的prototype，因此封装一个extend函数，把prototype中的属性传给子类

#### 类式继承
```js
//类 : JS是没有类的概念的 , 把JS中的构造函数看做的类
//要做属性和方法继承的时候，要分开继承
function Aaa(){   //父类
	this.name = [1,2,3];
}
Aaa.prototype.showName = function(){
	alert( this.name );
};
function Bbb(){   //子类
	Aaa.call(this);
}
var F = function(){};
F.prototype = Aaa.prototype;
Bbb.prototype = new F();
Bbb.prototype.constructor = Bbb; //修正指向问题

var b1 = new Bbb();
b1.name.push(4);
alert(b1.name)          //[1,2,3,4]
var b2 = new Bbb();
alert( b2.name );       //[1,2,3]
```
