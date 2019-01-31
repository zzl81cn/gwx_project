export function getPromise() {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve('异步后的值')
    }, 1000);
  })
}
const PENDING = 'padding'
const RESOLVED = 'resolve'
const REJECTED = 'reject'
export function MyPromise(fn) {
  const that = this
  that.value = null
   that.resolvedCallbacks = []
   that.rejectedCallbacks = []
  that.state = PENDING
  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }

  function resolve(value) {
    if (that.state === PENDING) {
      that.state = RESOLVED
      that.value = value
      that.resolvedCallbacks.map(cb => cb(that.value))
    }
  }

  function reject(value) {
    if (that.state === PENDING) {
      that.state = REJECTED
      that.value = value
      that.rejectedCallbacks.map(cb => cb(that.value))
    }
  }
}
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : r => {
          throw r
        }
  if (that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }
  if (that.state === RESOLVED) {
    onFulfilled(that.value)
  }
  if (that.state === REJECTED) {
    // onRejected(that.value)
  }
}
