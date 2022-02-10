## TypeScript

### **一、为什么要用 TS**

1. 使用 TS 开发的库，可以很清楚的知道每一个对象的属性、每一个方法的参数
2. TS 会自动校验参数或属性的类型
3. TS 的枚举可以让我们更加清晰的了解当前枚举值的意思，方便后期维护
4. JS 是动态类型语言，动态类型的自由特性经常会导致错误，并且在编译时缺乏错误检查。

### **二、TypeScript 中 const 和 readonly 的区别是什么？**

1. const 用于声明变量，readonly 用于属性
2. const 是在运行时检查，readonly 是在编译时检查
3. 使用 const 声明的数组可以使用 push\pop 等方法，readonly 声明的数组不可以修改

### **三、枚举和常量的区别？**

1. 枚举在编译时会被编译成一个对象，可以当作对象使用
2. const 枚举会在编译时被删除，在使用到的地方直接给变量赋值，而不是在运行时才赋值

### **四、type（类别名的） 和 interface （接口）的区别？**

1. 扩展方式不同 type 用 & 符号，interface 用 extends
2. type 可以声明基本类型的别名、联合类型、元组
3. type 可以使用 typeof 获取实例的类型进行赋值
4. interface 可以对相同变量名的类型进行合并，type 如果声明类型的别名相同会报错

> 用 interface 描述 **数据结构**，用 type 描述 **类型关系**

### **五、TypeScript 中 any,never,unknown 和 viod 有什么区别？**

1.
