## bind，call，apply 的异同点

### 相同点

bind，call，apply 都可以改变 this 的指向，且第一个参数都是 this 要指向的对象，即指定的上下文(上下文就是指调用函数的那个对象)

### 不同点

-   bind
    -   返回的是一个函数，需要调用执行
    -   参数从第二个起，为传给调用函数的参数，用逗号隔开一次排列
-   call
    -   Function 对象的方法, 每个函数都能调用，且调用以后立即执行
    -   同 bind 第二条
-   apply
    -   同 call 第一条
    -   第二个参数为一个数组，调用函数的参数需要将所有的参数拼成一个数组

### 实际开发中的使用

-   bind
    -   react 开发组件时，经常会遇到 this 指向问题，可以采用在组件的 constructor 属性中绑定 this
-   call
    -   验证数据类型

```javascript
function checkDataType(obj) {
	if (Object.prototype.toString.call(obj) === '[object Array]') return 'Array';
	if (Object.prototype.toString.call(obj) === '[object Object]') return 'Object';
	if (Object.prototype.toString.call(obj) === '[object Function]') return 'Function';
	if (Object.prototype.toString.call(obj) === '[object String]') return 'String';
	if (Object.prototype.toString.call(obj) === '[object Number]') return 'Number';
	if (Object.prototype.toString.call(obj) === '[object Boolean]') return 'Boolean';
	if (Object.prototype.toString.call(obj) === '[object Symbol]') return 'Symbol';
	if (Object.prototype.toString.call(obj) === '[object Undefined]') return 'Undefined';
	if (Object.prototype.toString.call(obj) === '[object Date]') return 'Date';
	if (Object.prototype.toString.call(obj) === '[object Math]') return 'Math';
	if (Object.prototype.toString.call(obj) === '[object Set]') return 'Set';
	if (Object.prototype.toString.call(obj) === '[object Map]') return 'Map';
}
```

-   apply
    -   实现构造函数的继承（call 方法也可以）

### 参考文章

<a href="https://www.runoob.com/w3cnote/js-call-apply-bind.html">菜鸟教程：JavaScript 中 call()、apply()、bind() 的用法</a>
