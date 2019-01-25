import define from './define'
import Router from 'vue-router'

const {
  callHook,
  vuxInput,
  border,
  grid,
  gpu,
  scroll,
  gradient,
  rotate,
  svg,
  stroke,
  countUp,
  scrollBar,
  codeJsx,
  throttle,
  clone,
  wrap
} = define
const router = {
  routes: [
    callHook,
    vuxInput,
    border,
    grid,
    gpu,
    scroll,
    gradient,
    rotate,
    svg,
    stroke,
    countUp,
    scrollBar,
    codeJsx,
    throttle,
    clone,
    wrap
  ]
}

export default new Router(router)
