
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
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }
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
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : fn => fn
    onRejected = typeof onFulfilled === 'function' ? onFulfilled : err => { throw err }
    if (this.state === PENDING) {
      this.resolveFnList.push(onFulfilled)
      this.rejectFnList.push(onRejected)
    }
    if (this.state === RESOLVED) {
      onFulfilled(this.value)
    }
    if (this.state === REJECTED) {
      onRejected(this.value)
    }
  }
}
