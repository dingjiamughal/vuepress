# js正则表达式

用模式来匹配`字符串`

### 创建正则表达式
- 字面量
```js
/js/
```
- 构造函数
```js
new RegExp()
```

### 正则匹配字符串
```js
var str = 'l love you'
var pattern = /you/ | var pattern = new RegExp("you")

// 正则.api(校验主体)
pattern.test(str) // true
pattern.exec(str) // ['you']
```
字符串除了特殊字符，都可以有

### 修饰符
- i ignoreCase
- g globel
- m multiline
```js
var str = 'l love You'
var pattern = /you/i | var pattern = new RegExp("you","i")
```
