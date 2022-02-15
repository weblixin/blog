---
title: 继承
---

## 原型链继承

新实例的原型等于父类的实例

#### 优点

-   可以继承构造函数的属性、父类构造函数的属性和父类原型上的属性

#### 缺点

-   新实例无法向父类传参
-   所有实例共享同一个原型上的属性和方法，如果某一个实例修改了原型的属性和方法，会对所有的实例产生影响

```
function Person (name) {
    this.name = name;
    this.sleep = function() {
        console.log(this.name + '正在睡觉')
    }
}

Person.prototype.eat = function(food) {
    console.log(this.name + '正在吃' + food)
}

function Teacher() {

}

Teacher.prototype = new Person()
Teacher.prototype.name = 'teacher'
Teacher.prototype.localAt = function(address) {
    console.log(this.name + '居住在' + address)
}

let teacherWang = new Teacher()
console.log(teacherWang.name)
teacherWang.sleep()
teacherWang.eat('苹果')
teacherWang.localAt('三里屯')
```

## 构造函数继承

使用 call 或 apply 将父类构造函数引入子类函数

#### 优点

-   可以继承多个构造函数
-   子实例可以向父实例传参

#### 缺点

-   只能继承父类构造函数的属性，不能继承其原型的属性
-   每次使用都需要重新调用，无法实现复用

```
function Person (name) {
    this.name = name;
    this.sleep = function() {
        console.log(this.name + '正在睡觉')
    }
}

Person.prototype.eat = function(food) {
    console.log(this.name + '正在吃' + food)
}

function Teacher(name) {
    Person.call(this)
    this.name = name || '王老师'
}

let wang = new Teacher()
console.log(wang.sleep())

```

## 组合继承

将原型链和构造函数结合起来实现继承

-   解决了原型链继承和构造函数继承的问题
-   但是调用了两次父类构造函数，对内存造成损耗

```
function Person (name) {
    this.name = name;
    this.sleep = function() {
        console.log(this.name + '正在睡觉')
    }
}

Person.prototype.eat = function(food) {
    console.log(this.name + '正在吃' + food)
}

function Teacher(name) {
    Person.call(this)
    this.name = name || '王老师'
}

Teacher.prototype = new Person()

// 预防某种特定情况下的问题
Teacher.prototype.constructor = Teacher;

console.log(Teacher, 1)
console.log(Teacher.prototype, 2)
console.log(Teacher.prototype.constructor, 3)

let wang = new Teacher()
console.log(wang.sleep())
console.log(wang.eat('香蕉'))

```

## 原型式继承

用一个函数包装一个对象，然后返回这个函数的调用，这个函数就可以随意更改或添加属性

-   所有实例都会继承原型上的方法
-   无法复用，新实例的属性和方法都是后来添加的

```
function Person (name) {
    this.name = name || '人类';
    this.sleep = function() {
        console.log(this.name + '正在睡觉')
    }
}

Person.prototype.eat = function(food) {
    console.log(this.name + '正在吃' + food)
}

function content(obj) {
    function Foo() {}
    Foo.prototype = obj;
    return new Foo()
}

let sup = new Person('男人')
let sub = content(sup);

console.log(sub.name)
sub.eat('橘子')
```

## 寄生式继承

在原型式继承外再套一个函数

```
function Person (name) {
    this.name = name || '人类';
    this.sleep = function() {
        console.log(this.name + '正在睡觉')
    }
}

Person.prototype.eat = function(food) {
    console.log(this.name + '正在吃' + food)
}

function content(obj) {
    function Foo() {}
    Foo.prototype = obj;
    return new Foo()
}

let sup = new Person('男人')

function subobject(obj) {
    let sub = content(obj);
    sub.name = '安怡'
    return sub
}

let sup2 = subobject(sup);


console.log(sup2.name)
sup2.eat('橘子')
```

## 寄生组合式继承

寄生：在函数内返回对象然后调用组合：1、函数的原型等于另一个实例。2、在函数中用 apply 或者 call 引入另一个构造函数，可传参

```
function Person (name) {
    this.name = name || '人类';
    this.sleep = function() {
        console.log(this.name + '正在睡觉')
    }
}

Person.prototype.eat = function(food) {
    console.log(this.name + '正在吃' + food)
}

function content(obj) {
    function Foo() {}
    Foo.prototype = obj;
    return new Foo()
}

let sup = content(Person.prototype)

function Sub (name) {
    Person.call(this)
    this.name = name
}

Sub.prototype = sup;

// console.log(sup.constructor)

sup.constructor = Sub

let sub1 = new Sub('sub')
console.log(sub1.name)
sub1.sleep()
sub1.eat('草莓')
```
