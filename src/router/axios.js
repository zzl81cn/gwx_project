import define from './define'
import Router from 'vue-router'

const { axios } = define
const router = {
  routes: [axios]
}

export default new Router(router)
