# 关于this

- 函数的调用方式决定了this的值
- this不可以在执行期间被赋值

**全局上下文**

无论是否在严格模式下，在全局执行环境中（在任何函数体外部）`this` 都指向全局对象。

**函数上下文**

- 在函数内部，`this`的值取决于函数被调用的方式。
- 非严格模式下，若函数中未设定this，则this默认为全局。
- 把`this`的值从一个环境传到另一个，就要用 `call` 或者`apply` 方法

**类上下文**

- 在类的构造函数中，`this` 是一个常规对象。类中所有非静态的方法都会被添加到 `this` 的原型中：

**派生类**

- 在构造函数中调用`super()`会生成一个`this`绑定
- 派生类不能在调用 `super()` 之前返回，除非其构造函数返回的是一个对象，或者根本没有构造函数。

**实例**

- 函数上下文的this

  ```js
  // 对象可以作为 bind 或 apply 的第一个参数传递，并且该参数将绑定到该对象。---bind改变this指向
  var obj = {a: 'Custom'};
  
  // 声明一个变量，并将该变量作为全局对象 window 的属性。
  var a = 'Global';
  
  function whatsThis() {
    return this.a;  // this 的值取决于函数被调用的方式
  }
  
  whatsThis();          // 'Global' 因为在这个函数中 this 没有被设定，所以它默认为 全局/ window 对象
  whatsThis.call(obj);  // 'Custom' 因为函数中的 this 被设置为 obj
  whatsThis.apply(obj); // 'Custom' 因为函数中的 this 被设置为 obj
  ```

- this和对象转换

  这里定义了一个函数add和一个对象o，我们调用函数时，采用`call`、`apply`方法绑定this为对象o，即传入的第一个参数就是绑定的地方。

  ```js
  function add(c, d) {
    return this.a + this.b + c + d;
  }
  
  var o = {a: 1, b: 3};
  
  // 第一个参数是用作“this”的对象
  // 其余参数用作函数的参数
  add.call(o, 5, 7); // 16
  
  // 第一个参数是用作“this”的对象
  // 第二个参数是一个数组，数组中的两个成员用作函数参数
  add.apply(o, [10, 20]); // 34
  ```

  在非严格模式下使用 `call` 和 `apply` 时，如果用作 `this` 的值不是对象，则会被尝试转换为对象。不是对象的值会自动转成对象。原始值`7 str true`也会被转成原始值包装类型。

  ```js
  function bar() {
    console.log(Object.prototype.toString.call(this));
  }
  
  bar.call(7);     // [object Number]
  bar.call('foo'); // [object String]
  bar.call(undefined); // [object global]
  ```

- bind方法

  调用`f.bind(someObject)`会创建一个与`f`具有相同函数体和作用域的函数，但是在这个新函数中，`this`将永久地被绑定到了`bind`的第一个参数，无论这个函数是如何被调用的。

  🦈`bind()`方法，会生成一个和调用该方法的函数一样的函数，只是把this绑定到了第一个参数上。

  ```js
  function f(){
    return this.a;
  }
  
  var g = f.bind({a:"azerty"});
  console.log(g()); // azerty
  
  var h = g.bind({a:'yoo'}); // bind 只生效一次！
  console.log(h()); // azerty
  
  var o = {a:37, f:f, g:g, h:h};
  console.log(o.a, o.f(), o.g(), o.h()); // 37, 37, azerty, azerty
  // o.a调用对象的属性，直接输出
  // o.f()，对象o调用了函数f()，所以这里的this指向对象o，a为对象o的属性值37
  // o.g(), o.h(),采用bind方法绑定了this，所以这里的this指向{a:"azerty"}，并且只对第一次绑定有效
  ```

- 箭头函数

  在[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)中，`this`与封闭词法环境的`this`保持一致。在全局代码中，它将被设置为全局对象：

  ```js
  var globalObject = this;
  var foo = (() => this);
  console.log(foo() === globalObject); // true
  ```

  注意：如果将`this`传递给`call`、`bind`、或者`apply`来调用箭头函数，它将被忽略。

  在箭头函数中，this的指向为它被创建时的环境。

  ```js
  // 创建一个含有 bar 方法的 obj 对象，
  // bar 返回一个函数，
  // 这个函数返回 this，
  // 这个返回的函数是以箭头函数创建的，
  // 所以它的 this 被永久绑定到了它外层函数的 this。
  // bar 的值可以在调用中设置，这反过来又设置了返回函数的值。
  var obj = {
    bar: function() {
      var x = (() => this);
      return x;
    }
  };
  
  // 作为 obj 对象的一个方法来调用 bar，把它的 this 绑定到 obj。
  // 将返回的函数的引用赋值给 fn。
  var fn = obj.bar();
  
  // 直接调用 fn 而不设置 this，
  // 通常 (即不使用箭头函数的情况) 默认为全局对象
  // 若在严格模式则为 undefined
  console.log(fn() === obj); // true
  
  // 但是注意，如果你只是引用 obj 的方法，
  // 而没有调用它
  var fn2 = obj.bar;
  // 那么调用箭头函数后，this 指向 window，因为它从 bar 继承了 this。
  console.log(fn2()() == window); // true
  ```

  🦈在这里，创建了一个对象，对象内的属性bar返回一个函数，函数里的内容由箭头函数决定，此时箭头函数的this即已经绑定为obj，后面再次使用this时，this指向的内容就由obj所决定。---这里没搞明白，obj.bar()时this指向了obj，那this是被bar决定的还是obj决定的，obj.bar时，this指向了window，那是不是this就是由bar所决定。也就是在定义箭头函数后，其this的指向是由bar所决定。

