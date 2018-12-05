import define from './define'
import Router from 'vue-router'

const { callHook, vuxInput } = define
const router = {
  routes: [callHook, vuxInput]
}

export default new Router(router)
