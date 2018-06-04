# 在vue中使用jsx
写vue组件不仅仅可以使用template的形式，还可以在render函数中使用jsx语法，会让组件可扩展性变得非常强。<br>
首先，安装`babel-loader`的plugin`babel-plugin-transform-vue-jsx`<br>
然后，在`.babelrc`文件中编写规则
``` json
{
  "presets": ["es2015"],
  "plugins": ["transform-vue-jsx"]
}
```

### render函数

```js
render() {
  return (
    <div>{ this.data }</div>
  )
}
```
