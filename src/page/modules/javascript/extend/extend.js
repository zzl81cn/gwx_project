export function Parent(name) {
  this.name = name
}
Parent.prototype.getName = function() {
  console.log('获取姓名 : ', this.name);
}
// 通过es6 extends关键字实现对 父级的继承
export class Child extends Parent {
  constructor(value, age) {
    /**
     * super 作为函数调用时，代表父类的构造函数
     * parent(父类).prototype.constructor.call(this)
     * super()只能用在子类的构造函数(constructor)之中，用在其他地方就会报错。
     *  */
    super(value)
    this.number = age
  }
  getFatherName() {
    /**
     * 通过`super.`获取的是父类的原型对象定义的方法或属性
     */
    super.getName()
  }
  get age() {
    return this.number > 18 ? '年龄是个秘密' : `今年${this.number}岁`
  }
}
export const Super1 = class {
  constructor(name) {
    this.name = name
  }
  getName() {
    console.log(this.name);
  }
  // 子类super可获取原型上的方法
  get age() {
    return 15
  }
}
