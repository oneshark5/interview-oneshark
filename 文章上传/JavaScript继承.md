# JavaScript继承

## 一、继承是什么

继承（inheritance）是面向对象软件技术当中的一个概念。

如果一个类别B“继承自”另一个类别A，就把这个B称为“A的子类”，而把A称为“B的父类别”也可以称“A是B的超类”

- 继承的优点

继承可以使得子类具有父类别的各种属性和方法，而不需要再次编写相同的代码

在子类别继承父类别的同时，可以重新定义某些属性，并重写某些方法，即覆盖父类别的原有属性和方法，使其获得与父类别不同的功能

虽然`JavaScript`并不是真正的面向对象语言，但它天生的灵活性，使应用场景更加丰富

关于继承，我们举个形象的例子：

定义一个类（Class）叫汽车，汽车的属性包括颜色、轮胎、品牌、速度、排气量等

```js
class Car{
    constructor(color,speed){
        this.color = color
        this.speed = speed
        // ...
    }
}
```

由汽车这个类可以派生出“轿车”和“货车”两个类，在汽车的基础属性上，为轿车添加一个后备厢、给货车添加一个大货箱

```js
// 货车
class Truck extends Car{
    constructor(color,speed){
        super(color,speed)
        this.Container = true // 货箱
    }
}
```

这样轿车和货车就是不一样的，但是二者都属于汽车这个类，汽车、轿车继承了汽车的属性，而不需要再次在“轿车”中定义汽车已经有的属性

在“轿车”继承“汽车”的同时，也可以重新定义汽车的某些属性，并重写或覆盖某些属性和方法，使其获得与“汽车”这个父类不同的属性和方法

```js
class Truck extends Car{
    constructor(color,speed){
        super(color,speed)
        this.color = "black" //覆盖
        this.Container = true // 货箱
    }
}
```

从这个例子中就能详细说明汽车、轿车以及卡车之间的继承关系

## 二、实现方式

### 1. 原型链继承（不会被单独使用）

🦈实现一个原型链继承

定义父类、子类构造函数，让子类构造函数的原型执行父的实例对象，这样就实现类子类继承父类的属性和方法。

```js
// 定义父类
function Parent() {
    this.name = 'Jack';
}
// 父类原型添加方法
Parent.prototype.getName = function () {
    return this.name;
};

// 子类
function Child() {}
// 子类的原型设置为父类Parent的实例
Child.prototype = new Parent();

// 实例化子类
const child = new Child();

console.log(child.getName()); // Jack
```

![img](../JavaScript/%E9%9D%A2%E8%AF%95%EF%BC%9AJS/%E9%9D%A2%E8%AF%95JavaScript.assets/20210802133147.png)

两个注意点（缺点）：

- 继承之后再更改原型属性不会向下传递
- 实例之间互相影响

原型链继承，创建实例对象时实现继承，再次对原型上的属性和方法进行更改时，不会影响到实例对象原有的继承。

```js
let f = function () {
  this.a = 1;
  this.b = 2;
}
let o = new f(); // {a: 1, b: 2}
// 对原型的属性进行了更改
f.prototype.b = 3;
f.prototype.c = 4;
console.log(o.a); // 1
console.log(o.b); // 2 ==》不会影响到原有继承
console.log(o.c); // 4 ==》当前实例中没有该属性，取原型中查找
console.log(o.d); // undefined ==》 原型中也没有，返回undefined
```

但是多个实例对象实现原型链继承时，都其中一个实例更改属性，会影响到其他实例。--》即当继承的函数被调用时，[this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this) 指向的是当前继承的对象，而不是继承的函数所在的原型对象。

```js
function Parent() {
  this.name = 'parent1';
  this.play = [1, 2, 3]
}
function Child() {
  this.type = 'child2';
}
Child1.prototype = new Parent();
console.log(new Child())
```

上面代码看似没问题，实际存在潜在问题

```js
  var s1 = new Child2();
  var s2 = new Child2();
  s1.play.push(4);
  console.log(s1.play, s2.play); // [1,2,3,4]
```

改变`s1`的`play`属性，会发现`s2`也跟着发生变化了，这是因为两个实例使用的是同一个原型对象，内存空间是共享。

### 2. 构造函数继承（不单独使用）

在**子类构造函数**中调用**父类构造函数**。使用 `apply()`和`call()`方法以**新创建的对象**为上下文执行构造函数。

```js
function Parent(){
    this.name = 'parent1';
}

Parent.prototype.getName = function () {
    return this.name;
}

function Child(){
    Parent1.call(this);
    this.type = 'child'
}

let child = new Child();
console.log(child);  // 没问题
console.log(child.getName());  // 会报错
```

只能继承父类的实例属性和方法，不能继承原型属性或者方法。

```js
function SuperType() {
    this.colors = ['red', 'blue', 'green'];
}
function SubType() {
    // 继承 SuperType
    SuperType.call(this);
}
const instance1 = new SubType();
instance1.colors.push('black');
console.log(instance1.colors); // [ 'red', 'blue', 'green', 'black' ]

const instance2 = new SubType();
console.log(instance2.colors); // [ 'red', 'blue', 'green' ]
```

实例之间不互相影响，因为`SubType`子类调用call仅对父函数复制了初始化代码，每一个实例都是一个新的。

```js
function SuperType(name) {
    this.name = name;
}
function SubType() {
    // 继承 SuperType 并传参
    SuperType.call(this, 'Nicholas');
    // 实例属性
    this.age = 29;
}
const usr = new SubType();
console.log(usr.name, usr.age); // Nicholas 29
```

相比于使用**原型链**，**构造函数继承**的一个优点就是**可以在子类构造函数中向父类构造函数传参**。

小结：

- 可向父类构造函数传参
- 实例之间不影响
- 不能访问父类原型上的方法

### 3. 组合继承 

**组合继承**，有时候也叫**伪经典继承**，综合了**原型链**和**盗用构造函数**，将两者的优点集中了起来。使用**原型链继承原型上的属性和方法**，而通过**盗用构造函数继承实例属性**。这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。

```javascript
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
};

function SubType(name, age) {
    // 继承属性
    SuperType.call(this, name);
    this.age = age;
}
// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function () {
    console.log(this.age);
};

const usr1 = new SubType('Nicholas', 29);
usr1.colors.push('black');
console.log(usr1.colors); // [ 'red', 'blue', 'green', 'black' ]
usr1.sayName(); // Nicholas
usr1.sayAge(); // 29

const usr2 = new SubType('Greg', 27);
console.log(usr2.colors); // [ 'red', 'blue', 'green' ]
usr2.sayName(); // Greg
usr2.sayAge(); // 27
```

**组合继承**弥补了**原型链**和**盗用构造函数**的不足，是 JavaScript 中使用最多的继承模式。而且组合继承也保留了`instanceof`操作符和`isPrototypeOf()`方法**识别合成对象**的能力。