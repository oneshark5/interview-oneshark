# ES6

## 一、面经收集



## 二、面试官系列

### 问题1：说说var、let、const之间的区别

**1. var**

在ES5中，顶层对象的属性和全局变量是等价的，用`var`声明的变量既是全局变量，也是顶层变量；

注意：顶层对象，在浏览器环境指的是`window`对象，在 `Node` 指的是`global`对象；即在浏览器中采用`var`声明的变量为全局变量，是顶层window对象的属性。

```js
var a = 10;
console.log(window.a) // 10
```

- 使用`var`声明的变量存在==变量提升==的情况

- 使用`var`，我们能够对一个变量进行多次声明，后面声明的变量会覆盖前面的变量声明

- 在函数作用域中采用`var`声明变量，变量不会超过该作用域，但是直接采用`a = 25`赋值，则该变量就变成全局变量。

  ```js
  var a = 20
  function change(){
      var a = 30
  }
  change()
  console.log(a) // 20 
  
  // 不适用var
  var a = 20
  function change(){
     a = 30
  }
  change()
  console.log(a) // 30 
  ```

**2. let**

- 所声明的变量，只在`let`命令所在的代码块内有效，==不存在变量提升==。

  ```js
  {
      let a = 20
  }
  console.log(a) // ReferenceError: a is not defined.
  // 若在未声明之前使用，则报错
  console.log(b) // 报错ReferenceError
  let b = 2
  ```

- 暂时性死区：使用`let`声明变量前，该变量都不可用；只要块级作用域内存在`let`命令，这个区域就不再受外部影响。

  ```js
  // 在块作用域中提前使用了a变量，但是存在let的地方不会，变量未声明就不可用，所以不会使用到全局作用域中的 a
  var a = 123
  if (true) {
      a = 'abc' // ReferenceError
      let a;
  }
  ```

- `let`不允许在==相同作用域中==重复声明。

  ```js
  // 相同作用域中出现同一声明才会报错，像这种不同作用域不会报错
  let a = 20
  {
      let a = 30
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

- `const`实际上保证的并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动

- 对于复杂类型的数据，变量指向的内存地址，保存的只是一个指向实际数据的指针，`const`只能保证这个指针是固定的，并不能确保改变量的结构不变。🦈如果是复杂类型，`const`保存的指向数据的指针是不变的，而数据自己的结构是可以改变的。

  ```js
  const foo = {};
  
  // 为 foo 添加一个属性，可以成功
  foo.prop = 123;
  foo.prop // 123
  
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

🦈采用`let`和`const`声明的变量，在声明之前不可用。

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

### 问题2：数组新增了哪些扩展？

**1. 扩展运算符**

`...`将数组转为参数序列。

- 主要用于函数调用的时候，将一个数组变为参数序列；🦈把数组中的元素取出（转成参数序列）作为参数传给函数。

- 复制数组

  扩展运算符会克隆一个全新的数组，对于新旧数组更改自己的元素，不会影响到另外一个数组。

  🦈所以采用扩展运算符复制数组时，是在栈内存中开辟了一个新的空间，形成了一个新的数组。新旧数组互补干扰

  ```js
  const a1 = [1, 2];
  // 写法一
  const a2 = [...a1];
  // 写法二
  const [...a2] = a1;
  
  // 复制后，更改属任一数组，都不会影响到另外一个数组
  a1[0] = 5
  console.log(a1) // [5, 2]
  console.log(a2) // [1, 2]
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
  [...'hello']
  // [ "h", "e", "l", "l", "o" ]
  ```



**2. 构造函数新增方法**

- `Array.from()`

  将两类对象转为真正的数组：类似数组的对象和可遍历`（iterable）`的对象（包括 `ES6` 新增的数据结构 `Set` 和 `Map`）

  ```js
  let arrayLike = {
      '0': 'a',
      '1': 'b',
      '2': 'c',
      length: 3
  };
  let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
  ```

  还可以接受第二个参数，用来对每个元素进行处理，将处理后的值放入返回的数组

  ```js
  Array.from([1, 2, 3], (x) => x * x)
  // [1, 4, 9]
  ```

