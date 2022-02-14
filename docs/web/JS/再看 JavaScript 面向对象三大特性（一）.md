## 面向对象三大特性——封装

JavaScript 是一种基于对象的语言，但是由于语法中没有 ==class== (类)，所以它不是一种真正的面向对象编程语言。

### 生成实例对象的原始模式

假设把人看成一个对象，他拥有 "姓名" 、 "性别" 、 "年龄" 等属性。

```javascript
let person = {
	name: '',
	sex: '',
	age: '',
};
```

按照以上方式创建 Bob 和 Mary 两个人

```javascript
let person1 = {
	name: 'Bob',
	sex: 'man',
	age: 18,
};
let person2 = {
	name: 'Mary',
	sex: 'woman',
	age: 17,
};
```

这种方法特别的低效，而且 Bob、Mary 和 person 原型 之间没有任何关联

### 改进原始模式

通过函数的方式传入参数，并返回对象

```javascript
function person(name, sex, age) {
	return {
		name,
		sex,
		age,
	};
}

let person1 = person('Bob', 'man', 18);
let person2 = person('Mary', 'woman', 17);
```

这种方法虽然不用一个一个创建对象，但是他们之间没有内在联系，不能反映是统一个原型对象的实例。

### 构造函数模式

构造函数，即在一个普通函数内部使用 ==this== , 然后对该函数使用 ==new== 运算符，生成实例。

```javascript
function Person(name, sex, age) {
	this.name = name;
	this.sex = sex;
	this.age = age;
}
let person1 = new Person('Bob', 'man', 18);
let person2 = new Person('Mary', 'woman', 17);
```

person1 和 person2 都有一个共同的 ==constructor== 属性, 且都是 Person

#### 构造函数模式的缺点

假如所有对象实例都有相同的属性或方法

```javascript
    function Person(name, sex, age) {
        this.name = name;
        this.sex = sex;
        this.age = age;
        this.career = "teacher";
        this.skill = function(){console.log(("传道受业解惑")}
    }
    let person1 = new Person("Bob", "man", 18);
    let person2 = new Person("Mary", "woman", 17);
```

这里 Bob 和 Mary 都具有相同的属性 career 和相同的方法 skill；如果使用构造函数的方法则会造成内存的浪费。

### prototype 原型模式

JavaScript 中，每一个构造函数都有一个 prototype 属性，它指向另一个对象，这个对象的所有属性和方法都会没构造函数生成的实例所继承

```javascript
function Person(name, sex, age) {
	this.name = name;
	this.sex = sex;
	this.age = age;
}
Person.prototype.career = 'teacher';
Person.prototype.skill = function () {
	console.log('传道受业解惑');
};
let person1 = new Person('Bob', 'man', 18);
let person2 = new Person('Mary', 'woman', 17);
```

这里 person1 和 person2 都具有 career 属性和 skill 方法；

#### prototype 模式的验证

-   isPrototypeOf()

```javascript
    // 这个方法用来检测 prototype 和某个实例之间的关系
    console.log(Person.prototype.isPrototypeOf(person1); // true
```

-   hasOwnProperty()

```javascript
// 每个实力对象都有 hasOwnProperty() 方法， 用来判断某个属性属于自身还是属于 prototype
console.log(person1.hasOwnProperty('name')); // true
console.log(person1.hasOwnProperty('career')); // false
```

-   in 运算符

```javascript
// in 运算符可以用来判断某个实例是否含有某个属性或方法，不管是自身的还是prototype的
console.log('name' in person1); // true
console.log('skill' in person1); // true
console.log('color' in person1); // false
```

in 运算符可以用来遍历某个对象的所有属性，即 for in 循环
