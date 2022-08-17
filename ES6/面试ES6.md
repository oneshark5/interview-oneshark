# ES6

## 一、面经收集

1. Promise 实现并发数控制

2. promise 怎么捕获错误
3. promise 的并发调度
4. es6 当中的数据类型和使用（BigInt、Symbol）
5. es6declass 用过吗 可以说一下 es5 怎么实现继承吗？ 哎 不会
6. 手撕订阅发布设计模式 不会
7. 箭头函数与普通函数区别
8. 解构赋值，如果没有找到，会返回什么

## 二、面试官系列

### 问题 1：说说 var、let、const 之间的区别

**1. var**

在 ES5 中，顶层对象的属性和全局变量是等价的，用`var`声明的变量既是全局变量，也是顶层变量；

注意：顶层对象，在浏览器环境指的是`window`对象，在 `Node` 指的是`global`对象；即在浏览器中采用`var`声明的变量为全局变量，是顶层 window 对象的属性。

```js
var a = 10;
console.log(window.a); // 10
```

- 使用`var`声明的变量存在==变量提升==的情况

- 使用`var`，我们能够对一个变量进行多次声明，后面声明的变量会覆盖前面的变量声明

- 在函数作用域中采用`var`声明变量，变量不会超过该作用域，但是直接采用`a = 25`赋值，则该变量就变成全局变量。

  ```js
  var a = 20;
  function change() {
    var a = 30;
  }
  change();
  console.log(a); // 20

  // 不适用var
  var a = 20;
  function change() {
    a = 30;
  }
  change();
  console.log(a); // 30
  ```

**2. let**

- 所声明的变量，只在`let`命令所在的代码块内有效，==不存在变量提升==。🦈块作用域中有效

  ```js
  {
    let a = 20;
  }
  console.log(a); // ReferenceError: a is not defined.
  // 若在未声明之前使用，则报错
  console.log(b); // 报错ReferenceError
  let b = 2;
  ```

- 暂时性死区：使用`let`声明变量前，该变量都不可用；只要块级作用域内存在`let`命令，这个区域就不再受外部影响。

  ```js
  // 在块作用域中提前使用了a变量，但是存在let的地方不会，变量未声明就不可用，所以不会使用到全局作用域中的 a
  var a = 123;
  if (true) {
    a = "abc"; // ReferenceError
    let a;
  }
  ```

- `let`不允许在==相同作用域中==重复声明。

  ```js
  // 相同作用域中出现同一声明才会报错，像这种不同作用域不会报错
  let a = 20;
  {
    let a = 30;
  }
  ```

**3. const**

`const`声明一个只读的常量，一旦声明，常量的值就不能改变。并且一旦采用`const`声明变量，就必须立即初始化。

```js
const a = 1
a = 3
// TypeError: Assignment to constant variable.
const b;
// SyntaxError: Missing initializer in const declaration
```

- 如果之前用`var`或`let`声明过变量，再用`const`声明同样会报错

- `const`实际上保证的并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动；（🦈栈内存中的东西不变）

- 对于复杂类型的数据，变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的，并不能确保改变量的结构不变。🦈 如果是复杂类型，`const`保存的指向数据的指针是不变的，而数据自己的结构是可以改变的。

  ```js
  const foo = {};

  // 为 foo 添加一个属性，可以成功
  foo.prop = 123;
  foo.prop; // 123

  // 将 foo 指向另一个对象，就会报错
  foo = {}; // TypeError: "foo" is read-only
  ```

**4. 区别**

`var`、`let`、`const`三者区别可以围绕下面五点展开：

- 变量提升
- 暂时性死区
- 块级作用域
- 重复声明
- 修改声明的变量
- 使用

**变量提升**

`var`声明的变量存在变量提升，即变量可以在声明之前调用，值为`undefined`。

`let`和`const`不存在变量提升，即它们所声明的变量一定要在声明后使用，否则报错

**暂时性死区**

`var`不存在暂时性死区

`let`和`const`存在暂时性死区，只有等到声明变量的那一行代码出现，才可以获取和使用该变量

🦈 采用`let`和`const`声明的变量，在声明之前不可用。

**块作用域**

`var`不存在块级作用域

`let`和`const`存在块级作用域

**重复声明**

`var`允许重复声明变量；重复声明后，后面的会替代前面已有的声明。

`let`和`const`在同一作用域不允许重复声明变量。

**修改声明的变量**

`var`和`let`可以

`const`声明一个只读的常量。一旦声明，常量的值就不能改变

**使用**

能用`const`的情况尽量使用`const`，其他情况下大多数使用`let`，避免使用`var`

### 问题 2：数组新增了哪些扩展？

