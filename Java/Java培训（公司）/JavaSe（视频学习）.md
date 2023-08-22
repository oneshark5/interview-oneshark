# JavaSe基础知识点整理

## 第一章：概述
开发的环境是JDK，运行的环境是JRE。
核心机制

- Java虚拟机（JVM）
- 垃圾回收机制（GC Garbage Collection ）
JDK软件开发包
JRE运行环境
（分两步，编译+运行）
🦈一个源文件只能有一个public类
🦈java程序的执行入口是main方法，也称为主方法
```java
public static void main(String args[]){
  ...
}
```
🦈public所定义的类，文件命名必须与该类名一致


## 第二章：Java语言基础
1. 标识符
局部变量：方法或语句块内部定义的变量。（方法的参数也是局部变量）
成员变量：方法外部、类的内部定义的变量。
2. 关键字
3. Java数据类型
Java的数据类型分为两大类
- 基本数据类型：包括`整数`、`浮点数`、`字符`、`布尔`。四种
- 引用数据类型：包括`类`、`接口`、`字符串`、`数组`。
基本数据类型又分为四类八种：
整数型：`字节型 byte`、`短整型 short`、`整型 int`、`长整型 long`。
浮点型：`单精度浮点数 float`、`双精度浮点数 double`。
字符型：`字符型 char`。
布尔型：`boolean`。

数据类型转换
基本数据类型转换
- boolean布尔型不可以转换为其他数据类型。
- 其他三种类型（整数型、浮点型、字符型）在运算时可以互相转换
  - 容量小的类型自动转换为容量大的数据类型
    - 容量从小到大的排序为：byte,short,char --> int --> long --> float --> double.
    - ⭐byte、short、char之间不能相互转换，他们之间计算时首先转换为int类型。
  - 容量大到小的数据类型转换要加上强制转换符（可能会造成精度降低或溢出）。
  - 多种数据类型混合运算，系统自动将所有数据类型转换为最大的那一种数据类型。
  - 实数（如1.5）默认为double，整数（如125）默认为int类型。
4. 运算符
- 算术运算符：
- 关系运算符：
- 逻辑运算符：
- 位运算符：
- 赋值运算符：`=`
- 扩展赋值运算符：`+=`、`-=`、`*=`、`/=`。
- 字符串连接运算符：+。
5. 表达式和语句
**表达式**
表达式：是符合一定语法规则的运算符和操作数的序列。（不需要记） 1+1，5.0 + a
表达式的运算顺序：按照运算符的优先级从高到低的顺序进行。（实际操作中直接加括号就行`()`）
三目条件运算符：
- 语法格式：x ? y : z;`（如：x > 60 ? "及格" : "不及格"）`
**语句**
条件语句：
```java
if(){}
if(){}else{}
if(){}else if(){}
while(){}
do{}while(); // ⭐do while语句中最后一定要加 ; 
```
循环语句：
- for循环
```java
  for(int i=0; i<arr.length; i++){

  }
```
- break语句:用于终止某个语句块的执行。（强制退出循环，不再执行该语句）---类似于stop
```java
  for(int i=0; i<arr.length; i++){
    if(i = 5){
      break;// 退出循环，不再执行
    }
  }
```
- continue语句：用于终止某次循环过程，跳过循环体中continue语句下面未执行的循环，开始下一次循环过程---类似于skip
```java
  for(int i=0; i<arr.length; i++){
    if(i = 5){
      continue;// 跳过当前循环，执行下一次循环。
    }
  }
```
6. 方法
🦈类似js语言的函数，一段完成特定功能的代码片段。
声明格式：
```java
[修饰符1 修饰符2...] 返回值类型 方法名(形式参数列表){
  Java语句;
}
class people {
  // ⭐举例：（main）主方法
  public static void main (String[] args) {
    ...
  }
  // or
  public static String getName (String[] str){
    Java语句;
    return name;
  }
}
```
- 方法的调用方式：对象名.方法名(实参列表);
- Java中在进行函数调用时，传递的参数遵循值传递的原则：基本类型传递的是该数据值本身，引用类型传递的是对==对象的引用==，而不是对象本身。
7. 变量的作用域
成员变量和局部变量
8. 递归调用

⭐理解程序执行过程

