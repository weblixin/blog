## 面向对象三大特性——多态

多态通俗的讲就是一个接口多种实现方法，有时在程序设定之初，肯能会根据程序需求不同，不确定使用哪个函数实现，通过多天不需要修改源码，就可以实现

表现形式为 ==重写== 、 ==重载== 、 ==接口==

### 重写（运行时多态）

重写指子类重新定义父类方法。

```javascript
function Person(name) {
	this.name = name;
	this.sayHello = function () {
		console.log('Hello !!');
	};
	this.getName = function () {
		console.log(this.name);
	};
}

function Teacher(name) {
	Person.apply(this, arguments);
	this.sayHello = function () {
		console.log('Hello, everyone. I am ' + name + ' !!');
	};
}

let teacher = new Teacher('Lily');
console.log(teacher.sayHello()); // Hello, everyone. I am Lily !!
console.log(teacher.name); // Lily
console.log(teacher.getName()); // Lily
```

上边这段代码中，Teacher 继承了 Person 的 name 属性和 getName 方法，并且对 sayHello 方法进行了修改，即重写。

### 重载（编译时多态）

重载是指多个同名但参数不同的方法，在 JS 中，判断 arguments 的个数和类型，然后具体判断。

```javascript
function foo1(a) {
	console.log(a);
}
function foo2(a, b) {
	console.log('a: ' + a, 'b: ' + b);
}

function foo() {
	if (arguments.length === 1) {
		foo1.apply(null, arguments);
	}
	if (arguments.length === 2) {
		foo2.apply(null, arguments);
	}
}

foo(1); // 1
foo(1, 22); // a: 1 b: 22
```

### 接口

将父对象的方法抛出异常，如果没有被实现就会报错

```javascript
function Person() {
	this.sayHello = function () {
		throw '没有定义该方法';
	};
}

function Teacher() {
	this.sayHello = function () {
		console.log('Hello everyone, I am a teacher.');
	};
}

function Worker() {
	this.sayHello = function () {
		console.log('Hello, I am a worker.');
	};
}

function Doctor() {}

Teacher.prototype = new Person();
Teacher.prototype.constructor = Teacher;

Worker.prototype = new Person();
Worker.prototype.constructor = Worker;

Doctor.prototype = new Person();
Doctor.prototype.constructor = Doctor;

let teacher = new Teacher();
console.log(teacher.sayHello()); // Hello everyone, I am a teacher.

let worker = new Worker();
console.log(worker.sayHello()); // Hello, I am a worker.

let doctor = new Doctor();
console.log(doctor.sayHello()); // error: Uncaught 没有定义该方法
```

结论： JS 是无态的，或者说 JS 天生支持多态

### 参考文章

<a href="https://segmentfault.com/a/1190000018239556">Aaron: 面向对象之三个基本特征（javaScript）</a>

<a href="https://www.cnblogs.com/aaronchu/p/6169843.html">aaronchu: JS 多态</a>