**1. 扩展运算符**

对象的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中。

数组的扩展运算符可以将一个数组转为用逗号分隔的参数序列，且每次只能展开一层数组。

`...`将数组转为参数序列。

- 主要用于函数调用的时候，将一个数组变为参数序列；🦈 把数组中的元素取出（转成参数序列）作为参数传给函数。

- 复制数组

  扩展运算符会克隆一个全新的数组，对于新旧数组更改自己的元素，不会影响到另外一个数组。

  🦈 所以采用扩展运算符复制数组时，是在栈内存中开辟了一个新的空间，形成了一个新的数组。新旧数组互补干扰

  ```js
  const a1 = [1, 2];
  // 写法一
  const a2 = [...a1];
  // 写法二
  const [...a2] = a1;

  // 复制后，更改属任一数组，都不会影响到另外一个数组
  a1[0] = 5;
  console.log(a1); // [5, 2]
  console.log(a2); // [1, 2]
  ```

- 如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错

  ```js
  const [first, ...rest] = [1, 2, 3, 4, 5];
  first // 1
  rest  // [2, 3, 4, 5]

  // 在用扩展运算符赋值时，用在非最后一位则会报错
  const [...butLast, last] = [1, 2, 3, 4, 5];
  // 报错

  const [first, ...middle, last] = [1, 2, 3, 4, 5];
  // 报错
  ```

- 可以将字符串转为真正的数组

  ```javascript
  [..."hello"];
  // [ "h", "e", "l", "l", "o" ]
  ```

**2. 构造函数新增方法**

- `Array.from()`

  将两类对象转为真正的数组：类似数组的对象和可遍历`（iterable）`的对象（包括 `ES6` 新增的数据结构 `Set` 和 `Map`）

  ```js
  let arrayLike = {
    0: "a",
    1: "b",
    2: "c",
    length: 3,
  };
  let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
  ```

  还可以接受第二个参数，用来对每个元素进行处理，将处理后的值放入返回的数组

  ```js
  Array.from([1, 2, 3], (x) => x * x);
  // [1, 4, 9]
  ```

- `Array.of()`

  🦈 将参数序列转为数组

  用于将一组值，转换为数组

  ```js
  Array.of(3, 11, 8); // [3,11,8]
  ```

  没有参数的时候，返回一个空数组

  当参数只有一个的时候，实际上是指定数组的长度

  参数个数不少于 2 个时，`Array()`才会返回由参数组成的新数组

  ```js
  Array(); // []
  Array(3); // [, , ,]
  Array(3, 11, 8); // [3, 11, 8]
  ```

**3. 实例对象新增方法**

关于数组实例对象新增的方法有如下：

- copyWithin()

  将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。

  参数如下：

  - target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
  - start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
  - end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

  ```js
  [1, 2, 3, 4, 5].copyWithin(0, 3); // 将从 3 号位直到数组结束的成员（4 和 5），复制到从 0 号位开始的位置，结果覆盖了原来的 1 和 2
  // [4, 5, 3, 4, 5]
  ```

- find()、findIndex()

  `find()`用于找出第一个符合条件的数组成员

  参数是一个回调函数，接受三个参数依次为当前的值、当前的位置和原数组

  ```js
  [1, 5, 10, 15].find(function (value, index, arr) {
    return value > 9;
  }); // 10
  ```

  ```
  findIndex`返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1
  [1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
  }) // 2
  ```

  这两个方法都可以接受第二个参数，用来绑定回调函数的`this`对象。

  ```js
  function f(v) {
    return v > this.age;
  }
  let person = { name: "John", age: 20 };
  [10, 12, 26, 15].find(f, person); // 26
  ```

- fill()

  使用给定值，填充一个数组

  ```javascript
  ["a", "b", "c"].fill(7);
  // [7, 7, 7]

  new Array(3).fill(7);
  // [7, 7, 7]
  ```

  还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置

  ```js
  ["a", "b", "c"].fill(7, 1, 2);
  // ['a', 7, 'c']
  ```

  注意，如果填充的类型为对象，则是浅拷贝

- entries()，keys()，values()

  `keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历

- includes()

  用于判断数组是否包含给定的值，返回布尔值，方法的第二个参数表示搜索的起始位置，默认为`0`

  参数为负数则表示倒数的位置

  ```js
  [1, 2, 3]
    .includes(2) // true
    [(1, 2, 3)].includes(4) // false
    [(1, 2, NaN)].includes(NaN) // true

    [(1, 2, 3)].includes(3, 3); // false
  [1, 2, 3].includes(3, -1); // true
  ```

