// 经常使用的一些值都应该通过常量来管理，便于开发及后期维护
const PENDING = 'pending'
const RESOLVED = 'resolve'
const REJECTED = 'reject'
export class PracticePromise {
  // 此处定义的变量不需要用let const声明
  state = PENDING
  value = null
  resolveFnList = []
  rejectFnList = []
  constructor(fn) {
    try {
      // 高阶函数中运行函数会改变this执行，传入时需要改变this指向
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }
  /**
   * 将异步的结果赋值给 value
   * 将状态更改为resolve
   * 将then函数中的回调函数其实在 resolve/reject中执行
   */
  resolve(value) {
    if (this.state === PENDING) {
      this.value = value
      this.state = RESOLVED
      this.resolveFnList.forEach(fn => {
        fn(this.value)
      })
    }
  }
  reject(value) {
    if (this.state === PENDING) {
      this.value = value
      this.state = REJECTED
      this.rejectFnList.forEach(fn => {
        fn(this.value)
      })
    }
  }
  then(onFulfilled, onRejected) {
    /**
     * 判断then函数中的传入值 做安全处理
     */
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : fn => fn
    onRejected = typeof onFulfilled === 'function' ? onFulfilled : err => { throw err }
    // 如果有异步操作将 传入的then的回调函数分别添加到对应的函数
    if (this.state === PENDING) {
      this.resolveFnList.push(onFulfilled)
      this.rejectFnList.push(onRejected)
    }
    // 如果promise中没有异步操作，并且resolve结果就命中该判断
    if (this.state === RESOLVED) {
      onFulfilled(this.value)
    }
    // 如果为同步,并且reject结果就命中该判断
    if (this.state === REJECTED) {
      onRejected(this.value)
    }
  }
}
