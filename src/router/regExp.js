import define from './define'
import Router from 'vue-router'

const { replace } = define
const router = {
  routes: [replace]
}

export default new Router(router)