## 第三章：面向对象编程
1. 概念
类：是描述同一类型对象的一个抽象的概念，是一组相关属性和行为的集合。
对象：是一类事务的具体体现，是类的一个实例。
2. 对象和引用
对象可以看成是静态属性（成员变量）和动态属性（方法）的封装体。
引用：
- new关键字创建对象
- 对象(引用).成员变量或来引用对象的成员变量。
- 对象(引用).方法(参数列表)来调用对象的方法。
- 同一个类的每个对象有不同的成员变量存储空间。（每次new对象都是在内存空间开辟一个新的空间）
- 同一类的每个对象共享该类的方法。（创建的每一个对象都有该类的方法）
3. Java类的定义
由两方面组成：成员变量和方法。
成员变量的声明格式：
```java
[<modifiers>] type <attr_name> [=defaultValue];
// 例如
private int id;
private int age = 26;
```
方法的声明格式：
```java
[<modifiers>]<modifiers><return_type><name>([<argu_list>]){
  [<statements>]
}
// 例如
public int getAge(){
  return age;
}
```
- 定义了成员变量，没有初始化，Java会使用默认值对其初始化。
- 成员变量的作用范围位整个类体。
- 局部变量必须初始化
4. 构造函数（构造方法）
- 构造函数是定义在Java类中的一个用来==初始化对象==的函数。
- 构造函数与类同名且没有返回值。（可以有四种修饰符，不写时默认为default）
```java
// Person类
public class Person {
  // 成员变量
  int id;
  int age;
  Person(int i, int a){
    id = i;
    age = a;
  }
}
// 测试类
public class Test{
  public static void main(String[] args){
    Person tom = new Person(1,25);
    Person jony = new Person(2,26);
  }
}
```
创建的构造函数定义了成员变量所要接收的值，当创建对象时给定初始值，即给构造函数赋值。
**内存解析**
- 方法执行完毕，内存空间释放
- 局部变量执行完毕立即消失，所指向的对象也会消失（可能不及时，垃圾回收）
- ⭐方法的调用就需要先建立一个对象，然后对象.方法名();---🦈有疑问：类名.方法名();是什么调用---> static修饰的成员变量（静态成员变量）

**方法重载**
方法的重载是指一个类中可以定义有相同的名字，但参数不同的多个方法。调用时，会根据不同的参数表选择对应的方法。
- 参数个数不一样
- 参数列表不一样
```java
// 构造方法的重载
Person() {
  id = 0;
  age = 20;
}
Person(int i){
  id = i;
  age = 20;
}
Person(int i, int a){
  id = i;
  age = a;
}
// 普通成员方法的重载
void info(){
  System.out.println("My id is" + id);
}
void info(String t){
  System.out.println(t + "My id is" + id);
}
// 测试
public class Test{
  public static void main(String[] args){
    Person p = new Person(1, 21);
    p.info();// 调用第一个info  无参数的
    p.info("hello");
  }
}

```

**方法重写**
override/overwrite
- 在子类中可以根据需要对基类中继承来的方法进行重写
- 重写方法必须和被重写方法具有相同的==方法名称==、==参数列表==和==返回类型==。
- 重写方法不能使用比被重写方法更严格的访问权限。
⭐子类中重写的是方法，子类中定义了与父类相同的成员变量时，仅仅代表子类也有这个变量，内存中也会单独表示出来。
```java
class A {
    protected void print(String s){
        System.out.println(s);
    }
    A(){
        print("A()");
    }
    // 成员方法
    public void f() {
        print("A:f()");
    }
}
class B extends A {
    B(){
       print("B()");
    }
    // 成员方法
    public void f() {
        print("B:f()");
    }
}
public class Test01 {
    public static void main(String[] args) {
        B b = new B();
        b.f();// A() B() B:f()
    }
}
```



5. 对象的创建和使用
- new关键字创建对象
- 对象(引用).成员变量或来引用对象的成员变量。
- 对象(引用).方法(参数列表)来调用对象的方法。
- 同一个类的每个对象有不同的成员变量存储空间。（每次new对象都是在内存空间开辟一个新的空间）
- 同一类的每个对象共享该类的方法。（创建的每一个对象都有该类的方法）