- flat()，flatMap()

  `flat()`将数组扁平化处理，返回一个新数组，对原数据没有影响

  `flatMap()`方法对原数组的每个成员执行一个函数相当于执行`Array.prototype.map()`，然后对返回值组成的数组执行`flat()`方法。该方法返回一个新数组，不改变原数组

  ```js
  // 相当于 [[2, 4], [3, 6], [4, 8]].flat()
  [2, 3, 4].flatMap((x) => [x, x * 2]);
  // [2, 4, 3, 6, 4, 8]
  ```

  `flatMap()`方法还可以有第二个参数，用来绑定遍历函数里面的`this`

**4. 数组的空位**

数组的空位指，数组的某一个位置没有任何值

ES6 则是明确将空位转为`undefined`，包括`Array.from`、扩展运算符、`copyWithin()`、`fill()`、`entries()`、`keys()`、`values()`、`find()`和`findIndex()`

**5. sort()排序算法稳定性**

将`sort()`默认设置为稳定的排序算法。

### 问题 3：对象新增了哪些扩展？

**一、属性简写**

**二、属性名表达式**

- ES6 允许字面量定义对象时，将表达式放在括号内
- 表达式还可以用于定义方法名
- 注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串`[object Object]`

**三、super 关键字**

ES6 又新增了另一个类似的关键字`super`，指向当前对象的原型对象。

**四、扩展运算符**

**五、属性的遍历**

ES6 一共有 5 种方法可以遍历对象的属性。

- for...in：循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）
- Object.keys(obj)：返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名
- Object.getOwnPropertyNames(obj)：回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名
- Object.getOwnPropertySymbols(obj)：返回一个数组，包含对象自身的所有 Symbol 属性的键名
- Reflect.ownKeys(obj)：返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举

上述遍历，都遵守同样的属性遍历的次序规则：

- 首先遍历所有数值键，按照数值升序排列
- 其次遍历所有字符串键，按照加入时间升序排列
- 最后遍历所有 Symbol 键，按照加入时间升序排

```js
Reflect.ownKeys({ [Symbol()]: 0, b: 0, 10: 0, 2: 0, a: 0 });
// ['2', '10', 'b', 'a', Symbol()]
```

**六、对象新增的方法**

关于对象新增的方法，分别有以下：

- Object.is()
- Object.assign()
- Object.getOwnPropertyDescriptors()
- Object.setPrototypeOf()，Object.getPrototypeOf()
- Object.keys()，Object.values()，Object.entries()
- Object.fromEntries()

### 问题 4：对象新增了哪些扩展？

**一、参数**

- `ES6`允许为函数的参数设置默认值
- 函数的形参是默认声明的，不能使用`let`或`const`再次声明
- 参数默认值可以与解构赋值的默认值结合起来使用
- 参数默认值可以与解构赋值的默认值结合起来使用

**二、属性**

函数的 length 属性

- `length`将返回没有指定默认值的参数个数
- `rest` 参数也不会计入`length`属性
- 如果设置了默认值的参数不是尾参数，那么`length`属性也不再计入后面的参数了

name 属性

- 返回该函数的函数名

- 如果将一个具名函数赋值给一个变量，则 `name`属性都返回这个具名函数原本的名字

  ```js
  const bar = function baz() {};
  bar.name; // "baz"
  ```

- `Function`构造函数返回的函数实例，`name`属性的值为`anonymous`

- `bind`返回的函数，`name`属性值会加上`bound`前缀

  ```javascript
  function foo() {}
  foo
    .bind({})
    .name(
      // "bound foo"

      function () {}
    )
    .bind({}).name; // "bound "
  ```

**三、作用域**

一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域

等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

**四、严格模式**

只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错

**五、箭头函数**

- 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用`return`语句返回。
- 如果返回对象，需要加括号将对象包裹

注意点：

- 函数体内的`this`对象，就是==定义时所在的对象==，而不是使用时所在的对象
- 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误
- 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替
- 不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数

### 问题 5：你是怎么理解 ES6 新增 Set、Map 两种数据结构的？

如果要用一句来描述，我们可以说

`Set`是一种叫做集合的数据结构，`Map`是一种叫做字典的数据结构

- 集合
  是由一堆无序的、相关联的，且不重复的内存结构【数学中称为元素】组成的组合
- 字典
  是一些元素的集合。每个元素有一个称作 key 的域，不同元素的 key 各不相同

区别？

- 共同点：集合、字典都可以存储不重复的值
- 不同点：集合是以[值，值]的形式存储元素，字典是以[键，值]的形式存储

**关于 WeakSet 和 WeakMap**

