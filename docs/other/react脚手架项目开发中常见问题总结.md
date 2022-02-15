## react 脚手架项目开发中常见问题总结

### 项目如何使用 scss

#### 1、 安装 `sass-loader` 和 `node-sass` 依赖

`npm i node-sass sass-loader --save-dev ` 或者 `cnpm i node-sass sass-loader --save-dev `

#### 2、 修改 react 脚手架中的 webpack 配置

项目目录： **node_modules/react-scripts/config/webpack.config.dev.js**

修改 module 下 rules 的最后一项：

```javascript
{
    exclude: [/\.js$/,/\.html$/,/\.json$/,/\.scss$/],
    loader: require.resolve('file-loader'),
    options: {
        name: 'static/media/[name].[hash:8].[ext]'
    }
},
{
    test:/\.scss$/,
    loaders:['style-loader','css-loader','sass-loader']
}
```

### 项目兼容 IE "<font color="red">promise 未定义</font>"

#### 1、 安装并引入 promise-polyfill

    npm i promise-polyfill --save

在入口文件 index.js 中引入

    import Promise from 'promise-polyfill';

#### 2、 将 Promise 对象添加到 window

```javascript
if (!window.Promise) {
	window.Promise = Promise;
}
```

### 项目兼容 IE9/10

#### 1、 "<font color="red">Map 或 Set 未定义</font>"

在入口文件 index.js 顶部引入 core-js 中的 set 和 map

```javascript
import 'core-js/es/map';
import 'core-js/es/set';

// 如果没有core-js，需要安装依赖
```

#### 2、 "<font color="red">语法错误</font>"

-   安装 react-app-polyfill 依赖

```javascript
npm i react-app-polyfill --save
```

-   在入口文件 index.js 顶部引入

```javascript
import 'react-app-polyfill/ie9'; // 兼容ie9以后版本

// import 'react-app-polyfill/ie11'; 兼容ie11，如果已经兼容ie9，这个可以不引入

import 'react-app-polyfill/stable'; // 如果一部分语言浏览器不支持，可以引入stable
```

### 项目使用 `ant-design` 兼容 `ie9+`

-   `index.html` 增加 `meta` 标签

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
```
