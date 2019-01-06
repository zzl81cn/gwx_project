import define from './define'
import Router from 'vue-router'

const { strategy, observer } = define
const router = {
  routes: [strategy, observer]
}

export default new Router(router)
