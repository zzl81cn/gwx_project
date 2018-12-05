import define from './define'
import Router from 'vue-router'

const { setMap, proxy } = define
const router = {
  routes: [setMap, proxy]
}

export default new Router(router)
