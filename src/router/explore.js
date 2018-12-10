import define from './define'
import Router from 'vue-router'

const { callHook, vuxInput, border, grid, gpu } = define
const router = {
  routes: [callHook, vuxInput, border, grid, gpu]
}

export default new Router(router)
