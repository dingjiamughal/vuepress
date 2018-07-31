# es6

## 解构赋值

### 解构赋值的分类

`数组` 、`对象` 、`字符串` 、`boolean` 、`函数参数` 、`数值`

```js
let a,b,rest;
[a,b,...rest] = [1,2,3,4,5,6]
// a->1 b->2 rest->[3,4,5,6]

let c,d
{{c,d} = {c:1,d:2}}
// c->1 d->2
```

### 应用场景

```js
// 变量交换
let a = 1;
let b = 2;
[a,b] = [b,a]
// a->2 b->1
```

```js
// 数组操作
let arr = [
  [0,{a:1}],
  [1,{a:2,b:2}],
  [3,{a:3,b:3,c:3}]
]

arr.map(([x,y]) => ({...y,"id":x}))

[
  {id:0,a:1},
  {id:1,a:2,b:2},
  {id:1,a:3,b:3,c:3}
]
```

```js
// 对象传递
let obj = {
    a: 1,
    b: 2,
    c: 3
}
const {
    a,
    others
} = {
    ...obj
}

// a -> {b: 2, c: 3}
```

## 数组扩展
新增的数组特性
`from`、`of` <br>
`copyWithin` <br>
`find`、`findIndex` <br>
`fill` <br>
`entries`、`keys`、`values` <br>
`includes`

### Array.of和Array.from

Array.of   把一组数据变量变成数组，可接收多个参数，相当于一个子集 <br>
Array.from 把伪数组转化成数组，第一个参数是数据集，第二个参数是回调方法

```js
Array.of(1,2,'z',3,'a'); //[1,2,'z',3,'a']
Array.from('12z3a'); // ['1','2','z','3','a']
Array.from([1,2,3,4,5],item => item + 1); // [2,3,4,5,6]
Array.from(document.querySelectorAll('P')).forEach... // [node1,node2,node3...]
```

### Array.fill
填充数据

```js
Array(5).fill(0) // [0,0,0,0,0]
['a','b','v'].fill(7,1,3) // ['a',7,7]
```

### Array.keys/values/entries
数组遍历
keys 下标 <br>
values 值 <br>
entries [下标,值]

```js
for(let index of [1,2,3].keys()) { // 0,1,2
    console.log(index)
}
for(let item of ['A','B','C'].values()) { // A,B,C
    console.log(item)
}
for(let [index,item] of [1,2,3].entries()) { // 0 1,1 2,2 3
    console.log(index,item)
}
```

### Array.find/findIndex
find 找到第一个满足条件的项
```js
[1,2,3,4,5,6].find(item => item>3) // 4
[1,2,3,4,5,6].findIndex(item => item>3)
```

### Array.includes
包含值，返回的true/false

```js
[1,2,3].include(1) // true
[1,2,NaN].includes(NaN) // true
```

## 函数扩展
函数的新增特性

`参数默认值`、`rest参数`、`扩展运算符`、`箭头函数`、`this`、`尾调用`

### 参数默认值
可以设定默认值给参数，值得注意的是作用域

```js
let x = 'test';
function fn(x,y=x) {
  console.log(x,y)
}

fn('TEST') // TEST
```

### rest参数
在参数中使用解构
```js
function fn(...arg) {
  console.log(arg)
}

fn('a','b','c') // (3)['a','b','c']
```

### 箭头函数

```js
let fn = v => v+2;
```

### 尾调用

```js
  function tail(x){
    console.log('tail',x);
  }
  function fx(x){
    return tail(x)
  }
  fx(123)
```

## 对象扩展
对象的新增特性

### 简介表达式
es5中对象键和值要写具体，es6只要写键名就行
```js
let o = 1;
let p = 2;
let es5 = {
  o: o,
  p: p,
  fn: function() {}
}

let es6 = {
  o,
  p,
  fn() {}
}
```

### 属性表达式
es6中对象属性值，可以是表达式，用中括号包起来

```js
let a = 'haha';
let es6 = {
  [a]: 'aaa'
}

// { 'haha':'aaa' }
```

### Object新增api

Object.is 等同于 `===`

```js
Object.is('aaa','aaa') // true
Object.is([],[]) // false
```

Object.assign(obj1,obj2) 拷贝自身属性，把后者值赋给前者。不能拷贝枚举和继承属性

```js
let a = {
    a:1,
    b:2,
    c:3
}

let b = {
    a:4,
    d:5
}
Object.assign(a,b); // { a:4,b:2,c:3,d:5 }
// a -> { a:4,b:2,c:3,d:5 }
// b -> { a:4,d:5 }
```

Object.keys/values/entries

```js
let a = {
    a:1,
    b:2,
    c:3
}

Object.keys(a) // ['a','b','c']
Object.values(a) // [1,2,3]
Object.entries(a) // [['a',1],['b',2],['c',3]]

for (let [key.value] of Object.entries(a)) {
    console.log([key,value])
}
```