- **WeakSet**

  创建`WeakSet`实例

  ```js
  const ws = new WeakSet();
  ```

  `WeakSet`可以接受一个具有 `Iterable`接口的对象作为参数

  ```js
  const a = [
    [1, 2],
    [3, 4],
  ];
  const ws = new WeakSet(a);
  // WeakSet {[1, 2], [3, 4]}
  ```

  在`API`中`WeakSet`与`Set`有两个区别：

  - 没有遍历操作的`API`
  - 没有`size`属性

  `WeackSet`只能成员只能是引用类型，而不能是其他类型的值

  ```js
  let ws = new WeakSet();

  // 成员不是引用类型
  let weakSet = new WeakSet([2, 3]);
  console.log(weakSet); // 报错

  // 成员为引用类型
  let obj1 = { name: 1 };
  let obj2 = { name: 1 };
  let ws = new WeakSet([obj1, obj2]);
  console.log(ws); //WeakSet {{…}, {…}}
  ```

  `WeakSet`里面的引用只要在外部消失，它在 `WeakSet`里面的引用就会自动消失

- **WeakMap**

  `WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合

  在`API`中`WeakMap`与`Map`有两个区别：

  - 没有遍历操作的`API`
  - 没有`clear`清空方法

  ```javascript
  // WeakMap 可以使用 set 方法添加成员
  const wm1 = new WeakMap();
  const key = { foo: 1 };
  wm1.set(key, 2);
  wm1.get(key); // 2

  // WeakMap 也可以接受一个数组，
  // 作为构造函数的参数
  const k1 = [1, 2, 3];
  const k2 = [4, 5, 6];
  const wm2 = new WeakMap([
    [k1, "foo"],
    [k2, "bar"],
  ]);
  wm2.get(k2); // "bar"
  ```

  `WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名

  ```javascript
  const map = new WeakMap();
  map.set(1, 2);
  // TypeError: 1 is not an object!
  map.set(Symbol(), 2);
  // TypeError: Invalid value used as weak map key
  map.set(null, 2);
  // TypeError: Invalid value used as weak map key
  ```

  `WeakMap`的键名所指向的对象，一旦不再需要，里面的键名对象和所对应的键值对会自动消失，不用手动删除引用

  举个场景例子：

  在网页的 DOM 元素上添加数据，就可以使用`WeakMap`结构，当该 DOM 元素被清除，其所对应的`WeakMap`记录就会自动被移除

  ```javascript
  const wm = new WeakMap();

  const element = document.getElementById("example");

  wm.set(element, "some information");
  wm.get(element); // "some information"
  ```

  注意：`WeakMap` 弱引用的只是键名，而不是键值。键值依然是正常引用

  下面代码中，键值`obj`会在`WeakMap`产生新的引用，当你修改`obj`不会影响到内部

  ```js
  const wm = new WeakMap();
  let key = {};
  let obj = { foo: 1 };

  wm.set(key, obj);
  obj = null;
  wm.get(key);
  // Object {foo: 1}
  ```

### 问题 6：你是怎么理解 ES6 中 Promise 的？使用场景？

**一、Promise 是什么**

处理多层异步操作，形成回调地狱，采用`Promise`

**特点**

- 对象的状态不受外界影响。
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

**优点**

- 链式操作减低了编码难度
- 代码可读性明显增强

**缺点**

- 无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。
- 如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。
- 当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

**注意**

- 执行器函数在内部是同步调用的
-

**二、用法**

`Promise`对象是一个构造函数，用来生成`Promise`实例

```javascript
const promise = new Promise(function (resolve, reject) {});
```

Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject。

- `resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”
- `reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”

**实例方法**

- then()
- catch()
- finally()

- then()

  `then`是实例状态发生改变时的回调函数，第一个参数是`resolved`状态的回调函数，第二个参数是`rejected`状态的回调函数；

  `then`方法返回的是一个新的`Promise`实例，也就是`promise`能链式书写的原因

  ```js
  getJSON("/posts.json")
    .then(function (json) {
      return json.post;
    })
    .then(function (post) {
      // ...
    });
  ```