- `Array.of()`

  🦈将参数序列转为数组

  用于将一组值，转换为数组

  ```js
  Array.of(3, 11, 8) // [3,11,8]
  ```

  没有参数的时候，返回一个空数组

  当参数只有一个的时候，实际上是指定数组的长度

  参数个数不少于 2 个时，`Array()`才会返回由参数组成的新数组

  ```js
  Array() // []
  Array(3) // [, , ,]
  Array(3, 11, 8) // [3, 11, 8]
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
  [1, 2, 3, 4, 5].copyWithin(0, 3) // 将从 3 号位直到数组结束的成员（4 和 5），复制到从 0 号位开始的位置，结果覆盖了原来的 1 和 2
  // [4, 5, 3, 4, 5] 
  ```

- find()、findIndex()

  `find()`用于找出第一个符合条件的数组成员

  参数是一个回调函数，接受三个参数依次为当前的值、当前的位置和原数组

  ```js
  [1, 5, 10, 15].find(function(value, index, arr) {
    return value > 9;
  }) // 10
  ```

  ```
  findIndex`返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1
  [1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
  }) // 2
  ```

  这两个方法都可以接受第二个参数，用来绑定回调函数的`this`对象。

  ```js
  function f(v){
    return v > this.age;
  }
  let person = {name: 'John', age: 20};
  [10, 12, 26, 15].find(f, person);    // 26
  ```

- fill()

  使用给定值，填充一个数组

  ```javascript
  ['a', 'b', 'c'].fill(7)
  // [7, 7, 7]
  
  new Array(3).fill(7)
  // [7, 7, 7]
  ```

  还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置

  ```js
  ['a', 'b', 'c'].fill(7, 1, 2)
  // ['a', 7, 'c']
  ```

  注意，如果填充的类型为对象，则是浅拷贝

- entries()，keys()，values()

  `keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历

- includes()

  用于判断数组是否包含给定的值，返回布尔值，方法的第二个参数表示搜索的起始位置，默认为`0`

  参数为负数则表示倒数的位置

  ```js
  [1, 2, 3].includes(2)     // true
  [1, 2, 3].includes(4)     // false
  [1, 2, NaN].includes(NaN) // true
  
  [1, 2, 3].includes(3, 3);  // false
  [1, 2, 3].includes(3, -1); // true
  ```

- flat()，flatMap()

  `flat()`将数组扁平化处理，返回一个新数组，对原数据没有影响

  `flatMap()`方法对原数组的每个成员执行一个函数相当于执行`Array.prototype.map()`，然后对返回值组成的数组执行`flat()`方法。该方法返回一个新数组，不改变原数组

  ```js
  // 相当于 [[2, 4], [3, 6], [4, 8]].flat()
  [2, 3, 4].flatMap((x) => [x, x * 2])
  // [2, 4, 3, 6, 4, 8]
  ```

  `flatMap()`方法还可以有第二个参数，用来绑定遍历函数里面的`this`

**4. 数组的空位**

数组的空位指，数组的某一个位置没有任何值

ES6 则是明确将空位转为`undefined`，包括`Array.from`、扩展运算符、`copyWithin()`、`fill()`、`entries()`、`keys()`、`values()`、`find()`和`findIndex()`

**5. sort()排序算法稳定性**

将`sort()`默认设置为稳定的排序算法。

### 问题3：对象新增了哪些扩展？

**一、属性简写**

**二、属性名表达式**

- ES6 允许字面量定义对象时，将表达式放在括号内
- 表达式还可以用于定义方法名
- 注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串`[object Object]`

**三、super关键字**

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
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
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

### 问题4：对象新增了哪些扩展？

**一、参数**

- `ES6`允许为函数的参数设置默认值
- 函数的形参是默认声明的，不能使用`let`或`const`再次声明
- 参数默认值可以与解构赋值的默认值结合起来使用
- 参数默认值可以与解构赋值的默认值结合起来使用

**二、属性**

