class Observer {
  constructor() {
    // 存储所有不同类别的订阅
    this.observerTeacher = {}
  }
  subscribe({id, name, fn}) {
    // 判断定位对象是否存在如果不存在创建
    if (!this.observerTeacher[name]) {
      this.observerTeacher[name] = {}
    }
    // 将被订阅对象和订阅者联系起来
    this.observerTeacher[name][id] = fn
  }
  takeOff({name, id}) {
    delete this.observerTeacher[name][id]
  }
  trigger(name) {
    if (!this.observerTeacher[name]) return
    // 通过name值来取出被订阅者所有信息
    const fnList = Object.values(this.observerTeacher[name])
    // 遍历执行被订阅者的所有函数
    for (const fn of fnList) {
      fn()
    }
  }
}
export default Observer
