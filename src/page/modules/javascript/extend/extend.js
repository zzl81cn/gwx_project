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