### 扩展运算符
对象的解构

```js
let a = 1;
let b = 2;
let c = {
  c: 3,
  d: 4
}

let obj = { // {a: 1, b: 2, c: 3, d: 4}
    a,
    b,
    ...c
}
```

## Symbol
Symbol是一种es6新增的数据类型，提供一个独一无二的值

### Symbol 是什么
```js
let a1 = new Symbol();
let a2 = new Symbol();
console.log(a1 === a2); // false  独一无二

let a3 = Symbol.for('aaa');
let a4 = Symbol.for('aaa');
console.log(a3 === a4); // true
```

### Symbol 应用场景
有些时候，定义一个属性名，但害怕名称相同合并之后就被覆盖，使用Symbol命名和原有对象中的属性名不冲突，就可以避免这种情况

```js
  let a1 = Symbol.for('abc');
  let obj = {
    [a1]: '123',
    'abc': 345,
    'c': 456
  };
  console.log(obj); // {abc: 345, c: 456, Symbol(abc): "123"}
```

Symbol用常规遍历（keys、values、entries）取不到，所以`getOwnPropertySymbols`出场了
```js
Object.getOwnPropertySymbols(obj) // [Symbol(abc)] 返回值数组
```
`getOwnPropertySymbols`只能够取到Symbol对象，要想既有常规属性，又有Symbol属性，就要用`Reflect.ownKeys`

```js
Reflect.ownKeys(obj).forEach(key => {
    console.log(key,obj[key]);
})
```

## Set
Set 类似数组，可以把他当数组使用 <br>
<!-- Map 类似对象，可以把他当对象处理，但是key可以是任何的类型 -->

定义方式，Set会做数组的去重
```js
let s = new Set();
s.add(1);
s.add(2);
s.add(1);
// Set {1,2}

new Set([1,2,3,4,3,2,'2']) //Set {1,2,3,4,'2'}
```
### 常规api: `has`、`delete`、`clear`、`add`

```js
let arr = ['has','delete','clear','add'];
let list = new Set(arr);

list.has('delete'); // true
list.delete('add'); // true {'has','delete','clear'}
list.clear();
```

### 遍历 keys/values/entries/forEach
和数组一样使用就行了，数组这四个方法，Set上功能一模一样
```js
let arr = ['has','delete','clear','add'];
let list = new Set(arr);

for (let key of list.keys()) {
    console.log(key);  // 'has', 'delete', 'clear', 'add'
}

for (let value of list.values()) {
    console.log(key);  // 'has', 'delete', 'clear', 'add'
}

for (let [key,value] of list.entries()) {
    console.log(key,value);  // 'has' 'has', 'delete' 'delete', 'clear' 'clear', 'add' 'add'
}

list.forEach(item => {
    sonsole.log(item); // 'has', 'delete', 'clear', 'add'
})

```

### WeakSet
WeakSet 只能存放对象，并且不可以遍历，没有clear方法
```js
let ws = new WeakSet();
ws.add(1) // TypeError: Invalid value used in weak set
ws.add(Symbol()) // TypeError: Invalid value used in weak set
```

## Map
Map 类似对象，可以把他当对象处理，但是key可以是任何的类型

```js
let m = new Map();
let arr = ['123'];
m.set(arr,456);
console.log(m) // {[1,2,3] => 456}
m.get(arr) // 456
```

### 常规api：`get`、`set`、`has`、`delete`、`clear`
```js
let m = new Map([['a',123],['b',456]]); // {'a' => 123,'b' => 456}
m.size // 2
m.delete('a') // m: {'b' => 456}

```
### 遍历 keys/values/entries/forEach

```js
let m = new Map([[1,'a'],[2,'b']]);

for (let key of m.keys()) {
    console.log(key); // 1,2
}

for (let values of m.values()) {
    console.log(value); // 'a','b'
}

for (let [key,value] of m.entries()) {
    console.log(key,value); // 1 'a',2 'b'
}
```

## Map-Set与数组对象横向对比

### Map/Set 与数组的对比

### 增
```js
let m = new Map();
let s = new Set();
m.set('t', 1);
s.add({t: 1});
array.push({t: 1});
```

### 查
```js
let m = new Map(['t', 1]);
let s = new Set({t: 1});
m.has('t');
s.has({t: 1});
array.find(item => item.t);
```

### 改
```js
let m = new Map(['t', 1]);
let s = new Set({t: 1});
m.set('t', 2);
s.forEach(item -> item.t ? item.t = 2: '');
array.forEach(item => item.t ? item.t = 2 : '');
```

