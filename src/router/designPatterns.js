import define from './define'
import Router from 'vue-router'

const { strategy, observer, flyweight, proxyModule } = define
const router = {
  routes: [strategy, observer, flyweight, proxyModule]
}

export default new Router(router)
