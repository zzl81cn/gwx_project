[类的基本用法](http://es6.ruanyifeng.com/#docs/class)
## 类是构造函数的另一种写法
```
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```
* 类的数据类型就是函数，类本身就指向构造函数。 注意Point不是类的实例
## 类的原型
```
Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```
一次添加多个方法,在类的实例上面调用方法，其实就是调用原型上的方法。
## constructor方法
* 通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法
* 如果没有定义,JavaScript引擎会默认添加一个空的方法,默认返回 `constructor方法默认返回实例对象（即this）`。
## 取值(getter) 存值(setter)
```
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```
## 方法名可以使用变量
```
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
```
## this指向
* 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。
```
const logger = new Logger();
// 将方法单独提取出来使用,this会指向该方法运行时所在的环境
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```
1. 在构造函数中绑定this
```
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }
}
```
2. 直接把方法写在构造函数中,并且改写为箭头函数
```
class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }
}
```
## 实例属性的新写法
* 这种新写法的好处是，所有实例属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。
```
class Prop{
   constructor() {
    this._count = 0;
  }
}
或
class Prop{
  // 不需要在实例属性前面加上this.
  _count = 0;
}
```
## 静态方法
```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```
* 在Foo类上调用（Foo.classMethod()），而不是在Foo类的实例上调用。