# requirejs核心解析

如今写一篇requirejs的总结似乎有点过时，就像写一些jQuery的汇总一样，总觉得作为前端行业将要淘汰的技术总会令人排斥。当然jQuery依然是前端最主流的框架之一，requirejs也是如此，如今的新框架和包管理工具飞速更新的时代，离不开模块化的思想，作为鼻祖requirejs，我们有必要去探个究竟。

### 模块化开发
曾经问健友阿汤：
>什么是webpack啊，那东西到底有什么用？还有模块化是什么玩意，有必要么？我们公司超乱，一个页面写一个脚本，好几千行改的我头皮发麻，一拍脑门写了两个click事件都不一定能查得出。
> 用模块化啊，webpack打包不过小公司也不一定用得到，哦不对，是烂公司

通过这个故事，基本能猜得出模块化开发的大概了——减少代码堆积、模块化分工、减少请求优化性能。
模块化开发的思想已经越来越深入，越来越多的前后端交互，ajax技术的广泛使用。如果比如一个页面在加载完成只需要5个请求的支持，那么一次性将文件全部加载完成，那必将是个性能损耗。这时候js单线程的问题就显现了出来，一些script文件非常大，加载时间久会影响到后面文件的加载。
``` js
<script type="text/javascript" src="a.js"></script>
<script type="text/javascript" src="b.js"></script>
<script type="text/javascript" src="c.js"></script>
<script type="text/javascript" src="d.js"></script>
<script type="text/javascript" src="e.js"></script>
<script type="text/javascript" src="f.js"></script>
<script type="text/javascript" src="g.js"></script>
<script type="text/javascript" src="h.js"></script>
<script type="text/javascript" src="i.js"></script>
<script type="text/javascript" src="j.js"></script>
```
如果一个页面需要引用那么多脚本，这样的写法有很大的缺点。首先，加载的时候，浏览器会停止网页渲染，加载文件越多，网页失去响应的时间就会越长；其次，由于js文件之间存在依赖关系，因此必须严格保证加载顺序（比如上例的a.js要在b.js的前面），依赖性最大的模块一定要放到最后加载，当依赖关系很复杂的时候，代码的编写和维护都会变得困难。
其次就是分工开发变得非常困难，如果一个功能很多的页面有多人分工开发，写在同一个js文件中是不可能的，各自开一个js文件，就要多引用n个，如果哪个好人愿意做苦力，比如拉个苦力实习生？将代码合并，这显然非常low，宁愿一个人开发全部也不会有人这么干的。最让人担心的是，变量命名的冲突，可能会有老司机对此不服，用jq啊，变量全写在闭包里，完全不会产生冲突。拜托！闭包很耗内存性能，你想让我的小安卓变成砖？
>那么问题如何解决？

先了解一下模块化的实现机制：
``` js
var module = (function() {
  var m1 = function() {}
  var m2 = function() {}
  return {
    m1: m1,
    m2: m2
  }
})()
```
这个函数暴露了m1和m2两个方法，如果需要对这个函数方法进行改进
``` js
var module = (function(mod) {
  mod.m3 = function() {}
  return mod
})(module)
```

requirejs的作用，不管你有多少js文件，requirejs会让文件之间相互依赖，页面只需要在家一个主js文件和requirejs文件就可以了，没错页面就只加载两个script，其余的都通过依赖的方式进行异步加载。
>什么是依赖？又如何异步？

通过requirejs的源码可以看出，它是动态的对script添加到页面中去
>1.写一个require函数，循环遍历第一个参数数组
2.每一次循环动态创建一个script标签，src="scripts/m/moduleA"
3.把这个script最终appendTo head中去

