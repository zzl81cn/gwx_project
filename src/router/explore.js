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
  rotate
} = define
const router = {
  routes: [callHook, vuxInput, border, grid, gpu, scroll, gradient, rotate]
}

export default new Router(router)
