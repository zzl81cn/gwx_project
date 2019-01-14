import define from './define'
import Router from 'vue-router'

const { strategy, observer, flyweight, proxyModule, single } = define
const router = {
  routes: [strategy, observer, flyweight, proxyModule, single]
}

export default new Router(router)