- catch

  `catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定==发生错误时的回调函数==

  ```js
  getJSON("/posts.json")
    .then(function (posts) {
      // ...
    })
    .catch(function (error) {
      // 处理 getJSON 和 前一个回调函数运行时发生的错误
      console.log("发生错误！", error);
    });
  ```

  `Promise`对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。

  ```js
  getJSON("/post/1.json")
    .then(function (post) {
      return getJSON(post.commentURL);
    })
    .then(function (comments) {
      // some code
    })
    .catch(function (error) {
      // 处理前面三个Promise产生的错误
    });
  ```

  一般来说，使用`catch`方法代替`then()`第二个参数

  `Promise`对象抛出的错误不会传递到外层代码，即不会有任何反应。

  ```js
  const someAsyncThing = function () {
    return new Promise(function (resolve, reject) {
      // 下面一行会报错，因为x没有声明
      resolve(x + 2);
    });
  };
  ```

  浏览器运行到这一行，会打印出错误提示`ReferenceError: x is not defined`，但是不会退出进程

  `catch()`方法之中，还能再抛出错误，通过后面`catch`方法捕获到

- finally()

  `finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

  ```js
  promise
  .then(result => {···})
  .catch(error => {···})
  .finally(() => {···});
  ```

**构造函数方法**

`Promise`构造函数存在以下方法：

- all()
- race()
- allSettled()
- resolve()
- reject()
- try()

**三、使用场景**

图片加载

### 问题 7：Promise 各种手写？

### 一、知识点

#### 1. 定义

`Promise`对象用于表示一个**异步操作**的最终完成（或者失败）及其结果值，是异步编程的一种解决方案，比传统的解决方案（回调函数和事件）更合理、更强大。ES6 将其写进了语言标准，统一用法，提供了原生的`Promise`对象。

它可以把异步操作最终的成功返回值或失败原因和相应的处理程序关联起来。这样，异步方法并不会立即返回最终的值，而是会返回一个`Promise`。

一个`Promise`必然处于以下几种状态之一：

- `pending`：初始状态，未被兑现，也未被拒绝
- `fulfilled`：已兑现，操作完成
- `rejected`：已拒绝，操作失败

#### 2. 基本使用

`Promise`对象，通过`new`操作符来完成`Promise`的实例化，需要传入一个函数作为参数。`Promise`的状态是私有的，只能在内部进行操作。在传入的函数中，控制`Promise`的状态转换是通过调用它的两个函数参数实现的，通常命名为`resolve()`和`reject()`。调用`resolve()`将状态转换为`fulfilled`，调用`reject()`将状态转换为`rejected`。另外，调用`reject()`将**抛出错误**。

```js
new Promise((resolve, reject) => {
  const a = 1;
  if (a === 1) {
    resolve("fulfilled");
  } else {
    reject("rejected");
  }
}).then(
  (fulfilledValue) => console.log(fulfilledValue),
  (rejectedValue) => console.log(rejectedValue)
);
// fulfilled
```

代码中，通过 new 创建 Promise 实例，接收了一个箭头函数作为参数，函数接收`resolve()`和`reject()`两个参数，根据判断改变状态，在`Promise`后，调用了`then`方法，`then`方法接收`onResolved`和`onRejected`两个处理程序，分别对成功和失败的 Promise 进行处理。

如果`Promise`内部抛出错误，`then`方法会执行第二个处理程序`onReject`。

```js
new Promise(() => {
  throw "error";
}).then(null, (error) => console.log(error));
// error
```

#### 3. 原型方法

**1. Promise.prototype.then()**

作用是为`Promise`实例添加状态改变时的回调函数。

`then()`方法返回一个新的`Promise`，如上文所述，它**最多**需要两个参数：`Promise`的**成功**和**失败**的回调函数。因为`Promise`只能转换一次状态，所以这两个函数一定是**互斥**的。

`then`方法支持**链式调用**。

==返回一个新的`Promise`==，这个新`Promise`基于`onResolved`处理程序的返回值构建，即会通过`Promise.resolved()`包装来生成新`Promise()`。--》不管是`onResolved`还是`onReject`都会被`Promise.resolve()`包装。

具体情况如下，如果`then`中的回调函数：

- 没有显示的返回值，被`Promise.resolve()`包装，`then`返回的`Promise`是`fulfilled`状态，并且`fulfilled`状态的回调函数参数值是`undefined`。

  如下代码所示，由于第一个`then`没有返回任何值，所以第二个`then`的第一个回调函数的参数是`undefined`。

  ```js
  new Promise((resolve, reject) => {
    resolve(1);
    // reject(-1);
  })
    .then((value) => {
      console.log("fulfilledValue", value);
    })
    .then(
      (res) => {
        console.log("fulfilledValue", res);
      },
      (res) => {
        console.log("rejectedValue", res);
      }
    );
  // fulfilledValue 1
  // fulfilledValue undefined
  ```

