# ECAMScript5中新增数组方法

ES5中，Array新增API之forEach、filter、map、reduce、reduceRight、every、indexOf、lastIndexOf

### forEach
forEach(callback[,thisArg])

示例：
Array.forEach(function(item, index, array){
    回调函数内容
}, args);
item指遍历数组的当前元素，index指当前元素的索引，array指数组本身，默认情况下this指向Window对象。当存在第二个参数args时，this指向args。

### filter
对原数组进行过滤（筛选）
filter(callback[,thisArg])

示例：
Array.filter(function(item, index, array){
    回调函数内容
}, args);
filter，返回过滤完成的数组，不会改变原数组
[1,2,3,4,5,6].filter(function(v){ return v<5 }); //[1,2,3,4]  a=[1,2,3,4,5,6]

### map
对原数组进行更改（变形）
map(callback[,thisArg])

//简单示例
Array.map(function(item, index, array){
    回调函数内容
}, args);
[1,2,3,4,5,6].map(function(v){ return v<5 }) //true,true,true,true,false,false
[1,2,3,4,5,6].map(function(v){ return v*v }) //1,4,9,16,25,36

### reduce和reduceRight
数组组合生成单个词
reduce(callback[,initialValue])

示例：
arr.reduce(function (previousValue, item, index, Array) {
   return previousValue + item;    //表示前val+后val
});
var a = [1, 2, 3, 4, 5, 6];
var b=a.reduce(function(x,y) { return x+y }); //21

reduceRight(callback[,initialValue])
示例：
arr.reduceRight(function (previousValue, item, index, Array) {
    return previousValue + item;    
});
和reduce一样，计算机制从右边开始

### some和every
对数组的逻辑判断，返回boolen值
every(callback, thisArg);

示例：
arr.every(function(item, index, array){ return item > xx });
[1,2,3,4,5,6].some(function(v){ return v<4 }) //true 存在value<4
[1,2,3,4,5,6].every(function(v){ return v<4 }) //false 不是every value<4

### indexOf和lastIndexOf
arr.indexOf(searchElement, fromIndex);

示例：
Array.indexOf("sth");           //1（数组的第二个元素）
[1,2,3].indexOf(4);             //-1（未找到，注意，-1不是false，隐式转换后他的值为true）
[1,2,3].indexOf(1);             //0（返回1出现的下标）
[1,2,3,1,2,3].lastIndexOf(2)    //1（从右边起第一个出现2的下标）
