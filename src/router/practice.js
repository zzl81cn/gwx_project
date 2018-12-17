import define from './define'
import Router from 'vue-router'

const {
  reverseNumber,
  zeroCount,
  twoPoint,
  mixins,
  radio,
  hoc,
  echart,
  chart
} = define
const router = {
  routes: [
    reverseNumber,
    zeroCount,
    twoPoint,
    mixins,
    radio,
    hoc,
    echart,
    chart
  ]
}

export default new Router(router)
