# es6类和对象及应用

## 基本概念

### 定义构造函数

es6来定义类相比es5的构造函数+原型写法是非常简洁的，看一个简单的es6定义类和实例
```js
class Parent {
  constructor(name = 'parent'){ // 定义构造函数
    this.name = name;
  }
}

const parent = new Parent('parent~~')
console.log(parent.name) // parent~~
```

在`class`类中定义构造器`construtor`，相当于es5的构造函数

### 类继承
```js
class Child extends Parent{
  constructor(name = 'child') {
    super(name)
    this.type = '222'
  }
}

const child = new Child()
console.log(child.name) // child
```
相比es5中的n种继承模式，es6无疑是非常的简洁，需要注意的是`super改变父类变量必须声明在constructor下的第一条`

### getter和setter
我们会在mvvm框架中看到这种设计模式，getter和setter分别监听到类下某个属性的的变化
```js
class Parent{
  constructor(name = 'parent'){
    this.name = name;
  }

  get longName() {
    return 'longname' + this.name
  }

  set longName(value) {
    this.name = value;
  }
}

const parent = new Parent();
console.log('getter',parent.longName);

parent.longName='hello';
console.log('setter',parent);
```

### 静态方法和静态属性
```js
class Parent {
  constructor(name = 'parent'){
    this.name = name;
  }

  static tell() {
    console.log('tell');
  }
}

Parent.type='test';

Parent.tell();
console.log('静态属性', Parent.type)
```
这个相当于es5构造函数上的原型方法和属性

## 应用场景

### 工具函数的封装
截取[js工具函数 Array](https://github.com/cd-dongzi/utils/blob/master/js/array.js)中的一段
```js
class ArrayFn {
    /*判断一个元素是否在数组中*/
    contains (arr, val) {
        return arr.indexOf(val) != -1 ? true : false;
    }

    /*求两个集合的交集*/
    intersect (arr1, arr2) {
      return this.map(arr1, item => {
          return this.contains(arr2, item) ? item : null;
        });
      }
}

export default Base
```
如此，完成了一种面向对象的封装方式
