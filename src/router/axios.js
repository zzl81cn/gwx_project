import define from './define'
import Router from 'vue-router'

const { axios, crossDomain, extend } = define
const router = {
  routes: [axios, crossDomain, extend]
}

export default new Router(router)
