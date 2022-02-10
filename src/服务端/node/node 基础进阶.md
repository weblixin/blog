# node 基础进阶

_参考文章：_

-   [「万字整理 」这里有一份 Node.js 入门指南和实践,请注意查收 ❤️](https://juejin.im/post/6844904029219192839)
-   [理解 nodeJS 中的 buffer，stream](https://www.cnblogs.com/zhangmao/p/12180956.html)

## 前言

### 什么是 NodeJS

JavaScript 是一种脚本语言，需要解析器才能运行。对于 Html 页面来说，浏览器就是一个解析 js 的解析器。那么对于不在浏览器中执行的 js 脚本，nodeJS 就充当了解析器的角色。

而有解析器就需要引擎。NodeJS 采用的是谷歌的 V8 引擎。

因此，NodeJS 就是一个基于谷歌 V8 引擎的解析器或者说是运行环境。

### NodeJS 的特点

-   异步 I/O
-   单线程
-   事件驱动

## NodeJS 的十二个基础核心模块(dns 没有理解)

-   events
-   path
-   fs
-   process
-   http
-   url
-   zlib
-   stream
-   readline
-   queryString
-   module
-   buffer

##

```math
1. events
```

> NodeJS 采用了事件驱动，非阻塞 I/O 的模型，使其更加高效

events 模块是 NodeJs 事件驱动的核心，提供了 EventEmitter 对象，实现了事件触发与事件监听的功能，本质是一个观察者模式的实现。

```
// 事件监听 / 事件绑定
eventEmitter.on('data', function(chunk) {
    console.log(chunk)
})

// 事件触发
eventEmitter.emit('data', "我是传递的数据")
```

```math
2. path
```

> path 模块用户处理文件路径和目录路径

```
const paht = require('path');

// 1. 获取绝对绝对路径
path.dirname("path/file");

// 2. 获取文件的扩展名
path.extname("path/file");

// 3. 判断文件路径是否为绝对路径
path.isAbsolute("path/file");

// 4. 拼接路径片段
path.join("/path", 'example', 'filename');

// 5. 将路径或路径片段的序列解析为绝对路径
path.resolve('/path/example', './example')

// 6. 规范化路径
path.normalize()

// 7. 解析路径
path.parse();   // 返回一个路径的对象

// 8. 序列化路径
path.format()   // 将一个路径对象序列化

// 9. 获取 from 到 to 的相对路径
path.relative('from_path', 'to_path')

```

```math
3. fs
```

fs 模块是对文件或者文件夹的增删改查

-   读取文件

```
fs.readFile() / fs.readFileSync() =
```

```
let stream = fs.createReadStream();

stream.on('data', function(chunk) {
  console.log(chunk)
})
```

-   写入/修改文件

```
// 文件不存在在创建，存在则覆盖
fs.writeFile() / fs.writeFileSync()
```

```
let ws = createWriteStream();

ws.write("content");

ws.end();
```

-   删除文件、文件夹

```
// 删除文件
fs.unlink() / fs.unlinkSync

// 删除文件夹
fs.rmdir() / fs.rmdirSync()
```

-   新建文件夹

```
fs.mkdir() / fs.mkdirSync()
```

-   重命名文件、文件夹

```
fs.rename() / fs.renameSync()
```

-   复制文件、文件夹

```
fs.copyFile() / fs.copyFileSync()
```

-   文件、文件夹状态

```
fs.stat() / fs.statSync()
```

```math
4. process
```

> process 是 NodeJS 提供的一个全局对象，你可以在任意位置使用，且无需引入。 process 也是 EventEmitter 的一个实例，也会继承相应的方法

-   process.nextTick()
    > NodeJS 微任务

process.nextTick() 是用来延迟回调的方法，将回调函数以参数的形式传进去，然后将该方法延迟到延迟到时间循环的下一次循环中，比 setTimeout(fn, 0)效率高。

-   process.env

    > process.env 会返回包含用户环境的对象

-   process.stdout
    > console.log() 依靠该方法实现
-   process.stderr
    > console.error() 依靠该方法实现

```math
5. http
```

> http 模块是 NodeJS 中非常重要的一个模块。它既可以依靠 http.createServer() 创建一个服务器，也可以依靠 http.request() 创建一个客户端

```
let server = http.createServer((req, res) => {
    console.log(req, res)
});

server.listen(3001)
```

```math
6. url
```

> Node 中用来处理和解析 url 的模块

```math
7. zlib
```

> 在流传输过程中，为了提高传输速率，一般会对流进行压缩

```
// 浏览器发送给服务器的参数，注明了支持的解压类型
Accept-Encoding: gzip, defalte

// 服务器返回给浏览器，压缩数据的格式
Content-Encoding: gzip
```

```math
8. stream
```

-   pipe 事件
    > 数据流的管道

```math
9. readline
```

> readline 模块是一个流内容的逐行读取模块,可以用来逐行读取文件流，也可用它来在控制台和用户进行一些交互。

```math
10. querystring
```

> querystring 模块是 NodeJS 中的工具模块之一，用于处理 URL 中的查询字符串。查询字符串指：URL 字符串中，从问号"?"(不包括?)开始到锚点"#"或者到 URL 字符串的结束（存在#，则到＃结束，不存在则到 URL 字符串结束）的部分叫做查询字符串。 querystring 模块可将 URL 查询字符串解析为对象，或将对象序列化为查询字符串。

```math
11. module
```

> Node.js 实现了一个简单的模块加载系统。一个文件就是一个模块。

-   模块加载

```
// a.js
module.exports = name => {
    return {
        name
    }
};

// b.js
let moduleA = require("./a.js");
conosle.log(moduleA("我是name")
```

-   访问主模块
    > require.mail.filename()
-   解析模块路径
    > require.resolve('path/file')
-   模块缓存
    > 1. 模块在第一次加载后会被缓存到 require.cache 对象中
    > 2. 从此对象中删除键值对将会导致下一次 require 重新加载被删除的模块。
-   循环依赖
    > 1. 对于两个相互依赖的文件，不会出现无限循环加载依赖的问题。
    > 2. a.js 会返回一个 unfinished copy 给 b.js。然后 b.js 就会停止加载，并将其 exports 对象返回给 a.js 模块。
-   文件模块

    > 1. 当加载文件模块时，如果按文件名查找未找到。那么 Node.js 会尝试添加.js 和.json 的扩展名，并再次尝试查找。如果仍未找到，那么会添加.node 扩展名再次尝试查找。
    > 2. 当加载的文件模块使用'/'前缀时，则表示绝对路径。如，require('/home/index.js')会加载/home/index.js 文件。
    > 3. 而使用'./'前缀时，表示相对路径。如，在 index.js 中 require('./index')引用时，index.js 必须在相同的目录下才能加载成功。
    > 4. 当没有'/'或'./'前缀时，所引用的模块必须是“核心模块”或是 node_modules 中的模块。
    > 5. 如果所加载的模块不存在，require()会抛出一个 code 属性为'MODULE_NOT_FOUND'的错误。

-   \_\_dirname
    > 当前模块的目录名。 与 \_\_filename 的 path.dirname() 相同。
-   module 对象
    -   module.children
        > 查看当前模块引入的所有模块对象
    -   module.exports
        > module.exports 通过模块系统创建
    -   exports
        > exports 可以做为 module.exports 的一个引用。和任何变量一样，如果为它分配新值，其旧值将会失效

```math
12. buffer
```

-   Buffer 的由来

    > -   JavaScript 语言没有读取或操作二进制数据流的机制。
    > -   Buffer 类被引入作为 Node.js API 的一部分，使其可以在 TCP 流或文件系统操作等场景中处理二进制数据流。

-   Buffer 的作用

    > 它是一个我们在读取、操作流时的缓冲器，用于存储等待操作或者读取的流文件

-   Buffer 的使用
    > -   在我们读取或者操作流时，node 会自动为我们创建 buffer
    > -   我们也可以自己根据不同的而需求，来创建缓冲器
