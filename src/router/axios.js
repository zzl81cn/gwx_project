import define from './define'
import Router from 'vue-router'

const { axios, crossDomain, extend, asyncApi } = define
const router = {
  routes: [axios, crossDomain, extend, asyncApi]
}

export default new Router(router)
