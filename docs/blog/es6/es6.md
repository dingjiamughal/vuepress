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

- Object.is 等同于 `===`

```js
Object.is('aaa','aaa') // true
Object.is([],[]) // false
```

- Object.assign(obj1,obj2) 拷贝自身属性，把后者值赋给前者。不能拷贝枚举和继承属性

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

- Object.keys/values/entries

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

## Map-Set与数组对象横向对比

### Map和数组的对比

#### 增
```js
let m = new Map();
m.set('t', 1);
array.push({t: 1});
```

#### 查
```js
let m = new Map(['t', 1]);
m.has('t');
array.find(item => item.t);
```

#### 改
```js
let m = new Map(['t', 1]);
m.set('t', 2);
array.forEach(item => item.t ? item.t = 2 : '');
```

#### 删
```js
map.delete('t');
array.findIndex(item => item.t);
array.splice(index, 1);
```

### Set和数组的对比