6. this关键字
- 在类的方法定义中使用的this关键字代表使用该方法的对象的引用。
- 当必须指出当前使用方法的对象是谁时要使用this
- 使用this可以处理==方法中成员变量和参数重名的情况==。
- this可以看作是一个变量，他的值是当前对象的引用
```java
public class Leaf{
  int i = 0;
  Leaf(int i){
    this.i = i;
  }
  // increment方法 返回值类型位Leaf类
  Leaf increament(){
    i++;
    return this;
  }
  void print(){
    System.out.println("i="+i)
  }
  public static void main(String[] args){    
    Leaf leaf = new Leaf(100);
    leaf.increment.increment.print();// i=102
  }
}
```
this指向对象自己
代码中， 构造方法Leaf(int i) { this.i = i} 这里的i采取就近原则，即形参的所定义的i就是该i的值。
7. static关键字
- 在类中，用static声明的成员变量为静态成员变量，它为该类的公用变量，在第一次==使用时==被初始化，对于该类的所有对象来说，static成员变量只有一份。
- 用static声明的方法为静态方法，在调用该方法时，不会将对象的引用传递给它，所以在static方法中不可访问非static的成员。
- 可以通过对象引用或==类名（不需要实例化）访问静态成员==。
```java
public class Cat{
  private static in sid = 0;
  private String name;
  int id;
  Cat(String name){
    this.name = name;
    id = sid++;//构造方法可以直接使用静态成员变量
  }
  public void info(){
    System.out.println("My name is" + name + "No." + id);
  }
  public static void main(String[] args){
    Cat.sid = 100;// 类名.静态成员变量 --- 用来访问静态成员变量
    Cat mimi = new Cat("mimi");
    mimi.info();// 非静态方法的访问，要通过实例化后访问
  }
}
```
- static成员变量分配在data segment区域（数据区）
- 非静态变量不能直接调用，必须实例化。
- 在被static（静态方法）声明的地方不能使用this）
8. package和import语句
==package解决类名冲突的问题==，package作为Java源文件的第一条语句，指明该文件中定义的类所在的包。
9. 访问控制（权限修饰符）
- 权限修饰符置于类的成员定义前，用于==限定其他对象对该类对象成员的访问权限。==

  | 修饰符    | 类内部 | 同一个包 | 子类 | 任何地方 |
  | --------- | ------ | -------- | ---- | -------- |
  | private   | √      |          |      |          |
  | default   | √      | √        |      |          |
  | protected | √      | √        | √    |          |
  | public    | √      | √        | √    | √        |
  当定义成员变量时不加权限修饰符，Java默认为default权限。
10. 类的继承
- Java中使用extends关键字实现类的继承机制，其语法规则为：
```java
<modifier> class <name> [extends<superclass>]{
  ...
}
```
- 通过继承，子类自动拥有了基类（superclass）的所有成员（成员变量和方法）。--->注：私有的是继承下来了，但是不可以使用。
- ==Java只支持单继承==，不允许多继承
  - 一个子类只能有一个基类，一个基类可以派生出多个子类。
```java
class Parent{
  public int n_public = 4;
}
class Child extends Parent{
  public void f(){
    n_public = 40;
  }
}
```
**super关键字**
- 使用`super`来引用基类的成分。
- `super`指向当前对象的父对象，`this`指向自身。
```java
class FatherClass {
    public int value;
    public void f(){
        value = 100;
        System.out.println("FatherClass.value" + value);
    }
}
class ChildClass extends FatherClass {
    public int value; // 子类的该成员变量与父类重名，但并不是重写（重写仅对方法而言）
    /*方法重写：*/
    @Override
    public void f() {
        super.f(); // 指向父类里的成员方法f()
        value = 200;// 100 --> 200
        System.out.println("ChildClass.value" + value);
        System.out.println(value);
        System.out.println(super.value);
    }
}

public class TestFatherAndChild{
    public static void main(String[] args) {
        ChildClass cc = new ChildClass();
        cc.f();//FatherClass.value100 ChildClass.value200  200  100
    }
}
```
**继承中的构造方法**
- 子类的构造的过程中必须调用其基类的构造方法。
- 子类可以在自己的构造方法中使用`super(argument_list)`调用基类的构造方法。
  - 使用`this(argument_list)`调用本类的另外的构造方法。
  - 如果调用super，必须写在子类构造方法的第一行
- 如果子类的构造方法没有显示的调用基类构造方法，则系统默认调用基类无参数的构造方法。
- 如果子类构造方法中既没有显示调用基类构造方法，而基类又没有无参的构造方法，则编译错误。
	第三条，也就是当子类在创建构造函数时，没有写super()，系统会默认添加参数为空的super();
  - 子类的构造方法中的this()，表示调用子类自身另外的构造方法。

11. final关键字
- final的变量的值不能够改变
  - final的成员变量
  - final的局部变量（形参）
- final的方法不能够被重写⭐
- final的类不能够被继承
🦈总结：变量不可更改、方法不可重写、类不可继承。
12. Object类
- Object类是所有Java类的根基类
- 如果在类的声明中未使用extends关键字指明其基类，则默认基类为Object类