- 作为对象的方法

  当函数作为对象里的方法被调用时，`this` 被设置为调用该函数的对象。

  下面的例子中，当 `o.f()` 被调用时，函数内的 `this` 将绑定到 `o` 对象。

  ```js
  var o = {
    prop: 37,
    f: function() {
      return this.prop;
    }
  };
  
  console.log(o.f()); // 37
  
  // this 的绑定只受最接近的成员引用的影响
  o.b = {g: independent, prop: 42};
  console.log(o.b.g()); // 42
  // 把一个方法g当作对象o.b的函数调用。在这次执行期间，函数中的this将指向o.b。
  // 🦈this指向最近的引用
  ```

- 原型中的this

  如果该方法存在于一个对象的原型链上，那么 `this` 指向的是调用这个方法的对象，就像该方法就在这个对象上一样。

  ```js
  var o = {
    f: function() {
      return this.a + this.b;
    }
  };
  var p = Object.create(o);
  p.a = 1;
  p.b = 4;
  
  console.log(p.f()); // 5
  ```

  🦈p中没有属性f，向原型中查找，查找开始的位置就是p，所以函数中的 `this` 指向`p`，因为`f`是作为`p`的方法调用的，所以它的`this`指向了`p`。---》this 的指向是p，属性函数从原型中获得的。

- getter 与 setter 中的 `this`

- 作为构造函数

  当一个函数用作构造函数时（使用[new](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)关键字），它的`this`被绑定到正在构造的新对象。

  ```js
  /*
   * 构造函数这样工作：
   *
   * function MyConstructor(){
   *   // 函数实体写在这里
   *   // 根据需要在 this 上创建属性，然后赋值给它们，比如：
   *   this.fum = "nom";
   *   // 等等...
   *
   *   // 如果函数具有返回对象的 return 语句，
   *   // 则该对象将是 new 表达式的结果。
   *   // 否则，表达式的结果是当前绑定到 this 的对象。
   *   //（即通常看到的常见情况）。
   * }
   */
  
  function C(){
    this.a = 37;
  }
  
  var o = new C();
  console.log(o.a); // logs 37
  
  
  function C2(){
    this.a = 37;
    return {a:38};
  }
  
  o = new C2();
  console.log(o.a); // logs 38
  
  ```

  🦈创建函数C，其没有返回值，在this上创建属性a并赋值，我们在创建C的实例时，输出的属性a就就是函数C的属性。C2函数由返回值，则返回给创建的实例，this绑定到该返回值上

- 作为一个DOM事件处理函数

  当函数被用作事件处理函数时，它的 `this` 指向触发事件的元素

- 作为内联事件处理函数

  当代码被内联 [on-event 处理函数 (en-US)](https://developer.mozilla.org/en-US/docs/Web/Events/Event_handlers) 调用时，它的`this`指向监听器所在的 DOM 元素：

- 类中的this

  让类中的 `this` 值总是指向这个类实例。

  ```js
  class Car {
    constructor() {
      // Bind sayBye but not sayHi to show the difference
      this.sayBye = this.sayBye.bind(this);
    }
    sayHi() {
      console.log(`Hello from ${this.name}`);
    }
    sayBye() {
      console.log(`Bye from ${this.name}`);
    }
    get name() {
      return 'Ferrari';
    }
  }
  
  class Bird {
    get name() {
      return 'Tweety';
    }
  }
  
  const car = new Car();
  const bird = new Bird();
  
  // The value of 'this' in methods depends on their caller
  car.sayHi(); // Hello from Ferrari
  bird.sayHi = car.sayHi;
  bird.sayHi(); // Hello from Tweety
  
  // For bound methods, 'this' doesn't depend on the caller
  bird.sayBye = car.sayBye;
  bird.sayBye();  // Bye from Ferrari
  ```

