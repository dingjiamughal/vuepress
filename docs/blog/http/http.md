# http

### 创建一个node服务
```js
const http = require("http")
const fs = require("fs")

http.createServer((req,res) => {
  console.log(req.response)
  const html = fs.readFileSync('xxx.html','utf8')
  res.writeHead(200,{
    'Content-type': 'text/html',
    'Access-Control-Allow-Origin':'*'
  })
  res.end(html)
}).listen(8080)
```

### 跨域
