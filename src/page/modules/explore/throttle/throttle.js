/**
*
* @param func    {Function}   实际要执行的函数
* @param wait    {Number}     执行间隔，单位是毫秒（ms），默认100ms
* @return        {Function}   返回一个“节流”函数
*/

export const throttle = function (func, wait = 100) {
  // 利用闭包保存上次执行时间
  const dateFn = Date.now
  let previous = dateFn()
  return function() {
      // 保存函数调用时的上下文和参数，传递给 fn
      const context = this;
      const args = arguments;
      const now = dateFn();
      /**
       * 当滚动事件触发时函数一直在执行
       * 当满足设定的延迟时间时，再次触发 scrool 会执行我们传入的函数
       * 这样起到减少我们目标函数的次数 达到性能优化
       */
      if (now > (previous + wait)) {
        previous = now;
        Reflect.apply(func, context, args)
      }
  };
}
/**
 * @param     fn     {Function}   实际要执行的函数
 * @param     delay    {Number}     延迟时间，单位是毫秒（ms）
 * @return    {Function}
 */

export const debounce = function (fn, delay = 1000) {
  let timer;
  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 func 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给func
    var args = arguments
    // 函数被调用，清除定时器
    clearTimeout(timer)
    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 func
    timer = setTimeout(() => {
      fn(args);
    }, delay);
  }
}
