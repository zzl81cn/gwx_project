## promise.then 
* 返回的是一个新的Promise实例
* 由于Promise实例会立即执行,如果Promise实例没有异步操作,整个then返回的就是同步操作
* 可以手动通过return返回一个异步的Promise实例或()=>{}箭头函数(作用相当于return)
* 如果有实例中有异步操作,则下一个.then的回调函数中需要等promise状态(resolve/reject)后才会触发
## Promise.race
* 将多个 Promise 实例，包装成一个新的 Promise 实例。
* 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
```
const p = Promise.race([p1, p2, p3]);
// Promise {<pending>}
```
## Promise.all()
* 将多个 Promise 实例，包装成一个新的 Promise 实例。
* Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用的Promise.resolve方法，将参数转为 Promise 实例
```
const p = Promise.all([p1, p2, p3]);
```
* 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成成功，否则一旦有一个reject，p的状态就会变成失败