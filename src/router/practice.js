import define from './define'
import Router from 'vue-router'

const { reverseNumber, zeroCount, twoPoint, mixins, radio } = define
const router = {
  routes: [reverseNumber, zeroCount, twoPoint, mixins, radio]
}

export default new Router(router)
