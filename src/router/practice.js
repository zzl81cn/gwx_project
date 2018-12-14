import define from './define'
import Router from 'vue-router'

const {
  reverseNumber,
  zeroCount,
  twoPoint,
  mixins,
  radio,
  hoc,
  echart
} = define
const router = {
  routes: [reverseNumber, zeroCount, twoPoint, mixins, radio, hoc, echart]
}

export default new Router(router)
