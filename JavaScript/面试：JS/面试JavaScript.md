# 牛客

## 1. 数据类型

1. 数据类型（了解symbol和bigint吗）
2. 基本数据类型和引用数据类型的区别
3. 判断数据类型方法
4. JS基本数据类型引用数据类型分别有哪些？
5. 基本数据类型之间的转换
6. typeof的使用 和 instanceof的区别
7. null和undefined的区别
8. 栈和堆

## 2. BOM、DOM

1. 如何避免 js 阻止 DOM 树渲染？
2. JS中数据经常不准确，比如：为什么0.1+0.2 ! == 0.3，如何让其相等？[答案](https://www.nowcoder.com/discuss/726027?channel=-1&source_id=profile_follow_post_nctrack)
3. DOM树上有10个节点，渲染树上一定有10个节点吗？



1. new 操作符干了什么事？
2. 声明变量的方式 const var let 的区别
3. const 声明生成对象的时候，如何使其不可更改
4. 防抖和节流

# 整理

## 1.数据类型

![1654396167299](JsImg/1654396167299.png)

### **🦈问题1：数据类型分类**

分为两大类，基本数据类型和引用数据类型。

基本类型：Number Boolean  String  undefined null （ES6新增了）Symbol BigInt

（对象）引用类型：Object  Function Array

ES6新增数据类型Symbol BigInt

- Symbol 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。---symbol类型：不可用作构造函数与new一起使用
- BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

### **🦈问题2：基本类型和引用类型的区别：**

* 存放位置：
  * 基本类型的数据是直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储，
  * 引用类型的数据是存放在堆内存中的，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。---基本类型保存的就是该基本类型数据，而引用类型保存的是地址值。

* 复制：

  * 基本类型的复制就是在栈内存中开辟出了一个新的存储区域用来存储新的变量，这个变量有它自己的值，只不过和前面的值一样，所以如果其中一个的值改变，则不会影响到另一个。
  * 引用类型定义一个对象其实是在栈内存中存储了一个指针，这个指针指向堆内存中该对象的存储地址。复制给另一个对象的过程其实是把该对象的地址复制给了另一个对象变量，两个指针都指向同一个对象实体，所以若其中一个修改了，则另一个也会改变。

  **扩展**

  堆和栈的概念存在于数据结构和操作系统内存中，在数据结构中：

  - 在数据结构中，栈中数据的存取方式为先进后出。
  - 堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。

  在操作系统中，内存被分为栈区和堆区：

  - 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。
  - 堆区内存一般由开发着分配释放，若开发者不释放，程序结束时可能由垃圾回收机制回收。

### **🦈问题3：typeof的使用 和 instanceof的区别**

* **typeof**
  `typeof`确定任意==变量==的数据类型；`typeof` 操作符返回一个字符串，表示未经计算的操作数的类型。

  ```js
  typeof 1 // 'number'
  typeof '1' // 'string'
  typeof undefined // 'undefined'
  typeof true // 'boolean'
  typeof Symbol() // 'symbol'
  typeof null // 'object'
  typeof [] // 'object'
  typeof {} // 'object'
  typeof console // 'object'
  typeof console.log // 'function'
  ```

  前6个都是基础数据类型，但是`null`返回'object'，所以不能使用`typeof()`去判断null，可以采用`===null`去判断是否为null。
  引用类型采用`typeof`去判断，除了`function可以识别，其他都会返回`object`

  **关于底层**

  js 在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息👉

  - 000：对象
  - 010：浮点数
  - 100：字符串
  - 110：布尔
  - 1：整数

  but, 对于 `undefined` 和 `null` 来说，这两个值的信息存储是有点特殊的。

  `null`：所有机器码均为0

  `undefined`：用 −2^30 整数来表示

  所以，`typeof` 在判断 `null` 的时候就出现问题了，由于 `null` 的所有机器码均为0，因此直接被当做了对象来看待。

* **instanceof**
  `instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。---（`instanceof`运算符返回一个布尔值，可以用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上，通俗说就是用于判断某个实例是否属于某构造函数。再通俗一点就是，只要右边变量的`prototype`在左边变量的原型链上就返回 true，否则返回 false）
  使用：

* ```react
  object instanceof constructor
  ```

  构造函数通过`new`可以实例对象，`instanceof`判断生成的实例对象是不是右边的构造函数所生成的实例对象。

  ```js
  // 定义构建函数
  let Car = function() {}
  let benz = new Car()
  benz instanceof Car // true
  let car = new String('xxx')
  car instanceof String // true
  let str = 'xxx'
  str instanceof String // false
  ```

  `instanceof`的==实现原理==：🦈右边变量的`prototype`是否在左边变量的原型链上

  ```js
  function myInstanceof(left, right) {
    // 这里先用typeof来判断基础数据类型，如果是，直接返回false
    if(typeof left !== 'object' || left === null) return false;
    // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
    let proto = Object.getPrototypeOf(left);
    while(true) {                  
      if(proto === null) return false;
      if(proto === right.prototype) return true;//找到相同原型对象，返回true
      proto = Object.getPrototypeof(proto);
    }
  }
  ```
  顺着原型链去找，直到找到相同的原型对象，返回`true`，否则为`false`。

  🦈这里可能会提问原型继承的原理？

  `__proto__`属性，可以访问对象的原型，即p1.__proto__ = Person.prototype

* **区别**

  * typeof会返回一个变量的基本类型，instanceof返回的是一个布尔值
  * instanceof 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型
  * 而typeof 也存在弊端，它虽然可以判断基础数据类型（null 除外），但是引用数据类型中，除了function 类型以外，其他的也无法判断。

  **通用数据类型检测**
  可以采用`Object.prototype.toString`，调用该方法，统一返回格式`“[object Xxx]”`的字符串。

  ```js
  Object.prototype.toString({})       // "[object Object]"
  Object.prototype.toString.call({})  // 同上结果，加上call也ok
  Object.prototype.toString.call(1)    // "[object Number]"
  Object.prototype.toString.call('1')  // "[object String]"
  Object.prototype.toString.call(true)  // "[object Boolean]"
  Object.prototype.toString.call(function(){})  // "[object Function]"
  Object.prototype.toString.call(null)   //"[object Null]"
  Object.prototype.toString.call(undefined) //"[object Undefined]"
  Object.prototype.toString.call(/123/g)    //"[object RegExp]"
  Object.prototype.toString.call(new Date()) //"[object Date]"
  Object.prototype.toString.call([])       //"[object Array]"
  Object.prototype.toString.call(document)  //"[object HTMLDocument]"
  Object.prototype.toString.call(window)   //"[object Window]"
  ```

  实现一个全局通用的数据类型判断方法（把typeof方法和instanceof方法结合起来）

  思路：先采用`typeof`去判断，能判断则直接返回，不能判断则采用`instanceof`去判断，采用正则表达式对判断结果进行调整。

  ```js
  function getType(obj){
    let type  = typeof obj;
    if (type !== "object") { // 先进行typeof判断，如果是基础数据类型，直接返回
      return type;
    }
    // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1'); 
  }
  ```

  使用

  ```js
  getType([])     // "Array" typeof []是object，因此toString返回
  getType('123')  // "string" typeof 直接返回
  getType(window) // "Window" toString返回
  getType(null)   // "Null"首字母大写，typeof null是object，需toString来判断
  getType(undefined)   // "undefined" typeof 直接返回
  getType()            // "undefined" typeof 直接返回
  getType(function(){}) // "function" typeof能判断，因此首字母小写
  getType(/123/g)      //"RegExp" toString返回
  ```


**小问题：**

* **typeof NaN 的结果是什么？'number'**

  NaN 指"不是一个数字”（not a number），NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”。

  ```javascript
  typeof NaN; // "number"
  ```

  NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 `x === x` 不成立）的值。而 NaN !== NaN 为 true。

* **isNaN 和 Number.isNaN 函数的区别**

  - 函数 isNaN 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。
  - 函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，==不会进行数据类型的转换==，这种方法对于 NaN 的判断更为准确。

### **🦈问题4：null 和 undefined 的差异**

- null 转为数字类型值为 0,而 undefined 转为数字类型为 NaN；（已声明但是值为空null）
- undefined 是代表调用一个值而该值却没有赋值，这时候默认则为 undefined；（声明变量但未赋值）
- null 是一个很特殊的对象，最为常见的一个用法就是作为参数传入(说明该参数不是对象）
- 初始赋值null，表明将要赋值为对象。
- 结束前，让对象成为垃圾对象，设置为 null 的变量或者对象会被内存收集器回收；垃圾回收
- 关于底层：`null`：所有机器码均为0。`undefined`：机器码用 −2^30 整数来表示

### 🦈问题5：`==`、`===`和 Object.is()的区别

- ==：等同，比较运算符，两边值类型不同的时候，先进行类型转换，再比较；
- ===：恒等，严格比较运算符，不做类型转换，类型不同就是不等；
- Object.is()是 ES6 新增的用来比较两个值是否严格相等的方法，与===的行为基本一致。
- 先说===，这个比较简单，只需要利用下面的规则来判断两个值是否恒等就行了：
  - 如果类型不同，就不相等
  - 如果两个都是数值，并且是同一个值，那么相等； 
  - 值得注意的是，如果两个值中至少一个是 NaN，那么不相等（判断一个值是否是 NaN，可以用 isNaN()、Number.isNaN()或 Object.is()来判断）。
  - 如果两个都是字符串，每个位置的字符都一样，那么相等；否则不相等。
  - 如果两个值都是同样的 Boolean 值，那么相等。
  - 如果两个值都引用同一个对象或函数，那么相等，即两个对象的物理地址也必须保持一致；否则不相等。
  - 如果两个值都是 null，或者都是 undefined，那么相等。
- 再说 Object.is()，其行为与===基本一致，不过有两处不同：
  - +0 不等于-0。
  - NaN 等于自身。

### 🦈问题6：JavaScript 中的包装类型

在JS中为我们提供了三个包装类，通过这三个包装类可以将基本数据类型的数据转换为对象。
String()可以将基本数据类型字符串转换为String对象
Number()可以将基本数据类型的数字转换为Number对象
Boolean()可以将基本数据类型的布尔值转换为Boolean对象

在 JavaScript 中，基本类型是没有属性和方法的，但是为了便于操作基本类型的值，在调用基本类型的属性或方法时 JavaScript 会在后台隐式地将基本类型的值转换为对象，如：

```
const a = "abc";
a.length; // 3
a.toUpperCase(); // "ABC"
```

在访问\'abc\'.length时，JavaScript 将'abc'在后台转换成String('abc')，然后再访问其length属性。
JavaScript也可以使用**Object**函数显式地将基本类型转换为包装类型：

```
var a = 'abc'
Object(a) // String {"abc"}
```

也可以使用**valueOf**方法将包装类型倒转成基本类型：

```
var a = 'abc'
var b = Object(a)
var c = b.valueOf() // 'abc'
```

看看如下代码会打印出什么：

```js
var a = new Boolean( false );
if (!a) {
	console.log( "Oops" ); // never runs
}
console.log(typeof(a))
// object
// undefined
```

答案是什么都不会打印，因为虽然包裹的基本类型是false，但是false被包裹成包装类型后就成了对象，所以其非值为false，所以循环体中的内容不会运行。

### 🦈问题7：判断数组的五种方法

**instanceof**

```JavaScript
const arr= []
arr instanceof Array // true
```

**Array.isArray**

```
const arr = []
Array.isArray(arr) // true

const obj = {}
Array.isArray(obj) // false
```

**Object.prototype.isPrototypeOf**

- 使用 Object 的原型方法 isPrototypeOf，判断两个对象的原型是否一样, `isPrototypeOf()` 方法用于测试一个对象是否存在于另一个对象的原型链上。

```
const arr = []
Object.prototype.isPrototypeOf(arr, Array.prototype) // true
```

**Object.getPrototypeOf**：`getPrototypeOf()` 方法返回指定对象的原型

```
const arr = []
Object.getPrototypeOf(arr) === Array.prototype // true
```

**Object.prototype.toString**

```
const arr = []
Object.prototype.toString.call(arr) === '[object Array]' // true

const obj = {}
Object.prototype.toString.call(obj) // "[object Object]"
```

- 为什么不直接用 obj.toString()呢？
  这是因为 toString 为 Object 的原型方法，而 Array，function 等类型作为 Object 的实例，都==重写了 toString 方法==。不同的对象类型调用 toString 方法时，根据原型链的知识，调用的是对应的重写之后的 toString 方法，而不会去调用 Object 上原型 toString 方法（返回对象的具体类型），所以采用 obj.toString()不能得到其对象类型，只能将 obj 转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用 Object 上原型 toString 方法。

### 🦈问题8：数组操作

**数组扁平化**
数组扁平化就是把多维数组转化成一维数组。

- flat()方法

  - 指定提取数组的嵌套层数，默认是1，Infinity可以提取任意深度
  - flat方法会自动移除空项（移除空格）

  ```js
  console.log([1 ,[2, 3]].flat()); // [1, 2, 3]
  // 指定转换的嵌套层数
  console.log([1, [2, [3, [4, 5]]]].flat(2)); // [1, 2, 3, [4, 5]]
  // 不管嵌套多少层
  console.log([1, [2, [3, [4, 5]]]].flat(Infinity)); // [1, 2, 3, 4, 5]
  // 自动跳过空位
  console.log([1, [2, , 3]].flat()); // [1, 2, 3]
  ```

- reduce + concat

  ```js
  arr.reduce((prev, cur) => prev.concat(cur), []);//这个仅能对二维数组进行铺平
  // 优化---采用递归
  // 定义一个flatten函数，判断如果是数组就一直递归
  function flatten(arr){
    return arr.reduce((prev, cur) => {
      return prev.concat(Array.isArray(cur) ? flatten(cur) : cur)
    },[])
  }
  ```

- 扩展运算符 + concat

  ```js
  // 二维
  const flattened = arr => [].concat(...arr);
  
  // 优化
  function flatten(arr){
  while(arr.some(item => Array.isArray(item))){
    arr = [].concat(...arr);
  }
  return arr;
  }
  
  const arr = [1, [2, [3, 4]]];
  console.log(flatten(arr));
  ```

**数组去重**
去除数组的重复元素

- 双重for循环

  ```js
  function Array_dfor(data) {
    const newArray = [];
    let isRepeat;
    for (let i = 0; i < data.length; i++) {
      isRepeat = false;
      for (let j = 0; j < newArray.length; j++) {
        if (data[i] === newArray[j]) {
          isRepeat = true;
          break;
        }
      }
      if (!isRepeat) {
        newArray.push(data[i]);
      }
    }
    return newArray;
  }
  ```

- includes()
  不存在就加入数组，存在直接跳过

  ```js
  function Array_includes(data) {
  var arr = [];
  for (var i = 0; i < data.length; i++) {
    if (!arr.includes(data[i])) {
      arr.push(data[i])
    }
  }
  return arr;
  ```

- index()
  同includes()

  ```js
  function Array_indexOf(data) {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      if (arr.indexOf(data[i]) === -1){
        arr.push(data[i])
      }
    }
    return arr;
  }
  ```

- reducer
  不存在该元素时，加入到数组，存在时直接返回前一计算结果的数组

  ```js
  let myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']
  let myArrayWithNoDuplicates = myArray.reduce(function (previousValue, currentValue) {
    if (previousValue.indexOf(currentValue) === -1) {// indexOf判断不存在该元素返回-1
      previousValue.push(currentValue)
    }
    return previousValue // 已经存在该元素，所以直接返回前一判断结果
  }, [])
  
  console.log(myArrayWithNoDuplicates)
  ```

- Map()

```js
function Array_Map(data) {
  const newArr = [];
  const tmp = new Map();
  for (var i = 0; i < data.length; i++) {
    if (!tmp.has(data[i])){
      tmp.set(data[i],1)
      newArr.push(data[i])
    }
  }
  return newArr;
}
```

- Set()

```js
function Array_set(data) {
  return Array.from(new Set(data))
}
```

## 2. BOM和DOM

### 基础知识点

* BOM
  浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的方法和接口。

  * location

    提供了当前窗口中加载文档的信息，以及通常的导航功能。

  * history 对象
    `history`对象主要用来操作浏览器`URL`的历史记录，可以通过参数向前，向后，或者向指定`URL`跳转

    - history.go() -- 前进或后退指定的页面数 history.go(num);
    - history.back() -- 后退一页
    - history.forward() -- 前进一页

  * Navigator
    `navigator` 对象主要用来获取浏览器的属性，区分浏览器类型。属性较多，且兼容性比较复杂。

    - navigator.userAgent -- 返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)
    - navigator.cookieEnabled -- 返回浏览器是否支持(启用)cookie

  * screen
    保存的纯粹是客户端能力信息，也就是浏览器窗口外面的客户端显示器的信息，比如像素宽度和像素高度

* DOM
  DOM 指的是文档对象模型，它指的是把文档当做一个对象，这个对象主要定义了处理网页内容的方法和接口。==DOM 表示由多层节点构成的文档，通过它开发者可以添加、删除和修改页面的各个部分。==