那样也就能大概明白require的核心原理了，就是任性的一个页面不需要引入那么多脚本，所有别的脚本的引入全部交给一个js来解决。基础的requirejs语法：
``` js
require(["script-1", "script-2"], function(modules) {
});
```
假定主模块依赖jquery、underscore和backbone这三个模块，主js就可以这样写：
``` js
require(['jquery', 'underscore', 'backbone'], function ($, _, Backbone){
　　　　// do something
　　});
```
默认的是，require.js假定这三个模块与主js在同一个目录，文件名分别为jquery.js，underscore.js和backbone.js，然后自动加载。但是如果是不同路径，当然requirejs提供了文件路径的配置。
第一个参数引用的文件（数组形式），第二个参数是引入完成之后的回调，这样最基础的页面引入文件部分就已经完成了。当然requirejs提供了文件路径的配置：
```js
require.config({
  baseUrl: "js/lib",
　paths: {
　　　"jquery": "jquery.min",
　　　"underscore": "underscore.min",
　　　"backbone": "backbone.min"
　 }
});
```
baseUrl是公共部分，path为剩下部分。

### AMD模块的写法
require.js加载的模块，采用AMD规范。也就是说，模块必须按照AMD的规定来写，虽然不那么写也不会有问题。
首先依然回到script-1和script-2的例子中，假如有这个需求：在script-1中引用script-2，并且在主js中调用。那么依旧在主文件中引用script-1.js和script-2.js。
在script-2中，需要暴露一个方法，用define()
```js
define(function(){
	var num=function(x){
		return x
	}
	return {
		num:num
	}
})
```
在script-1中引入script-2，并且暴露一个方法以便主js文件可以接受并使用
```js
define(["moduleB"],function(moduleB) {　　　　
  var add = function(x, y) {
		var num=　moduleB.num("moduleB的参数")　　　　
    return x + y+num;　　　　
  };　　　　
  return {　　　　　　
    add: add　　　　
  };　
});
```
要想使用script-1的add方法：
```js
require(["script-1", "script-2"], function(module1,module2) {
  console.log(module1,module2)
});
```
这时控制台打印出了1中的add方法以及，2中的num方法

### 用promise重写requirejs核心代码
在了解了requirejs的加载模式后——加载完所有模块之后进行回调。requirejs源码中，load方法中判断了加载的模块数量等于模块总数量来判断是否全部加载完毕，如果有文件未加载就不会执行回调，这样的好处是兼容低版本IE，坏处就是太麻烦需要每个模块都加载一遍然后再进行判断。因此这部分的加载回调可以用promise来解决全部加载的问题，但是低版本的IE不兼容，who care呢。
>什么是promise呢？先看个例子

```js
var m1 = new Promise(function(resolve,reject){
  //调用1秒
  window.setTimeout(function(){
    var res = true;
    if(res){
      resolve("m1")
    }else{
      reject("m1");
    }
  },1000);
});
var m2 = new Promise(function(resolve,reject){
  //调用2秒
  window.setTimeout(function(){
    var res = true;
    if(res){
      resolve("m2")
    }else{
      reject("m2");
    }
  },2000);
});
Promise.race([m1,m2]).then(function(res){
  console.log(res)
}).catch(function(err){
  console.error(err)
});
```
es6中promise语法声明了两个promise实例，它接收两个参数，resolve：成功，reject：失败。并在最后用then方法对promise执行之后进行回调。promise有两个方法，race和all，顾名思义race就是竞争，谁先完成谁就先加载，后面的就不加载了，当出现报错时，加载停止，上面的例子为了让加载有个先后，我用了延时器加载。当m1加载完成，m2就不会加载了。all就是一起完成一起加载，同样当出现报错时，加载停止。
现在就可以DIY实现一个requirejs模块加载的脚本了。缕一下思路：
>1.写一个require函数，循环遍历第一个参数数组
2.每一次循环动态创建一个script标签，src="scripts/m/moduleA"
3.把这个script最终appendTo head中去
4.用promise判断加载

