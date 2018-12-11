import define from './define'
import Router from 'vue-router'

const { setMap, proxy, promise } = define
const router = {
  routes: [setMap, proxy, promise]
}

export default new Router(router)