### 删
```js
let m = new Map(['t', 1]);
let s = new Set({t: 1});
m.delete('t');
s.forEach(item => item.t ? s.delete(item));
array.findIndex(item => item.t);
array.splice(index, 1);
```

### Map/Set和对象的对比

### 增
```js
let obj = {};
let item = {t: 1};
let m = new Map();
let s = new Set();

m.set('t', 1);
s.add(item);
obj['t'] = 1;
```

### 查
```js
m.has('t');
s.has(item);
't' in obj
```

### 改
```js
m.set('t', 2);
item.t = 2; / s.forEach()
obj['t'] = 2;
```

### 删
```js
m.delete('t');
s.delete(item);
delete obj['t'];
```

数据结构复杂情况：优先使用Map，去重情况下用Set，放弃使用Object和Array。

## Proxy和Reflect

## Class
Class是构造函数的语法糖，语法和构造函数对比
```js
// 构造函数
function Point(x, y) {
    tyis.x = x;
    this.y = y;
}
Point.prototype.toString = () => {
    return `(${this.x},${this.y})`;
}
const p = new Point(1, 2);
```

```js
// Class
let toArray = `toArray`;
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x},${this.y})`;
    }

    // 可以定义成变量
    [toArray]() {
        return Array.from(x,y);
    }
}
const p = new Point(1, 2);
```
`Point.prototype.constructor === Point`

### 不可枚举
```js
Object.keys(Point.prototype) // []
Object.getOwnPropertyNames(Point.prototype) // ['constructor', 'toString']
```

### 私有属性

私有属性，即实例对象无法调用
```js
const bar = Symbol('bar');

class myClass {
    foo() {
        console.log('foo');
    }

    [bar]() {
        console.log('bar');
    }
}

const m = new myClass();
m.foo(); // 'foo'
m.bar(); // undefined
```

## Iterator遍历器
`iterator`是用来处理不同数据结构的。可以让所有数据结构都可以使用for...of循环遍历
```js
let arr = ['a', 'b'];
let map = arr[Symbol.iterator]();
map.next() // { value: "a", done: false }
map.next() // { value: "b", done: false }
map.next() // { value: undefined, done: true }
```
一个数据结构只要有`Symbol.interator`属性，就可以认为是可遍历的iterator，当然原生的类型已经具备了`iterator`的特性，所以可以直接使用for...of：
`Array`
`Map`
`Set`
`String`
`TypedArray`
`函数的 arguments 对象`
`NodeList 对象`

### 为对象添加Iterator
```js
let obj = {
    data: ['hello', 'world'],
    [Symbol.iterator]() {
        const self = this;
        let index = 0;
        return {
            next() {
                if (index < self.data.length) {
                    return {
                        value: self.data[index++],
                        done: false
                    }
                }
                else {
                    return {
                        value: undefined,
                        done: true
                    }
                }
            }
        }
    }
}
```

## Generator
异步编程的解决方案
```js
// generator的基本定义
// generator函数只有在调用next的时候才执行
function* gen() {
    yield 'a';
    yield 'b';
    return 'c';
}
gen(); // gen{}
let g = gen();
g.next();
g.next();
g.next();
```

### generator和iterator的关系
```js
let obj = {};
let fn = function() {
    console.log('yield ctx');
}
obj[Symbol.iterator] = function* () {
    yield 1;
    yield fn();
}
for (let value of obj) {
    console.log(value);
}
console.log([...obj]);
```

### 异步操作
```js
let state = async function() {
    await 'a';
    await 'b';
    await 'c';
}
let status = state();
status.next();
```

### 应用场景
- 前端做限制次数（全局变量影响性能而且不安全）
- 长轮询

```js
// 业务逻辑放一个函数
// 次数控制放generator函数
let count = function(count) {
    console.log(`剩余${count}次`);
    // 一些操作...
}
let residue= function* (count) {
    while (count>0) {
        count --;
    }
    yield count(count);
}
let star = residue(5);
$('button').click(function() {
    star.next();
});
```

```js
let ajax = function* () {
    yield new Promise((resolve,reject) => {
        $.ajax({
            ...,
            success() {
                resolve();
            }
        });
    });
}

let pull = () => {
    let generator = ajax();
    let step = generator.next();
    step.value.then(d => {
        if (!d.xxxxx) {
            setTimeout(() => {
                pull();
            },1000);
        }
        else {
            console.log('end');
        }
    });
}

pull();
```

## 修饰器Decorator
安装一个babel插件`transform-decorators-lagacy`
用于修饰class的行为，即对类的扩展
```js
let readonly = (target, name, desc) {
    desc.writable = false;
    return desc;
}

class Test {
    @readonly
    time() {
        return '2018-7-16';
    }
}
let test = new Test();

console.log(test.time()); // '2018-7-16'

test.time = () => {
    console.log('change');
}
console.log(test.time()); // 报错！
```