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
  countUp
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
    countUp
  ]
}

export default new Router(router)