- 返回了一个**值**，那么`then`返回的`Promise`是`fulfilled`状态，并将**返回的值**作为`fulfilled`状态的回调函数参数值。---》直接将值包装成成功状态，

  如下代码所示，最初的`Promise`状态是`fulfilled`，那么第一个`then`方法调用第一个回调函数，先打印出`1`，又返回了`'Jack'`，那么该`then`返回的`Promise`也是`fulfilled`状态，并且将`'Jack'`作为第二个`then`方法的回调函数参数。

  ```js
  new Promise((resolve, reject) => {
    resolve(1);
    // reject(-1);
  })
    .then((value) => {
      console.log("fulfilledValue", value);
      return "Jack";
    })
    .then(
      (res) => {
        console.log("fulfilledValue", res);
      },
      (res) => {
        console.log("rejectedValue", res);
      }
    );
  // fulfilledValue 1
  // fulfilledValue Jack
  ```

  把 Promise 改为`rejected`，也一样

- 抛出一个错误，那么`then`返回的`Promise`是`rejected`状态，并将**抛出的错误**作为`fulfilled`状态的回调函数参数值。--》也是`Promise.resolve()`包装的结果。

  ```js
  new Promise((resolve, reject) => {
    resolve(1);
    // reject(-1);
  })
    .then((value) => {
      console.log("fulfilledValue", value);
      throw "Error!";
    })
    .then(
      (res) => {
        console.log("fulfilledValue", res);
      },
      (res) => {
        console.log("rejectedValue", res);
      }
    );
  // fulfilledValue 1
  // rejectedValue Error!
  ```

- 返回一个`Promise`，不管是`fulfilled`还是`rejected`，都分别会接收前面`Promise`成功、失败的状态作为参数，并将自己执行的结果作为参数返回，传给下一个回调函数，执行`onreSolved`或`onRejected`处理程序。以`fulfilled`状态为例。

  ```js
  new Promise((resolve, reject) => {
    resolve(1);
    // reject(-1);
  })
    .then((value) => {
      console.log("fulfilledValue", value);
      return Promise.resolve("fulfilled");
    })
    .then(
      (res) => {
        console.log("fulfilledValue", res);
      },
      (res) => {
        console.log("rejectedValue", res);
      }
    );
  // fulfilledValue 1
  // fulfilledValue fulfilled
  ```

- 如果最初的`Promise`是`rejected`状态，且第一个`then`没有第二个函数参数，那么第二个`then`就会执行其第二个回调函数，并且参数为最初`Promise`的`reject`中的参数。-->也就是第一个 then 的`onRejected`处理程序没有执行，会原样向后传，后面的 then 执行处理程序，对失败的状态进行处理。

  ```javascript
  new Promise((resolve, reject) => {
    // resolve(1);
    reject(-1);
  })
    .then((value) => {
      console.log("fulfilledValue", value);
    })
    .then(null, (res) => {
      console.log("rejectedValue", res);
    });
  // rejectedValue -1
  ```

- 若调用`then`时不做任何处理，不传处理程序，则原样向后传;

  ```js
  new Promise((resolve, reject) => {
    resolve(1);
  })
    .then()
    .then((value) => {
      console.log("fulfilledValue", value);
    });
  // fulfilledValue 1
  ```

**2. Promise.prototype.catch()**

`Promise.prototype.catch()`方法用于给`Promise`添加拒绝处理程序。这个方法只接收一个参数：`onRejected`处理程序。它的行为与调用`Promise.prototype.then(undefined, onRejected)`相同。

如下代码，两种等价的写法。

```javascript
new Promise((resolve, reject) => {
  reject("error");
}).catch((error) => console.log(error));
// error
new Promise((resolve, reject) => {
  reject("error");
}).then(null, (error) => console.log(error));
// error
```

### 二、手写

- `then`方法返回结果，由回调函数的执行结果所决定

- 三个关键步骤

  改变状态、存储值、执行回调函数；

