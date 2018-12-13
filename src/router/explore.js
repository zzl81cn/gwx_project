import define from './define'
import Router from 'vue-router'

const { callHook, vuxInput, border, grid, gpu, scroll } = define
const router = {
  routes: [callHook, vuxInput, border, grid, gpu, scroll]
}

export default new Router(router)
