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

### 🦈问题1：说说你对BOM的理解，常见的BOM对象你了解哪些？

[参考](https://vue3js.cn/interview/JavaScript/BOM.html#%E4%B8%80%E3%80%81%E6%98%AF%E4%BB%80%E4%B9%88)

![img](JsImg/3e191c40-8089-11eb-85f6-6fac77c0c9b3.png)

### 🦈问题2：DOM常见的操作有哪些？

**![img](JsImg/a89c99a0-7fdc-11eb-ab90-d9ae814b240d.png)**
**操作**

`React`等框架出现后，我们通过操作数据来控制`DOM`（绝大多数时候），越来越少的去直接操作`DOM`。

- 创建节点
- 查询节点
- 更新节点
- 添加节点
- 删除节点

**创建节点**

* createElement

  创建新元素，接受一个参数，即要创建元素的标签名

```js
const divEl = document.createElement("div");
```

- createTextNode

  创建一个文本节点

```js
const textEl = document.createTextNode("content");
```

- createDocumentFragment

  用来创建一个文档碎片，它表示一种轻量级的文档，主要是用来存储临时节点，然后把文档碎片的内容一次性添加到`DOM`中

```js
const fragment = document.createDocumentFragment();
```

​	当请求把一个`DocumentFragment` 节点插入文档树时，插入的不是 `DocumentFragment`自身，而是它的所有子孙节点

- createAttribute

  创建属性节点，可以是自定义属性

```js
const dataAttribute = document.createAttribute('custom');
consle.log(dataAttribute);
```

**获取节点**

- querySelector

传入任何有效的`css` 选择器，即可选中单个 `DOM`元素（首个）：

```js
document.querySelector('.element')
document.querySelector('#element')
document.querySelector('div')
document.querySelector('[name="username"]')
document.querySelector('div + p > span')
```

如果页面上没有指定的元素时，返回 `null`

- querySelectorAll

返回一个包含节点子树内所有与之相匹配的`Element`节点列表，如果没有相匹配的，则返回一个空节点列表

```js
const notLive = document.querySelectorAll("p");
```

需要注意的是，该方法返回的是一个 `NodeList`的静态实例，它是一个静态的“快照”，而非“实时”的查询

关于获取`DOM`元素的方法还有如下，就不一一述说

```js
document.getElementById('id属性值');返回拥有指定id的对象的引用
document.getElementsByClassName('class属性值');返回拥有指定class的对象集合
document.getElementsByTagName('标签名');返回拥有指定标签名的对象集合
document.getElementsByName('name属性值'); 返回拥有指定名称的对象结合
document/element.querySelector('CSS选择器');  仅返回第一个匹配的元素
document/element.querySelectorAll('CSS选择器');   返回所有匹配的元素
document.documentElement;  获取页面中的HTML标签
document.body; 获取页面中的BODY标签
document.all[''];  获取页面中的所有元素节点的对象集合型
```

除此之外，每个`DOM`元素还有`parentNode`、`childNodes`、`firstChild`、`lastChild`、`nextSibling`、`previousSibling`属性，关系图如下图所示

![img](JsImg/c100f450-7fdc-11eb-ab90-d9ae814b240d.png)

**更新节点**

- innerHTML

不但可以修改一个`DOM`节点的文本内容，还可以直接通过`HTML`片段修改`DOM`节点内部的子树

```js
// 获取<p id="p">...</p >
var p = document.getElementById('p');
// 设置文本为abc:
p.innerHTML = 'ABC'; // <p id="p">ABC</p >
// 设置HTML:
p.innerHTML = 'ABC <span style="color:red">RED</span> XYZ';
// <p>...</p >的内部结构已修改
```

- innerText、textContent

自动对字符串进行`HTML`编码，保证无法设置任何`HTML`标签

```js
// 获取<p id="p-id">...</p >
var p = document.getElementById('p-id');
// 设置文本:
p.innerText = '<script>alert("Hi")</script>';
// HTML被自动编码，无法设置一个<script>节点:
// <p id="p-id">&lt;script&gt;alert("Hi")&lt;/script&gt;</p >
```

两者的区别在于读取属性时，`innerText`不返回隐藏元素的文本，而`textContent`返回所有文本

- style

`DOM`节点的`style`属性对应所有的`CSS`，可以直接获取或设置。遇到`-`需要转化为驼峰命名。

```js
// 获取<p id="p-id">...</p >
const p = document.getElementById('p-id');
// 设置CSS:
p.style.color = '#ff0000';
p.style.fontSize = '20px'; // 驼峰命名
p.style.paddingTop = '2em';
```

**添加节点**

- innerHTML

如果这个DOM节点是空的，例如，`<div></div>`，那么，直接使用`innerHTML = '<span>child</span>'`就可以修改`DOM`节点的内容，相当于添加了新的`DOM`节点

如果这个DOM节点不是空的，那就不能这么做，因为`innerHTML`会直接替换掉原来的所有子节点。

- appendChild

把一个子节点添加到父节点的最后一个子节点

举个例子

```js
<!-- HTML结构 -->
<p id="js">JavaScript</p >
<div id="list">
    <p id="java">Java</p >
    <p id="python">Python</p >
    <p id="scheme">Scheme</p >
</div>
```

添加一个`p`元素

```js
const js = document.getElementById('js')
js.innerHTML = "JavaScript"
const list = document.getElementById('list');
list.appendChild(js);
```

现在`HTML`结构变成了下面

```js
<!-- HTML结构 -->
<div id="list">
    <p id="java">Java</p >
    <p id="python">Python</p >
    <p id="scheme">Scheme</p >
    <p id="js">JavaScript</p >  <!-- 添加元素 -->
</div>
```

上述代码中，我们是获取`DOM`元素后再进行添加操作，这个`js`节点是已经存在当前文档树中，因此这个节点首先会从原先的位置删除，再插入到新的位置

如果动态添加新的节点，则先创建一个新的节点，然后插入到指定的位置

```js
const list = document.getElementById('list'),
const haskell = document.createElement('p');
haskell.id = 'haskell';
haskell.innerText = 'Haskell';
list.appendChild(haskell);
```

- insertBefore

把子节点插入到指定的位置，使用方法如下：

```js
parentElement.insertBefore(newElement, referenceElement)
```

子节点会插入到`referenceElement`之前

- setAttribute

在指定元素中添加一个属性节点，如果元素中已有该属性改变属性值

```js
const div = document.getElementById('id')
div.setAttribute('class', 'white');//第一个参数属性名，第二个参数属性值。
```

- 删除节点

删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的`removeChild`把自己删掉

```js
// 拿到待删除节点:
const self = document.getElementById('to-be-removed');
// 拿到父节点:
const parent = self.parentElement;
// 删除:
const removed = parent.removeChild(self);
removed === self; // true
```

删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置。

## 总结面试官系列

[参考地址](https://vue3js.cn/interview/)

### 问题1：数组的常用方法有哪些？

![img](JsImg/5842e560-67b6-11eb-85f6-6fac77c0c9b3.png)

**操作方法**

⭐⭐⭐需要留意的是哪些方法会对原数组产生影响，哪些方法不会。

* 增

  `push() unshift() splice() concat()`；只有cancat()方法不会对原数组产生影响。

  - push() 方法接收任意数量的参数，并将它们添加到数组末尾，返回数组的最新长度

    ```js
    let colors = []; // 创建一个数组
    let count = colors.push("red", "green"); // 推入两项
    console.log(count) // 2
    ```

  - unshift() unshift()在数组开头添加任意多个值，然后返回新的数组长度

  - splice() 传入三个参数，分别是开始位置、0（要删除的元素数量）、插入的元素，返回空数组

  - concat() 首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组，不会影响原始数组。---》生成的数组还是一维数组。

* 删

  `pop() shift() splice() slice()`；其中slice()方法不影响原数组。

  - pop() 用于删除数组的最后一项，同时减少数组的`length` 值，返回被删除的项。
  - shift() 用于删除数组的第一项，同时减少数组的`length` 值，返回被删除的项。
  - splice() 传入两个参数，分别是开始位置，删除元素的数量，返回包含删除元素的数组。
  - slice() slice() 用于创建一个包含原有数组中一个或多个元素的新数组，不会影响原始数组。接收两个参数，表示要复制的位置。`[)`左闭右开。

* 改
  修改原来数组的内容，常用`splice()`

  `splice() `传入三个参数，分别是开始位置，要删除元素的数量，要插入的任意多个元素，返回删除元素的数组，对原数组产生影响

* 查
  即查找元素，返回元素索引值或者元素值。

  - indexOf(value) 返回要查找的元素在数组中的位置，如果没找到则返回 -1

  - includes(value) 返回要查找的元素在数组中的位置，找到返回`true`，否则`false`

  - find() 返回第一个匹配的元素

    ```js
    const people = [
        {
            name: "Matt",
            age: 27
        },
        {
            name: "Nicholas",
            age: 29
        }
    ];
    people.find((element, index, array) => element.age < 28) // // {name: "Matt", age: 27}
    ```

**排序方法**

- reverse() 将数组元素方向反转。

  ```js
  let values = [1, 2, 3, 4, 5];
  values.reverse();
  alert(values); // 5,4,3,2,1
  ```

- sort()  升序、降序

**迭代方法**
都不改变原数组

- some() 对数组每一项都运行传入的测试函数，如果至少有1个元素返回 true ，则这个方法返回 true。

- every() 对数组每一项都运行传入的测试函数，如果所有元素都返回 true ，则这个方法返回 true

- forEach() 对数组每一项都运行传入的函数，没有返回值

  ```js
  let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
  numbers.forEach((item, index, array) => {
      // 执行某些操作
  });
  ```

- filter() 对数组每一项都运行传入的函数，函数返回 `true` 的项会组成数组之后返回。

- map() 对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组。

  ```js
  let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
  let mapResult = numbers.map((item, index, array) => item * 2);
  console.log(mapResult) // 2,4,6,8,10,8,6,4,2
  ```

### 问题2：JavaScript字符串的常用方法有哪些？

![img](JsImg/ceb6ebc0-65c1-11eb-ab90-d9ae814b240d.png)

**操作方法**

归纳为增、删、改、查，字符串的特点是一旦创建了，就不可变。

* 增
  创建字符串的一个副本，再进行操作。
  除了常用`+`以及`${}`进行字符串拼接之外，还可通过`concat`。

  - `concat()` 用于将一个或多个字符串拼接成一个新字符串

    ```js
    let stringValue = "hello ";
    let result = stringValue.concat("world");
    console.log(result); // "hello world"
    console.log(stringValue); // "hello"
    ```

* 删

  创建字符串的一个副本，再进行操作.

  - slice()

  - substr()

  - substring()
    都返回调用它们的字符串的一个子字符串，而且都接收一或两个参数。
    一个参数表示截取从该索引到末尾，两个参数，表示截取该区间内的元素。除了`substr()`是左闭右闭，其他都是左闭右开。

    ```js
    let stringValue = "hello world";
    console.log(stringValue.slice(3)); // "lo world"
    console.log(stringValue.substring(3)); // "lo world"
    console.log(stringValue.substr(3)); // "lo world"
    console.log(stringValue.slice(3, 7)); // "lo w"
    console.log(stringValue.substring(3,7)); // "lo w"
    console.log(stringValue.substr(3, 7)); // "lo worl"
    ```

* 改

  不是改变原字符串，创建字符串的一个副本，再进行操作。

  常见的有：

  - trim()、trimLeft()、trimRight() 删除前、后或前后所有空格符，再返回新的字符串；⭐注意，只处理前后的空格，中间的空格不处理。

    ```js
    let stringValue = " hello world ";
    let trimmedStringValue = stringValue.trim();
    console.log(stringValue); // " hello world "
    console.log(trimmedStringValue); // "hello world"
    ```

  - repeat() 接收一个整数参数，表示要将字符串复制多少次，然后返回拼接所有副本后的结果

    ```js
    let stringValue = "na ";
    let copyResult = stringValue.repeat(2) // na na 
    ```

  - padStart()、padEnd() 复制字符串，如果小于指定长度，则在相应一边填充字符，直至满足长度条件.

    ```js
    let stringValue = "foo";
    console.log(stringValue.padStart(6)); // " foo"
    console.log(stringValue.padStart(9, ".")); // "......foo"
    ```

  - toLowerCase()、 toUpperCase() 大小写转化

    ```js
    let stringValue = "hello world";
    console.log(stringValue.toUpperCase()); // "HELLO WORLD"
    console.log(stringValue.toLowerCase()); // "hello world"
    ```

* 查

  除了通过索引的方式获取字符串的值，还可通过：

  - chatAt() 返回给定索引位置的字符，由传给方法的整数参数指定

    ```js
    let message = "abcde";
    console.log(message.charAt(2)); // "c"
    ```

  - indexOf() 从字符串开头去搜索传入的字符串，并返回位置（如果没找到，则返回 -1 ）

    ```js
    let stringValue = "hello world";
    console.log(stringValue.indexOf("o")); // 4
    ```

  - startWith() 检查是否以指定字符串开头。

  - includes() 从字符串中搜索传入的字符串，并返回一个表示是否包含的布尔值

    ```js
    let message = "foobarbaz";
    console.log(message.startsWith("foo")); // true
    console.log(message.startsWith("bar")); // false
    console.log(message.includes("bar")); // true
    console.log(message.includes("qux")); // false
    ```

**转换方法**

`split` 把字符串按照指定的分割符，拆分成数组中的每一项

```js
let str = "12+23+34"
let arr = str.split("+") // [12,23,34]
```

**模板匹配方法**

针对正则表达式，字符串设计了几个方法：

- match() 接收一个参数，可以是一个正则表达式字符串，也可以是一个`RegExp`对象，返回数组.

  ```js
  let text = "cat, bat, sat, fat";
  let pattern = /.at/;
  let matches = text.match(pattern);
  console.log(matches[0]); // "cat"
  ```

- search() 接收一个参数，可以是一个正则表达式字符串，也可以是一个`RegExp`对象，找到则返回匹配索引，否则返回 -1

  ```js
  let text = "cat, bat, sat, fat";
  let pos = text.search(/at/);
  console.log(pos); // 1
  ```

- replace() 接收两个参数，第一个参数为匹配的内容，第二个参数为替换的元素（可用函数）;==替换第一个元素==

  ```js
  let text = "cat, bat, sat, fat";
  let result = text.replace("at", "ond");
  console.log(result); // "cond, bat, sat, fat"
  ```

### 问题3：谈谈 JavaScript 中的类型转换机制

![img](JsImg/2abd00a0-6692-11eb-85f6-6fac77c0c9b3.png)

**为什么会出现类型转换**

声明的时候数据类型不确定，只有到运行期间才会确定当前类型。

但是各种运算符对数据类型是有要求的，如果运算子的类型与预期不符合，就会触发类型转换机制。

常见的类型转换有：

- 强制转换（显示转换）
- 自动转换（隐式转换）

**显示转换**

常见方法`Number()`、`parseInt()`、`String()`、`Boolean()`、

- Number()

  将任意类型的值转化为数值。

  转换规则

  ![img](JsImg/915b7300-6692-11eb-ab90-d9ae814b240d.png)

  ```js
  Number(324) // 324
  
  // 字符串：如果可以被解析为数值，则转换为相应的数值
  Number('324') // 324
  
  // 字符串：如果不可以被解析为数值，返回 NaN
  Number('324abc') // NaN
  
  // 空字符串转为0
  Number('') // 0
  
  // 布尔值：true 转成 1，false 转成 0
  Number(true) // 1
  Number(false) // 0
  
  // undefined：转成 NaN
  Number(undefined) // NaN
  
  // null：转成0
  Number(null) // 0
  
  // 对象：通常转换成NaN(除了只包含单个数值的数组)
  Number({a: 1}) // NaN
  Number([1, 2, 3]) // NaN
  Number([5]) // 5
  ```

  `Number`转换的时候是很严格的，只要有一个字符无法转成数值，整个字符串就会被转为`NaN`

- parseInt()

  `parseInt`相比`Number`，就没那么严格了，`parseInt`函数逐个解析字符，遇到不能转换的字符就停下来。

  ```js
  parseInt('32a3') //32
  ```

- String()

  可以将任意类型的值转化成字符串。

  转换规则图：

  ![img](JsImg/48dd8eb0-6692-11eb-85f6-6fac77c0c9b3.png)

  ```js
  // 数值：转为相应的字符串
  String(1) // "1"
  
  //字符串：转换后还是原来的值
  String("a") // "a"
  
  //布尔值：true转为字符串"true"，false转为字符串"false"
  String(true) // "true"
  
  //undefined：转为字符串"undefined"
  String(undefined) // "undefined"
  
  //null：转为字符串"null"
  String(null) // "null"
  
  //对象
  String({a: 1}) // "[object Object]"
  String([1, 2, 3]) // "1,2,3"
  ```

- Boolean()

  可以将任意类型的值转为布尔值，转换规则如下：

  ![img](JsImg/53bdad10-6692-11eb-ab90-d9ae814b240d.png)

  ```js
  Boolean(undefined) // false
  Boolean(null) // false
  Boolean(0) // false
  Boolean(NaN) // false
  Boolean('') // false
  Boolean({}) // true
  Boolean([]) // true
  Boolean(new Boolean(false)) // true
  ```

**隐式转换**

两种发生隐式转换的场景

- 比较运算（`==`、`!=`、`>`、`<`）、`if`、`while`需要布尔值地方
- 算术运算（`+`、`-`、`*`、`/`、`%`）

除了上面的场景，还要求运算符两边的操作数不是同一类型

* **自动转换为布尔值**

  在需要布尔值的地方，就会将非布尔值的参数自动转为布尔值，系统内部会调用`Boolean`函数

  可以得出个小结：

  - undefined
  - null
  - false
  - +0
  - -0
  - NaN
  - ""

  除了上面几种会被转化成`false`，其他都换被转化成`true`

* **自动转换成字符串**

  遇到预期为字符串的地方，就会将非字符串的值自动转为字符串

  ==具体规则是：==先将复合类型的值转为原始类型的值，再将原始类型的值转为字符串

  常发生在`+`运算中，一旦存在字符串，则会进行字符串拼接操作

  ```js
  '5' + 1 // '51'
  '5' + true // "5true"
  '5' + false // "5false"
  '5' + {} // "5[object Object]"
  '5' + [] // "5"
  '5' + function (){} // "5function (){}"
  '5' + undefined // "5undefined"
  '5' + null // "5null"
  ```

* **自动转换成数值**

  除了`+`有可能把运算子转为字符串，其他运算符都会把运算子自动转成数值

  ```js
  '5' - '2' // 3
  '5' * '2' // 10
  true - 1  // 0
  false - 1 // -1
  '1' - 1   // 0
  '5' * []    // 0
  false / '5' // 0
  'abc' - 1   // NaN
  null + 1 // 1
  undefined + 1 // NaN
  ```

  `null`转为数值时，值为`0` 。`undefined`转为数值时，值为`NaN`

### 问题4：== 和 ===区别，分别在什么情况使用

![img](JsImg/51b208f0-68df-11eb-85f6-6fac77c0c9b3.png)

**等于操作符`==`**

操作符（==）在比较中会先进行类型转换，再确定操作数是否相等。

遵循的转换规则：

如果任一操作数是布尔值，则将其转换为数值再比较是否相等

```js
let result1 = (true == 1); // true
```

如果一个操作数是字符串，另一个操作数是数值，则尝试将字符串转换为数值，再比较是否相等

```js
let result1 = ("55" == 55); // true
```

如果一个操作数是对象，另一个操作数不是，则调用对象的 `valueOf()`方法取得其原始值，再根据前面的规则进行比较

```js
let obj = {valueOf:function(){return 1}}
let result1 = (obj == 1); // true
```

`null`和`undefined`相等

```js
let result1 = (null == undefined ); // true
```

如果有任一操作数是 `NaN` ，则相等操作符返回 `false`

```js
let result1 = (NaN == NaN ); // false
```

如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回`true`

```text
let obj1 = {name:"xxx"}
let obj2 = {name:"xxx"}
let result1 = (obj1 == obj2 ); // false
```

下面进一步做个小结：

- 两个都为简单类型，字符串和布尔值都会转换成==数值==，再比较。
- 简单类型与引用类型比较，对象转化成其原始类型的值，再比较
- 两个都为引用类型，则比较它们是否指向同一个对象
- null 和 undefined 相等
- 存在 NaN 则返回 fals

**全等操作符`===`**

全等操作符由 3 个等于号（ `===` ）表示，只有两个操作数在不转换的前提下相等才返回 `true`。即类型相同，值也需相同。==先对数据类型进行判断再对值进行.==

```js
let result1 = ("55" === 55); // false，不相等，因为数据类型不同
let result2 = (55 === 55); // true，相等，因为数据类型相同值也相同
```

`undefined` 和 `null` 与自身严格相等

```js
let result1 = (null === null)  // true
let result2 = (undefined === undefined)  // true
```

```js
console.log(NaN === NaN) // false
```

**区别 **

* 相等操作符（`==`）会做类型转换，再进行值的比较，全等运算符不会做类型转换

```js
let result1 = ("55" === 55); // false，不相等，因为数据类型不同
let result2 = (55 === 55); // true，相等，因为数据类型相同值也相同
```

* `null` 和 `undefined` 比较不同，相等操作符（==）为`true`，全等为`false`.

```
let result1 = (null == undefined ); // true
let result2 = (null  === undefined); // false
```

**小结**

建议除了在比较对象属性为`null`或者`undefined`的情况下，我们可以使用相等操作符（`==`），其他情况建议一律使用全等操作符（`===`）。

### 问题5： 深拷贝浅拷贝的区别？如何实现一个深拷贝？

![img](JsImg/cdf952e0-69b8-11eb-85f6-6fac77c0c9b3.png)

**数据类型存储**

两大数据类型，基本数据类型和引用数据类型，基本数据类型存放在栈内存中，存放的就是值；而引用数据类型存放在堆内存中，栈内存中存放中引用堆内存实际对象的引用地址值，指向堆内存。

**浅拷贝**

浅拷贝，指的是创建新的数据，这个数据有着原始数据属性值的一份精确拷贝

如果==属性是基本类型，拷贝的就是基本类型的值==。如果==属性是引用类型，拷贝的就是内存地址==。

即浅拷贝是拷贝一层，深层次的引用类型则共享内存地址。

* 实现一个简单的对象浅拷贝

  ```js
  function shallowClone(obj){
    const newObj = new ();
    for(let prop in obj){
      if(obj.hasProperty(prop)){
        newObj[prop] = obj[prop]
      }
    }
    return newObj;
  }
  ```

在`JavaScript`中，存在浅拷贝的现象有：

1. `Object.assign`
2. `Array.prototype.slice()`, `Array.prototype.concat()`
3. 使用拓展运算符实现的复制。

- `Object.assign(target, source)`

  将可枚举和自由属性从一个或多个源对象复制到目标对象。---》源对象是我们要拷贝的对象。
  如果目标对象与源对象key值（属性值）相同，则把源对象的属性覆盖掉目标对象的属性。--》相同属性就替换。

  `Object.assign()` 只复制属性值，对于引用类型，如果把源对象堆内存中的内容改变，所复制到的目标对象值也会改变。⭐？？？会改变吗？？？==修改对象属性会影响原对象==

  ```js
  // 浅拷贝 数值、数组、对象、函数
  var obj = {
    num: 5,
    arr:[1, 2, 3],
    object:{
      name:bob,
      age:5
    },
    fun:function(){
      console.log('属性值是一个函数')
    }
  }
  var newObj = Object.assign({}, obj) // 把源对象obj浅拷贝给{}
  ```

- `Array.prototype.slice()`法返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝**（包括 `begin`，不包括`end`）。原始数组不会被改变。--》就是截取原数组的一段新生成一个浅拷贝的数组。

  接收两个参数

  ```js
  const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
  
  console.log(animals.slice(2));
  // expected output: Array ["camel", "duck", "elephant"]
  console.log(animals.slice(2, 4));
  // expected output: Array ["camel", "duck"]
  ```

- `Array.prototype.concat()` 用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

  ```js
  const array1 = ['a', 'b', 'c'];
  const array2 = ['d', 'e', 'f'];
  const array3 = array1.concat(array2);
  
  console.log(array3);
  // expected output: Array ["a", "b", "c", "d", "e", "f"]
  ```

- 扩展运算符`...`  

  - 运算符将一个数组，变为参数序列。

  - 替代apply()将数组转为函数的参数

    ```js
    const arr = [html, css, js]
    const newArr = [...arr, react]
    console.log(newArr) // [html, css, js, react]
    ```

**深拷贝**

深拷贝开辟一个新的栈，两个对象属性完全相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性。

常见的深拷贝方式有：

1. _.cloneDeep()
2. JSON.stringify()
3. 手写循环递归

* _.cloneDeep()

  ```js
  const _ = require('lodash');
  const obj1 = {
      a: 1,
      b: { f: { g: 1 } },
      c: [1, 2, 3]
  };
  const obj2 = _.cloneDeep(obj1);
  console.log(obj1.b.f === obj2.b.f);// false
  ```

- JSON.stringify()

  - 不支持 Symbol，BigInt，Function；忽略`undefined`、`symbol`和`函数`
  - 不支持 循环引用
  - 丢失值为 undefined 的键

  ```js
  const obj2=JSON.parse(JSON.stringify(obj1));
  ```

  ```js
  const obj = {
      name: 'A',
      name1: undefined,
      name3: function() {},
      name4:  Symbol('A')
  }
  const obj2 = JSON.parse(JSON.stringify(obj));
  console.log(obj2); // {name: "A"}
  ```

- 循环递归

  ```js
  function deepClone(obj, hash = new WeakMap()) {
    if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
    if (typeof obj !== "object") return obj;
    // 是对象的话就要进行深拷贝
    if (hash.get(obj)) return hash.get(obj);
    let cloneObj = new obj.constructor();
    // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
    hash.set(obj, cloneObj);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 实现一个递归拷贝
        cloneObj[key] = deepClone(obj[key], hash);
      }
    }
    return cloneObj;
  }
  ```



**区别**

![img](JsImg/d9862c00-69b8-11eb-ab90-d9ae814b240d.png)

- 浅拷贝只复制属性指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存，修改对象属性会影响原对象
- 深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象

**小结**

前提为拷贝类型为引用类型的情况下：

- 浅拷贝是拷贝一层，属性为对象时，浅拷贝是复制，两个对象指向同一个地址
- 深拷贝是递归拷贝深层次，属性为对象时，深拷贝是新开栈，两个对象指向不同的地址