**equals方法**
- `public boolean equals(Object obj)`方法
  - 提供定义==对象==是否“相等”的逻辑。
- Object的equals方法定义为： x.equals(y) 当x和y是同一个对象的应用时返回true 否则返回 false。
- 一些重写了`equals`方法的类，如String，Date，调用这些类的equals方法时，x.equals(y),当x和y所引用的对象是同一类对象且==属性内容相等==时（并不一定相同对象），返回true否则返回false。
- 也可以根据需要重写`equals`方法。
注：`==`比较的是地址值，`equals()`比较的是内容上是否一致。
13. 对象转型
- 一个基类的引用类型变量可以“指向”其子类的对象。
- 一个基类的引用不可以访问其子类对象新增加的成员（属性和方法）
- 使用引用变量instanceof 类名 判断该引用型变量所“指向”的对象是否属于该类或该类的子类。
- 子类的对象可以当作基类的对象来使用称作向上转型（upcasting），反之为向下转型（downcasting）
14. 多态
（也叫动态绑定）
动态绑定是指在“执行期间”判断所引用对象的实际类型，根据其实际的类型调用其相应的方法。
多态存在的三个必要条件：
- 要有继承
- 要有重写
- 父类引用指向子类对象

15. 抽象类
- 采用abstract修饰的类叫抽象类，修饰的方法叫抽象方法。
- 含有抽象方法的类必须被声明为抽象类，抽象类必须被继承，抽象方法必须被重写。
- 抽象类不能被实例化
- 抽象方法只需声明，而不需实现。

16. 接口
interface
- 多个无关的类可以实现同一个接口。
- 一个类可以实现多个无关的接口
- 与继承关系类似，接口与实现类之间存在多态性。
- 定义Java类的唐法格式：
```java
<modifier>class<name>[extends<superclass>]
[implements<interface>[，<interface>]*]{
<declarations>*
}
```
一个类可以实现多个无关的接口：`class Teacher implements Singer, Painter{}`

- 接口(intefface)是抽象方法和常量值的定义的集合。
- 从本质上讲，接口是一种特殊的抽象类，这种抽象类中只包含常量和方法的定义，而没有变量和方法的实现。
接口定义举例：
```java
public interface Runner{
  public static final int id = 1;
  
  public void start();
  public void run();
  public void stop();
}
```
接口里的方法不需要写abstract，直接就是抽象方法。
接口的特性
- 接口可以多重实现；
- 接口中声明的属性默认为`public static final`的；也只能是`public static final`。
- 接冂中只能定义抽象方法，而且这些方法默认为==public==的、也只能是public的；
- 接口可以继承其它的接口，并添加新的属性和抽象方法。
接口举例
```java
interface Singer {
  public void sing();
  public void sleep();
}
class Student implements Singer{
  private String name;
  Student (String name) {
    this.name = name;
  }
  public void study(){
    System.out.println("studying")；
  }
  public String getName(){
    return name;
  }
  public void sing(){
    System.out.println("student is singing");
  }
  public void sleep(){
    System.out.println("student is sleeping");
  }
}
```
⭐实现接口，必须重写接口里的方法。
也可以实现多个接口
```java
class Teacher implements Singer,Painter{
  private String name；
  public string getString(){
    return name;
  }
Teacher(String name){this.name=name；}
public void teach(){}
public void sing(){}
public void sleep(){}
public void paint(){}
public void eat(){}
```
	所有方法都要重写
		○ 接口之间可以相互继承
		○ 一个类只能实现接口
		○ 类和类之间可以相互继承、接口和接口之间也可以实现继承
类只能实现接口
## 第四章：Java异常处理机制
1. 异常的概念
异常的概念
- Java异常是Ja提供的用于处理程序中错误的一种机制。
- 所谓错误是指在程序运行的过程中发生的一些异常件（如：除0溢出，数组下标越界，所要读取的文件不存在）。
- 设计良好的程序应该在异常发生时提供处理这些错误的方法，使得程序不会因为异常的发生而阻断或产生不可预见的结果。
- Java程序的==执行过程==中如出现异常事件，可以生成一个异常类对象，该异常类对象封装了异常时间的信息并将被提交给Java运行时系统，这个过程称为抛出（throw）异常。
- 当Java运行时系统接收到异常对象时，会寻找能处理这一异常的代码并把当前异常对象交给其处理，这一过程称为捕获（catch）异常。
```java
public class Test{
  public static void main(String[] args){
    int[] arr = {1, 2, 3};
    System.out.println(arr[2]);
    try{
      System.out.println(2/0);
    }catch(ArithmeticException ae){
      System.out.println("除0溢出的异常");
      ae.printStackTrace();
    }
  }
}
```
⭐ae.printStackTrace();将错误的堆栈信息打印出来。
2. Java异常的分类
- Error：错误，Java虚拟机生成并抛出，包括动态链表失败、虚拟机错误等，程序对其不做处理。
- Exception:所有异常类的父类，其子类对应可能出现的异常事件，需用户显示的声明或捕获。
- Runtime Exception：一类特殊的异常，如被0除、数组下标超范围，产生频繁、处理麻烦，系统自动监测并交给缺少的异常处理程序。（不比自己处理）

