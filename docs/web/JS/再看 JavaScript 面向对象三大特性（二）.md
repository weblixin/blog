# 面向对象三大特性——继承

_参考文章_  
<a href="http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html">阮一峰：Javascript 面向对象编程（二）：构造函数的继承</a>  
<a href="http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html">阮一峰：Javascript 面向对象编程（三）：非构造函数的继承</a>

## 构造函数的继承

假设有一个"动物"的构造函数 和 一个"猫"的构造函数

```javascript
function Animal() {
	this.species = '动物';
}
function Cat(name, breed) {
	this.name = name;
	this.breed = breed;
}
let cat1 = new Cat('咪咪', '加菲猫');
```

要求：使猫继承动物的属性和方法

### call 或 apply 修改 this 指向

将父对象的构造函数绑定在子对象上

```javascript
function Cat(name, breed) {
	Animal.apply(this, arguments);
	this.name = name;
	this.breed = breed;
}
let cat1 = new Cat('咪咪', '加菲猫');
console.log(cat1.species); // 动物
```

### prototype 模式

将猫的 prototype 对象指向 Animal 的实例，那么猫的实例就能继承 Animal 的属性和方法了。

```javascript
Cat.prototype = new Animal();
console.log(cat1.species); // 动物
console.log(cat1.constructor); // Animal
```

这时 Cat 生成的 cat1 就会继承 Animal 的 species 属性，但是此时 cat1 的 constructor 属性也随之发生了改变，会导致继承链混乱，所以需要我们手动修改回来

```javascript
Cat.prototype.constructor = Cat;
console.log(cat1.constructor); // Cat
```

==结论：如果替换了构造函数的 prototype 对象，那么必须要给新的 prototype 对象加上 constructor 属性， 并将这个属性指向原来的构造函数==

### 直接继承 prototype

构造函数中所有不变的属性都可以直接写入 prototype 中，所以可以使 Cat 继承 Animal 的 prototype。

```javascript
// 改写Animal
function Animal() {}
Animal.prototype.species = '动物';
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
let cat1 = new Cat('咪咪', '加菲猫');
console.log(cat1.species); // 动物
```

==优点：效率高，不用建立 Animal 实例， 比较省内存==  
==缺点：由于 Cat 和 Animal 的 prototype 属性指向同一个对象，所以修改 Cat 的 prototype ，Animal 的 prototype 也会随之改变==

```javascript
Cat.prototype.constructor = Cat;
console.log(Animal.constructor); // Cat
// 这段代码同时也会修改 Animal 的 constructor
```

### 使用空对象作为中介

此方法解决了上一种方法的缺点。

```javascript
let Foo = function () {};
Foo.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;
let cat1 = new Cat('咪咪', '加菲猫');
console.log(cat1.species); // 动物
console.log(Animal.constructor); // Animal
```

### 拷贝继承

这种方法是将父对象的属性和方法拷贝进子对象实现继承

```javascript
function Animal() {}
Animal.prototype.species = '动物';
function extend_1(Child, Parent) {
	let p = Parent.prototype;
	let c = Child.prototype;
	for (let i in p) {
		c[i] = p[i];
	}
}
extent_1(Cat, Animal);
let cat1 = new Cat('咪咪', '加菲猫');
console.log(cat1.species); // 动物
```

## 非构造函数的继承

### 使用空对象作为中介

```javascript
let Chinese = {
	nation: '中国',
};
let Foo = function () {};
Foo.prototype = Chinese;
let Doctor = new F();
Doctor.career = '医生';
```

### 浅拷贝

仅适用于拷贝基本数据类型，引用数据类型只会获得一个引用地址，不会实现拷贝

### 深拷贝

可以实现引用数据类型的拷贝，比如对象和数组