```js
// 覆盖原有的Promise

// 定义常量
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

// 声明构造函数
function Promise(executor) {
  // 保存实例对象this的值
  const self = this;
  // 初始属性
  self.PromiseState = PENDING;
  self.PromiseResult = null;
  self.callbacks = [];

  // 改变状态
  function resolve(value) {
    if (self.PromiseState !== PENDING) return;
    self.PromiseState = RESOLVED;
    self.PromiseResult = value;
    // 实现多次回调
    if (self.callbacks.length > 0) {
      setTimeout(() => {
        self.callbacks.forEach((callbackObj) => {
          callbackObj.onResolved(value);
        });
      }, 0);
    }
  }

  function reject(reason) {
    if (self.PromiseState !== PENDING) return;
    self.PromiseState = REJECTED;
    self.PromiseResult = reason;
    if (self.callbacks.length > 0) {
      setTimeout(() => {
        self.callbacks.forEach((callbackObj) => {
          callbackObj.onRejected(reason);
        });
      }, 0);
    }
  }

  // executor
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

// Promise.prototype.then()
Promise.prototype.then = function (onResolved, onRejected) {
  // 指定默认的成功的回调onResolved （向后传递成功的value）
  onResolved = typeof onResolved === "function" ? onResolved : (value) => value;
  // 指定默认的失败的回调onRejected（向后传递失败的reason 实现错误/异常传透的关键点）
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (reason) => {
          throw reason;
        };

  const self = this;
  // 返回一个Promise对象
  return new Promise((resolve, reject) => {
    // 返回的结果有三种,Promise/值/throw error
    function handle(callback) {
      const result = callback(self.PromiseResult);
      try {
        result instanceof Promise
          ? result.then(resolve, reject)
          : resolve(result);
      } catch (error) {
        reject(error);
      }
    }

    // 判断三种状态
    switch (self.PromiseState) {
      case PENDING:
        // 保存回调函数
        self.callbacks.push(
          {
            onResolved(value) {
              handle(onResolved);
            },
          },
          {
            onRejected(reason) {
              handle(onRejected);
            },
          }
        );
        break;
      case RESOLVED:
        setTimeout(() => {
          handle(onResolved);
        }, 0);
        break;
      case REJECTED:
        setTimeout(() => {
          handle(onRejected);
        }, 0);
        break;
      default:
        break;
    }
  });
};

// Promise.prototype.catch
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};

// Promise.resolve()  将现有对象转为 Promise对象
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    value instanceof Promise ? value.then(resolve, reject) : resolve(value);
  });
};
// 或者  上面简写更好
// Promise.resolve = function (value) {
//   // 返回一个成功/失败的promise
//   return new Promise((resolve, reject) => {
//     if (value instanceof Promise) { // value是promise => 使用value的结果作为promise的结果
//       value.then(v => {
//         resolve(v)
//       }, r => {
//         reject(r)
//       })
//     } else { // value不是promise => promise状态变为成功，数据是value
//       resolve(value)
//     }
//   })
// }

// Promise.reject()
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};

// Promise.all()
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const values = new Array(promises.length);
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        (value) => {
          // 防止数组中有不是promise的元素
          count++;
          values[i] = value;
          if (count === promises.length) resolve(values);
        },
        (reason) => {
          reject(reason);
        }
      );
    }
  });
};

// Promise.race()
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        (value) => {
          resolve(value);
        },
        (reason) => {
          reject(reason);
        }
      );
    }
  });
};
```

### 问题 8：你是怎么理解 ES6 中 Generator 的？使用场景？

Generator 函数是一种异步编程解决方案，是一个普通函数，不同之处在于：

- `function`关键字与函数名之间有一个星号

- 函数体内部使用`yield`表达式

