# JavaScript 中的算术运算和数学函数

JavaScript 中的算术运算和数学函数 整理

### 取整
Math.ceil(1.2);向上取整
Math.floor(1.2);向下取整
Math.round(1.2)；四舍五入取整
Math.abs(-1.2);绝对值

### 三角函数
Math.sin(Math.PI/6); 1/2
Math.cos(Math.PI/6); 1/根号3
Math.atan(Math.PI/6);

### 数值比较
Math.max(x,y,z);//返回最大值
Math.min(x,y,z);//返回最小值
Math.random();//生成一个大于等于0小于1.0的随机数
ps. 应用场景Math.max.apply(Array);  

### 算术运算
Math.E//2.718281828459045
Math.sqrt(64);//根号64=>8
Math.pow(2,8);//次方，2的8次方
Math.exp(n);e的n次方
Math.log(n);log e为底n为指数


### 算术方法
8.121.toPrecision(6);//数字长度8.12100
8.121.toFixed(6);//8.121000
parseInt(1.9999); //1
parseInt(1.9999);//1.9999
