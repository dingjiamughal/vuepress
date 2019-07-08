# 从前到后搭建blog
总结一下使用express/koa和原生node写接口

## 共同的准备
使用框架/原生，共同准备：
- 关联db
- 输入sql语句得到返回结果

### 连接db
框架的意义只是简便了后端提供前端服务的语法，因此无论使用框架和原生node，都需要做的事情是`数据库读写数据`
```js
const mysql = require('mysql');

// 创建对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dingjia3113',
    port: '3306',
    database: 'myblog'
});

// 开始连接
con.connect();

// 执行sql
con.query(sql, (err, result) => {});
```
以上是执行sql的流程，在执行sql完成的回调中，我们要做的是把结果输出，所以执行sql的操作封装应成promise（略）

### controller
链接上数据库需要sql语句来让他工作，controller模块的作用就是这个。<br>
在controller中完成sql语句的拼接，执行读写db的操作：
```js
const exec = require('db/mysql');

async function getList(author, keyword) {
    const sql = `select * from list where 1=1 and author=${author} and title like '%${keyword}%' order by createTime desc`;

    return await exec(sql);
}
```
现在就从数据库中拿到了想要的json，接下来就得开始完善接口了。

## 使用框架koa/express
上述数据库操作跟是否使用框架，以及框架选型毫不相干，接下来我们就可以使用框架了。<br>
因为像够快梳理完整个项目流程，先用框架(koa)来一遍：

### router
上述流程已经走到拿到json数据，我们可以提供api啦，api的数据结构以这个作为标准：
```js
{
    status: 0,
    data,
    message: ''
}
```
我们需要写这么一个接口，开始吧。<br>
依旧接着上述获取list为例，koa通过`koa-router`这里面请求的方式有`post`和`get`两种选择：
```js
const router = require('koa-router')();
const {getList} = require('controller/blog');

router.prefix('/api/blog');

// get方式
router.get('/list', async (ctx, next) => {
    const author = ctx.query.author || '';
    const keyword = ctx.query.keyword || '';

    const listData = await getList(author, keyword);
    ctx.body = {
        status: 0,
        data: listData,
        message: ''
    };
});
// post方式
router.post('/list', async (ctx, next) => {
    const author = ctx.request.body.author || '';
    const keyword = ctx.request.body.keyword || '';
    ...
});
```
最后一步，注册路由：
```js
const Koa = require('koa');
const app = new Koa();
const blog = require('routes/blog');
app.use(blog.routes(), blog.allowedMethods());

const server = require('http');

server.createServer(app.callback()).listen(3000);
```
以上就是贫穷版的api接口

## 完善细节点

- 拼接sql的时候要判断查询条件有没有
- 将res.end返回数据封装成一个类，success/fail

### 登录方案
每次登录的时候都要在session中保存`session`和`realname`，session会自动保存到redis中
```js
ctx.session.username = data.username;
ctx.session.realname = data.realname;

app.use(
    session({
        // 配置 cookie
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        },
        // 配置 redis
        store: redisStore({
            // all: '127.0.0.1:6379'   // 写死本地的 redis
            all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
        })
    })
);
```
需要用到session来判断是不是登录状态，以及本人操作，比如操作之前要判断是否登录，需要加一层中间件：
```js
module.exports = async (ctx, next) {
    if (ctx.session.username) {
        await next();
        return
    }
    ctx.body = new Error('未登录');
}
```

### 安全
- xss 过滤html
- mysql.escape sql注入危险的语句
- crypto md5密码加密

```js
const xss = require('xss');
xss(title)
```

```js
const crypto = require('crypto')

// 密匙
const SECRET_KEY = 'WJiol_8776#'

// md5 加密
function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

module.exports = {
    genPassword
}
```
