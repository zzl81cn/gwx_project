import define from './define'
import Router from 'vue-router'

const { callHook, vuxInput, border, grid } = define
const router = {
  routes: [callHook, vuxInput, border, grid]
}

export default new Router(router)
