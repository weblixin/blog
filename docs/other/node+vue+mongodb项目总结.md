---
title: node+vue+mongodb项目总结
---

# Project-Summary

项目总结

## 前端 vue 部分

> ### 跨域问题
>
> -   `main.js` 文件中 `Axios.defaults.withCredentials=true`
> -   `ajax` 请求中加入： `withCredentials: false`

> ### 代理问题
>
> -   使用代理，将 vue 项目放到后台项目中---在 config/index 中添加代理

```
    proxyTable: {// 代理表
  	// key ： value
  	// 代理的路劲 ： 代理的规则
    	'/api': {
    		target:"http://localhost:3000",// 目标服务器 node后台
    		changeOrigin:true,// 改变服务器的 源
    									//请求的路径           改变后的路径
    		pathRewrite:{'^/api':'/'}// 重写的规则
    	}
    },
```

> ### 路由问题
>
> -   路由中，children 可以使页面在当前页面进行跳转 (但是点击浏览器自带返回按钮，会出现页面跳转，但是导航样式没有发生改变的现象，还有待解决，请谨慎使用)

```html
<el-menu
	class="sliderbar-el-menu"
	:default-active="onRoutes"
	background-color="transprent"
	unique-opened
	router
>
	<template v-for="item in items">
		<el-menu-item :index="item.index" :key="item.index" style="">
			<i :class="item.icon"></i>
			<span slot="title">{{item.title}}</span>
		</el-menu-item>
	</template>
</el-menu>

data() { return { items: [{ icon: "el-icon-tickets", index: "user_center", title: "个人中心" }] };
}, computed:{ onRoutes(){ return this.$route.path.replace('/',''); } }
-----------------------------------------------------------------------------------------------------------------
// routes/index.js { path: '/home', component: Home, meta: { title: '系统首页' }, children: [{ path:
'/adminlist', component: AdminList, meta: { title: '管理员列表' } }, { path: '/message', component:
Message, meta: { title: '客服消息' } } ] }
```

### 组件间的几种传值方式

> -   父传子 ===》

```
      父组件：引入子组件 ---  :value1="value2" --- 引号中的 value2 需要在父组件的 data 中定义 --- value1 是子组件接收的字段;
      子组件：利用 props 接收 value1 字段，使用方式为 this.value1
```

> -   子传父 ===》

```
      父组件：引入子组件 ---  v-on:value1="value2" --- value1 需要在 methods 中定义 --- value2 是子组件传过来的字段;
      子组件：利用 $emit 进行传值，两个参数分别为父组件监听的事件 和 需要传的值，使用方式为 this.$emit('value2', value)
```

> -   非父子 ===》

```
      同级目录下，创建一个bus.js文件，文件内容是暴露一个实例vue对象，在AB组件中引入bus.js
      A组件：bus.$emit('方法', '参数')
      B组件：bus.$on('emit的方法', () => {this.msg = '参数'})
```

> -   使用 vuex ===》

```
     使用vuex，将数据或方法保存在一个js文件中，然后暴露出去，在每个组件中引入该js文件
     state：store.state.datalist     mutations: store.commit('add', data)
```

### 修改当前元素的文本

```html
<div v-for="(item, index) in itemList" :key="index">
	<a v-if="item.attention" v-text="item.content1" @click="item.attention = false"></a>
	<a v-if="!item.attention" v-text="item.content2" @click="item.attention = true"></a>
</div>

data() { return { itemList: [{ imgSrc: '../../assets/original_blog/o_pic.jpg', username: '我是aaa',
attention: true, content1: '已关注', content2: '关注' }, { imgSrc:
'../../assets/original_blog/o_pic.jpg', username: '我是111', attention: false, content1: '已关注',
content2: '关注' }] } }
```

## 后台 node 部分

> ### 跨域问题
>
> -   `app.js` 文件中加入

```javascript
express框架;

app.all('*', function (req, res, next) {
	var oriRefer;
	if (req.headers.referer) {
		oriRefer = req.headers.referer.substring(0, req.headers.referer.indexOf('/', 10));
	}
	res.header('Access-Control-Allow-Origin', oriRefer ? oriRefer : '*');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	res.header('X-Powered-By', ' 3.2.1');
	next();
});

koa2框架;

app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Headers', 'content-type,xfilecategory,xfilename,xfilesize');
	ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
	ctx.set('Access-Control-Allow-Credentials', 'true');
	ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET,OPTIONS');
	await next();
});
```

> ### 文件上传
>
> -   上传文件的模块---multer

```javascript
var multer = require('multer');
var fs = require('fs');

var upload = multer({
	dest: './public/uploads',
});

// 上传单个文件
router.post('/upload', upload.single('imageFile'), function (req, res, next) {
	fs.rename(req.file.path, './public/uploads/' + req.file.filename + '.jpg', function (err) {
		if (err) {
			throw err;
		}
		console.log('上传成功!');
	});
	res.send({ filename: req.file.filename + '.jpg' });
});
```

> ### 关于 options 的错误
>
> -   koa 框架和 vue 组合使用时，vue 提交的请求，无论 get 还是 post，在 network 中都会显示 method 为 options，并且报 404 错误

```javascript
在koa / app.js中的设置请求头的代码中加入;

if (ctx.request.method == 'OPTIONS') {
	ctx.response.status = 200;
}
```

> ### 后台直接渲染 index 页面
>
> -   在后台框架中添加新的路由文件，进行渲染 index 页面
> -   在 vue 的路由文件中，加入相同字段的路由

## 数据库 mongodb 部分

### 自己封装的操作数据库的方法(仅限于采用 mongoose 进行操作数据库)

```javascript
// model.js

var mongoose = require('mongoose');

var DB_URL = require('../config/prof.json').mongodb;

var Schema = mongoose.Schema;

var db = mongoose.createConnection(DB_URL);

var PageSchema = new Schema({
	pagename: String,
	class: String,
	visited: {
		type: String,
		default: '——',
	},
	copied: {
		type: String,
		default: '——',
	},
	createAt: {
		type: Date,
		default: Date.now,
	},
	updateAt: {
		type: Date,
		default: Date.now,
	},
});

var Page = db.model('Page', PageSchema);

module.exports = Page;

// ---------------------------------------------------------------------------------------------------

// db.js

// collections: 数据库的表名称  selector: 条件   callback: 回调函数
var insert = function (collections, selector, callback) {
	var user = new collections(selector);
	user.save(function (err, res) {
		if (err) {
			console.log('Error:' + err);
		} else {
			//console.log("Res:" + res);
			callback(res);
		}
	});
};
var find = function (collections, selector, callback) {
	collections.find(selector, function (err, res) {
		if (err) {
			console.log('Error:' + err);
		} else {
			//console.log("Res:" + res);
			callback(res);
		}
	});
};
var update = function (collections, selector, callback) {
	collections.update(selector[0], selector[1], function (err, res) {
		if (err) {
			console.log('Error:' + err);
		} else {
			//console.log("Res:" + res);
			callback(res);
		}
	});
};
var deletes = function (collections, selector, callback) {
	collections.remove(selector, function (err, res) {
		if (err) {
			console.log('Error:' + err);
		} else {
			//console.log("Res:" + res);
			callback(res);
		}
	});
};
var methodType = {
	insert: insert,
	find: find,
	update: update,
	delete: deletes,
};
module.exports = function (method, collections, selector, callback) {
	methodType[method](collections, selector, callback);
};
```
