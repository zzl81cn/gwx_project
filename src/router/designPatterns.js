import define from './define'
import Router from 'vue-router'

const { strategy, observer, flyweight } = define
const router = {
  routes: [strategy, observer, flyweight]
}

export default new Router(router)
