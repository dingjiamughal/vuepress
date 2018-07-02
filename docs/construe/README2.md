1. middleware 会在 ssr 中执行吗

会。middleware中的函数，在页面刷新时会在ssr中执行。

2. 举个 vue directive 使用的例子，以显示 vue directive 能给开发带来什么样的便利

自定义指令是能够复用的方法，用来定义dom操作

demo：
```js
let seed = 0;

function createTip(text) {
    seed++;
    let html = `<span class='hover-tip hover-tip-${seed}'>${text}</span>`;
    return html;
}

export default {
    bind(el, binding, vNode) {
        el.addEventListener('mouseover', e => {
            let point = binding.rawName.replace('v-tip', '')
                ? binding.rawName.replace('v-tip.', '')
                : 'right';
            let text = binding.value;
            el.innerHTML += createTip(text);
        });
        el.addEventListener('mouseout', e => {
            let tip = el.querySelector('.hover-tip');
            tip.parentNode.removeChild(tip);
        });
    }
};
```
3. 什么时候 watch $route 会执行

路由跳转的时候，$route中参数变化时执行，而不是页面跳转（手动改url参数）

4. 画一个产品逻辑的流程图，各个页面都有哪些状态（7.2 下班前）
