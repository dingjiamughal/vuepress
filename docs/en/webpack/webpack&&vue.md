# webpack和vue

### vue-cli
```js
npm install vue-cli -g
vue init webpack projectName
```

vue-cli中也采用生产环境和开发环境打包方式，通过判断`process.env`环境变量参数
提取了一些单独配置参数在`config/index`中可供修改