```js
var require=(function(){
  var req=function(deps,callback){}
  return req;
  })()
```
搭建框架，符合requirejs核心部分，传入两个参数，deps：数组用来存放所有模块，callback：模块完成之后的回调。接下来我们需要在req函数（主函数）中创建script标签并且用promise对它进行加载，在进行编写前需要先引入一个插件思想settings——默认属性，也就是requirejs中的config默认配置，requirejs暴露config方法，目的是提取一些公共的配置，让代码显得简洁好维护，上文中也介绍过config的一些配置项，那就先从定义config开始吧：
```js
var config = {
  baseUrl : "./",
  scriptType : "text/javascript",
  charset : "utf-8",
  xhtml : false
};
req.config = function(options){
  for(var prop in options){
    config[prop] = options[prop];
  }
}
```
不需要一下子就很明白这些config中的配置项每个都是做什么的，因为源码中用到的远远不止那么多，觉得可以用就可以写出来，用一个全局变量来声明它们，先定义几个常用属性，暴露一个config方法可以自行配置config属性，然后开始创建节点，从最外层开始：
```js
if(deps instanceof Array&&callback instanceof Function){
  for(var i=0;i<deps.length;i++){
    //创建promise对象
  }
}
```
先判断deps是否是数组，并且判断回调是否是个函数类型，遍历deps数组也就是循环所有模块，写到这里觉得可能promise要出场了，在每次循环中创建promise实例，需要弄清楚的一点是，在promise实例中到底要干些什么？
1.promise中完成创建script节点
2.promise中完成加载动作
>整个promise流程完成了呢？需要用promise.all方法全部加载

```js
在for中的操作
var tasks=[“这里放所有promise实例”]
Promise.all(tasks).then(function(res){
  callback(res)
}).catch(function(err){
  console.error(err)
});
```
大致框架完成后，开始完成一个promise的函数：
```js
req.newPromise = function(config,moduleName){
  var head = document.getElementsByTagName('head')[0]
  return new Promise(function(resolve,reject){
    var node = req.createNode(config,moduleName)
    node.addEventListener('load', function(){
      resolve(moduleName);
    }, false);
    node.addEventListener('error', function(){
      reject(moduleName);
    }, false);
    node.src = req.createUrl(config,moduleName)
    head.appendChild(node);
  })
}

req.createUrl = function(config,moduleName){
  return config.baseUrl+moduleName+".js";
}
```
返回一个promise实例，接收两个参数，默认配置：config和模块名：deps[i]，当然load事件的前提是创建完成`script`，`script`中关键属性是路径`src`，因此这里我又封装了一个`createUrl`函数返回完整的`src`
```js
创建节点，此时的node就是完整的script
req.createNode = function (config, moduleName) {
      var node = config.xhtml ?
              document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
              document.createElement('script');
      node.type = config.scriptType || 'text/javascript';
      node.charset = config.charset||'urf-8';
      node.async = true;
      node.setAttribute('data-requiremodule', moduleName);
      return node;
  };
```
在完成核心的创建promise后，就需要回到最初的循环，之前定义的task数组就可以用到了——将newPromise返回的promise对象一个个push到task数组：
```js
tasks.push(req.newPromise(config,deps[i]))
```
over,附上完整版的promiseRequire.js
```js
var require = (function(){
	var req = requirejs = function(deps,callback){
		if(deps instanceof Array&&callback instanceof Function){
			var tasks = [];
			for(var i=0;i<deps.length;i++){
				tasks.push(req.newPromise(config,deps[i]));
			}
			Promise.all(tasks).then(function(res){
				callback(res)
			}).catch(function(err){
				console.error(err)
			});
		}
	}
	var config = {
		baseUrl : "./",
		scriptType : "text/javascript",
		charset : "utf-8",
		xhtml : false
	};
	req.config = function(options){
		for(var prop in options){
			config[prop] = options[prop];
		}
	}
	req.newPromise = function(config,moduleName){
		var head = document.getElementsByTagName('head')[0]
		return new Promise(function(resolve,reject){
			var node = req.createNode(config,moduleName)
			node.addEventListener('load', function(){
				resolve(moduleName);
			}, false);
			node.addEventListener('error', function(){
				reject(moduleName);
			}, false);
			node.src = req.createUrl(config,moduleName)
			head.appendChild(node);
		})
	}
	req.createUrl = function(config,moduleName){
		return config.baseUrl+moduleName+".js";
	}
	req.createNode = function (config, moduleName) {
        var node = config.xhtml ?
                document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
                document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
        node.charset = config.charset||'urf-8';
        node.async = true;
        node.setAttribute('data-requiremodule', moduleName);
        return node;
    };
	return requirejs;
})();
```
调用的方法没有改变，改变的是中间的检查机制，用promise回调在性能方面完胜原生requirejs