3. 异常的捕获和处理
```java
try{
  // 可能抛出异常的语句
}catch(SomeException1 e){
  ...
}catch(SomeException2 e){
  ...
}finally{
  ...
}
```
- try代码片段包含可能产生 异常 的代码。
- try代码段后跟有一个或多个catch代码段。
- 


**try**
捕获异常，有异常就会抛出，给catch语句处理
**catch**
处理异常，
- 在catch中声明的异常对象`(catch(SomeException e))`封装了异常事件发送的信息，可以使用该对象的一些方法获取这些信息。
  - getMessage()方法，用来得到有关异常时间的信息。
  - printStackTrace()方法，用来跟踪异常事件发生时执行。
**finally**
无论抛不抛异常都会执行finally。
- 通常在finally语句中可以进行资源的清除工作
  - 关闭打开的文件
  - 删除临时文件

⭐重写的方法抛出异常了，需要抛出和异常一样的异常或者不抛异常。


## 第五章：数组
1. 数组概述

- 数组元素为引用数据类型的数组中的每一个元素都需要实例化。
**数组初始化**
- 动态初始化：先分配空间再赋值。
```java
int a[] = new int[3]
a[0] = 1;
a[1] = 2;
a[2] = 3;
```
- 静态初始化：在定义数组的同时就分配空间并赋值。
```java
int a[] = {1,2,3};
```

2. 数组元素的引用
`arr[index]`

3. 二维数组的声明和使用
二维数组可以看成是以数组为元素的数组。
- 二维数组的声明和初始化应按从高维到低维的顺序进行。

初始化方式：
- 静态初始化
- 动态初始化
```java
// 静态初始化
int a[][] = {{1,2},{3,4,5,6},{7,8}};

// 动态初始化
int a[][] = new int[3][]; // 理解为 一维有三个元素（这三个元素是三个数组类型）
a[0] = new int[2]; // 定义二维有几个元素
a[1] = new int[4];
a[2] = new int[2];
```

4. 数组拷贝
	System.arraycopy(arr1, 0, arr2, 0, arr1.length)
// 参数分别为：要复制的数组、要复制数组的索引、复制到的目标数组、对应的索引、要复制的数组的长度


## 第六章：Java常用类
1. String 
String也可以实现截取的功能
```java
public class Test{
  public static void main(String[] args){
    char c[] = {'s','u','n',' ','j','a','v','a'};
    String s4 = new String(c);// 将字符型数组转换成字符串
    String s5 = new String(c, 4, 4);// 把转成的字符串进行截取，从第4个开始，截取4个
    System.out.println(s4) // sun java
    System.out.println(s5) // java
  }
}
```
x.equals(y)；
- 比较的是`x`和`y`是不是属于同一个对象，属于同一个对象则返回true
- 有一些类是被重写的，属于这些类的变量重写时 都属于该类并且成员变量相同也返回true

- `valueOf()`：将基本类型数据转换成字符串。
- `split()`：将一个字符串按指定的分割符分割。

**StringBuffer()**字符串缓冲区
StringBuffer 上的主要操作是 append 和 insert 方法。
```java
String str = "start";
str.append("le");// startle
str.insert(4, "le");// starlet
```

2. 基本数据类型包装类

3. Math类
```java
Math.random();
Math.sqrt();

```

4. File类

5. 枚举类
定义了类型再定义新变量（限定，就只能取定义好的类型里的值）
```java
public class TestEnum{
  // 定义枚举类型
  public enum MyColor {red, green, blue};
  public static void main(String[] args){
    MyColor m = MyColor.red;
    Switch(m){
      case red:
        System.out.println("红色");
        break;
      case green:
        System.out.println("绿色");
        break;
      case blue:
        System.out.println("蓝色");
      default：
      System.out.println(m);// 把所有颜色都打印出来
    }
  }
}

```