- 采用`next`方法调用（🦈 只有调用 next 方法，生成器函数才会执行）

  调用遍历器对象的`next`方法，返回一个有着`value`和`done`两个属性的对象，`value`属性表示当前的内部状态的值，是`yield`表达式后面那个表达式的值；`done`属性是一个布尔值，表示是否遍历结束。

  - `next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值。

- `for...of`循环可以自动遍历 Generator 函数运行时生成的`Iterator`对象，且此时不再需要调用`next`方法。（🦈 不包含 return 语句后面的内容）

- 扩展运算符（`...`）、解构赋值和`Array.from`方法，都可以将 Generator 函数返回的 Iterator 对象，作为参数。

- 第一次调用`next`方法，相当于启动生成器函数，所以使用`throw`方法的前提是已经执行过一次`next`方法。

- Generator 函数返回的遍历器对象，还有一个`return()`方法，可以返回给定的值，并且终结遍历 Generator 函数。

### 问题 9：你是怎么理解 ES6 中 Proxy 的？使用场景?

### 问题 10：你是怎么理解 ES6 中 Module 的？使用场景？

### 问题 10：JS 中普通函数、匿名函数、构造函数、箭头函数、Generator 函数、async 函数的区别

**普通函数**
三种声明方式
直接声明

```js
// 1.直接声明
function f() {
  console.log("这是直接声明的");
}
//函数调用
f();
```

函数表达式声明

```js
//2.函数表达式
var test = function () {
  console.log("这是函数表达式声明");
};
// 函数调用
test();
```

构造函数声明

```js
//3.构造函数调用
var test = new Function("name", 'alert("hello,"+name)');
//最末尾的是函数体，其前面的都是参数
//函数调用
test("world");
```

特点

- this 指向调用者
- 如果在全局中调用就指向 window，如果绑定 DOM 元素事件就指向触发的元素。
- 普通函数的 this 在运行时创建，箭头函数的 this 是定义时确定。
  this 指向可以被 call/apply/bind 改变。
- 具有 prototype
- 函数内部包含一个默认的 arguments 参数数组，它返回函数所接收的所有参数
- 函数域始终高于全局域
- 默认返回 undefined

**匿名函数**
应用
- 立即执行函数
```js
(function () {
  alert("匿名函数执行方式一");
})();
```
- 绑定事件时的方法
```js
let item = document.getElementById("item");
item.onclick = function () {
  alert("我是输入框的点击事件");
};
```
- 函数表达式 将匿名函数赋值给一个变量
```js
let fun2 = function () {
  alert("这是一个函数表达式");
};
fun2();
```
- 对象里面的函数属性
```js
let obj = {
  name: "Year",
  age: 28,
  hobby: function () {
    return "我喜欢跳舞";
  },
};
alert(obj.hobby());
```
- 函数返回值，即将函数作为一个返回值
```js
//内部函数可以访问外部函数的所有变量
function box() {
  return function () {
    alert("函数作为返回值的应用");
  };
}
box()();
```
特点
表现为 function 后面不带名字的函数，但是可以用一个变量接收，通过执行这个变量来执行这个函数。
- this 指向 window
- 具有 prototype
- this 指向可以被 call/apply/bind 改变

**构造函数**
```js
function Person(name, job, age) {
  this.name = name;
  this.job = job;
  this.age = age;
  this.sayHi = function () {
    alert("Hi");
  };
}
```
特点
- 习惯上首字母大写
- 使用 new 关键字进行调用
- 构造函数用来新建实例对象
- 内部用 this 来构造属性和方法
- 构造函数在被调用之后会马上创建一个新对象，并将该对象作为返回值返回
- 具有 prototype

**箭头函数**
```js
// (参数1, 参数2, …, 参数N) =>{ return 表达式; }
// 当函数参数只有一个，括号可以省略；但是没有参数时，括号不可以省略。
a => {}
// 箭头函数有两种格式，一种只包含一个表达式，省略掉了{ ... }和return。还有一种可以包含多条语句，这时候就不能省略{ ... }和return
(a, b) => a + b

(a) => {
  a = a + 1
  return a
}
```
特点
- 箭头函数根本没有自己的this！！！导致内部的this就是外层代码块的this。因为没有this，所以不能用作构造函数。也不能使用call()、apply()、bind() 去改变this的指向。---> 🦈箭头函数内的this，就是箭头函数被定义(创建)时==所在作用域==的this
- 没有原型prototype
- 没有super用于访问原型属性。
- 不可以当作构造函数（也是因为没有this）
（因为构造函数的this永远指向被他实例化出来的对象，但是箭头函数无法对创建出来的实例进行this绑定）
不可以使用new命令，否则会抛出一个错误。
不能使用new.target关键字返回创建实例的构造函数(类)本身。
- 不可以使用arguments对象，该对象在函数体内不存在
如果要用，可以用rest参数代替。
- 不可以使用yield
因此箭头函数不能用作Generator函数。
- 箭头函数是匿名函数

**Generator函数**
```js
function* gen(x){
  console.log('x='+x)
  var y = yield x + 2;
  return y;
}
//调用Generator 函数
var g = gen(1);

g.next();
// x=1
// {value: 3, done: false}
```

ES6提供的一种异步编程的解决方案。可以理解成一个状态机，封装了多个内部的状态。执行函数会返回一个遍历器对象，可以依次遍历函数内部的每个状态。

- 形式上，Generator是一个普通函数。
  区别一是function命令和函数名之间有一个星号*
  区别二是函数体内部使用yield定义不同的状态。
- 调用上，也和普通函数一样，在函数名后面加上一对圆括号。
  不同的是，调用后函数并不执行，返回的也不是函数的运行结果，而是一个指向内部状态的指针对象。


**async函数**
```js
function getSomething() {
    return "something";
}
async function testAsync() {
    return Promise.resolve("hello async");
}
async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1, v2);
}
test();
// something hello async
```

ES2017标准引入了async函数，使异步操作变得更加方便。它是Generator函数的语法糖，将Generator函数的星号 * 替换成async，将yield替换成await。
相对于Generator函数的改进：
- 内置执行器
自带执行器，会自动执行。
- 更好的语义
async表示函数里面有异步操作，await表示紧跟在后面的表达式需要等待结果。
- 更广的适用性
yield命令后面只能是Thunk函数或Promise对象。
async函数的await命令后面既可以是Promise对象也可以是原始类型的值。
- 返回值是Promise
Generator函数返回值是Iterator对象，而async返回值是Promise对象。
可以用then方法指定下一步的操作。
