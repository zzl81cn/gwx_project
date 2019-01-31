export function animationRequest(fn, delay) {
  const dateFn = Date.now
  let startTime = dateFn()
  let timer
  return function loop() {
    timer = requestAnimationFrame(loop)
    let currentTime = dateFn()
    if ((currentTime - startTime) > delay) {
      console.log(`${delay}毫秒后执行`);
      fn(timer)
    }
     /**
      * 如果 timer = requestAnimationFrame(loop)放在此处更新
      * 每次清楚的都是上一个timer，不会生效，因为requestAnimationFrame
      * */
  }
}
export function ballMove(ball) {
  let yMin = 0
  let yMax = document.body.clientHeight - ball.clientHeight
  let speed = 8
  let dir = 1
  let pos = 0
  return function loop() {
    requestAnimationFrame(loop)
    if (pos < yMin || pos >= yMax) {
      // 遇到临界值速度方向取反即可，而不是单纯的定义正和负
      dir = -1 * dir
    }
    pos += dir * speed
    console.log(dir, speed, pos);
    ball.style.top = pos + 'px'
  }
}
