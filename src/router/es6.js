import define from './define'
import Router from 'vue-router'

const { setMap, proxy, promise, generator, async } = define
const router = {
  routes: [setMap, proxy, promise, generator, async]
}

export default new Router(router)
