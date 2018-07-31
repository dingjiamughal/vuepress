# daily balabala
## babel.options chaining
```js
const obj = {};

// (isExist1) is equal to (isExist2)
const isExist1 = obj.attr && obj.attr.name // undefined
const isExist2 = obj.attr?.name;
```

## async/await instead of Promise
```js
// a basic demo of promise callback
function setData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => { // mock request
            resolve(`i am data~~~`);
        });
    });
}
// callback
// use `then` callback to set data
function getData() {
    setData().then(data => {console.log(data);})
}
getData();

// ---------------- async/await -------------------
// async: state function
// await: get callback result
async function getData() {
    console.log(await setData());
}
getData();
```

## call/apply

call && apply is used to change `this` point

```js
// this situation,this === window
// how give it a scope?
function fn() {
    console.log(this.name);
}

const obj = {
    name: 'dingjia'
}

// now,`this` is point to obj --> (obj.name = dingjia)
// invoke `fn` with `obj`
fn.call(obj); // dingjia
```

another example
```js
// window.name is not defined
function fn(msg) {
    console.log(this.name, msg);
}

class test {
    constructor(name) {
        this.name = name || 'dingjia';
    }

    getName() {
        fn.call(this, msg); // use 'call' to point 'fn' to 'class test'(scoped)
    }
}

let t = new test();
t.getName('msg aaa !'); // 'msg aaa !' 'dingjia'