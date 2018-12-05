import define from './define'
import Router from 'vue-router'

const { vuxInput, vModel } = define
const router = {
  routes: [vuxInput, vModel]
}

export default new Router(router)
