export function* delayLog () {
  yield setTimeout(() => {
    console.log('第一步');
  }, 1000);
  yield setTimeout(() => {
    console.log('第二步');
  }, 1000);
  yield setTimeout(() => {
    console.log('最后一步');
  }, 1000);
}

/**
 * await 后面跟异步操作 如包含异步操作的promise对象
 * 像 setTimeout 这种 注册不属于异步操作 需要放在promise对象中，当执行结束后resolve
 * 表示异步操作结束
 * */
export async function asyncDelayLog() {
  await new Promise(
    resolve => {
      setTimeout(() => {
       console.log('第一步');
       resolve()
     }, 1000);
    }
  )
  await new Promise(
    resolve => {
      setTimeout(() => {
       console.log('第二步');
       resolve()
     }, 2000);
    }
  )
  await new Promise(
    resolve => {
      setTimeout(() => {
       console.log('第三步');
       resolve()
     }, 3000);
    }
  )
}
