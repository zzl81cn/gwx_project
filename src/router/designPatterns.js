import define from './define'
import Router from 'vue-router'

const { strategy } = define
const router = {
  routes: [strategy]
}

export default new Router(router)
