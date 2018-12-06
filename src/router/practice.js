import define from './define'
import Router from 'vue-router'

const { reverseNumber, zeroCount, twoPoint, mixins, radio, hoc } = define
const router = {
  routes: [reverseNumber, zeroCount, twoPoint, mixins, radio, hoc]
}

export default new Router(router)