函数的length属性

- `length`将返回没有指定默认值的参数个数
- `rest` 参数也不会计入`length`属性
- 如果设置了默认值的参数不是尾参数，那么`length`属性也不再计入后面的参数了

name属性

- 返回该函数的函数名

- 如果将一个具名函数赋值给一个变量，则 `name`属性都返回这个具名函数原本的名字

  ```js
  const bar = function baz() {};
  bar.name // "baz"
  ```

- `Function`构造函数返回的函数实例，`name`属性的值为`anonymous`

- `bind`返回的函数，`name`属性值会加上`bound`前缀

  ```javascript
  function foo() {};
  foo.bind({}).name // "bound foo"
  
  (function(){}).bind({}).name // "bound "
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

- 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象
- 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误
- 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替
- 不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数

### 问题5：你是怎么理解ES6新增Set、Map两种数据结构的？

如果要用一句来描述，我们可以说

`Set`是一种叫做集合的数据结构，`Map`是一种叫做字典的数据结构

- 集合
  是由一堆无序的、相关联的，且不重复的内存结构【数学中称为元素】组成的组合
- 字典
  是一些元素的集合。每个元素有一个称作key 的域，不同元素的key 各不相同

区别？

- 共同点：集合、字典都可以存储不重复的值
- 不同点：集合是以[值，值]的形式存储元素，字典是以[键，值]的形式存储

**关于WeakSet和WeakMap**

- **WeakSet**

  创建`WeakSet`实例

  ```js
  const ws = new WeakSet();
  ```

  `WeakSet`可以接受一个具有 `Iterable`接口的对象作为参数

  ```js
  const a = [[1, 2], [3, 4]];
  const ws = new WeakSet(a);
  // WeakSet {[1, 2], [3, 4]}
  ```

  在`API`中`WeakSet`与`Set`有两个区别：

  - 没有遍历操作的`API`
  - 没有`size`属性

  `WeackSet`只能成员只能是引用类型，而不能是其他类型的值

  ```js
  let ws=new WeakSet();
  
  // 成员不是引用类型
  let weakSet=new WeakSet([2,3]);
  console.log(weakSet) // 报错
  
  // 成员为引用类型
  let obj1={name:1}
  let obj2={name:1}
  let ws=new WeakSet([obj1,obj2]); 
  console.log(ws) //WeakSet {{…}, {…}}
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
  const key = {foo: 1};
  wm1.set(key, 2);
  wm1.get(key) // 2
  
  // WeakMap 也可以接受一个数组，
  // 作为构造函数的参数
  const k1 = [1, 2, 3];
  const k2 = [4, 5, 6];
  const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
  wm2.get(k2) // "bar"
  ```

  `WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名

  ```javascript
  const map = new WeakMap();
  map.set(1, 2)
  // TypeError: 1 is not an object!
  map.set(Symbol(), 2)
  // TypeError: Invalid value used as weak map key
  map.set(null, 2)
  // TypeError: Invalid value used as weak map key
  ```

  `WeakMap`的键名所指向的对象，一旦不再需要，里面的键名对象和所对应的键值对会自动消失，不用手动删除引用

  举个场景例子：

  在网页的 DOM 元素上添加数据，就可以使用`WeakMap`结构，当该 DOM 元素被清除，其所对应的`WeakMap`记录就会自动被移除

  ```javascript
  const wm = new WeakMap();
  
  const element = document.getElementById('example');
  
  wm.set(element, 'some information');
  wm.get(element) // "some information"
  ```

  注意：`WeakMap` 弱引用的只是键名，而不是键值。键值依然是正常引用

  下面代码中，键值`obj`会在`WeakMap`产生新的引用，当你修改`obj`不会影响到内部

  ```js
  const wm = new WeakMap();
  let key = {};
  let obj = {foo: 1};
  
  wm.set(key, obj);
  obj = null;
  wm.get(key)
  // Object {foo: 1}
  ```

### 问题6：你是怎么理解ES6中 Promise的？使用场景？



### 问题7：Promise各种手写？

